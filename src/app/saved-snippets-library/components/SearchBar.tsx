'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = 'Search snippets by title, tags, or code content...' }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon name="MagnifyingGlassIcon" size={20} className="text-muted-foreground" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 pl-12 pr-12 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
      />
      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted transition-smooth focus-ring"
          aria-label="Clear search"
        >
          <Icon name="XMarkIcon" size={20} className="text-muted-foreground" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;