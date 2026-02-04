import React from 'react';
import Header from '@/components/common/Header';
import EncryptionToolsInteractive from './components/EncryptionToolsInteractive';

export const dynamic = 'force-dynamic';

export default function EncryptionToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Encryption Tools</h1>
            <p className="text-muted-foreground">Encode, decode, and hash text securely</p>
          </div>
          <EncryptionToolsInteractive />
        </div>
      </main>
    </div>
  );
}