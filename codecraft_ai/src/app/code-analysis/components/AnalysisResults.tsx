'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface AnalysisResultsProps {
  results: AnalysisResult | null;
  isAnalyzing: boolean;
}

export interface AnalysisResult {
  overview: string;
  functions: FunctionAnalysis[];
  dependencies: string[];
  improvements: Improvement[];
  complexity: {
    cyclomatic: number;
    cognitive: number;
  };
  metrics: {
    linesOfCode: number;
    commentLines: number;
    functions: number;
  };
}

interface FunctionAnalysis {
  name: string;
  purpose: string;
  parameters: string[];
  returnType: string;
  complexity: number;
}

interface Improvement {
  type: 'performance' | 'security' | 'maintainability' | 'documentation';
  severity: 'low' | 'medium' | 'high';
  description: string;
  suggestion: string;
}

const AnalysisResults = ({ results, isAnalyzing }: AnalysisResultsProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'functions' | 'improvements' | 'metrics'>('overview');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance':
        return 'BoltIcon';
      case 'security':
        return 'ShieldCheckIcon';
      case 'maintainability':
        return 'WrenchScrewdriverIcon';
      case 'documentation':
        return 'DocumentTextIcon';
      default:
        return 'InformationCircleIcon';
    }
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-card rounded-lg border border-border p-8">
        <Icon name="ArrowPathIcon" size={48} className="text-primary animate-spin mb-4" />
        <p className="font-body text-lg text-foreground mb-2">Analyzing your code...</p>
        <p className="font-caption text-sm text-muted-foreground">This may take a few moments</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-card rounded-lg border border-border p-8">
        <Icon name="DocumentMagnifyingGlassIcon" size={48} className="text-muted-foreground mb-4" />
        <p className="font-body text-lg text-foreground mb-2">No analysis results yet</p>
        <p className="font-caption text-sm text-muted-foreground">Enter code and click "Analyze Code" to begin</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted">
        <div className="flex items-center gap-3">
          <Icon name="ChartBarIcon" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-base text-foreground">Analysis Results</h3>
        </div>
      </div>

      <div className="flex border-b border-border overflow-x-auto scrollbar-custom">
        {(['overview', 'functions', 'improvements', 'metrics'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-4 py-3 font-body text-sm font-medium transition-smooth focus-ring ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-custom p-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-heading font-semibold text-base text-foreground mb-3">Code Overview</h4>
              <p className="font-body text-sm text-foreground leading-relaxed whitespace-pre-wrap">{results.overview}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="ChartBarIcon" size={18} className="text-primary" />
                  <h5 className="font-body font-semibold text-sm text-foreground">Cyclomatic Complexity</h5>
                </div>
                <p className="font-heading text-2xl text-foreground">{results.complexity.cyclomatic}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="CpuChipIcon" size={18} className="text-primary" />
                  <h5 className="font-body font-semibold text-sm text-foreground">Cognitive Complexity</h5>
                </div>
                <p className="font-heading text-2xl text-foreground">{results.complexity.cognitive}</p>
              </div>
            </div>

            {results.dependencies.length > 0 && (
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-heading font-semibold text-base text-foreground mb-3">Dependencies</h4>
                <div className="flex flex-wrap gap-2">
                  {results.dependencies.map((dep, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-background rounded-md font-mono text-xs text-foreground border border-border"
                    >
                      {dep}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'functions' && (
          <div className="space-y-4">
            {results.functions.map((func, index) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-mono font-semibold text-base text-foreground">{func.name}</h4>
                    <p className="font-body text-sm text-muted-foreground mt-1">{func.purpose}</p>
                  </div>
                  <span className="px-2 py-1 bg-background rounded text-xs font-caption text-foreground">
                    Complexity: {func.complexity}
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-body text-xs text-muted-foreground">Parameters:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {func.parameters.map((param, idx) => (
                        <span key={idx} className="px-2 py-1 bg-background rounded text-xs font-mono text-foreground">
                          {param}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-body text-xs text-muted-foreground">Returns:</span>
                    <span className="ml-2 px-2 py-1 bg-background rounded text-xs font-mono text-foreground">
                      {func.returnType}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'improvements' && (
          <div className="space-y-4">
            {results.improvements.map((improvement, index) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Icon name={getTypeIcon(improvement.type) as any} size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-body font-semibold text-sm text-foreground">
                        {improvement.type.charAt(0).toUpperCase() + improvement.type.slice(1)}
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-xs font-caption ${getSeverityColor(improvement.severity)}`}>
                        {improvement.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="font-body text-sm text-foreground mb-2">{improvement.description}</p>
                    <div className="bg-background rounded-lg p-3 border-l-4 border-primary">
                      <p className="font-body text-sm text-foreground">{improvement.suggestion}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="DocumentTextIcon" size={18} className="text-primary" />
                <h5 className="font-body font-semibold text-sm text-foreground">Lines of Code</h5>
              </div>
              <p className="font-heading text-3xl text-foreground">{results.metrics.linesOfCode}</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="ChatBubbleLeftIcon" size={18} className="text-primary" />
                <h5 className="font-body font-semibold text-sm text-foreground">Comment Lines</h5>
              </div>
              <p className="font-heading text-3xl text-foreground">{results.metrics.commentLines}</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="CodeBracketIcon" size={18} className="text-primary" />
                <h5 className="font-body font-semibold text-sm text-foreground">Functions</h5>
              </div>
              <p className="font-heading text-3xl text-foreground">{results.metrics.functions}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;