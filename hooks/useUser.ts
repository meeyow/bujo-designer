'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement Supabase auth listener
    setLoading(false);
  }, []);

  return { user, loading };
}
