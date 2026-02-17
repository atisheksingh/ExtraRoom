'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Box } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="border-b bg-white">
            <div className="flex h-16 items-center px-4 container mx-auto justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <Box className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">ExtraRoom</span>
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
