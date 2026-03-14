"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type AddressEntry = {
    id: string;
    title: string;
    address: string;
};

const ADDRESS_TITLE_OPTIONS = ['Home', 'Office', 'Parents', 'Hostel', 'Other'];

function formatDate(value?: string | null) {
    if (!value) return 'N/A';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(d);
}

export default function ProfilePage() {
    const { user, updateUserProfile } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName ?? '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL ?? '');
    const [addresses, setAddresses] = useState<AddressEntry[]>([]);
    const [saving, setSaving] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [message, setMessage] = useState<string | null>(null);

    const createdAt = useMemo(() => formatDate(user?.metadata?.creationTime), [user?.metadata?.creationTime]);
    const lastSignIn = useMemo(() => formatDate(user?.metadata?.lastSignInTime), [user?.metadata?.lastSignInTime]);

    useEffect(() => {
        const loadProfileDetails = async () => {
            if (!user || !db) {
                setLoadingDetails(false);
                return;
            }

            try {
                const ref = doc(db, 'users', user.uid);
                const snap = await getDoc(ref);
                const data = snap.data() as {
                    addresses?: Array<{ title?: string; address?: string }>;
                } | undefined;

                const loadedAddresses = (data?.addresses ?? [])
                    .map((entry, idx) => ({
                        id: `addr-${idx}-${Date.now()}`,
                        title: entry.title ?? 'Other',
                        address: entry.address ?? '',
                    }))
                    .filter((entry) => entry.address.trim() !== '');

                setAddresses(loadedAddresses);
            } catch (err) {
                console.error('Failed loading profile details:', err);
            } finally {
                setLoadingDetails(false);
            }
        };

        loadProfileDetails();
    }, [user]);

    const addAddress = () => {
        setAddresses((prev) => [
            ...prev,
            {
                id: `addr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                title: 'Home',
                address: '',
            },
        ]);
    };

    const removeAddress = (id: string) => {
        setAddresses((prev) => prev.filter((entry) => entry.id !== id));
    };

    const updateAddressField = (id: string, field: 'title' | 'address', value: string) => {
        setAddresses((prev) => prev.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)));
    };

    const onSave = async () => {
        if (!user) return;
        setSaving(true);
        setMessage(null);
        try {
            await updateUserProfile({
                displayName: displayName.trim() || null,
                photoURL: photoURL.trim() || null,
            });

            if (db) {
                const ref = doc(db, 'users', user.uid);
                await setDoc(
                    ref,
                    {
                        addresses: addresses
                            .map((entry) => ({
                                title: entry.title.trim() || 'Other',
                                address: entry.address.trim(),
                            }))
                            .filter((entry) => entry.address.length > 0),
                        updatedAt: serverTimestamp(),
                    },
                    { merge: true },
                );
            }
            setMessage('Profile updated successfully.');
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : 'Failed to update profile';
            setMessage(msg);
        } finally {
            setSaving(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="mx-auto w-full max-w-3xl py-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                        <p className="text-sm text-slate-600">View and manage your account details.</p>
                    </div>
                    <Link href="/dashboard" className="text-sm font-semibold text-primary-custom hover:underline">
                        Back to Dashboard
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Account Details</CardTitle>
                        <CardDescription>Your basic profile information from Firebase Auth.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="flex items-center gap-4">
                            <img
                                src={user?.photoURL ?? 'https://www.gravatar.com/avatar/?d=mp&s=120'}
                                alt={user?.displayName ?? user?.email ?? 'Profile avatar'}
                                className="h-16 w-16 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-lg font-semibold">{user?.displayName ?? 'No display name'}</p>
                                <p className="text-sm text-slate-600">{user?.email ?? 'No email'}</p>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="displayName">Display Name</Label>
                                <Input
                                    id="displayName"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="photoURL">Photo URL</Label>
                                <Input
                                    id="photoURL"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input value={user?.email ?? ''} readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label>User ID</Label>
                                <Input value={user?.uid ?? ''} readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label>Account Created</Label>
                                <Input value={createdAt} readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label>Last Sign In</Label>
                                <Input value={lastSignIn} readOnly />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Saved Addresses</Label>
                                    <p className="text-xs text-slate-500 mt-1">Add one or multiple addresses and choose a title for each.</p>
                                </div>
                                <Button type="button" variant="outline" onClick={addAddress}>Add Address</Button>
                            </div>

                            {addresses.length === 0 && (
                                <p className="text-sm text-slate-500">No addresses added yet.</p>
                            )}

                            {addresses.map((entry) => (
                                <div key={entry.id} className="rounded-lg border border-slate-200 p-4 space-y-3">
                                    <div className="grid gap-3 md:grid-cols-3">
                                        <div className="space-y-2 md:col-span-1">
                                            <Label>Address Title</Label>
                                            <Input
                                                value={entry.title}
                                                onChange={(e) => updateAddressField(entry.id, 'title', e.target.value)}
                                                list={`address-title-suggestions-${entry.id}`}
                                                placeholder="Home / Office / etc"
                                            />
                                            <datalist id={`address-title-suggestions-${entry.id}`}>
                                                {ADDRESS_TITLE_OPTIONS.map((opt) => (
                                                    <option key={opt} value={opt} />
                                                ))}
                                            </datalist>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label>Address</Label>
                                            <textarea
                                                value={entry.address}
                                                onChange={(e) => updateAddressField(entry.id, 'address', e.target.value)}
                                                rows={2}
                                                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                                                placeholder="Enter full address"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="button" variant="secondary" onClick={() => removeAddress(entry.id)}>Remove</Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {message && (
                            <p className="text-sm text-slate-700">{message}</p>
                        )}

                        <Button onClick={onSave} disabled={saving || loadingDetails}>
                            {loadingDetails ? 'Loading...' : saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </ProtectedRoute>
    );
}
