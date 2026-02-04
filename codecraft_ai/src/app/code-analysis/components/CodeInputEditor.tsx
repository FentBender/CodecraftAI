'use client';

import React, { useState, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { LANGUAGE_CATEGORIES } from '@/lib/config/languages';
import { detectLanguage } from '@/lib/utils/languageUtils';
import LanguageInfoPanel from '@/components/common/LanguageInfoPanel';

interface CodeInputEditorProps {
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const CodeInputEditor = ({ onCodeChange, onLanguageChange, onAnalyze, isAnalyzing }: CodeInputEditorProps) => {
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' }
  ];

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange(newCode);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    onLanguageChange(newLanguage);
  };

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

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setCode(content);
        onCodeChange(content);
      };
      reader.readAsText(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCode(content);
      onCodeChange(content);
      
      // Auto-detect language from file
      const detectedLang = detectLanguage(content, file.name);
      setSelectedLanguage(detectedLang);
      onLanguageChange(detectedLang);
    };
    reader.readAsText(file);
  };

  const handleClearCode = () => {
    setCode('');
    onCodeChange('');
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted">
        <div className="flex items-center gap-3">
          <Icon name="CodeBracketIcon" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-base text-foreground">Code Input</h3>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg font-body text-sm text-foreground appearance-none cursor-pointer focus-ring pr-8"
          >
            {Object.entries(languagesByCategory).map(([category, langs]) => (
              <optgroup key={category} label={LANGUAGE_CATEGORIES[category as keyof typeof LANGUAGE_CATEGORIES]}>
                {langs.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth focus-ring"
            title="Upload file"
          >
            <Icon name="ArrowUpTrayIcon" size={16} />
            <span className="font-body text-sm hidden sm:inline">Upload</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".js,.ts,.py,.java,.cpp,.cs,.go,.rs,.php,.rb,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div
            className={`bg-card rounded-lg border-2 border-dashed transition-colors ${
              isDragging ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {code.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <Icon name="DocumentTextIcon" size={48} className="text-muted-foreground mb-4" />
                <p className="font-body text-base text-foreground mb-2">Paste your code or drag & drop a file</p>
                <p className="font-caption text-sm text-muted-foreground">Supports .js, .ts, .py, .java, .cpp, .cs, .go, .rs, .php, .rb</p>
              </div>
            ) : null}
            <textarea
              value={code}
              onChange={handleCodeChange}
              placeholder="// Paste your code here..."
              className="w-full h-full p-4 bg-background text-foreground font-mono text-sm resize-none focus:outline-none scrollbar-custom"
              spellCheck={false}
            />
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-primary/20 border-2 border-dashed border-primary rounded-lg pointer-events-none">
                <div className="text-center">
                  <Icon name="ArrowDownTrayIcon" size={48} className="text-primary mx-auto mb-2" />
                  <p className="font-body text-lg text-primary font-semibold">Drop file to upload</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <LanguageInfoPanel language={selectedLanguage} />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="DocumentTextIcon" size={16} />
          <span className="font-caption text-sm">{code.length} characters</span>
        </div>
        <div className="flex items-center gap-2">
          {code.length > 0 && (
            <button
              onClick={handleClearCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth focus-ring"
            >
              <Icon name="XMarkIcon" size={16} />
              <span className="font-body text-sm">Clear</span>
            </button>
          )}
          <button
            onClick={onAnalyze}
            disabled={code.length === 0 || isAnalyzing}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
          >
            {isAnalyzing ? (
              <>
                <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
                <span className="font-body text-sm font-medium">Analyzing...</span>
              </>
            ) : (
              <>
                <Icon name="MagnifyingGlassIcon" size={16} />
                <span className="font-body text-sm font-medium">Analyze Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeInputEditor;