import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2 } from 'lucide-react';

interface CodeSandboxProps {
  initialCode?: string;
  language?: string;
  onExecute?: (result: string) => void;
}

export function CodeSandbox({ 
  initialCode = '', 
  language = 'javascript',
  onExecute 
}: CodeSandboxProps) {
  const [code, setCode] = useState(initialCode);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async () => {
    if (!code.trim()) return;
    
    setIsExecuting(true);
    try {
      const result = await executeSandboxedCode(code);
      onExecute?.(result);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-gray-900">
      <div className="border-b border-gray-700 p-4 flex justify-between items-center bg-gray-800">
        <span className="text-gray-300 font-medium">Code Editor</span>
        <button
          onClick={handleExecute}
          disabled={isExecuting || !code.trim()}
          className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isExecuting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Run Code</span>
            </>
          )}
        </button>
      </div>
      <Editor
        height="200px"
        language={language}
        value={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
}