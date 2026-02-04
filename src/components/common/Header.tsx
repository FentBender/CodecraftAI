'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigationItems = [
    { label: 'Generator', path: '/code-generator-dashboard', icon: 'CodeBracketIcon' },
    { label: 'Converter', path: '/code-converter', icon: 'ArrowsRightLeftIcon' },
    { label: 'Analysis', path: '/code-analysis', icon: 'MagnifyingGlassIcon' },
    { label: 'Linux', path: '/linux-reference', icon: 'CommandLineIcon' },
    { label: 'Security', path: '/encryption-tools', icon: 'LockClosedIcon' },
    { label: 'GitHub', path: '/git-hub-integration', icon: 'CloudIcon' },
    { label: 'Library', path: '/saved-snippets-library', icon: 'BookmarkIcon' },
  ];

  const isActivePath = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card shadow-md">
      <nav className="h-16 flex items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/code-generator-dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="CodeBracketSquareIcon" size={24} className="text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground hidden sm:block">CodeCraft AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* User Menu */}
        <div className="hidden md:flex items-center gap-3">
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted hover:bg-border transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="UserIcon" size={18} className="text-primary-foreground" />
                </div>
                <span className="font-medium text-sm text-foreground">{user.fullName}</span>
                <Icon name="ChevronDownIcon" size={16} className="text-muted-foreground" />
              </button>

              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg border border-border z-20">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        signOut();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted flex items-center gap-2"
                    >
                      <Icon name="ArrowRightOnRectangleIcon" size={16} />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md bg-muted hover:bg-border transition-colors"
        >
          <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon as any} size={22} />
                <span>{item.label}</span>
              </Link>
            ))}

            {user && (
              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut();
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-md bg-muted hover:bg-border transition-colors w-full"
                >
                  <Icon name="ArrowRightOnRectangleIcon" size={22} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;