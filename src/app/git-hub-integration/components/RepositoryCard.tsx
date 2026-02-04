'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Repository {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  accessLevel: 'read' | 'write' | 'admin';
  isPrivate: boolean;
  language: string;
  stars: number;
  forks: number;
}

interface RepositoryCardProps {
  repository: Repository;
  onImport: (repoId: string) => void;
  onExport: (repoId: string) => void;
  onViewDetails: (repoId: string) => void;
}

const RepositoryCard = ({ repository, onImport, onExport, onViewDetails }: RepositoryCardProps) => {
  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'admin':
        return 'bg-primary text-primary-foreground';
      case 'write':
        return 'bg-accent text-accent-foreground';
      case 'read':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-smooth hover-lift">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Icon 
              name={repository.isPrivate ? 'LockClosedIcon' : 'GlobeAltIcon'} 
              size={16} 
              className="text-muted-foreground flex-shrink-0" 
            />
            <h3 className="font-heading font-semibold text-base text-foreground truncate">
              {repository.name}
            </h3>
          </div>
          <p className="font-body text-sm text-muted-foreground line-clamp-2">
            {repository.description}
          </p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getAccessLevelColor(repository.accessLevel)} flex-shrink-0`}>
          {repository.accessLevel}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span>{repository.language}</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="StarIcon" size={14} />
          <span>{repository.stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="ArrowPathIcon" size={14} />
          <span>{repository.forks}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="font-caption text-xs text-muted-foreground">
          Updated {repository.lastUpdated}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onImport(repository.id)}
            className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-smooth active-press focus-ring"
            title="Import code from repository"
          >
            Import
          </button>
          <button
            onClick={() => onExport(repository.id)}
            className="px-3 py-1.5 rounded-md bg-muted text-muted-foreground text-xs font-medium hover:bg-border hover:text-foreground transition-smooth active-press focus-ring"
            title="Export code to repository"
          >
            Export
          </button>
          <button
            onClick={() => onViewDetails(repository.id)}
            className="p-1.5 rounded-md bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-smooth active-press focus-ring"
            title="View repository details"
          >
            <Icon name="EyeIcon" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;