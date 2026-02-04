'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ConnectionStatusProps {
  isConnected: boolean;
  username: string;
  apiRateLimit: {
    remaining: number;
    total: number;
    resetTime: string;
  };
  lastSyncTime: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

const ConnectionStatus = ({
  isConnected,
  username,
  apiRateLimit,
  lastSyncTime,
  onConnect,
  onDisconnect
}: ConnectionStatusProps) => {
  const ratePercentage = (apiRateLimit.remaining / apiRateLimit.total) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isConnected ? 'bg-success' : 'bg-error'}`}>
            <Icon name="CloudIcon" size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg text-foreground">
              GitHub Connection
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              {isConnected ? `Connected as ${username}` : 'Not connected'}
            </p>
          </div>
        </div>
        {isConnected ? (
          <button
            onClick={onDisconnect}
            className="px-4 py-2 rounded-md bg-error text-error-foreground font-medium text-sm hover:opacity-90 transition-smooth active-press focus-ring"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={onConnect}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-smooth active-press focus-ring flex items-center gap-2"
          >
            <Icon name="LinkIcon" size={18} />
            Connect GitHub
          </button>
        )}
      </div>

      {isConnected && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="BoltIcon" size={18} className="text-primary" />
                <span className="font-body font-medium text-sm text-foreground">API Rate Limit</span>
              </div>
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-caption text-xs text-muted-foreground">
                    {apiRateLimit.remaining} / {apiRateLimit.total} remaining
                  </span>
                  <span className="font-caption text-xs text-muted-foreground">
                    {ratePercentage.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      ratePercentage > 50 ? 'bg-success' : ratePercentage > 20 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${ratePercentage}%` }}
                  />
                </div>
              </div>
              <p className="font-caption text-xs text-muted-foreground">
                Resets at {apiRateLimit.resetTime}
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="ClockIcon" size={18} className="text-accent" />
                <span className="font-body font-medium text-sm text-foreground">Last Sync</span>
              </div>
              <p className="font-body text-base text-foreground mb-1">{lastSyncTime}</p>
              <p className="font-caption text-xs text-muted-foreground">
                All repositories synchronized
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0" />
            <p className="font-body text-sm text-foreground">
              Your GitHub connection is secure and encrypted. We only access repositories you explicitly authorize.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;