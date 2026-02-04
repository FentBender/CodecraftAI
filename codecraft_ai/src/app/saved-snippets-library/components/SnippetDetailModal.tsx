'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SnippetVersion {
  id: string;
  timestamp: string;
  changes: string;
}

interface SnippetDetailModalProps {
  snippet: {
    id: string;
    title: string;
    language: string;
    code: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    usageCount: number;
    isFavorite: boolean;
    description: string;
    versions: SnippetVersion[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onCopy: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const SnippetDetailModal = ({
  snippet,
  isOpen,
  onClose,
  onCopy,
  onEdit,
  onDelete
}: SnippetDetailModalProps) => {
  const [activeTab, setActiveTab] = useState<'code' | 'versions' | 'analytics'>('code');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, isHydrated]);

  if (!isOpen || !snippet) return null;

  return (
    <div className="fixed inset-0 z-[1020] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex-1 min-w-0">
            <h2 className="font-heading font-bold text-xl text-foreground truncate mb-1">
              {snippet.title}
            </h2>
            <p className="font-caption text-sm text-muted-foreground">
              {snippet.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 rounded-md hover:bg-muted transition-smooth focus-ring"
            aria-label="Close modal"
          >
            <Icon name="XMarkIcon" size={24} className="text-foreground" />
          </button>
        </div>

        <div className="flex items-center gap-2 px-6 py-3 border-b border-border overflow-x-auto scrollbar-custom">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-md font-body font-medium text-sm transition-smooth focus-ring ${
              activeTab === 'code' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setActiveTab('versions')}
            className={`px-4 py-2 rounded-md font-body font-medium text-sm transition-smooth focus-ring ${
              activeTab === 'versions' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Version History
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-md font-body font-medium text-sm transition-smooth focus-ring ${
              activeTab === 'analytics' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Analytics
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-custom p-6">
          {activeTab === 'code' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded">
                    {snippet.language}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {snippet.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => onCopy(snippet.id)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-foreground hover:bg-border transition-smooth focus-ring"
                >
                  <Icon name="ClipboardDocumentIcon" size={18} />
                  <span className="font-body text-sm">Copy</span>
                </button>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <pre className="font-mono text-sm text-foreground overflow-x-auto scrollbar-custom">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'versions' && (
            <div className="space-y-3">
              {snippet.versions.map((version) => (
                <div
                  key={version.id}
                  className="bg-muted rounded-lg p-4 border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body font-medium text-sm text-foreground">
                      Version {version.id}
                    </span>
                    <span className="font-caption text-xs text-muted-foreground">
                      {version.timestamp}
                    </span>
                  </div>
                  <p className="font-caption text-sm text-muted-foreground">
                    {version.changes}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="EyeIcon" size={20} className="text-primary" />
                    <span className="font-body font-medium text-sm text-foreground">
                      Total Views
                    </span>
                  </div>
                  <p className="font-heading font-bold text-2xl text-foreground">
                    {snippet.usageCount}
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="ClockIcon" size={20} className="text-success" />
                    <span className="font-body font-medium text-sm text-foreground">
                      Created
                    </span>
                  </div>
                  <p className="font-body text-sm text-foreground">{snippet.createdAt}</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="ArrowPathIcon" size={20} className="text-warning" />
                    <span className="font-body font-medium text-sm text-foreground">
                      Last Updated
                    </span>
                  </div>
                  <p className="font-body text-sm text-foreground">{snippet.updatedAt}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <button
            onClick={() => onDelete(snippet.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-error text-error-foreground hover:opacity-90 transition-smooth focus-ring"
          >
            <Icon name="TrashIcon" size={18} />
            <span className="font-body text-sm">Delete</span>
          </button>
          <button
            onClick={() => onEdit(snippet.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-smooth focus-ring"
          >
            <Icon name="PencilIcon" size={18} />
            <span className="font-body text-sm">Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetailModal;