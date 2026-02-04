'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface AdditionalToolsProps {
  onToolSelect: (tool: string) => void;
}

const AdditionalTools = ({ onToolSelect }: AdditionalToolsProps) => {
  const [selectedTool, setSelectedTool] = useState<string>('');

  const tools = [
    {
      id: 'hash',
      name: 'Hash Generator',
      description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes',
      icon: 'HashtagIcon',
      color: 'text-blue-500'
    },
    {
      id: 'signature',
      name: 'Digital Signature',
      description: 'Create and verify digital signatures',
      icon: 'PencilSquareIcon',
      color: 'text-purple-500'
    },
    {
      id: 'key-exchange',
      name: 'Key Exchange',
      description: 'Secure Diffie-Hellman key exchange',
      icon: 'ArrowsRightLeftIcon',
      color: 'text-green-500'
    },
    {
      id: 'base64',
      name: 'Base64 Encode/Decode',
      description: 'Convert data to and from Base64',
      icon: 'CodeBracketIcon',
      color: 'text-orange-500'
    }
  ];

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);
    onToolSelect(toolId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
        <Icon name="WrenchScrewdriverIcon" size={20} className="text-primary" />
        Additional Tools
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleToolClick(tool.id)}
            className={`
              p-4 rounded-lg border transition-smooth hover-lift active-press focus-ring text-left
              ${selectedTool === tool.id
                ? 'border-primary bg-primary/10' :'border-border bg-background hover:border-muted'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div className={`
                w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0
              `}>
                <Icon name={tool.icon as any} size={20} className={tool.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-semibold text-sm text-foreground mb-1">
                  {tool.name}
                </h4>
                <p className="font-caption text-xs text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdditionalTools;