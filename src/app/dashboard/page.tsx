"use client";

import { useStorage } from '@/context/StorageContext';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Archive, Calendar, CalendarCheck, Check, Clock, Database, History, Inbox, Package, Plus, Truck } from 'lucide-react';

export default function DashboardPage() {
    const { items } = useStorage();
    const { user } = useAuth();
    const router = useRouter();
    const [selectedPlacedIds, setSelectedPlacedIds] = useState<string[]>([]);

    // Calculate storage stats
    const { inVaultCount, outForDeliveryCount, placedCount, pickupScheduledCount, totalItems, capacityPercent, strokeDashoffset } = useMemo(() => {
        const inVaultCount = items.filter(i => i.status === 'in-vault').length;
        const outForDeliveryCount = items.filter(i => i.status === 'out-for-delivery' || i.status === 'with-user').length;
        const placedCount = items.filter(i => i.status === 'placed').length;
        const pickupScheduledCount = items.filter(i => i.status === 'pickup-scheduled' || i.status === 'out-for-pickup').length;
        const totalItems = items.length;
        const capacityLimit = 20;
        const capacityPercent = totalItems > 0 ? Math.min(100, Math.round((totalItems / capacityLimit) * 100)) : 0;
        const strokeDashoffset = 552 - (552 * capacityPercent) / 100;
        return { inVaultCount, outForDeliveryCount, placedCount, pickupScheduledCount, totalItems, capacityPercent, strokeDashoffset };
    }, [items]);

    const placedItems = useMemo(() => items.filter(i => i.status === 'placed'), [items]);

    const togglePlacedSelection = (id: string) => {
        setSelectedPlacedIds((prev) => (
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        ));
    };

    const proceedToPayment = () => {
        if (!selectedPlacedIds.length) return;
        const itemIds = encodeURIComponent(selectedPlacedIds.join(','));
        router.push(`/schedule-delivery?itemIds=${itemIds}`);
    };

    return (
        <ProtectedRoute>
            <div className="flex flex-col gap-8 w-full pb-12 transition-colors duration-200" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {/* Welcome Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark tracking-tight">Dashboard</h2>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">Welcome back! Here&apos;s what&apos;s happening with your storage.</p>
                    </div>
                    <Link href="/add-item" className="bg-primary-custom hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary-custom/20 hover:shadow-primary-custom/40 flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Add Item
                    </Link>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Items Card */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-border-light dark:border-border-dark flex flex-col justify-between h-40 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Package className="w-32 h-32 text-primary-custom" strokeWidth={1} />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                                <Database className="w-5 h-5" />
                            </div>
                            <h3 className="font-medium text-text-secondary-light dark:text-text-secondary-dark">Total Items</h3>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">{totalItems}</p>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">Items currently stored</p>
                        </div>
                    </div>

                    {/* Active Retrievals Card */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-border-light dark:border-border-dark flex flex-col justify-between h-40 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Truck className="w-32 h-32 text-primary-custom" strokeWidth={1} />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                                <Inbox className="w-5 h-5" />
                            </div>
                            <h3 className="font-medium text-text-secondary-light dark:text-text-secondary-dark">Pending Pickup</h3>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">{pickupScheduledCount}</p>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">Scheduled or being picked up</p>
                        </div>
                    </div>

                    {/* Next Delivery Card */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-border-light dark:border-border-dark flex flex-col justify-between h-40 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Calendar className="w-32 h-32 text-primary-custom" strokeWidth={1} />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                                <Clock className="w-5 h-5" />
                            </div>
                            <h3 className="font-medium text-text-secondary-light dark:text-text-secondary-dark">In Vault</h3>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">{inVaultCount}</p>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">Safely stored</p>
                        </div>
                    </div>
                </div>

                {/* Main Section Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Items or Empty State Action Area */}
                    <div className="xl:col-span-2 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-8 flex flex-col items-center justify-center text-center gap-6 min-h-[400px]">
                        {totalItems === 0 ? (
                            <>
                                <div className="w-full max-w-sm aspect-video bg-background-light dark:bg-background-dark/50 rounded-xl overflow-hidden relative group">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Archive className="w-24 h-24 text-border-light dark:text-border-dark group-hover:scale-110 transition-transform duration-300" strokeWidth={1} />
                                    </div>
                                    <img
                                        alt="Empty cardboard box illustration"
                                        className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcTtEC3CLHDzVoHz_Xu3TUBucaZiAsTzh7AT83VsG7AZuJ3hf5ThLRLPo_5Hni4VP24_v9EHmxfMKSt9SaY8WZ2jR0EyCPeMyIxEHLqumoGx0LlxdW1oBGi6xp3spHor6CYuPdMiNlnmn8mJxCYrjn0nJFxzw44uKfvweUz5x410P2zrOmb4U7IfK-COJexzLOfHGT56hdNtsUrvmmHADSs43aZS7Nw0gooXAtkcvd0wcMbvqHbEK0wD6iEN6nILbswvC5sg9dSYFd"
                                    />
                                </div>
                                <div className="max-w-md">
                                    <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">Your storage is empty</h3>
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
                                        Start decluttering your life with FlashStore. It's safe, secure, and we do the heavy lifting for you.
                                    </p>
                                    <Link href="/add-item" className="bg-primary-custom hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-primary-custom/20 hover:shadow-primary-custom/40 flex items-center justify-center gap-2 mx-auto w-fit">
                                        <Plus className="w-5 h-5" />
                                        Add First Item
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col text-left">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">Recent Items</h3>
                                    <Link href="/items" className="text-primary-custom font-medium hover:underline">View All &rarr;</Link>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    {items.slice(0, 6).map(item => (
                                        <Link href={`/items/${item.id}`} key={item.id} className="border border-border-light dark:border-border-dark rounded-xl overflow-hidden hover:shadow-md transition">
                                            <div className="h-40 w-full bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center">
                                                <img src={item.imageUrl} alt={item.name} loading="lazy" className="max-w-full max-h-full object-contain p-2" />
                                                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">
                                                    {item.status.replace(/-/g, ' ')}
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <h4 className="font-bold text-sm truncate">{item.name}</h4>
                                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{item.category}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Storage Capacity Widget */}
                    <div className="xl:col-span-1 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-8 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">Storage Capacity</h3>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Real-time usage</p>
                            </div>
                            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-md">
                                Healthy
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center relative py-8">
                            {/* Circular Progress Simulation */}
                            <div className="relative w-48 h-48">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle className="text-background-light dark:text-background-dark/50" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12" />
                                    <circle className="text-primary-custom transition-all duration-1000 ease-out" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552" strokeDashoffset={strokeDashoffset} strokeWidth="12" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">{capacityPercent}%</span>
                                    <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide">Used</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-background-light dark:bg-background-dark/50 p-4 rounded-xl">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 rounded-full bg-primary-custom"></div>
                                    <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark">Used</span>
                                </div>
                                <span className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">0 GB</span>
                            </div>
                            <div className="bg-background-light dark:bg-background-dark/50 p-4 rounded-xl">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                    <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark">Available</span>
                                </div>
                                <span className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">∞</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Schedule Pickup Section */}
                {placedItems.length > 0 && (
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark overflow-hidden">
                        <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                                    <CalendarCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-text-primary-light dark:text-text-primary-dark">Schedule Pickup</h3>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                                        {placedItems.length} item{placedItems.length !== 1 ? 's' : ''} waiting for pickup scheduling
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={proceedToPayment}
                                disabled={selectedPlacedIds.length === 0}
                                className="bg-primary-custom hover:bg-primary-dark disabled:opacity-50 text-white text-sm font-bold py-2 px-4 rounded-lg transition-all"
                            >
                                Continue to Schedule ({selectedPlacedIds.length})
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {placedItems.map(item => (
                                    <div
                                        key={item.id}
                                        className={`border rounded-xl overflow-hidden transition ${selectedPlacedIds.includes(item.id)
                                            ? 'border-primary-custom ring-2 ring-primary-custom/30'
                                            : 'border-border-light dark:border-border-dark'
                                            }`}
                                    >
                                        <div className="h-32 w-full bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center">
                                            <img src={item.imageUrl} alt={item.name} loading="lazy" className="max-w-full max-h-full object-contain p-2" />
                                            <button
                                                type="button"
                                                onClick={() => togglePlacedSelection(item.id)}
                                                className={`absolute top-2 left-2 w-7 h-7 rounded-full border-2 flex items-center justify-center ${selectedPlacedIds.includes(item.id)
                                                    ? 'bg-primary-custom border-primary-custom text-white'
                                                    : 'bg-white/90 border-white text-slate-500'
                                                    }`}
                                                aria-label={`Select ${item.name}`}
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>
                                            <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                                                Added
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-bold text-sm truncate text-text-primary-light dark:text-text-primary-dark">{item.name}</h4>
                                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1">{item.category}</p>
                                            {item.scheduledPickupDate && (
                                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-3">
                                                    Preferred: {item.scheduledPickupDate} {item.scheduledPickupTime && `at ${item.scheduledPickupTime}`}
                                                </p>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => togglePlacedSelection(item.id)}
                                                className={`w-full text-sm font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${selectedPlacedIds.includes(item.id)
                                                    ? 'bg-primary-custom text-white hover:bg-primary-dark'
                                                    : 'bg-white border border-border-light dark:border-border-dark text-slate-700 dark:text-slate-200'
                                                    }`}
                                            >
                                                <CalendarCheck className="w-4 h-4" />
                                                {selectedPlacedIds.includes(item.id) ? 'Selected' : 'Select for Delivery'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Recent Activity */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark overflow-hidden">
                    <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center">
                        <h3 className="font-bold text-lg text-text-primary-light dark:text-text-primary-dark">Recent Activity</h3>
                        <button className="text-primary-custom hover:text-primary-dark text-sm font-medium">View All</button>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col gap-4 text-center py-8">
                            <div className="mx-auto bg-background-light dark:bg-background-dark h-12 w-12 rounded-full flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark mb-2">
                                <History className="w-6 h-6" />
                            </div>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark">No recent activity found on your account.</p>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
