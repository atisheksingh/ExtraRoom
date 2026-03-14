import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function getPrivateKey() {
    const key = process.env.FIREBASE_PRIVATE_KEY;
    if (!key) return undefined;
    return key.replace(/\\n/g, '\n');
}

function initAdmin() {
    if (getApps().length > 0) {
        return getApps()[0];
    }

    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = getPrivateKey();

    if (projectId && clientEmail && privateKey) {
        return initializeApp({
            credential: cert({
                projectId,
                clientEmail,
                privateKey,
            }),
        });
    }

    // Falls back to GOOGLE_APPLICATION_CREDENTIALS if available.
    return initializeApp();
}

const adminApp = initAdmin();

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);

export function isAdminEmail(email?: string | null) {
    if (!email) return false;
    const envValue = process.env.ADMIN_EMAILS || '';
    const list = envValue
        .split(',')
        .map((v) => v.trim().toLowerCase())
        .filter(Boolean);
    return list.includes(email.toLowerCase());
}