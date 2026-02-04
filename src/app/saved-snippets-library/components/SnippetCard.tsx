'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SnippetCardProps {
  snippet: {
    id: string;
    title: string;
    language: string;
    code: string;
    tags: string[];
    createdAt: string;
    usageCount: number;
    isFavorite: boolean;
    description: string;
  };
  onCopy: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onView: (id: string) => void;
}

const SnippetCard = ({
  snippet,
  onCopy,
  onEdit,
  onDelete,
  onToggleFavorite,
  onView
}: SnippetCardProps) => {
  const [showActions, setShowActions] = useState(false);

  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      javascript: 'bg-yellow-500',
      typescript: 'bg-blue-500',
      python: 'bg-green-500',
      java: 'bg-red-500',
      cpp: 'bg-purple-500',
      csharp: 'bg-indigo-500',
      go: 'bg-cyan-500',
      rust: 'bg-orange-500',
      php: 'bg-violet-500',
      ruby: 'bg-pink-500'
    };
    return colors[language.toLowerCase()] || 'bg-gray-500';
  };

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-smooth hover-lift relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-base text-foreground truncate mb-1">
            {snippet.title}
          </h3>
          <p className="font-caption text-xs text-muted-foreground line-clamp-2">
            {snippet.description}
          </p>
        </div>
        <button
          onClick={() => onToggleFavorite(snippet.id)}
          className="ml-2 p-1 rounded hover:bg-muted transition-smooth focus-ring"
          aria-label={snippet.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Icon
            name="StarIcon"
            size={20}
            variant={snippet.isFavorite ? 'solid' : 'outline'}
            className={snippet.isFavorite ? 'text-warning' : 'text-muted-foreground'}
          />
        </button>
      </div>

      <div className="bg-muted rounded-md p-3 mb-3 overflow-hidden">
        <pre className="font-mono text-xs text-foreground line-clamp-4 overflow-x-auto scrollbar-custom">
          <code>{snippet.code}</code>
        </pre>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`${getLanguageColor(snippet.language)} text-white text-xs font-medium px-2 py-1 rounded`}>
            {snippet.language}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Icon name="EyeIcon" size={14} />
            <span className="font-caption text-xs">{snippet.usageCount}</span>
          </div>
        </div>
        <span className="font-caption text-xs text-muted-foreground">
          {snippet.createdAt}
        </span>
      </div>

      {snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {snippet.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
          {snippet.tags.length > 3 && (
            <span className="text-muted-foreground text-xs">
              +{snippet.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {showActions && (
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-card border border-border rounded-md shadow-lg p-1">
          <button
            onClick={() => onView(snippet.id)}
            className="p-1.5 rounded hover:bg-muted transition-smooth focus-ring"
            title="View details"
          >
            <Icon name="EyeIcon" size={16} className="text-foreground" />
          </button>
          <button
            onClick={() => onCopy(snippet.id)}
            className="p-1.5 rounded hover:bg-muted transition-smooth focus-ring"
            title="Copy code"
          >
            <Icon name="ClipboardDocumentIcon" size={16} className="text-foreground" />
          </button>
          <button
            onClick={() => onEdit(snippet.id)}
            className="p-1.5 rounded hover:bg-muted transition-smooth focus-ring"
            title="Edit snippet"
          >
            <Icon name="PencilIcon" size={16} className="text-foreground" />
          </button>
          <button
            onClick={() => onDelete(snippet.id)}
            className="p-1.5 rounded hover:bg-muted transition-smooth focus-ring"
            title="Delete snippet"
          >
            <Icon name="TrashIcon" size={16} className="text-error" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SnippetCard;