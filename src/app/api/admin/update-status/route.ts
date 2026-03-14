import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb, isAdminEmail } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export const runtime = 'nodejs';

const VALID_STATUSES = ['placed', 'pickup-scheduled', 'out-for-pickup', 'in-vault', 'out-for-delivery', 'with-user'];

function parseBearerToken(header: string | null) {
    if (!header) return null;
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) return null;
    return token;
}

export async function POST(request: NextRequest) {
    try {
        const token = parseBearerToken(request.headers.get('authorization'));
        if (!token) {
            return NextResponse.json({ error: 'Missing auth token' }, { status: 401 });
        }

        const decoded = await adminAuth.verifyIdToken(token);
        const adminClaim = (decoded as { admin?: boolean }).admin;
        if (adminClaim !== true && !isAdminEmail(decoded.email)) {
            return NextResponse.json({ error: 'Forbidden: admin access only' }, { status: 403 });
        }

        const body = await request.json();
        const { itemId, status } = body as { itemId?: string; status?: string };

        if (!itemId || typeof itemId !== 'string') {
            return NextResponse.json({ error: 'Missing itemId' }, { status: 400 });
        }
        if (!status || !VALID_STATUSES.includes(status)) {
            return NextResponse.json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` }, { status: 400 });
        }

        const docRef = adminDb.collection('items').doc(itemId);
        const snap = await docRef.get();
        if (!snap.exists) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        await docRef.update({ status, updatedAt: FieldValue.serverTimestamp() });

        return NextResponse.json({ success: true, itemId, status });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to update status';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
