import { useState, useCallback } from 'react';
import { getGeminiResponse } from '../lib/gemini';
import { executeSandboxedCode } from '../lib/sandboxedExecutor';
import type { Message } from '../types/chat';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExecuteCode = async (code: string) => {
    try {
      const result = await executeSandboxedCode(code);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Output:\n\`\`\`\n${result}\n\`\`\``
      }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Code execution failed');
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: prompt };
    
    try {
      setLoading(true);
      setError(null);
      setMessages(prev => [...prev, userMessage]);
      setPrompt('');
      
      const response = await getGeminiResponse(prompt);
      const assistantMessage: Message = { role: 'assistant', content: response };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [prompt, loading]);

  return {
    messages,
    prompt,
    loading,
    error,
    setPrompt,
    handleSubmit,
    handleExecuteCode,
  };
}