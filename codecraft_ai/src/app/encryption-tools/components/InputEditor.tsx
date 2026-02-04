'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface InputEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputEditor = ({ value, onChange, placeholder = 'Enter text or code to encrypt...' }: InputEditorProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onChange(content);
      };
      reader.readAsText(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onChange(content);
      };
      reader.readAsText(file);
    }
  };

  const clearInput = () => {
    onChange('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block font-body font-medium text-sm text-foreground">
          Input Data
        </label>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-smooth cursor-pointer focus-ring">
            <Icon name="ArrowUpTrayIcon" size={16} />
            <span className="font-caption text-xs">Upload File</span>
            <input
              type="file"
              accept=".txt,.json,.xml,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {value && (
            <button
              onClick={clearInput}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-smooth focus-ring"
            >
              <Icon name="XMarkIcon" size={16} />
              <span className="font-caption text-xs">Clear</span>
            </button>
          )}
        </div>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg transition-smooth
          ${isDragging ? 'border-primary bg-primary/5' : 'border-border'}
        `}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-64 px-4 py-3 bg-background rounded-lg text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent scrollbar-custom"
        />
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <Icon name="DocumentTextIcon" size={48} className="text-muted-foreground mx-auto opacity-50" />
              <p className="font-body text-sm text-muted-foreground">
                Drop a file here or click Upload File
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                Supports .txt, .json, .xml, .csv
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

export default InputEditor;