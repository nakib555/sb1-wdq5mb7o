import React from 'react';
import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { ErrorMessage } from './components/ErrorMessage';
import { useChat } from './hooks/useChat';

export default function App() {
  const { messages, prompt, loading, error, setPrompt, handleSubmit } = useChat();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-[260px] bg-gray-900 text-white p-4">
        <div className="w-full">
          <button className="w-full border border-gray-700 rounded-lg p-3 text-sm hover:bg-gray-700 transition-colors">
            + New chat
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen">
        <Header />
        {error && <ErrorMessage message={error} />}
        
        {/* Messages container with bottom padding for input */}
        <div className="flex-1 overflow-y-auto pb-[140px]">
          <ChatWindow messages={messages} />
        </div>

        {/* Fixed input at bottom */}
        <div className="fixed bottom-0 left-0 right-0 md:left-[260px] bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pt-6">
          <div className="max-w-3xl mx-auto p-4 md:p-6 pb-8">
            <ChatInput
              prompt={prompt}
              loading={loading}
              onPromptChange={setPrompt}
              onSubmit={handleSubmit}
            />
            <p className="text-xs text-center text-gray-500 mt-2">
              AI may produce inaccurate information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}