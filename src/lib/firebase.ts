import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

// Flag to track if we've already tried to initialize
let initAttempted = false;

function initializeFirebase() {
    // Only initialize once
    if (initAttempted) {
        return { app, auth, db, storage };
    }
    
    initAttempted = true;

    // eslint-disable-next-line no-console
    console.log('[Firebase] Initialization check: typeof window =', typeof window);

    // Initialize Firebase only in the browser
    if (typeof window === 'undefined') {
        // eslint-disable-next-line no-console
        console.log('[Firebase] Server-side detected, skipping initialization');
        return { app, auth, db, storage };
    }

    try {
        const firebaseConfig = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        };

        // eslint-disable-next-line no-console
        console.log('[Firebase] Config check:', {
            apiKey: !!firebaseConfig.apiKey,
            authDomain: !!firebaseConfig.authDomain,
            projectId: !!firebaseConfig.projectId,
            storageBucket: !!firebaseConfig.storageBucket,
            messagingSenderId: !!firebaseConfig.messagingSenderId,
            appId: !!firebaseConfig.appId,
        });

        // Validate config
        const missingKeys = Object.entries(firebaseConfig)
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        if (missingKeys.length > 0) {
            throw new Error(`Missing Firebase config keys: ${missingKeys.join(', ')}`);
        }

        // eslint-disable-next-line no-console
        console.log('[Firebase] Config valid, initializing...');

        const apps = getApps();
        if (apps.length === 0) {
            // eslint-disable-next-line no-console
            console.log('[Firebase] Creating new Firebase app instance');
            app = initializeApp(firebaseConfig);
        } else {
            // eslint-disable-next-line no-console
            console.log('[Firebase] Using existing Firebase app instance');
            app = getApp();
        }

        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);

        // eslint-disable-next-line no-console
        console.log('[Firebase] ✓ Initialization successful', { 
            app: !!app,
            auth: !!auth,
            db: !!db,
            storage: !!storage 
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[Firebase] ✗ Initialization failed:', e);
    }

    return { app, auth, db, storage };
}

// Attempt initialization immediately on import (client-side)
initializeFirebase();

export { auth, db, storage };
export { initializeFirebase };
