import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface EmptyStateProps {
  searchQuery?: string;
  hasFilters?: boolean;
}

const EmptyState = ({ searchQuery, hasFilters }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon name="FolderOpenIcon" size={40} className="text-muted-foreground" />
      </div>
      <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
        {searchQuery || hasFilters ? 'No snippets found' : 'No saved snippets yet'}
      </h3>
      <p className="font-body text-sm text-muted-foreground text-center max-w-md">
        {searchQuery || hasFilters
          ? 'Try adjusting your search or filters to find what you\'re looking for.'
          : 'Start saving your code snippets from the code generator to build your personal library.'}
      </p>
    </div>
  );
};

export default EmptyState;