'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type AdminOverview = {
    stats: {
        totalUsers: number;
        totalItems: number;
        placed: number;
        pickupScheduled: number;
        outForPickup: number;
        inVault: number;
        outForDelivery: number;
        withUser: number;
        highValueItems: number;
    };
    recentUsers: Array<{
        id: string;
        email: string | null;
        displayName: string | null;
        createdAt: string | null;
    }>;
    recentItems: Array<{
        id: string;
        ownerId: string | null;
        name: string;
        category: string;
        status: string;
        value: number;
        scheduledPickupDate: string | null;
        scheduledPickupTime: string | null;
        createdAt: string | null;
    }>;
    scannedAt: string;
};

function formatDate(value: string | null) {
    if (!value) return 'N/A';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

const STATUS_OPTIONS = [
    { value: 'placed', label: 'Added to App' },
    { value: 'pickup-scheduled', label: 'Pickup Scheduled' },
    { value: 'out-for-pickup', label: 'Out for Pickup' },
    { value: 'in-vault', label: 'In Vault' },
    { value: 'out-for-delivery', label: 'Out For Delivery' },
    { value: 'with-user', label: 'With User' },
];

export default function AdminDashboardPage() {
    const { user } = useAuth();
    const [data, setData] = useState<AdminOverview | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleStatusChange = async (itemId: string, newStatus: string) => {
        if (!auth?.currentUser) return;
        setUpdatingId(itemId);
        try {
            const token = await auth.currentUser.getIdToken(true);
            const res = await fetch('/api/admin/update-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ itemId, status: newStatus }),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || 'Failed to update status');
            }
            // Update local state
            setData((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    recentItems: prev.recentItems.map((item) =>
                        item.id === itemId ? { ...item, status: newStatus } : item
                    ),
                };
            });
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : 'Update failed';
            alert(msg);
        } finally {
            setUpdatingId(null);
        }
    };

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!auth?.currentUser) {
                throw new Error('Please log in with an admin account first.');
            }

            const token = await auth.currentUser.getIdToken(true);
            const response = await fetch('/api/admin/overview', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const body = await response.json().catch(() => ({}));
                throw new Error(body.error || 'Failed to load admin dashboard data');
            }

            const json = (await response.json()) as AdminOverview;
            setData(json);
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : 'Failed to load dashboard';
            setError(message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            setLoading(false);
            setError('Please sign in to continue.');
            return;
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.uid]);

    const stats = useMemo(() => {
        if (!data) return [];
        return [
            { label: 'Total Users', value: data.stats.totalUsers },
            { label: 'Total Items', value: data.stats.totalItems },
            { label: 'Added to App', value: data.stats.placed },
            { label: 'Pickup Scheduled', value: data.stats.pickupScheduled },
            { label: 'Out for Pickup', value: data.stats.outForPickup },
            { label: 'In Vault', value: data.stats.inVault },
            { label: 'Out For Delivery', value: data.stats.outForDelivery },
            { label: 'With User', value: data.stats.withUser },
            { label: 'High Value (>= 50k)', value: data.stats.highValueItems },
        ];
    }, [data]);

    if (!user) {
        return (
            <div className="mx-auto max-w-2xl py-10 text-center space-y-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-slate-600">You must sign in before accessing admin tools.</p>
                <Link href="/admin">
                    <Button>Go to Admin Login</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-sm text-slate-600">
                        Database scan and operational overview from Firebase Firestore.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={loadData} disabled={loading}>
                        {loading ? 'Scanning...' : 'Rescan Database'}
                    </Button>
                    <Link href="/admin">
                        <Button variant="secondary">Switch Admin</Button>
                    </Link>
                </div>
            </div>

            {error && (
                <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                        <CardTitle className="text-red-700">Access Error</CardTitle>
                        <CardDescription className="text-red-600">{error}</CardDescription>
                    </CardHeader>
                </Card>
            )}

            {data && (
                <p className="text-xs text-slate-500">Last scanned: {formatDate(data.scannedAt)}</p>
            )}

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardHeader className="pb-2">
                            <CardDescription>{stat.label}</CardDescription>
                            <CardTitle className="text-3xl">{stat.value}</CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Users</CardTitle>
                        <CardDescription>Latest registered users from Firestore users collection.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left">
                                        <th className="py-2">Name</th>
                                        <th className="py-2">Email</th>
                                        <th className="py-2">Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(data?.recentUsers || []).map((userRow) => (
                                        <tr key={userRow.id} className="border-b last:border-0">
                                            <td className="py-2">{userRow.displayName || 'N/A'}</td>
                                            <td className="py-2">{userRow.email || 'N/A'}</td>
                                            <td className="py-2">{formatDate(userRow.createdAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Items</CardTitle>
                        <CardDescription>Latest items across all users from Firestore items collection.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left">
                                        <th className="py-2">Item</th>
                                        <th className="py-2">Category</th>
                                        <th className="py-2">Status</th>
                                        <th className="py-2">Pickup Date</th>
                                        <th className="py-2">Pickup Time</th>
                                        <th className="py-2">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(data?.recentItems || []).map((itemRow) => (
                                        <tr key={itemRow.id} className="border-b last:border-0">
                                            <td className="py-2">{itemRow.name}</td>
                                            <td className="py-2">{itemRow.category}</td>
                                            <td className="py-2">
                                                <select
                                                    className="rounded border border-slate-300 bg-white px-2 py-1 text-sm disabled:opacity-50"
                                                    value={itemRow.status}
                                                    disabled={updatingId === itemRow.id}
                                                    onChange={(e) => handleStatusChange(itemRow.id, e.target.value)}
                                                >
                                                    {STATUS_OPTIONS.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="py-2">{itemRow.scheduledPickupDate || 'N/A'}</td>
                                            <td className="py-2">{itemRow.scheduledPickupTime || 'N/A'}</td>
                                            <td className="py-2">INR {itemRow.value.toLocaleString('en-IN')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}