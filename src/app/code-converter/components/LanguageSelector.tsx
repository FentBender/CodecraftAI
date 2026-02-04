'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { LANGUAGES, LANGUAGE_CATEGORIES } from '@/lib/config/languages';

interface LanguageSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const LanguageSelector = ({ label, value, onChange }: LanguageSelectorProps) => {
  // Group languages by category
  const languagesByCategory = LANGUAGES.reduce((acc, lang) => {
    if (!acc[lang.category]) {
      acc[lang.category] = [];
    }
    acc[lang.category].push(lang);
    return acc;
  }, {} as Record<string, typeof LANGUAGES>);

  return (
    <div className="flex-1">
      <label className="block font-body text-sm font-medium text-muted-foreground mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-muted border border-border rounded-lg font-body text-foreground appearance-none cursor-pointer focus-ring pr-10"
        >
          {Object.entries(languagesByCategory).map(([category, langs]) => (
            <optgroup key={category} label={LANGUAGE_CATEGORIES[category as keyof typeof LANGUAGE_CATEGORIES]}>
              {langs.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <Icon
          name="ChevronDownIcon"
          size={20}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
      </div>
    </div>
  );
};

export default LanguageSelector;
