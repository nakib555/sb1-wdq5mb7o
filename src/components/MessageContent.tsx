import React from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from './CodeBlock';

interface MessageContentProps {
  content: string;
  onExecuteCode?: (code: string) => Promise<void>;
  showCodeSandbox: boolean;
}

export function MessageContent({ content, onExecuteCode, showCodeSandbox }: MessageContentProps) {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          
          if (!inline && language) {
            return (
              <CodeBlock
                code={String(children).replace(/\n$/, '')}
                language={language}
                onExecute={showCodeSandbox ? onExecuteCode : undefined}
              />
            );
          }
          return <code className={className} {...props}>{children}</code>;
        }
      }}
      className="prose prose-sm md:prose-base max-w-none"
    >
      {content}
    </ReactMarkdown>
  );
}