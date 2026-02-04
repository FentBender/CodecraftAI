'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeEditorProps {
  code: string;
  language: string;
  isGenerating: boolean;
}

const CodeEditor = ({ code, language, isGenerating }: CodeEditorProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (code) {
      setLineCount(code.split('\n').length);
    }
  }, [code]);

  const getLanguageLabel = (lang: string): string => {
    const labels: Record<string, string> = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      python: 'Python',
      java: 'Java',
      csharp: 'C#',
      go: 'Go',
      rust: 'Rust',
      php: 'PHP',
      ruby: 'Ruby',
      swift: 'Swift',
      lua: 'Lua',
      gdscript: 'GDScript',
      hlsl: 'HLSL',
      glsl: 'GLSL',
      bash: 'Bash'
    };
    return labels[lang] || lang;
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="bg-muted px-4 py-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="CodeBracketSquareIcon" size={20} className="text-primary" />
            <span className="font-body font-medium text-sm text-foreground">Code Output</span>
          </div>
        </div>
        <div className="p-6 min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-2">
            <Icon name="CodeBracketIcon" size={48} className="text-muted-foreground mx-auto" />
            <p className="font-body text-muted-foreground">Loading editor...</p>
          </div>
        </div>
      </div>
    );
  }

  const syntaxLanguage = getLanguageLabel(language);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="bg-muted px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon name="CodeBracketSquareIcon" size={20} className="text-primary" />
          <span className="font-body font-medium text-sm text-foreground">Code Output</span>
          <span className="px-2 py-1 bg-background rounded text-xs font-caption text-muted-foreground">
            {getLanguageLabel(language)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-caption text-xs text-muted-foreground">
            {lineCount} {lineCount === 1 ? 'line' : 'lines'}
          </span>
        </div>
      </div>

      <div className="relative">
        {isGenerating && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center space-y-3">
              <Icon name="ArrowPathIcon" size={40} className="text-primary animate-spin mx-auto" />
              <p className="font-body text-foreground">Generating your code...</p>
              <p className="font-caption text-sm text-muted-foreground">This may take a few seconds</p>
            </div>
          </div>
        )}

        <div className="flex">
          <div className="bg-muted px-3 py-4 border-r border-border select-none">
            {Array.from({ length: lineCount }, (_, i) => (
              <div
                key={i}
                className="font-mono text-xs text-muted-foreground text-right leading-6"
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-x-auto">
            <div className="p-4 overflow-auto max-h-[500px]">
              {code ? (
                <SyntaxHighlighter
                  language={syntaxLanguage}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: 0,
                    background: 'transparent',
                    fontSize: '14px',
                    lineHeight: '1.6'
                  }}
                  showLineNumbers
                  wrapLines
                >
                  {code}
                </SyntaxHighlighter>
              ) : (
                <div className="text-muted-foreground text-center py-12">
                  <Icon name="CodeBracketIcon" size={48} className="mx-auto mb-3 opacity-50" />
                  <p className="font-body">Generated code will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {code && (
        <div className="bg-muted px-4 py-2 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircleIcon" size={16} className="text-success" />
            <span className="font-caption text-xs text-muted-foreground">Code generated successfully</span>
          </div>
          <span className="font-caption text-xs text-muted-foreground">
            {code.length} characters
          </span>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;