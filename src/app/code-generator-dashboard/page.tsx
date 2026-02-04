import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import DashboardInteractive from './components/DashboardInteractive';

export const metadata: Metadata = {
  title: 'Code Generator Dashboard - CodeCraft AI',
  description: 'Generate code in any programming language using natural language prompts with AI-powered assistance. Create, save, and manage your code snippets efficiently.',
};

export const dynamic = 'force-dynamic';

export default function CodeGeneratorDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-[60px]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Code Generator Dashboard
            </h1>
            <p className="font-body text-base text-muted-foreground">
              Transform your ideas into code with AI-powered generation across multiple programming languages
            </p>
          </div>

          <DashboardInteractive />
        </div>
      </main>
    </div>
  );
}