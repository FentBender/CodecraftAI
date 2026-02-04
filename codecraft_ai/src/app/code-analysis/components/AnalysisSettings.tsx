'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface AnalysisSettingsProps {
  onSettingsChange: (settings: AnalysisConfig) => void;
}

export interface AnalysisConfig {
  depth: 'basic' | 'detailed' | 'comprehensive';
  focusAreas: string[];
  outputFormat: 'markdown' | 'html' | 'json';
}

const AnalysisSettings = ({ onSettingsChange }: AnalysisSettingsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [depth, setDepth] = useState<'basic' | 'detailed' | 'comprehensive'>('detailed');
  const [focusAreas, setFocusAreas] = useState<string[]>(['functionality']);
  const [outputFormat, setOutputFormat] = useState<'markdown' | 'html' | 'json'>('markdown');

  const availableFocusAreas = [
    { value: 'functionality', label: 'Functionality', icon: 'CogIcon' },
    { value: 'performance', label: 'Performance', icon: 'BoltIcon' },
    { value: 'security', label: 'Security', icon: 'ShieldCheckIcon' },
    { value: 'maintainability', label: 'Maintainability', icon: 'WrenchScrewdriverIcon' },
    { value: 'documentation', label: 'Documentation', icon: 'DocumentTextIcon' }
  ];

  const handleDepthChange = (newDepth: 'basic' | 'detailed' | 'comprehensive') => {
    setDepth(newDepth);
    onSettingsChange({ depth: newDepth, focusAreas, outputFormat });
  };

  const handleFocusAreaToggle = (area: string) => {
    const newFocusAreas = focusAreas.includes(area)
      ? focusAreas.filter(a => a !== area)
      : [...focusAreas, area];
    setFocusAreas(newFocusAreas);
    onSettingsChange({ depth, focusAreas: newFocusAreas, outputFormat });
  };

  const handleOutputFormatChange = (format: 'markdown' | 'html' | 'json') => {
    setOutputFormat(format);
    onSettingsChange({ depth, focusAreas, outputFormat: format });
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-muted hover:bg-border transition-smooth focus-ring"
      >
        <div className="flex items-center gap-2">
          <Icon name="AdjustmentsHorizontalIcon" size={20} className="text-primary" />
          <span className="font-heading font-semibold text-base text-foreground">Analysis Settings</span>
        </div>
        <Icon
          name="ChevronDownIcon"
          size={20}
          className={`text-muted-foreground transition-smooth ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="p-4 space-y-6">
          <div>
            <label className="block font-body font-medium text-sm text-foreground mb-3">Analysis Depth</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(['basic', 'detailed', 'comprehensive'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => handleDepthChange(level)}
                  className={`px-4 py-2 rounded-md font-body text-sm transition-smooth focus-ring ${
                    depth === level
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-border hover:text-foreground'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-body font-medium text-sm text-foreground mb-3">Focus Areas</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableFocusAreas.map((area) => (
                <button
                  key={area.value}
                  onClick={() => handleFocusAreaToggle(area.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md font-body text-sm transition-smooth focus-ring ${
                    focusAreas.includes(area.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-border hover:text-foreground'
                  }`}
                >
                  <Icon name={area.icon as any} size={18} />
                  <span>{area.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-body font-medium text-sm text-foreground mb-3">Output Format</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(['markdown', 'html', 'json'] as const).map((format) => (
                <button
                  key={format}
                  onClick={() => handleOutputFormatChange(format)}
                  className={`px-4 py-2 rounded-md font-body text-sm transition-smooth focus-ring ${
                    outputFormat === format
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-border hover:text-foreground'
                  }`}
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisSettings;