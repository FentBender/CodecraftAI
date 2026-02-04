'use client';

import React from 'react';


interface FilterPanelProps {
  selectedLanguages: string[];
  selectedTags: string[];
  sortBy: string;
  onLanguageToggle: (language: string) => void;
  onTagToggle: (tag: string) => void;
  onSortChange: (sortBy: string) => void;
  onClearFilters: () => void;
}

const FilterPanel = ({
  selectedLanguages,
  selectedTags,
  sortBy,
  onLanguageToggle,
  onTagToggle,
  onSortChange,
  onClearFilters
}: FilterPanelProps) => {
  const languages = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'Go',
    'Rust',
    'PHP',
    'Ruby'
  ];

  const tags = [
    'algorithm',
    'api',
    'authentication',
    'database',
    'frontend',
    'backend',
    'utility',
    'component',
    'hook',
    'function'
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Used' },
    { value: 'alphabetical', label: 'A-Z' }
  ];

  const hasActiveFilters = selectedLanguages.length > 0 || selectedTags.length > 0;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-base text-foreground">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-primary text-sm font-medium hover:underline focus-ring rounded"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block font-body font-medium text-sm text-foreground mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full h-10 px-3 bg-muted border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-body font-medium text-sm text-foreground mb-3">
            Programming Language
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-custom">
            {languages.map((language) => (
              <label
                key={language}
                className="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded transition-smooth"
              >
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(language)}
                  onChange={() => onLanguageToggle(language)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                />
                <span className="font-body text-sm text-foreground">{language}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-body font-medium text-sm text-foreground mb-3">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-smooth hover-lift active-press focus-ring ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-border'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;