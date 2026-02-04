import React from 'react';
import Header from '@/components/common/Header';
import GitHubIntegrationInteractive from './components/GitHubIntegrationInteractive';

export const dynamic = 'force-dynamic';

export default function GitHubIntegrationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">GitHub Integration</h1>
            <p className="text-muted-foreground">Connect and manage your GitHub repositories</p>
          </div>
          <GitHubIntegrationInteractive />
        </div>
      </main>
    </div>
  );
}