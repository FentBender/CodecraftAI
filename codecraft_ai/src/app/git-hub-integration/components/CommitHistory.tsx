'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Commit {
  id: string;
  message: string;
  author: string;
  timestamp: string;
  sha: string;
}

interface CommitHistoryProps {
  commits: Commit[];
  onViewCommit: (sha: string) => void;
}

const CommitHistory = ({ commits, onViewCommit }: CommitHistoryProps) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="bg-muted px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="ClockIcon" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-base text-foreground">Commit History</h3>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto scrollbar-custom">
        {commits.length > 0 ? (
          <div className="divide-y divide-border">
            {commits.map((commit) => (
              <div
                key={commit.id}
                className="p-4 hover:bg-muted transition-smooth cursor-pointer"
                onClick={() => onViewCommit(commit.sha)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="CodeBracketIcon" size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-sm text-foreground mb-1 line-clamp-2">
                      {commit.message}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="UserIcon" size={14} />
                        {commit.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="ClockIcon" size={14} />
                        {commit.timestamp}
                      </span>
                    </div>
                    <div className="mt-2">
                      <code className="px-2 py-1 rounded bg-muted text-xs font-mono text-muted-foreground">
                        {commit.sha.substring(0, 7)}
                      </code>
                    </div>
                  </div>
                  <Icon name="ChevronRightIcon" size={20} className="text-muted-foreground flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <Icon name="ClockIcon" size={48} className="text-muted-foreground mb-3" />
            <p className="font-body text-sm text-muted-foreground text-center">
              No commit history available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommitHistory;