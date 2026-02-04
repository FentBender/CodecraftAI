'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Command {
  name: string;
  description: string;
  example: string;
  category: string;
}

const COMMANDS: Command[] = [
  { name: 'ls', description: 'List directory contents', example: 'ls -la', category: 'File Management' },
  { name: 'cd', description: 'Change directory', example: 'cd /home/user', category: 'Navigation' },
  { name: 'pwd', description: 'Print working directory', example: 'pwd', category: 'Navigation' },
  { name: 'mkdir', description: 'Create directory', example: 'mkdir new_folder', category: 'File Management' },
  { name: 'rm', description: 'Remove files or directories', example: 'rm -rf folder', category: 'File Management' },
  { name: 'cp', description: 'Copy files or directories', example: 'cp file.txt backup.txt', category: 'File Management' },
  { name: 'mv', description: 'Move or rename files', example: 'mv old.txt new.txt', category: 'File Management' },
  { name: 'cat', description: 'Display file contents', example: 'cat file.txt', category: 'File Operations' },
  { name: 'grep', description: 'Search text patterns', example: 'grep "pattern" file.txt', category: 'Text Processing' },
  { name: 'chmod', description: 'Change file permissions', example: 'chmod 755 script.sh', category: 'Permissions' },
  { name: 'chown', description: 'Change file owner', example: 'chown user:group file.txt', category: 'Permissions' },
  { name: 'ps', description: 'Display running processes', example: 'ps aux', category: 'System' },
  { name: 'kill', description: 'Terminate processes', example: 'kill -9 1234', category: 'System' },
  { name: 'top', description: 'Display system resources', example: 'top', category: 'System' },
  { name: 'df', description: 'Display disk space', example: 'df -h', category: 'System' },
  { name: 'du', description: 'Display directory size', example: 'du -sh folder', category: 'System' },
];

const LinuxReferenceInteractive = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(COMMANDS.map(cmd => cmd.category)))];

  const filteredCommands = COMMANDS.filter(cmd => {
    const matchesSearch = cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cmd.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || cmd.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Search Commands</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or description..."
              className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Commands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCommands.map((cmd) => (
          <div key={cmd.name} className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-foreground font-mono">{cmd.name}</h3>
                <span className="text-xs text-muted-foreground">{cmd.category}</span>
              </div>
              <Icon name="CommandLineIcon" size={24} className="text-primary" />
            </div>
            <p className="text-foreground mb-3">{cmd.description}</p>
            <div className="bg-background rounded-md p-3 border border-border">
              <code className="text-sm text-primary font-mono">{cmd.example}</code>
            </div>
          </div>
        ))}
      </div>

      {filteredCommands.length === 0 && (
        <div className="text-center py-12">
          <Icon name="MagnifyingGlassIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No commands found matching your search</p>
        </div>
      )}
    </div>
  );
};

export default LinuxReferenceInteractive;
