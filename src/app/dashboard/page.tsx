'use client';

import { useStorage } from '@/context/StorageContext';
import { ItemCard } from '@/components/features/ItemCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
    const { items } = useStorage();

    const inVault = items.filter((i) => i.status === 'in-vault');
    const outForDelivery = items.filter((i) => i.status === 'out-for-delivery' || i.status === 'with-user');

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Digital Closet</h1>
                    <p className="text-slate-500">Manage your stored items and schedule retrievals.</p>
                </div>
                <Link href="/add-item">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add New Item
                    </Button>
                </Link>
            </div>

            {outForDelivery.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-orange-600">Active / In-Transit</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {outForDelivery.map((item) => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </section>
            )}

            <section>
                <h2 className="text-xl font-semibold mb-4">In Vault</h2>
                {inVault.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                        <p className="text-slate-500 mb-4">Your vault is empty.</p>
                        <Link href="/add-item">
                            <Button variant="outline">Store your first item</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {inVault.map((item) => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
