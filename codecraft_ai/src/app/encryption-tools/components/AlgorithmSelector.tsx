'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Algorithm {
  id: string;
  name: string;
  description: string;
  securityLevel: 'high' | 'medium' | 'standard';
  useCase: string;
  icon: string;
}

interface AlgorithmSelectorProps {
  selectedAlgorithm: string;
  onAlgorithmChange: (algorithmId: string) => void;
}

const AlgorithmSelector = ({ selectedAlgorithm, onAlgorithmChange }: AlgorithmSelectorProps) => {
  const algorithms: Algorithm[] = [
    {
      id: 'aes-256',
      name: 'AES-256',
      description: 'Advanced Encryption Standard with 256-bit key',
      securityLevel: 'high',
      useCase: 'Sensitive data, financial records, personal information',
      icon: 'ShieldCheckIcon'
    },
    {
      id: 'rsa-2048',
      name: 'RSA-2048',
      description: 'Rivest-Shamir-Adleman with 2048-bit key',
      securityLevel: 'high',
      useCase: 'Digital signatures, secure key exchange, certificates',
      icon: 'KeyIcon'
    },
    {
      id: 'aes-128',
      name: 'AES-128',
      description: 'Advanced Encryption Standard with 128-bit key',
      securityLevel: 'medium',
      useCase: 'General purpose encryption, file protection',
      icon: 'LockClosedIcon'
    },
    {
      id: 'des',
      name: 'DES',
      description: 'Data Encryption Standard (Legacy)',
      securityLevel: 'standard',
      useCase: 'Legacy system compatibility only',
      icon: 'ArchiveBoxIcon'
    },
    {
      id: 'blowfish',
      name: 'Blowfish',
      description: 'Fast block cipher for general encryption',
      securityLevel: 'medium',
      useCase: 'Password hashing, file encryption',
      icon: 'DocumentLockIcon'
    }
  ];

  const getSecurityBadgeColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-success text-success-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block font-body font-medium text-sm text-foreground">
        Encryption Algorithm
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {algorithms.map((algorithm) => (
          <button
            key={algorithm.id}
            onClick={() => onAlgorithmChange(algorithm.id)}
            className={`
              p-4 rounded-lg border-2 transition-smooth hover-lift active-press focus-ring text-left
              ${selectedAlgorithm === algorithm.id
                ? 'border-primary bg-primary/10' :'border-border bg-card hover:border-muted'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                ${selectedAlgorithm === algorithm.id ? 'bg-primary' : 'bg-muted'}
              `}>
                <Icon 
                  name={algorithm.icon as any} 
                  size={20} 
                  className={selectedAlgorithm === algorithm.id ? 'text-primary-foreground' : 'text-muted-foreground'}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-heading font-semibold text-base text-foreground">
                    {algorithm.name}
                  </h3>
                  <span className={`
                    px-2 py-0.5 rounded text-xs font-medium
                    ${getSecurityBadgeColor(algorithm.securityLevel)}
                  `}>
                    {algorithm.securityLevel}
                  </span>
                </div>
                <p className="font-caption text-xs text-muted-foreground mb-2">
                  {algorithm.description}
                </p>
                <p className="font-caption text-xs text-foreground/80">
                  <span className="font-medium">Use case:</span> {algorithm.useCase}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector;