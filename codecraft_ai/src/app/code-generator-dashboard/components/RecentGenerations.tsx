'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Generation {
  id: string;
  prompt: string;
  language: string;
  timestamp: string;
  linesOfCode: number;
}

interface RecentGenerationsProps {
  onLoadGeneration: (generation: Generation) => void;
}

const RecentGenerations = ({ onLoadGeneration }: RecentGenerationsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [generations, setGenerations] = useState<Generation[]>([]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      const mockGenerations: Generation[] = [
        {
          id: '1',
          prompt: 'Create a function to validate email addresses',
          language: 'javascript',
          timestamp: '2026-02-02T05:45:00',
          linesOfCode: 15
        },
        {
          id: '2',
          prompt: 'Build a REST API endpoint for user authentication',
          language: 'typescript',
          timestamp: '2026-02-02T04:30:00',
          linesOfCode: 42
        },
        {
          id: '3',
          prompt: 'Generate a binary search tree implementation',
          language: 'python',
          timestamp: '2026-02-02T03:15:00',
          linesOfCode: 68
        },
        {
          id: '4',
          prompt: 'Write a function to sort an array using quicksort',
          language: 'java',
          timestamp: '2026-02-02T02:00:00',
          linesOfCode: 35
        }
      ];
      setGenerations(mockGenerations);
    }
  }, [isHydrated]);

  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      javascript: 'bg-yellow-500/20 text-yellow-500',
      typescript: 'bg-blue-500/20 text-blue-500',
      python: 'bg-green-500/20 text-green-500',
      java: 'bg-red-500/20 text-red-500',
      csharp: 'bg-purple-500/20 text-purple-500',
      go: 'bg-cyan-500/20 text-cyan-500',
      rust: 'bg-orange-500/20 text-orange-500',
      php: 'bg-indigo-500/20 text-indigo-500',
      ruby: 'bg-pink-500/20 text-pink-500',
      swift: 'bg-orange-500/20 text-orange-500'
    };
    return colors[language] || 'bg-muted text-muted-foreground';
  };

  const formatTimestamp = (timestamp: string): string => {
    if (!isHydrated) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
          Recent Generations
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-muted rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Recent Generations
        </h3>
        <Icon name="ClockIcon" size={20} className="text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {generations.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="DocumentTextIcon" size={48} className="text-muted-foreground mx-auto mb-2" />
            <p className="font-body text-sm text-muted-foreground">No recent generations</p>
          </div>
        ) : (
          generations.map((gen) => (
            <button
              key={gen.id}
              onClick={() => onLoadGeneration(gen)}
              className="w-full p-3 bg-muted rounded-md hover:bg-border transition-smooth text-left focus-ring group"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-body text-sm text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
                  {gen.prompt}
                </p>
                <Icon name="ArrowRightIcon" size={16} className="text-muted-foreground group-hover:text-primary transition-smooth flex-shrink-0 mt-0.5" />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-0.5 rounded text-xs font-caption ${getLanguageColor(gen.language)}`}>
                  {gen.language}
                </span>
                <span className="font-caption text-xs text-muted-foreground">
                  {gen.linesOfCode} lines
                </span>
                <span className="font-caption text-xs text-muted-foreground">
                  {formatTimestamp(gen.timestamp)}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentGenerations;