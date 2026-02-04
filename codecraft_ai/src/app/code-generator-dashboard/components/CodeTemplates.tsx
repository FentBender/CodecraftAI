'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Template {
  id: string;
  title: string;
  description: string;
  language: string;
  icon: string;
  category: string;
}

interface CodeTemplatesProps {
  onSelectTemplate: (template: Template) => void;
}

const CodeTemplates = ({ onSelectTemplate }: CodeTemplatesProps) => {
  const templates: Template[] = [
    {
      id: '1',
      title: 'REST API Endpoint',
      description: 'Basic CRUD operations with Express.js',
      language: 'javascript',
      icon: 'ServerIcon',
      category: 'Backend'
    },
    {
      id: '2',
      title: 'React Component',
      description: 'Functional component with hooks',
      language: 'typescript',
      icon: 'CubeIcon',
      category: 'Frontend'
    },
    {
      id: '3',
      title: 'Data Validation',
      description: 'Input validation with error handling',
      language: 'python',
      icon: 'ShieldCheckIcon',
      category: 'Utility'
    },
    {
      id: '4',
      title: 'Database Query',
      description: 'SQL queries with prepared statements',
      language: 'java',
      icon: 'CircleStackIcon',
      category: 'Database'
    },
    {
      id: '5',
      title: 'Authentication',
      description: 'JWT token generation and validation',
      language: 'typescript',
      icon: 'LockClosedIcon',
      category: 'Security'
    },
    {
      id: '6',
      title: 'File Upload',
      description: 'Handle file uploads with validation',
      language: 'javascript',
      icon: 'ArrowUpTrayIcon',
      category: 'Utility'
    },
    {
      id: '7',
      title: 'Game Inventory',
      description: 'Player inventory system',
      language: 'lua',
      icon: 'CubeIcon',
      category: 'Gaming'
    },
    {
      id: '8',
      title: 'Enemy AI',
      description: 'AI controller for Godot',
      language: 'gdscript',
      icon: 'CpuChipIcon',
      category: 'Gaming'
    },
    {
      id: '9',
      title: 'Player Controller',
      description: 'Unity character movement',
      language: 'csharp',
      icon: 'UserIcon',
      category: 'Gaming'
    },
    {
      id: '10',
      title: 'Water Shader',
      description: 'HLSL water effect',
      language: 'hlsl',
      icon: 'SwatchIcon',
      category: 'Graphics'
    },
    {
      id: '11',
      title: 'Glow Shader',
      description: 'GLSL glow effect',
      language: 'glsl',
      icon: 'SparklesIcon',
      category: 'Graphics'
    },
    {
      id: '12',
      title: 'System Monitor',
      description: 'Linux monitoring script',
      language: 'bash',
      icon: 'CommandLineIcon',
      category: 'Linux'
    },
    {
      id: '13',
      title: 'Memory Safety',
      description: 'Rust ownership example',
      language: 'rust',
      icon: 'ShieldCheckIcon',
      category: 'Systems'
    },
    {
      id: '14',
      title: 'Goroutine Pool',
      description: 'Concurrent worker pool in Go',
      language: 'go',
      icon: 'BoltIcon',
      category: 'Systems'
    },
    {
      id: '15',
      title: 'iOS View Controller',
      description: 'Swift UIKit controller',
      language: 'swift',
      icon: 'DevicePhoneMobileIcon',
      category: 'Mobile'
    },
    {
      id: '16',
      title: 'Android Activity',
      description: 'Kotlin Android activity',
      language: 'kotlin',
      icon: 'DevicePhoneMobileIcon',
      category: 'Mobile'
    },
    {
      id: '17',
      title: 'Flutter Widget',
      description: 'Dart stateful widget',
      language: 'dart',
      icon: 'CubeIcon',
      category: 'Mobile'
    },
    {
      id: '18',
      title: 'Data Analysis',
      description: 'R statistical analysis',
      language: 'r',
      icon: 'ChartBarIcon',
      category: 'Data'
    },
    {
      id: '19',
      title: 'Matrix Operations',
      description: 'MATLAB numerical computing',
      language: 'matlab',
      icon: 'CalculatorIcon',
      category: 'Data'
    },
    {
      id: '20',
      title: 'Scientific Computing',
      description: 'Julia high-performance code',
      language: 'julia',
      icon: 'BeakerIcon',
      category: 'Data'
    },
    {
      id: '21',
      title: 'Functional Pipeline',
      description: 'Haskell pure functions',
      language: 'haskell',
      icon: 'FunnelIcon',
      category: 'Functional'
    },
    {
      id: '22',
      title: 'Type Provider',
      description: 'F# type-safe data access',
      language: 'fsharp',
      icon: 'ShieldCheckIcon',
      category: 'Functional'
    },
    {
      id: '23',
      title: 'Immutable Data',
      description: 'Clojure data structures',
      language: 'clojure',
      icon: 'LockClosedIcon',
      category: 'Functional'
    },
    {
      id: '24',
      title: 'GenServer',
      description: 'Elixir concurrent process',
      language: 'elixir',
      icon: 'BoltIcon',
      category: 'Functional'
    },
    {
      id: '25',
      title: 'Database Migration',
      description: 'PostgreSQL schema migration',
      language: 'postgresql',
      icon: 'CircleStackIcon',
      category: 'Database'
    },
    {
      id: '26',
      title: 'Docker Compose',
      description: 'Multi-container setup',
      language: 'yaml',
      icon: 'CubeTransparentIcon',
      category: 'DevOps'
    },
    {
      id: '27',
      title: 'Container Image',
      description: 'Dockerfile multi-stage build',
      language: 'dockerfile',
      icon: 'ServerIcon',
      category: 'DevOps'
    },
    {
      id: '28',
      title: 'API Documentation',
      description: 'Markdown API reference',
      language: 'markdown',
      icon: 'DocumentTextIcon',
      category: 'Documentation'
    }
  ];

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      Backend: 'bg-blue-500/20 text-blue-500',
      Frontend: 'bg-green-500/20 text-green-500',
      Utility: 'bg-purple-500/20 text-purple-500',
      Database: 'bg-orange-500/20 text-orange-500',
      Security: 'bg-red-500/20 text-red-500',
      Gaming: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      Graphics: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      Linux: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      Systems: 'bg-red-500/10 text-red-400 border-red-500/20',
      Mobile: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      Data: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      Functional: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
      DevOps: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      Documentation: 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Code Templates
        </h3>
        <Icon name="RectangleStackIcon" size={20} className="text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className="p-4 bg-muted rounded-md hover:bg-border transition-smooth text-left focus-ring group"
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/20 rounded-md flex items-center justify-center flex-shrink-0">
                <Icon name={template.icon as any} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-medium text-sm text-foreground mb-1 group-hover:text-primary transition-smooth">
                  {template.title}
                </h4>
                <p className="font-caption text-xs text-muted-foreground line-clamp-2">
                  {template.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-xs font-caption ${getCategoryColor(template.category)}`}>
                {template.category}
              </span>
              <span className="px-2 py-0.5 bg-background rounded text-xs font-caption text-muted-foreground">
                {template.language}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CodeTemplates;