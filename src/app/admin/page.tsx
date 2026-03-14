'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

async function getIdToken() {
    if (!auth?.currentUser) {
        throw new Error('Authentication session unavailable. Please sign in again.');
    }
    return auth.currentUser.getIdToken(true);
}

export default function AdminLoginPage() {
    const { signInWithEmail } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('123456789');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [seeded, setSeeded] = useState(false);

    const disabled = useMemo(() => !email || !password || loading, [email, password, loading]);

    // Auto-seed admin accounts on first visit
    if (!seeded) {
        setSeeded(true);
        fetch('/api/admin/bootstrap', { method: 'POST' }).catch(() => {});
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signInWithEmail(email, password);
            const token = await getIdToken();

            const response = await fetch('/api/admin/overview', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const body = await response.json().catch(() => ({}));
                throw new Error(body.error || 'This account does not have admin access.');
            }

            router.push('/admin/dashboard');
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : 'Failed to sign in as admin';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-md py-12">
            <Card>
                <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                    <CardDescription>
                        Sign in with an admin email account to access database analytics.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && <p className="text-sm text-red-600">{error}</p>}

                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="admin-email">Email</label>
                            <Input
                                id="admin-email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="admin@example.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="admin-password">Password</label>
                            <Input
                                id="admin-password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="........"
                                required
                            />
                        </div>

                        <Button className="w-full" type="submit" disabled={disabled}>
                            {loading ? 'Signing in...' : 'Sign in as Admin'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}