export interface Message {
  role: 'user' | 'assistant';
  content: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  file: File;
  type: 'image' | 'file';
  name: string;
  progress?: number;
  status: 'uploading' | 'completed' | 'error';
}

export interface ChatInputProps {
  prompt: string;
  loading: boolean;
  onPromptChange: (value: string) => void;
  onSubmit: (e: React.FormEvent, attachments?: Attachment[]) => void;
}