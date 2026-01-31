'use client';

import { useAuth } from '@/components/auth';
import { User as CustomUser } from '@/types';

export function useUser() {
  const { user, loading } = useAuth();

  // Map Supabase user to our custom User type
  const customUser: CustomUser | null = user ? {
    id: user.id,
    email: user.email ?? '',
    created_at: user.created_at,
    subscription_status: user.user_metadata?.subscription_status ?? 'inactive',
    subscription_tier: user.user_metadata?.subscription_tier ?? 'free',
  } : null;

  return { user: customUser, loading };
}
