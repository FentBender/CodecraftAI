'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface BulkActionsBarProps {
  selectedCount: number;
  onExport: () => void;
  onDelete: () => void;
  onClearSelection: () => void;
}

const BulkActionsBar = ({
  selectedCount,
  onExport,
  onDelete,
  onClearSelection
}: BulkActionsBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1010] bg-card border border-border rounded-lg shadow-xl p-4 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Icon name="CheckCircleIcon" size={20} className="text-primary" />
        <span className="font-body font-medium text-sm text-foreground">
          {selectedCount} snippet{selectedCount > 1 ? 's' : ''} selected
        </span>
      </div>

      <div className="h-6 w-px bg-border" />

      <div className="flex items-center gap-2">
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-smooth focus-ring"
        >
          <Icon name="ArrowDownTrayIcon" size={18} />
          <span className="font-body text-sm">Export</span>
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-error text-error-foreground hover:opacity-90 transition-smooth focus-ring"
        >
          <Icon name="TrashIcon" size={18} />
          <span className="font-body text-sm">Delete</span>
        </button>
        <button
          onClick={onClearSelection}
          className="p-2 rounded-md hover:bg-muted transition-smooth focus-ring"
          aria-label="Clear selection"
        >
          <Icon name="XMarkIcon" size={20} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default BulkActionsBar;