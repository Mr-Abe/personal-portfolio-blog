'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/auth';

export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user || !user.isAdmin) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
} 