'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'codegenie_current_user',
  USERS: 'codegenie_users',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string): Promise<{ success: boolean; error?: string }> => {
    if (typeof window === 'undefined') return { success: false, error: 'Not available' };

    try {
      // Get existing users
      const usersData = localStorage.getItem(STORAGE_KEYS.USERS);
      const users: Record<string, { password: string; user: User }> = usersData ? JSON.parse(usersData) : {};

      // Check if user already exists
      if (users[email]) {
        return { success: false, error: 'Email already registered' };
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email,
        fullName,
        createdAt: new Date().toISOString(),
      };

      // Store user credentials
      users[email] = { password, user: newUser };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));

      setUser(newUser);
      router.push('/code-generator-dashboard');
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'Failed to create account' };
    }
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (typeof window === 'undefined') return { success: false, error: 'Not available' };

    try {
      const usersData = localStorage.getItem(STORAGE_KEYS.USERS);
      const users: Record<string, { password: string; user: User }> = usersData ? JSON.parse(usersData) : {};

      const userRecord = users[email];
      if (!userRecord || userRecord.password !== password) {
        return { success: false, error: 'Invalid email or password' };
      }

      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userRecord.user));
      setUser(userRecord.user);
      router.push('/code-generator-dashboard');
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'Failed to sign in' };
    }
  };

  const signOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER);
      setUser(null);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
