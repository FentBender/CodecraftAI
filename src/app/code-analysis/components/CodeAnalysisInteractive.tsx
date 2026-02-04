'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { LANGUAGES } from '@/lib/config/languages';

interface AnalysisResult {
  complexity: number;
  linesOfCode: number;
  functions: number;
  issues: string[];
  suggestions: string[];
}

const CodeAnalysisInteractive = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeCode = () => {
    if (!code.trim()) return;

    setIsAnalyzing(true);
    
    setTimeout(() => {
      const lines = code.split('\n').length;
      const functionMatches = code.match(/function|def|func|fn /g);
      
      setResult({
        complexity: Math.floor(Math.random() * 10) + 1,
        linesOfCode: lines,
        functions: functionMatches?.length || 0,
        issues: [
          'Consider adding error handling',
          'Variable naming could be more descriptive',
          'Missing input validation'
        ],
        suggestions: [
          'Add comments for complex logic',
          'Break down large functions',
          'Use consistent formatting'
        ]
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full md:w-64 px-4 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Code to Analyze</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here for analysis..."
            className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[300px] font-mono text-sm"
          />
        </div>

        <button
          onClick={analyzeCode}
          disabled={isAnalyzing || !code.trim()}
          className="mt-4 w-full py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Icon name="MagnifyingGlassIcon" size={20} />
              Analyze Code
            </>
          )}
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Icon name="ChartBarIcon" size={24} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{result.complexity}</p>
                  <p className="text-sm text-muted-foreground">Complexity Score</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Icon name="DocumentTextIcon" size={24} className="text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{result.linesOfCode}</p>
                  <p className="text-sm text-muted-foreground">Lines of Code</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Icon name="CodeBracketIcon" size={24} className="text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{result.functions}</p>
                  <p className="text-sm text-muted-foreground">Functions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Issues */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Icon name="ExclamationTriangleIcon" size={20} className="text-yellow-500" />
              Issues Found
            </h3>
            <ul className="space-y-2">
              {result.issues.map((issue, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground">
                  <Icon name="XCircleIcon" size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Icon name="LightBulbIcon" size={20} className="text-blue-500" />
              Suggestions
            </h3>
            <ul className="space-y-2">
              {result.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground">
                  <Icon name="CheckCircleIcon" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeAnalysisInteractive;