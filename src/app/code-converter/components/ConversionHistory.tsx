'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ConversionRecord {
  id: string;
  sourceLanguage: string;
  targetLanguage: string;
  timestamp: string;
  preview: string;
}

const ConversionHistory = () => {
  const mockHistory: ConversionRecord[] = [
    {
      id: '1',
      sourceLanguage: 'JavaScript',
      targetLanguage: 'Python',
      timestamp: '2 minutes ago',
      preview: 'Email validation function'
    },
    {
      id: '2',
      sourceLanguage: 'Lua',
      targetLanguage: 'C#',
      timestamp: '15 minutes ago',
      preview: 'Inventory system'
    },
    {
      id: '3',
      sourceLanguage: 'GDScript',
      targetLanguage: 'Lua',
      timestamp: '1 hour ago',
      preview: 'Enemy AI controller'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Recent Conversions
        </h3>
        <Icon name="ClockIcon" size={20} className="text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {mockHistory.map((record) => (
          <div
            key={record.id}
            className="p-4 bg-muted rounded-lg hover:bg-border transition-smooth cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-body text-sm font-medium text-foreground">
                  {record.sourceLanguage}
                </span>
                <Icon name="ArrowRightIcon" size={16} className="text-muted-foreground" />
                <span className="font-body text-sm font-medium text-foreground">
                  {record.targetLanguage}
                </span>
              </div>
              <span className="font-caption text-xs text-muted-foreground">
                {record.timestamp}
              </span>
            </div>
            <p className="font-caption text-sm text-muted-foreground group-hover:text-foreground transition-smooth">
              {record.preview}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversionHistory;
