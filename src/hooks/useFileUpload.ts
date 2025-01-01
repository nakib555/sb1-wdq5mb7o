import { useState } from 'react';
import type { Attachment } from '../types/chat';

export function useFileUpload() {
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const simulateUpload = async (file: File): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setAttachments(prev =>
            prev.map(att =>
              att.file === file
                ? { ...att, progress, status: progress === 100 ? 'completed' : 'uploading' }
                : att
            )
          );
        }
        if (progress > 100) {
          clearInterval(interval);
          resolve();
        }
      }, 300);
    });
  };

  const handleFileSelect = async (files: FileList) => {
    const newAttachments: Attachment[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      name: file.name,
      progress: 0,
      status: 'uploading'
    }));

    setAttachments(prev => [...prev, ...newAttachments]);

    // Simulate upload for each file
    await Promise.all(newAttachments.map(att => simulateUpload(att.file)));
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  return {
    attachments,
    handleFileSelect,
    handleRemoveAttachment,
    setAttachments
  };
}