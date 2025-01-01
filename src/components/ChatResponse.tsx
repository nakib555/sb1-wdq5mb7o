import React, { memo } from 'react';
import { MessageSquare } from 'lucide-react';
import { useTypingAnimation } from '../hooks/useTypingAnimation';

interface ChatResponseProps {
  response: string;
}

export const ChatResponse = memo(function ChatResponse({ response }: ChatResponseProps) {
  const { displayedText, isTyping } = useTypingAnimation(response);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 min-h-[200px] transition-all">
      {response ? (
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">
            {displayedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
        </div>
      ) : (
        <div className="text-gray-400 flex flex-col items-center justify-center h-[200px] space-y-2">
          <MessageSquare className="w-8 h-8" />
          <p>Ask something to start the conversation</p>
        </div>
      )}
    </div>
  );
});