'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import {
    GoogleAuthProvider,
    signInWithPopup as firebaseSignInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile as firebaseUpdateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

type UpdateProfilePayload = { displayName?: string | null; photoURL?: string | null };

type AuthContextType = {
    user: User | null;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    updateUserProfile: (data: UpdateProfilePayload) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const authOrThrow = (): Auth => {
        if (!auth) throw new Error('Firebase auth not initialized');
        return auth as Auth;
    };

    const dbOrThrow = (): Firestore => {
        if (!db) throw new Error('Firebase Firestore not initialized');
        return db as Firestore;
    };

    useEffect(() => {
        try {
            const a = authOrThrow();
            const unsubscribe = onAuthStateChanged(a, async (u) => {
                setUser(u);
                if (u) {
                    // Ensure user doc exists
                    const ref = doc(dbOrThrow(), 'users', u.uid);
                    const snap = await getDoc(ref);
                    if (!snap.exists()) {
                        await setDoc(ref, {
                            uid: u.uid,
                            email: u.email ?? null,
                            displayName: u.displayName ?? null,
                            photoURL: u.photoURL ?? null,
                            createdAt: serverTimestamp(),
                        });
                    }
                }
            });

            return unsubscribe;
        } catch (e) {
            // Auth not initialized yet — this can happen during SSR or early client init.
            // We'll silently ignore; component will try again on re-render.
            // eslint-disable-next-line no-console
            console.warn('Auth not initialized for onAuthStateChanged:', e);
            return () => {};
        }
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const a = authOrThrow();
        await firebaseSignInWithPopup(a, provider);
    };

    const signOut = async () => {
        const a = authOrThrow();
        await firebaseSignOut(a);
    };

    const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
        const a = authOrThrow();
        const cred = await createUserWithEmailAndPassword(a, email, password);
        const u = cred.user;
        if (displayName) {
            await firebaseUpdateProfile(u, { displayName });
        }
        // create user doc
        const ref = doc(dbOrThrow(), 'users', u.uid);
        await setDoc(ref, {
            uid: u.uid,
            email: u.email ?? null,
            displayName: u.displayName ?? displayName ?? null,
            photoURL: u.photoURL ?? null,
            createdAt: serverTimestamp(),
        });
    };

    const signInWithEmail = async (email: string, password: string) => {
        const a = authOrThrow();
        await signInWithEmailAndPassword(a, email, password);
    };

    const updateUserProfile = async (data: UpdateProfilePayload) => {
        const current = authOrThrow().currentUser;
        if (!current) throw new Error('Not authenticated');
        await firebaseUpdateProfile(current, data as any);
        const ref = doc(dbOrThrow(), 'users', current.uid);
        await updateDoc(ref, {
            displayName: data.displayName ?? current.displayName ?? null,
            photoURL: data.photoURL ?? current.photoURL ?? null,
            updatedAt: serverTimestamp(),
        });
        // refresh local user
        setUser({ ...current } as User);
    };

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signOut, signUpWithEmail, signInWithEmail, updateUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
