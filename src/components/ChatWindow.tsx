import React, { useRef, useEffect } from 'react';
import { MessageItem } from './MessageItem';
import type { ChatWindowProps } from '../types/chat';

export function ChatWindow({ messages, onExecuteCode }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll when messages change

  return (
    <div className="max-w-3xl mx-auto w-full">
      {messages.length === 0 && (
        <div className="h-[calc(100vh-200px)] flex items-center justify-center text-gray-500">
          <p>How can I help you today?</p>
        </div>
      )}
      {messages.map((message, index) => (
        <MessageItem 
          key={index} 
          {...message} 
          onExecuteCode={onExecuteCode}
        />
      ))}
      <div ref={messagesEndRef} className="h-px" /> {/* Invisible scroll anchor */}
    </div>
  );
}