'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { LANGUAGES } from '@/lib/config/languages';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeConverterInteractive = () => {
  const [sourceLanguage, setSourceLanguage] = useState('javascript');
  const [targetLanguage, setTargetLanguage] = useState('python');
  const [sourceCode, setSourceCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const convertCode = () => {
    if (!sourceCode?.trim()) return;

    setIsConverting(true);
    
    setTimeout(() => {
      const targetLang = LANGUAGES?.find(l => l?.value === targetLanguage);
      const template = targetLang?.template || '// Converted code will appear here';
      
      setConvertedCode(`// Converted from ${sourceLanguage} to ${targetLanguage}\n\n${template}`);
      setIsConverting(false);
    }, 1500);
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceCode(convertedCode);
    setConvertedCode(sourceCode);
  };

  return (
    <div className="space-y-6">
      {/* Language Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <label className="block text-sm font-medium text-foreground mb-2">From</label>
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e?.target?.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {LANGUAGES?.map((lang) => (
              <option key={lang?.value} value={lang?.value}>
                {lang?.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end justify-center">
          <button
            onClick={swapLanguages}
            className="p-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Icon name="ArrowsRightLeftIcon" size={24} />
          </button>
        </div>

        <div className="bg-card rounded-lg p-4 border border-border">
          <label className="block text-sm font-medium text-foreground mb-2">To</label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e?.target?.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {LANGUAGES?.map((lang) => (
              <option key={lang?.value} value={lang?.value}>
                {lang?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Code Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Code */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Source Code</h3>
          <textarea
            value={sourceCode}
            onChange={(e) => setSourceCode(e?.target?.value)}
            placeholder="Paste your code here..."
            className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[400px] font-mono text-sm"
          />
        </div>

        {/* Converted Code */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Converted Code</h3>
          {convertedCode ? (
            <div className="rounded-md overflow-hidden">
              <SyntaxHighlighter
                language={targetLanguage}
                style={vscDarkPlus}
                customStyle={{ margin: 0, borderRadius: '0.375rem', minHeight: '400px' }}
              >
                {convertedCode}
              </SyntaxHighlighter>
            </div>
          ) : (
            <div className="min-h-[400px] flex items-center justify-center bg-background border border-border rounded-md">
              <p className="text-muted-foreground">Converted code will appear here</p>
            </div>
          )}
        </div>
      </div>
      {/* Convert Button */}
      <button
        onClick={convertCode}
        disabled={isConverting || !sourceCode?.trim()}
        className="w-full py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isConverting ? (
          <>
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Converting...
          </>
        ) : (
          <>
            <Icon name="ArrowsRightLeftIcon" size={20} />
            Convert Code
          </>
        )}
      </button>
    </div>
  );
};

export default CodeConverterInteractive;
