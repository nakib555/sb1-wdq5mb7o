import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, Copy, Check, X } from 'lucide-react';
import { CodeSandbox } from './CodeSandbox';

interface CodeBlockProps {
  code: string;
  language: string;
  onExecute?: (code: string) => Promise<void>;
}

export function CodeBlock({ code, language, onExecute }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [showSandbox, setShowSandbox] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSandboxResult = (result: string) => {
    onExecute?.(`Output:\n${result}`);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden my-4">
      <div className="absolute right-2 top-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700"
          title="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        {onExecute && (
          <button
            onClick={() => setShowSandbox(!showSandbox)}
            className={`p-2 rounded ${
              showSandbox ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'
            } text-white`}
            title={showSandbox ? 'Close editor' : 'Open in editor'}
          >
            {showSandbox ? <X size={16} /> : <Play size={16} />}
          </button>
        )}
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, borderRadius: '0.5rem' }}
      >
        {code}
      </SyntaxHighlighter>
      {showSandbox && onExecute && (
        <div className="mt-4">
          <CodeSandbox
            initialCode={code}
            language={language}
            onExecute={handleSandboxResult}
          />
        </div>
      )}
    </div>
  );
}