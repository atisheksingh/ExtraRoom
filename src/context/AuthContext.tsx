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
        if (!auth) {
            const error = 'Firebase auth not initialized. Check your .env file and browser console for details.';
            // eslint-disable-next-line no-console
            console.error(error);
            throw new Error(error);
        }
        return auth as Auth;
    };

    const dbOrThrow = (): Firestore => {
        if (!db) throw new Error('Firebase Firestore not initialized');
        return db as Firestore;
    };

    useEffect(() => {
        // Retry logic: wait a bit and check if auth is available
        let attempts = 0;
        const maxAttempts = 5;
        
        const setupAuth = () => {
            attempts++;
            
            try {
                if (!auth) {
                    // eslint-disable-next-line no-console
                    console.warn(`Auth not available yet (attempt ${attempts}/${maxAttempts}). Retrying...`);
                    
                    if (attempts < maxAttempts) {
                        setTimeout(setupAuth, 1000);
                    }
                    return () => {};
                }

                // Auth is ready, set up listener
                const unsubscribe = onAuthStateChanged(auth as Auth, async (u) => {
                    setUser(u);
                    if (u) {
                        try {
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
                        } catch (err) {
                            // eslint-disable-next-line no-console
                            console.error('Error creating/fetching user doc:', err);
                        }
                    }
                });

                return unsubscribe;
            } catch (e) {
                // Auth not initialized yet — this can happen during SSR or early client init.
                // eslint-disable-next-line no-console
                console.warn('Error setting up onAuthStateChanged:', e);
                return () => {};
            }
        };

        const unsubscribe = setupAuth();
        return unsubscribe;
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
