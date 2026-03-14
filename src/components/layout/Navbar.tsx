'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import LoginDialog from '@/components/auth/LoginDialog';

export function Navbar() {
    const { user, signOut } = useAuth();

    return (
        <nav className="border-b bg-white">
            <div className="flex h-16 items-center px-4 container mx-auto justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="p-0.5 rounded-lg overflow-hidden">
                        <img
                            src="/logo.svg"
                            alt="Logo"
                            className="h-8 w-8 object-cover rounded-md"
                        />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">FlashStore</span>
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
                        Pricing
                    </Link>
                    {user && (
                        <>
                            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                                Dashboard
                            </Link>
                        </>
                    )}
                    {user ? (
                        <div className="flex items-center space-x-3">
                            <Link href="/profile" className="flex items-center space-x-3 rounded-md px-1 py-1 hover:bg-slate-100 transition-colors">
                                <img
                                    src={user.photoURL ?? 'https://www.gravatar.com/avatar/?d=mp&s=80'}
                                    alt={user.displayName ?? user.email ?? 'User avatar'}
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                                <span className="text-sm">{user.displayName ?? user.email}</span>
                            </Link>
                            <Button size="sm" onClick={() => signOut()}>
                                Sign out
                            </Button>
                        </div>
                    ) : (
                        <LoginDialog />
                    )}
                </div>
            </div>
        </nav>
    );
}
