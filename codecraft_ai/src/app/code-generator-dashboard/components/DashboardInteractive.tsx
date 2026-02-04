'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { LANGUAGES } from '@/lib/config/languages';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  createdAt: string;
}

const STORAGE_KEY = 'codegenie_snippets';

const DashboardInteractive = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [snippetTitle, setSnippetTitle] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSnippets(JSON.parse(stored));
      }
    }
  }, []);

  const generateCode = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate code generation with templates
    setTimeout(() => {
      const language = LANGUAGES.find(l => l.value === selectedLanguage);
      const template = language?.template || '// Code will be generated here';
      
      setGeneratedCode(`// Generated code based on: "${prompt}"\n\n${template}`);
      setIsGenerating(false);
    }, 1500);
  };

  const saveSnippet = () => {
    if (!snippetTitle.trim() || !generatedCode) return;

    const newSnippet: Snippet = {
      id: `snippet_${Date.now()}`,
      title: snippetTitle,
      language: selectedLanguage,
      code: generatedCode,
      createdAt: new Date().toISOString(),
    };

    const updated = [newSnippet, ...snippets];
    setSnippets(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setShowSaveModal(false);
    setSnippetTitle('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  const downloadCode = () => {
    const language = LANGUAGES.find(l => l.value === selectedLanguage);
    const extension = language?.extensions[0] || '.txt';
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="CodeBracketIcon" size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{snippets.length}</p>
              <p className="text-sm text-muted-foreground">Saved Snippets</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Icon name="DocumentTextIcon" size={24} className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{LANGUAGES.length}</p>
              <p className="text-sm text-muted-foreground">Languages</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Icon name="UserIcon" size={24} className="text-blue-500" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{user?.fullName}</p>
              <p className="text-sm text-muted-foreground">Active User</p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Generator */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h2 className="text-xl font-bold text-foreground mb-4">Generate Code</h2>
        
        <div className="space-y-4">
          {/* Language Selector */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Describe what you want to build</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Create a function to validate email addresses"
              className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateCode}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Icon name="SparklesIcon" size={20} />
                Generate Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Code Display */}
      {generatedCode && (
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Generated Code</h2>
            <div className="flex gap-2">
              <button
                onClick={copyCode}
                className="px-4 py-2 bg-muted hover:bg-border rounded-md text-foreground transition-colors flex items-center gap-2"
              >
                <Icon name="ClipboardDocumentIcon" size={18} />
                Copy
              </button>
              <button
                onClick={downloadCode}
                className="px-4 py-2 bg-muted hover:bg-border rounded-md text-foreground transition-colors flex items-center gap-2"
              >
                <Icon name="ArrowDownTrayIcon" size={18} />
                Download
              </button>
              <button
                onClick={() => setShowSaveModal(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Icon name="BookmarkIcon" size={18} />
                Save
              </button>
            </div>
          </div>
          
          <div className="rounded-md overflow-hidden">
            <SyntaxHighlighter
              language={selectedLanguage}
              style={vscDarkPlus}
              customStyle={{ margin: 0, borderRadius: '0.375rem' }}
            >
              {generatedCode}
            </SyntaxHighlighter>
          </div>
        </div>
      )}

      {/* Recent Snippets */}
      {snippets.length > 0 && (
        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Snippets</h2>
          <div className="space-y-3">
            {snippets.slice(0, 5).map((snippet) => (
              <div key={snippet.id} className="p-4 bg-background rounded-md border border-border hover:border-primary transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{snippet.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {LANGUAGES.find(l => l.value === snippet.language)?.label} • {new Date(snippet.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Icon name="ChevronRightIcon" size={20} className="text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-foreground mb-4">Save Snippet</h3>
            <input
              type="text"
              value={snippetTitle}
              onChange={(e) => setSnippetTitle(e.target.value)}
              placeholder="Enter snippet title"
              className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-2 bg-muted hover:bg-border rounded-md text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveSnippet}
                disabled={!snippetTitle.trim()}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardInteractive;