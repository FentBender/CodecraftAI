'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
}

interface RepositoryBrowserProps {
  repositoryName: string;
  currentBranch: string;
  branches: string[];
  fileTree: FileNode[];
  onBranchChange: (branch: string) => void;
  onFileSelect: (path: string) => void;
  onImportFile: (path: string) => void;
}

const RepositoryBrowser = ({
  repositoryName,
  currentBranch,
  branches,
  fileTree,
  onBranchChange,
  onFileSelect,
  onImportFile
}: RepositoryBrowserProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileClick = (path: string) => {
    setSelectedFile(path);
    onFileSelect(path);
  };

  const renderFileTree = (nodes: FileNode[], depth: number = 0) => {
    return nodes.map((node) => {
      const isExpanded = expandedFolders.has(node.path);
      const isSelected = selectedFile === node.path;

      return (
        <div key={node.path}>
          <div
            className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted transition-smooth ${
              isSelected ? 'bg-primary/10 border-l-2 border-primary' : ''
            }`}
            style={{ paddingLeft: `${depth * 16 + 12}px` }}
            onClick={() => {
              if (node.type === 'folder') {
                toggleFolder(node.path);
              } else {
                handleFileClick(node.path);
              }
            }}
          >
            {node.type === 'folder' && (
              <Icon
                name="ChevronRightIcon"
                size={16}
                className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              />
            )}
            <Icon
              name={node.type === 'folder' ? 'FolderIcon' : 'DocumentTextIcon'}
              size={18}
              className={node.type === 'folder' ? 'text-warning' : 'text-muted-foreground'}
            />
            <span className="font-body text-sm text-foreground flex-1">{node.name}</span>
            {node.type === 'file' && isSelected && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onImportFile(node.path);
                }}
                className="px-2 py-1 rounded bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-smooth"
              >
                Import
              </button>
            )}
          </div>
          {node.type === 'folder' && isExpanded && node.children && (
            <div>{renderFileTree(node.children, depth + 1)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="bg-muted px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Icon name="FolderOpenIcon" size={20} className="text-primary flex-shrink-0" />
            <h3 className="font-heading font-semibold text-base text-foreground truncate">
              {repositoryName}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="CodeBracketIcon" size={18} className="text-muted-foreground" />
            <select
              value={currentBranch}
              onChange={(e) => onBranchChange(e.target.value)}
              className="px-3 py-1.5 rounded-md bg-card border border-border text-foreground font-body text-sm focus-ring"
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-h-[500px] overflow-y-auto scrollbar-custom">
        {fileTree.length > 0 ? (
          renderFileTree(fileTree)
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <Icon name="FolderIcon" size={48} className="text-muted-foreground mb-3" />
            <p className="font-body text-sm text-muted-foreground text-center">
              No files found in this repository
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepositoryBrowser;