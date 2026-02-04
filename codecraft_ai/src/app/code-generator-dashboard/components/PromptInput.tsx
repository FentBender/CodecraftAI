'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PromptInputProps {
  onGenerate: (prompt: string, language: string) => void;
  isGenerating: boolean;
}

const PromptInput = ({ onGenerate, isGenerating }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const languages = [
    { value: 'javascript', label: 'JavaScript', icon: 'CodeBracketIcon' },
    { value: 'typescript', label: 'TypeScript', icon: 'CodeBracketSquareIcon' },
    { value: 'python', label: 'Python', icon: 'CommandLineIcon' },
    { value: 'java', label: 'Java', icon: 'CubeIcon' },
    { value: 'csharp', label: 'C#', icon: 'CpuChipIcon' },
    { value: 'go', label: 'Go', icon: 'BoltIcon' },
    { value: 'rust', label: 'Rust', icon: 'ShieldCheckIcon' },
    { value: 'php', label: 'PHP', icon: 'ServerIcon' },
    { value: 'ruby', label: 'Ruby', icon: 'SparklesIcon' },
    { value: 'swift', label: 'Swift', icon: 'DevicePhoneMobileIcon' },
    { value: 'lua', label: 'Lua (Gaming)', icon: 'SparklesIcon' },
    { value: 'gdscript', label: 'GDScript (Godot)', icon: 'CubeIcon' },
    { value: 'hlsl', label: 'HLSL (Shaders)', icon: 'SwatchIcon' },
    { value: 'glsl', label: 'GLSL (Shaders)', icon: 'SwatchIcon' },
    { value: 'bash', label: 'Bash (Linux)', icon: 'CommandLineIcon' }
  ];

  const examplePrompts = [
    'Create a function to validate email addresses',
    'Build a REST API endpoint for user authentication',
    'Generate a binary search tree implementation',
    'Write a function to sort an array using quicksort'
  ];

  const handleGenerate = () => {
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt, selectedLanguage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleGenerate();
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Describe Your Code
        </h2>
        <div className="flex items-center gap-2">
          <Icon name="SparklesIcon" size={20} className="text-primary" />
          <span className="font-caption text-sm text-muted-foreground">AI-Powered</span>
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="prompt-input" className="font-body text-sm text-muted-foreground block">
          Natural Language Prompt
        </label>
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Example: Create a function that validates email addresses using regex and returns true if valid..."
          className="w-full h-32 px-4 py-3 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none font-body text-base"
          disabled={isGenerating}
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{prompt.length} characters</span>
          <span className="flex items-center gap-1">
            <Icon name="CommandLineIcon" size={14} />
            Press Ctrl+Enter to generate
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="language-select" className="font-body text-sm text-muted-foreground block">
          Target Language
        </label>
        <div className="relative">
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent appearance-none cursor-pointer font-body text-base"
            disabled={isGenerating}
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <Icon
            name="ChevronDownIcon"
            size={20}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-caption text-xs text-muted-foreground">Quick Examples:</p>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="px-3 py-1.5 bg-muted text-muted-foreground rounded-md hover:bg-border hover:text-foreground transition-smooth text-xs font-body focus-ring"
              disabled={isGenerating}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md font-body font-medium text-base hover:opacity-90 transition-smooth hover-lift active-press focus-ring disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
            Generating Code...
          </>
        ) : (
          <>
            <Icon name="SparklesIcon" size={20} />
            Generate Code
          </>
        )}
      </button>
    </div>
  );
};

export default PromptInput;