import React, { memo } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { AttachmentButton } from './AttachmentButton';
import { AttachmentPreview } from './AttachmentPreview';
import { UploadProgress } from './UploadProgress';
import { useFileUpload } from '../hooks/useFileUpload';
import type { ChatInputProps } from '../types/chat';

export const ChatInput = memo(function ChatInput({ 
  prompt, 
  loading, 
  onPromptChange, 
  onSubmit 
}: ChatInputProps) {
  const { 
    attachments, 
    handleFileSelect, 
    handleRemoveAttachment, 
    setAttachments 
  } = useFileUpload();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e, attachments.filter(att => att.status === 'completed'));
    setAttachments([]);
  };

  const uploadingFiles = attachments.filter(att => att.status === 'uploading');
  const completedFiles = attachments.filter(att => att.status === 'completed');

  return (
    <div className="bg-white border-t shadow-sm">
      {uploadingFiles.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 pt-3 space-y-2">
          {uploadingFiles.map(attachment => (
            <UploadProgress
              key={attachment.id}
              fileName={attachment.name}
              progress={attachment.progress || 0}
            />
          ))}
        </div>
      )}
      
      {completedFiles.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 pt-3">
          <div className="flex flex-wrap gap-2">
            {completedFiles.map(attachment => (
              <AttachmentPreview
                key={attachment.id}
                attachment={attachment}
                onRemove={handleRemoveAttachment}
              />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <AttachmentButton onFileSelect={handleFileSelect} />
          <input
            type="text"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 rounded-lg bg-white border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || (!prompt.trim() && completedFiles.length === 0)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="sr-only">Processing...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span className="sr-only">Send</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
});