import React from 'react';
import Header from '@/components/common/Header';
import CodeConverterInteractive from './components/CodeConverterInteractive';

export const dynamic = 'force-dynamic';

export default function CodeConverterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Code Converter</h1>
            <p className="text-muted-foreground">Convert code between different programming languages</p>
          </div>
          <CodeConverterInteractive />
        </div>
      </main>
    </div>
  );
}
