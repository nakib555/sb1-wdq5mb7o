import React from 'react';
import { Paperclip, Image, Folder } from 'lucide-react';

interface AttachmentButtonProps {
  onFileSelect: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
}

export function AttachmentButton({ onFileSelect, accept = '*/*', multiple = true }: AttachmentButtonProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(e.target.files);
    }
  };

  return (
    <div className="relative group">
      <input
        type="file"
        className="hidden"
        id="file-upload"
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
      />
      <label
        htmlFor="file-upload"
        className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors inline-flex items-center justify-center"
      >
        <Paperclip className="w-5 h-5 text-gray-500" />
      </label>
      
      <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 p-1">
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
        >
          <Image className="w-4 h-4" />
          <span className="text-sm">Image</span>
        </label>
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
        >
          <Folder className="w-4 h-4" />
          <span className="text-sm">Folder</span>
        </label>
      </div>
    </div>
  );
}