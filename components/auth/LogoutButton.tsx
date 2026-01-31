'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LogOut, Loader2 } from 'lucide-react';

interface LogoutButtonProps {
    className?: string;
    variant?: 'default' | 'ghost' | 'outline';
}

export function LogoutButton({
    className = '',
    variant = 'default'
}: LogoutButtonProps) {
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const handleLogout = async () => {
        setLoading(true);
        try {
            await supabase.auth.signOut();
            window.location.href = '/login';
        } catch (error) {
            console.error('Error signing out:', error);
        } finally {
            setLoading(false);
        }
    };

    const baseStyles = 'flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
        default: 'bg-red-600 hover:bg-red-700 text-white',
        ghost: 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20',
        outline: 'border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <LogOut className="w-4 h-4" />
            )}
            Sign Out
        </button>
    );
}
