'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/AppIcon';

interface AuthStatusIndicatorProps {
  className?: string;
}

const AuthStatusIndicator = ({ className = '' }: AuthStatusIndicatorProps) => {
  const { user, loading, signOut } = useAuth();
  const [showMenu, setShowMenu] = React.useState(false);

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')?.[0] || 'User';

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-smooth hover-lift active-press focus-ring"
        title="Account settings"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Icon name="UserIcon" size={18} className="text-primary-foreground" />
        </div>
        <span className="font-body font-medium text-sm">{displayName}</span>
        <Icon name="ChevronDownIcon" size={16} />
      </button>

      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg border border-border z-20">
            <div className="py-1">
              <button
                onClick={async () => {
                  setShowMenu(false);
                  await signOut();
                }}
                className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted flex items-center gap-2"
              >
                <Icon name="ArrowRightOnRectangleIcon" size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthStatusIndicator;