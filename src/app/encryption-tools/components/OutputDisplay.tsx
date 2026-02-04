'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface OutputDisplayProps {
  value: string;
  isEncrypted: boolean;
}

const OutputDisplay = ({ value, isEncrypted }: OutputDisplayProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${isEncrypted ? 'encrypted' : 'decrypted'}_output.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block font-body font-medium text-sm text-foreground flex items-center gap-2">
          Output Data
          {value && (
            <span className={`
              px-2 py-0.5 rounded text-xs font-medium
              ${isEncrypted ? 'bg-success text-success-foreground' : 'bg-primary text-primary-foreground'}
            `}>
              {isEncrypted ? 'Encrypted' : 'Decrypted'}
            </span>
          )}
        </label>
        {value && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-smooth focus-ring"
            >
              <Icon name={copySuccess ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={16} />
              <span className="font-caption text-xs">{copySuccess ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-smooth focus-ring"
            >
              <Icon name="ArrowDownTrayIcon" size={16} />
              <span className="font-caption text-xs">Download</span>
            </button>
          </div>
        )}
      </div>

      <div className="relative border-2 border-border rounded-lg bg-background">
        <textarea
          value={value}
          readOnly
          placeholder="Encrypted or decrypted output will appear here..."
          className="w-full h-64 px-4 py-3 bg-transparent rounded-lg text-foreground font-mono text-sm resize-none focus:outline-none scrollbar-custom"
        />
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <Icon name="LockClosedIcon" size={48} className="text-muted-foreground mx-auto opacity-50" />
              <p className="font-body text-sm text-muted-foreground">
                Process your data to see results
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-caption">
          {value.length.toLocaleString()} characters
        </span>
        <span className="font-caption">
          {(new Blob([value]).size / 1024).toFixed(2)} KB
        </span>
      </div>
    </div>
  );
};

export default OutputDisplay;