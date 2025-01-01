import React from 'react';
import { Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b">
      <div className="max-w-3xl mx-auto p-4 flex items-center justify-between">
        <button className="md:hidden -ml-2 p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Gemini Chat</h1>
        <div className="w-9" /> {/* Spacer for alignment */}
      </div>
    </header>
  );
}