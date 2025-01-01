import React from 'react';
import { X, File, Image as ImageIcon } from 'lucide-react';
import { CircularProgress } from './CircularProgress';
import type { Attachment } from '../types/chat';

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemove: (id: string) => void;
}

export function AttachmentPreview({ attachment, onRemove }: AttachmentPreviewProps) {
  const isImage = attachment.type === 'image';
  const isUploading = attachment.status === 'uploading';

  return (
    <div className="relative group">
      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 pr-8">
        <div className="relative w-8 h-8">
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <CircularProgress progress={attachment.progress || 0} />
            </div>
          )}
          {isImage ? (
            <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center overflow-hidden">
              <img
                src={URL.createObjectURL(attachment.file)}
                alt={attachment.name}
                className={`w-full h-full object-cover transition-opacity duration-200 ${
                  isUploading ? 'opacity-50' : 'opacity-100'
                }`}
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center">
              <File 
                className={`w-4 h-4 text-gray-500 transition-opacity duration-200 ${
                  isUploading ? 'opacity-50' : 'opacity-100'
                }`} 
              />
            </div>
          )}
        </div>
        <span className="text-sm text-gray-600 truncate max-w-[150px]">
          {attachment.name}
        </span>
      </div>
      <button
        onClick={() => onRemove(attachment.id)}
        className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 hover:bg-gray-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}