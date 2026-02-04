'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ExportModalProps {
  isOpen: boolean;
  repositoryName: string;
  branches: string[];
  onClose: () => void;
  onExport: (data: {
    branch: string;
    commitMessage: string;
    createNewBranch: boolean;
    newBranchName?: string;
  }) => void;
}

const ExportModal = ({ isOpen, repositoryName, branches, onClose, onExport }: ExportModalProps) => {
  const [selectedBranch, setSelectedBranch] = useState(branches[0] || 'main');
  const [commitMessage, setCommitMessage] = useState('');
  const [createNewBranch, setCreateNewBranch] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');

  if (!isOpen) return null;

  const handleExport = () => {
    if (!commitMessage.trim()) {
      alert('Please enter a commit message');
      return;
    }

    if (createNewBranch && !newBranchName.trim()) {
      alert('Please enter a new branch name');
      return;
    }

    onExport({
      branch: selectedBranch,
      commitMessage: commitMessage.trim(),
      createNewBranch,
      newBranchName: createNewBranch ? newBranchName.trim() : undefined
    });

    setCommitMessage('');
    setNewBranchName('');
    setCreateNewBranch(false);
  };

  return (
    <div className="fixed inset-0 z-[1020] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="ArrowUpTrayIcon" size={22} className="text-primary" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground">Export to GitHub</h2>
              <p className="font-body text-sm text-muted-foreground">{repositoryName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-smooth active-press focus-ring"
          >
            <Icon name="XMarkIcon" size={24} className="text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block font-body font-medium text-sm text-foreground mb-2">
              Target Branch
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md bg-muted border border-border text-foreground font-body text-sm focus-ring"
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={createNewBranch}
                onChange={(e) => setCreateNewBranch(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="font-body text-sm text-foreground">Create new branch</span>
            </label>
          </div>

          {createNewBranch && (
            <div>
              <label className="block font-body font-medium text-sm text-foreground mb-2">
                New Branch Name
              </label>
              <input
                type="text"
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
                placeholder="feature/new-feature"
                className="w-full px-4 py-2.5 rounded-md bg-muted border border-border text-foreground font-body text-sm focus-ring placeholder:text-muted-foreground"
              />
            </div>
          )}

          <div>
            <label className="block font-body font-medium text-sm text-foreground mb-2">
              Commit Message *
            </label>
            <textarea
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="Add AI-generated code implementation"
              rows={4}
              className="w-full px-4 py-2.5 rounded-md bg-muted border border-border text-foreground font-body text-sm focus-ring placeholder:text-muted-foreground resize-none"
            />
          </div>

          <div className="flex items-center gap-2 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0" />
            <p className="font-body text-sm text-foreground">
              This will create a new commit with your generated code. Make sure to review the changes before pushing.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-muted text-muted-foreground font-medium text-sm hover:bg-border hover:text-foreground transition-smooth active-press focus-ring"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-smooth active-press focus-ring flex items-center gap-2"
          >
            <Icon name="ArrowUpTrayIcon" size={18} />
            Export Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;