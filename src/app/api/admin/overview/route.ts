import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb, isAdminEmail } from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';

type JsonDoc = Record<string, unknown>;

function parseBearerToken(header: string | null) {
    if (!header) return null;
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) return null;
    return token;
}

function toISODate(value: unknown): string | null {
    if (!value) return null;

    if (typeof value === 'string') {
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString();
    }

    if (typeof value === 'object' && value && 'toDate' in value) {
        try {
            const date = (value as { toDate: () => Date }).toDate();
            return date.toISOString();
        } catch {
            return null;
        }
    }

    return null;
}

function isAdmin(decoded: { admin?: boolean; email?: string | null }) {
    if (decoded.admin === true) return true;
    return isAdminEmail(decoded.email);
}

export async function GET(request: NextRequest) {
    try {
        const token = parseBearerToken(request.headers.get('authorization'));
        if (!token) {
            return NextResponse.json({ error: 'Missing auth token' }, { status: 401 });
        }

        const decoded = await adminAuth.verifyIdToken(token);
        const adminClaim = (decoded as { admin?: boolean }).admin;
        if (!isAdmin({ admin: adminClaim, email: decoded.email })) {
            return NextResponse.json({ error: 'Forbidden: admin access only' }, { status: 403 });
        }

        const [usersSnap, itemsSnap] = await Promise.all([
            adminDb.collection('users').get(),
            adminDb.collection('items').get(),
        ]);

        const users: Array<JsonDoc & { id: string }> = usersSnap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as JsonDoc) }));
        const items: Array<JsonDoc & { id: string }> = itemsSnap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as JsonDoc) }));

        const totalUsers = users.length;
        const totalItems = items.length;
        const placed = items.filter((item) => item.status === 'placed').length;
        const pickupScheduled = items.filter((item) => item.status === 'pickup-scheduled').length;
        const outForPickup = items.filter((item) => item.status === 'out-for-pickup').length;
        const inVault = items.filter((item) => item.status === 'in-vault').length;
        const outForDelivery = items.filter((item) => item.status === 'out-for-delivery').length;
        const withUser = items.filter((item) => item.status === 'with-user').length;
        const highValueItems = items.filter((item) => {
            const value = Number(item.value ?? 0);
            return Number.isFinite(value) && value >= 50000;
        }).length;

        const recentUsers = users
            .map((u) => ({
                id: String(u.id),
                email: (u.email as string) ?? null,
                displayName: (u.displayName as string) ?? null,
                createdAt: toISODate(u.createdAt),
            }))
            .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
            .slice(0, 10);

        const recentItems = items
            .map((i) => ({
                id: String(i.id),
                ownerId: (i.ownerId as string) ?? null,
                name: (i.name as string) ?? 'Untitled Item',
                category: (i.category as string) ?? 'Unknown',
                status: (i.status as string) ?? 'unknown',
                value: Number(i.value ?? 0),
                scheduledPickupDate: (i.scheduledPickupDate as string) ?? null,
                scheduledPickupTime: (i.scheduledPickupTime as string) ?? null,
                createdAt: toISODate(i.createdAt) ?? toISODate(i.dateAdded),
            }))
            .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
            .slice(0, 15);

        return NextResponse.json({
            stats: {
                totalUsers,
                totalItems,
                placed,
                pickupScheduled,
                outForPickup,
                inVault,
                outForDelivery,
                withUser,
                highValueItems,
            },
            recentUsers,
            recentItems,
            scannedAt: new Date().toISOString(),
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to scan database';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}