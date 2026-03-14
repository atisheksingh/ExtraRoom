import { NextResponse } from 'next/server';
import { adminAuth, isAdminEmail } from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD || '123456789';

export async function POST() {
    try {
        const envValue = process.env.ADMIN_EMAILS || '';
        const emails = envValue
            .split(',')
            .map((v) => v.trim().toLowerCase())
            .filter(Boolean);

        if (emails.length === 0) {
            return NextResponse.json({ error: 'No ADMIN_EMAILS configured' }, { status: 400 });
        }

        const results: Array<{ email: string; status: string }> = [];

        for (const email of emails) {
            if (!isAdminEmail(email)) continue;

            try {
                const existing = await adminAuth.getUserByEmail(email);
                await adminAuth.updateUser(existing.uid, { password: DEFAULT_ADMIN_PASSWORD });
                results.push({ email, status: 'password reset' });
            } catch {
                // User does not exist — create it
                await adminAuth.createUser({
                    email,
                    password: DEFAULT_ADMIN_PASSWORD,
                    displayName: 'Admin',
                });
                results.push({ email, status: 'created' });
            }
        }

        return NextResponse.json({ results });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bootstrap failed';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
