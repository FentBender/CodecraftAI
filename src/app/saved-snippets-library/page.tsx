import React from 'react';
import Header from '@/components/common/Header';
import SavedSnippetsInteractive from './components/SavedSnippetsInteractive';

export const dynamic = 'force-dynamic';

export default function SavedSnippetsLibraryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Snippets Library</h1>
            <p className="text-muted-foreground">Manage and organize your saved code snippets</p>
          </div>
          <SavedSnippetsInteractive />
        </div>
      </main>
    </div>
  );
}