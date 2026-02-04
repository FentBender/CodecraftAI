'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

const QuickStats = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      const mockStats: Stat[] = [
        {
          label: 'Total Generations',
          value: '247',
          icon: 'CodeBracketIcon',
          color: 'text-blue-500'
        },
        {
          label: 'Saved Snippets',
          value: '89',
          icon: 'BookmarkIcon',
          color: 'text-green-500'
        },
        {
          label: 'Languages Used',
          value: '12',
          icon: 'LanguageIcon',
          color: 'text-purple-500'
        },
        {
          label: 'This Month',
          value: '43',
          icon: 'ChartBarIcon',
          color: 'text-orange-500'
        }
      ];
      setStats(mockStats);
    }
  }, [isHydrated]);

  if (!isHydrated) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-card rounded-lg border border-border animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-smooth"
        >
          <div className="flex items-center justify-between mb-2">
            <Icon name={stat.icon as any} size={24} className={stat.color} />
          </div>
          <p className="font-heading text-2xl font-bold text-foreground mb-1">
            {stat.value}
          </p>
          <p className="font-caption text-xs text-muted-foreground">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;