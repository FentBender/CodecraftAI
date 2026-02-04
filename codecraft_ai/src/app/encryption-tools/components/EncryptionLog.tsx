'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface LogEntry {
  id: string;
  timestamp: string;
  action: 'encrypt' | 'decrypt';
  algorithm: string;
  status: 'success' | 'error';
  dataSize: string;
}

interface EncryptionLogProps {
  logs: LogEntry[];
  onClearLogs: () => void;
}

const EncryptionLog = ({ logs, onClearLogs }: EncryptionLogProps) => {
  const getActionIcon = (action: string) => {
    return action === 'encrypt' ? 'LockClosedIcon' : 'LockOpenIcon';
  };

  const getStatusColor = (status: string) => {
    return status === 'success' ? 'text-success' : 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
          <Icon name="ClipboardDocumentListIcon" size={20} className="text-primary" />
          Encryption Log
        </h3>
        {logs.length > 0 && (
          <button
            onClick={onClearLogs}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-smooth focus-ring"
          >
            <Icon name="TrashIcon" size={16} />
            <span className="font-caption text-xs">Clear</span>
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-custom">
        {logs.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="ClipboardDocumentListIcon" size={48} className="text-muted-foreground mx-auto opacity-50 mb-3" />
            <p className="font-body text-sm text-muted-foreground">
              No encryption activities yet
            </p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 p-3 rounded-md bg-background border border-border hover:border-muted transition-smooth"
            >
              <div className={`
                w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0
              `}>
                <Icon name={getActionIcon(log.action) as any} size={16} className="text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-body font-medium text-sm text-foreground capitalize">
                    {log.action}
                  </span>
                  <span className="font-caption text-xs text-muted-foreground">
                    {log.algorithm}
                  </span>
                  <Icon 
                    name={log.status === 'success' ? 'CheckCircleIcon' : 'XCircleIcon'} 
                    size={16} 
                    className={getStatusColor(log.status)}
                  />
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-caption">{log.timestamp}</span>
                  <span className="font-caption">{log.dataSize}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EncryptionLog;