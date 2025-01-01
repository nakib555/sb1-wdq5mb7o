import React from 'react';
import { Bot, User } from 'lucide-react';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import { MessageContent } from './MessageContent';
import type { Message } from '../types/chat';

interface MessageItemProps extends Message {
  onExecuteCode?: (code: string) => Promise<void>;
}

export function MessageItem({ role, content, onExecuteCode }: MessageItemProps) {
  const { displayedText, isTyping } = useTypingAnimation(
    role === 'assistant' ? content : ''
  );

  return (
    <div 
      className={`
        ${role === 'assistant' ? 'bg-gray-50' : 'bg-white'}
        transition-all duration-300 ease-in-out
        animate-fadeIn
      `}
    >
      <div className="max-w-3xl mx-auto p-4 md:p-6 flex gap-4 md:gap-6">
        <div className="flex-shrink-0 transition-transform hover:scale-105">
          {role === 'assistant' ? (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          {role === 'assistant' ? (
            <div className="animate-slideIn">
              <MessageContent 
                content={displayedText} 
                onExecuteCode={onExecuteCode}
                showCodeSandbox={true}
              />
              {isTyping && (
                <span className="inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></span>
                </span>
              )}
            </div>
          ) : (
            <div className="animate-slideIn">
              <MessageContent 
                content={content} 
                showCodeSandbox={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}