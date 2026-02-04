'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
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

const SavedSnippetsInteractive = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSnippets(JSON.parse(stored));
      }
    }
  }, []);

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || snippet.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  const deleteSnippet = (id: string) => {
    const updated = snippets.filter(s => s.id !== id);
    setSnippets(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (selectedSnippet?.id === id) {
      setSelectedSnippet(null);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Search Snippets</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title..."
              className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Filter by Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Languages</option>
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Snippets Grid */}
      {filteredSnippets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSnippets.map((snippet) => (
            <div key={snippet.id} className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">{snippet.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {LANGUAGES.find(l => l.value === snippet.language)?.label}
                  </p>
                </div>
                <button
                  onClick={() => deleteSnippet(snippet.id)}
                  className="p-2 hover:bg-red-500/10 rounded-md transition-colors"
                >
                  <Icon name="TrashIcon" size={18} className="text-red-500" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                {new Date(snippet.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedSnippet(snippet)}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
                >
                  View
                </button>
                <button
                  onClick={() => copyCode(snippet.code)}
                  className="px-3 py-2 bg-muted hover:bg-border rounded-md transition-colors"
                >
                  <Icon name="ClipboardDocumentIcon" size={18} className="text-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <Icon name="BookmarkIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {snippets.length === 0 ? 'No snippets saved yet' : 'No snippets match your search'}
          </p>
        </div>
      )}

      {/* Snippet Detail Modal */}
      {selectedSnippet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{selectedSnippet.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {LANGUAGES.find(l => l.value === selectedSnippet.language)?.label} • {new Date(selectedSnippet.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedSnippet(null)}
                className="p-2 hover:bg-muted rounded-md transition-colors"
              >
                <Icon name="XMarkIcon" size={24} className="text-foreground" />
              </button>
            </div>
            <div className="rounded-md overflow-hidden">
              <SyntaxHighlighter
                language={selectedSnippet.language}
                style={vscDarkPlus}
                customStyle={{ margin: 0, borderRadius: '0.375rem' }}
              >
                {selectedSnippet.code}
              </SyntaxHighlighter>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => copyCode(selectedSnippet.code)}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="ClipboardDocumentIcon" size={18} />
                Copy Code
              </button>
              <button
                onClick={() => setSelectedSnippet(null)}
                className="px-6 py-2 bg-muted hover:bg-border rounded-md text-foreground transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedSnippetsInteractive;