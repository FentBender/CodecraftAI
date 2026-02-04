'use client';

import React, { useState } from 'react';


interface Command {
  id: string;
  name: string;
  description: string;
  syntax: string;
  example: string;
  category: string;
}

interface CommandCardProps {
  command: Command;
}

const CommandCard = ({ command }: CommandCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 bg-muted rounded-lg hover:bg-border transition-smooth group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <code className="font-mono text-base font-semibold text-primary">{command.name}</code>
            <span className="px-2 py-0.5 bg-background rounded text-xs font-caption text-muted-foreground">
              {command.category}
            </span>
          </div>
          <p className="font-body text-sm text-muted-foreground">{command.description}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <p className="font-caption text-xs text-muted-foreground mb-1">Syntax:</p>
          <code className="block p-2 bg-background rounded font-mono text-xs text-foreground">
            {command.syntax}
          </code>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="font-caption text-xs text-muted-foreground">Example:</p>
            <button
              onClick={() => handleCopy(command.example)}
              className="text-xs text-primary hover:text-primary/80 transition-smooth"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <code className="block p-2 bg-background rounded font-mono text-xs text-foreground">
            {command.example}
          </code>
        </div>
      </div>
    </div>
  );
};

export default CommandCard;
