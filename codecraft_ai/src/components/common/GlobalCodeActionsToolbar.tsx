'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface GlobalCodeActionsToolbarProps {
  className?: string;
  codeContent?: string;
  fileName?: string;
  onCopy?: () => void;
  onExport?: (format: 'txt' | 'json' | 'md') => void;
  onSave?: () => void;
  onShare?: () => void;
  isVisible?: boolean;
}

const GlobalCodeActionsToolbar = ({
  className = '',
  codeContent = '',
  fileName = 'code',
  onCopy,
  onExport,
  onSave,
  onShare,
  isVisible = true
}: GlobalCodeActionsToolbarProps) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopySuccess(true);
      onCopy?.();
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleExport = (format: 'txt' | 'json' | 'md') => {
    setShowExportMenu(false);
    onExport?.(format);
    
    const blob = new Blob([codeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    onSave?.();
  };

  const handleShare = () => {
    onShare?.();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Toolbar */}
      <div className={`hidden md:flex items-center gap-2 bg-card border border-border rounded-lg p-2 shadow-md ${className}`}>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-smooth hover-lift active-press focus-ring"
          title="Copy to clipboard"
        >
          <Icon name={copySuccess ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={18} />
          <span className="font-body text-sm">{copySuccess ? 'Copied!' : 'Copy'}</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-smooth hover-lift active-press focus-ring"
            title="Export code"
          >
            <Icon name="ArrowDownTrayIcon" size={18} />
            <span className="font-body text-sm">Export</span>
            <Icon name="ChevronDownIcon" size={14} />
          </button>

          {showExportMenu && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-popover rounded-lg shadow-lg border border-border overflow-hidden z-[1010]">
              <button
                onClick={() => handleExport('txt')}
                className="w-full px-4 py-2 text-left text-popover-foreground hover:bg-muted transition-smooth focus-ring flex items-center gap-2"
              >
                <Icon name="DocumentTextIcon" size={16} />
                <span className="font-body text-sm">Text (.txt)</span>
              </button>
              <button
                onClick={() => handleExport('json')}
                className="w-full px-4 py-2 text-left text-popover-foreground hover:bg-muted transition-smooth focus-ring flex items-center gap-2"
              >
                <Icon name="CodeBracketIcon" size={16} />
                <span className="font-body text-sm">JSON (.json)</span>
              </button>
              <button
                onClick={() => handleExport('md')}
                className="w-full px-4 py-2 text-left text-popover-foreground hover:bg-muted transition-smooth focus-ring flex items-center gap-2"
              >
                <Icon name="DocumentIcon" size={16} />
                <span className="font-body text-sm">Markdown (.md)</span>
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-smooth hover-lift active-press focus-ring"
          title="Save to library"
        >
          <Icon name="BookmarkIcon" size={18} />
          <span className="font-body text-sm">Save</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-smooth hover-lift active-press focus-ring"
          title="Share code"
        >
          <Icon name="ShareIcon" size={18} />
          <span className="font-body text-sm">Share</span>
        </button>
      </div>

      {/* Mobile Bottom Sheet */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-xl z-[1010] ${className}`}>
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={handleCopy}
            className="flex flex-col items-center gap-1 px-2 py-3 rounded-md bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-smooth active-press focus-ring"
          >
            <Icon name={copySuccess ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={22} />
            <span className="font-caption text-xs">{copySuccess ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex flex-col items-center gap-1 px-2 py-3 rounded-md bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-smooth active-press focus-ring"
          >
            <Icon name="ArrowDownTrayIcon" size={22} />
            <span className="font-caption text-xs">Export</span>
          </button>

          <button
            onClick={handleSave}
            className="flex flex-col items-center gap-1 px-2 py-3 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-smooth active-press focus-ring"
          >
            <Icon name="BookmarkIcon" size={22} />
            <span className="font-caption text-xs">Save</span>
          </button>

          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 px-2 py-3 rounded-md bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-smooth active-press focus-ring"
          >
            <Icon name="ShareIcon" size={22} />
            <span className="font-caption text-xs">Share</span>
          </button>
        </div>

        {showExportMenu && (
          <div className="mt-3 bg-popover rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => handleExport('txt')}
              className="w-full px-4 py-3 text-left text-popover-foreground hover:bg-muted transition-smooth focus-ring flex items-center gap-3"
            >
              <Icon name="DocumentTextIcon" size={20} />
              <span className="font-body text-base">Export as Text (.txt)</span>
            </button>
            <button
              onClick={() => handleExport('json')}
              className="w-full px-4 py-3 text-left text-popover-foreground hover:bg-muted transition-smooth focus-ring flex items-center gap-3"
            >
              <Icon name="CodeBracketIcon" size={20} />
              <span className="font-body text-base">Export as JSON (.json)</span>
            </button>
            <button
              onClick={() => handleExport('md')}
              className="w-full px-4 py-3 text-left text-popover-foreground hover:bg-muted transition-smooth focus-ring flex items-center gap-3"
            >
              <Icon name="DocumentIcon" size={20} />
              <span className="font-body text-base">Export as Markdown (.md)</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default GlobalCodeActionsToolbar;