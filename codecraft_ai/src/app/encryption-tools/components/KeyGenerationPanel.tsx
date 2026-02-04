'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface KeyGenerationPanelProps {
  onKeyGenerated: (key: string) => void;
  encryptionKey: string;
}

const KeyGenerationPanel = ({ onKeyGenerated, encryptionKey }: KeyGenerationPanelProps) => {
  const [keyLength, setKeyLength] = useState<number>(256);
  const [showKey, setShowKey] = useState<boolean>(false);
  const [keyStrength, setKeyStrength] = useState<'weak' | 'medium' | 'strong'>('strong');

  const generateRandomKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let result = '';
    const length = keyLength / 8;
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    onKeyGenerated(result);
    calculateKeyStrength(result);
  };

  const calculateKeyStrength = (key: string) => {
    if (key.length < 16) {
      setKeyStrength('weak');
    } else if (key.length < 32) {
      setKeyStrength('medium');
    } else {
      setKeyStrength('strong');
    }
  };

  const getStrengthColor = () => {
    switch (keyStrength) {
      case 'weak':
        return 'bg-error';
      case 'medium':
        return 'bg-warning';
      case 'strong':
        return 'bg-success';
    }
  };

  const getStrengthWidth = () => {
    switch (keyStrength) {
      case 'weak':
        return 'w-1/3';
      case 'medium':
        return 'w-2/3';
      case 'strong':
        return 'w-full';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
          <Icon name="KeyIcon" size={20} className="text-primary" />
          Key Generation
        </h3>
        <button
          onClick={generateRandomKey}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-smooth hover-lift active-press focus-ring"
        >
          <Icon name="ArrowPathIcon" size={18} />
          <span className="font-body text-sm">Generate</span>
        </button>
      </div>

      <div className="space-y-3">
        <label className="block font-body font-medium text-sm text-foreground">
          Key Length (bits)
        </label>
        <div className="flex items-center gap-4">
          {[128, 192, 256, 512].map((length) => (
            <button
              key={length}
              onClick={() => setKeyLength(length)}
              className={`
                px-4 py-2 rounded-md font-body text-sm transition-smooth hover-lift active-press focus-ring
                ${keyLength === length
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-border hover:text-foreground'
                }
              `}
            >
              {length}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block font-body font-medium text-sm text-foreground">
            Encryption Key
          </label>
          <button
            onClick={() => setShowKey(!showKey)}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name={showKey ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
            <span className="font-caption text-xs">{showKey ? 'Hide' : 'Show'}</span>
          </button>
        </div>
        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={encryptionKey}
            onChange={(e) => {
              onKeyGenerated(e.target.value);
              calculateKeyStrength(e.target.value);
            }}
            placeholder="Enter or generate encryption key"
            className="w-full px-4 py-3 pr-12 bg-background border border-border rounded-md text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {encryptionKey && (
            <button
              onClick={() => navigator.clipboard.writeText(encryptionKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              title="Copy key"
            >
              <Icon name="ClipboardDocumentIcon" size={18} />
            </button>
          )}
        </div>
        
        {encryptionKey && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-caption text-xs text-muted-foreground">Key Strength</span>
              <span className={`font-caption text-xs font-medium ${
                keyStrength === 'weak' ? 'text-error' :
                keyStrength === 'medium' ? 'text-warning' : 'text-success'
              }`}>
                {keyStrength.charAt(0).toUpperCase() + keyStrength.slice(1)}
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full ${getStrengthColor()} ${getStrengthWidth()} transition-all duration-300`} />
            </div>
          </div>
        )}
      </div>

      <div className="bg-muted/50 border border-border rounded-md p-4 space-y-2">
        <div className="flex items-start gap-2">
          <Icon name="InformationCircleIcon" size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-body text-sm text-foreground font-medium">Security Best Practices</p>
            <ul className="space-y-1 font-caption text-xs text-muted-foreground">
              <li>• Use at least 256-bit keys for sensitive data</li>
              <li>• Never share encryption keys via insecure channels</li>
              <li>• Store keys separately from encrypted data</li>
              <li>• Rotate keys periodically for enhanced security</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyGenerationPanel;