'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
    return (
        <nav className="border-b bg-white">
            <div className="flex h-16 items-center px-4 container mx-auto justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="p-0.5 rounded-lg overflow-hidden">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="h-8 w-8 object-cover rounded-md"
                        />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">FlashStore</span>
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                        Dashboard
                    </Link>
                    <Link href="/add-item" className="text-sm font-medium transition-colors hover:text-primary">
                        Add Item
                    </Link>
                    <Button size="sm">Log in</Button>
                </div>
            </div>
        </nav>
    );
}
