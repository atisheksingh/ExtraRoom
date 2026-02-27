"use client";

import { useStorage } from '@/context/StorageContext';
import { ItemCard } from '@/components/features/ItemCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function DashboardPage() {
    const { items } = useStorage();
    const { user, updateUserProfile } = useAuth();
    const [name, setName] = useState(user?.displayName ?? '');
    const [photo, setPhoto] = useState(user?.photoURL ?? '');

    const inVault = items.filter((i) => i.status === 'in-vault');
    const outForDelivery = items.filter((i) => i.status === 'out-for-delivery' || i.status === 'with-user');

    return (
        <ProtectedRoute>
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

                <section className="space-y-6">
                    <h2 className="text-xl font-semibold">Profile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="col-span-1">
                            <img src={user?.photoURL ?? 'https://www.gravatar.com/avatar/?d=mp&s=200'} className="h-24 w-24 rounded-full object-cover" />
                        </div>
                        <div className="col-span-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border px-3 py-2" />
                                <label className="text-sm font-medium">Photo URL</label>
                                <input value={photo} onChange={(e) => setPhoto(e.target.value)} className="w-full rounded border px-3 py-2" />
                                <div>
                                    <Button onClick={() => updateUserProfile({ displayName: name, photoURL: photo })}>Save profile</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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
        </ProtectedRoute>
    );
}
