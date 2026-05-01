"use client";

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

interface ProtectedPageProps {
  children: ReactNode;
}

export default function ProtectedPage({ children }: ProtectedPageProps) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      // Redirect to login if not authenticated
      router.push('/login');
    }
  }, [router]);

  // If not authenticated, don't render the page
  if (!isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}
