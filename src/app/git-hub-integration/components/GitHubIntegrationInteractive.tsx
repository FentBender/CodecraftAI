'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  updated: string;
}

const MOCK_REPOS: Repository[] = [
  { id: '1', name: 'awesome-project', description: 'A cool web application', language: 'TypeScript', stars: 42, updated: '2024-01-15' },
  { id: '2', name: 'python-scripts', description: 'Useful Python automation scripts', language: 'Python', stars: 18, updated: '2024-01-10' },
  { id: '3', name: 'react-components', description: 'Reusable React components library', language: 'JavaScript', stars: 67, updated: '2024-01-20' },
];

const GitHubIntegrationInteractive = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const connectGitHub = () => {
    // Simulate GitHub connection
    setTimeout(() => {
      setIsConnected(true);
      setRepositories(MOCK_REPOS);
    }, 1000);
  };

  const disconnectGitHub = () => {
    setIsConnected(false);
    setRepositories([]);
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isConnected ? 'bg-green-500/10' : 'bg-muted'
            }`}>
              <Icon name="CloudIcon" size={24} className={isConnected ? 'text-green-500' : 'text-muted-foreground'} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">
                {isConnected ? 'Connected to GitHub' : 'Not Connected'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isConnected ? 'Your GitHub account is linked' : 'Connect your GitHub account to access repositories'}
              </p>
            </div>
          </div>
          <button
            onClick={isConnected ? disconnectGitHub : connectGitHub}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              isConnected
                ? 'bg-red-500 text-white hover:bg-red-600' :'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            {isConnected ? 'Disconnect' : 'Connect GitHub'}
          </button>
        </div>
      </div>

      {/* Repositories */}
      {isConnected && repositories.length > 0 && (
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-xl font-bold text-foreground mb-4">Your Repositories</h3>
          <div className="space-y-4">
            {repositories.map((repo) => (
              <div key={repo.id} className="p-4 bg-background rounded-md border border-border hover:border-primary transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-1">{repo.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{repo.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="CodeBracketIcon" size={16} />
                        {repo.language}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="StarIcon" size={16} />
                        {repo.stars}
                      </span>
                      <span>Updated {new Date(repo.updated).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Card */}
      {!isConnected && (
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-bold text-foreground mb-3">Why Connect GitHub?</h3>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <Icon name="CheckCircleIcon" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
              <span>Access your repositories directly from CodeCraft AI</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="CheckCircleIcon" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
              <span>Export generated code to GitHub</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="CheckCircleIcon" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
              <span>Sync code snippets with your repositories</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GitHubIntegrationInteractive;