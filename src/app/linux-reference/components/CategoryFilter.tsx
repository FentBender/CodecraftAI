'use client';

import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

const CategoryFilter = ({ categories, selected, onChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-smooth focus-ring ${
            selected === category
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-border'
          }`}
        >
          {category === 'all' ? 'All Commands' : category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
