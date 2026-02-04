'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { getLanguageDocumentation } from '@/lib/utils/languageUtils';

interface LanguageInfoPanelProps {
  language: string;
}

const LanguageInfoPanel = ({ language }: LanguageInfoPanelProps) => {
  const docs = getLanguageDocumentation(language);

  if (!docs) return null;

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-start gap-3 mb-3">
        <Icon name="InformationCircleIcon" size={24} className="text-primary flex-shrink-0" />
        <div>
          <h3 className="font-heading text-sm font-semibold text-foreground mb-1">{docs.name}</h3>
          <p className="font-body text-sm text-muted-foreground">{docs.description}</p>
        </div>
      </div>
      
      {docs.links.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="font-body text-xs font-medium text-muted-foreground mb-2">Documentation</h4>
          <div className="space-y-2">
            {docs.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Icon name="BookOpenIcon" size={16} />
                <span>{link.title}</span>
                <Icon name="ArrowTopRightOnSquareIcon" size={14} className="ml-auto" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageInfoPanel;