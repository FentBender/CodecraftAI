'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type ToolType = 'base64' | 'hash' | 'reverse';

const EncryptionToolsInteractive = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [selectedTool, setSelectedTool] = useState<ToolType>('base64');
  const [operation, setOperation] = useState<'encode' | 'decode'>('encode');

  const processText = () => {
    if (!input.trim()) return;

    let result = '';

    switch (selectedTool) {
      case 'base64':
        if (operation === 'encode') {
          result = btoa(input);
        } else {
          try {
            result = atob(input);
          } catch (e) {
            result = 'Error: Invalid Base64 string';
          }
        }
        break;
      case 'hash':
        // Simple hash simulation (not cryptographically secure)
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
          const char = input.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash;
        }
        result = Math.abs(hash).toString(16);
        break;
      case 'reverse':
        result = input.split('').reverse().join('');
        break;
    }

    setOutput(result);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6">
      {/* Tool Selection */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <label className="block text-sm font-medium text-foreground mb-3">Select Tool</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedTool('base64')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedTool === 'base64' ?'border-primary bg-primary/10' :'border-border hover:border-primary/50'
            }`}
          >
            <Icon name="LockClosedIcon" size={24} className="text-primary mx-auto mb-2" />
            <p className="font-medium text-foreground">Base64</p>
            <p className="text-xs text-muted-foreground">Encode/Decode</p>
          </button>

          <button
            onClick={() => setSelectedTool('hash')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedTool === 'hash' ?'border-primary bg-primary/10' :'border-border hover:border-primary/50'
            }`}
          >
            <Icon name="HashtagIcon" size={24} className="text-primary mx-auto mb-2" />
            <p className="font-medium text-foreground">Hash</p>
            <p className="text-xs text-muted-foreground">Generate Hash</p>
          </button>

          <button
            onClick={() => setSelectedTool('reverse')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedTool === 'reverse' ?'border-primary bg-primary/10' :'border-border hover:border-primary/50'
            }`}
          >
            <Icon name="ArrowsRightLeftIcon" size={24} className="text-primary mx-auto mb-2" />
            <p className="font-medium text-foreground">Reverse</p>
            <p className="text-xs text-muted-foreground">Reverse Text</p>
          </button>
        </div>

        {selectedTool === 'base64' && (
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => setOperation('encode')}
              className={`flex-1 py-2 rounded-md font-medium transition-colors ${
                operation === 'encode' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground hover:bg-border'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setOperation('decode')}
              className={`flex-1 py-2 rounded-md font-medium transition-colors ${
                operation === 'decode' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground hover:bg-border'
              }`}
            >
              Decode
            </button>
          </div>
        )}
      </div>

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Input</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to process..."
            className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[300px] font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Output</h3>
            {output && (
              <button
                onClick={copyOutput}
                className="px-3 py-1 bg-muted hover:bg-border rounded-md text-foreground transition-colors flex items-center gap-2 text-sm"
              >
                <Icon name="ClipboardDocumentIcon" size={16} />
                Copy
              </button>
            )}
          </div>
          <div className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground min-h-[300px] font-mono text-sm break-all">
            {output || 'Processed text will appear here...'}
          </div>
        </div>
      </div>

      {/* Process Button */}
      <button
        onClick={processText}
        disabled={!input.trim()}
        className="w-full py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Icon name="BoltIcon" size={20} />
        Process
      </button>
    </div>
  );
};

export default EncryptionToolsInteractive;