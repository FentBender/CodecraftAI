import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'Authentication Error - CodeCraft AI',
  description: 'An error occurred during authentication.',
};

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-lg">
              <Icon name="XMarkIcon" size={28} className="text-white" />
            </div>
          </div>

          <h1 className="font-heading text-2xl font-bold text-center text-foreground mb-2">
            Authentication Error
          </h1>
          <p className="font-body text-sm text-center text-muted-foreground mb-6">
            We encountered an error while trying to authenticate you. Please try again.
          </p>

          <Link
            href="/login"
            className="block w-full py-2 px-4 bg-primary text-primary-foreground text-center rounded-md font-medium hover:opacity-90 transition-smooth"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}