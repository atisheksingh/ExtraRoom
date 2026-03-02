"use client";

import { useStorage } from '@/context/StorageContext';
import { ItemCard } from '@/components/features/ItemCard';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function ItemsPage() {
    const { items } = useStorage();

    return (
        <ProtectedRoute>
            <div className="space-y-8 pb-12 transition-colors duration-200" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-text-primary-light dark:text-text-primary-dark">All Items</h1>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">View and manage all your stored items.</p>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-border-light dark:border-border-dark rounded-lg">
                        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">You have no items.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {items.map((item) => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}
