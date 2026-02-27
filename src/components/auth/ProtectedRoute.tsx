'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, signInWithGoogle } = useAuth();
    const router = useRouter();

    if (!user) {
        return (
            <div className="max-w-md mx-auto p-8 text-center bg-white rounded shadow">
                <h3 className="text-lg font-semibold mb-4">Sign in required</h3>
                <p className="text-sm mb-6">Please sign in with Google to access this page.</p>
                <div className="flex justify-center">
                    <Button
                        onClick={async () => {
                            await signInWithGoogle();
                            router.refresh();
                        }}
                    >
                        Sign in with Google
                    </Button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
