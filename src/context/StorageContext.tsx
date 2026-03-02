"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '@/lib/firebase';
import type { Firestore } from 'firebase/firestore';
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    serverTimestamp,
} from 'firebase/firestore';

export type StorageTier = 'small' | 'medium' | 'large' | 'xl';
export type ItemStatus = 'in-vault' | 'out-for-delivery' | 'with-user';
export type HubType = 'micro' | 'mega';

export interface StorageItem {
    id: string;
    name: string;
    category: string;
    value: number;
    imageUrl: string;
    status: ItemStatus;
    hubType: HubType;
    dateAdded: string;
    scheduledPickupDate?: string; // ISO date string
    scheduledPickupTime?: string; // e.g., "09:00 AM"
}

interface StorageContextType {
    items: StorageItem[];
    addItem: (item: Omit<StorageItem, 'id' | 'dateAdded' | 'status' | 'hubType'>) => Promise<void>;
    requestRetrieval: (id: string) => Promise<void>;
    requestStorage: (id: string) => Promise<void>;
    currentTier: StorageTier;
    setTier: (tier: StorageTier) => void;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export function StorageProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<StorageItem[]>([]);
    const [currentTier, setTier] = useState<StorageTier>('small');
    const { user } = useAuth();

    const dbOrThrow = (): Firestore => {
        if (!db) throw new Error('Firebase Firestore not initialized');
        return db as Firestore;
    };

    // Load items for authenticated user from Firestore
    useEffect(() => {
        if (!user) {
            // fallback demo items when not signed in
            setItems([
                {
                    id: '1',
                    name: 'Winter Jackets',
                    category: 'Clothing',
                    value: 15000,
                    imageUrl: '/images/winter-jackets.png',
                    status: 'in-vault',
                    hubType: 'micro',
                    dateAdded: new Date().toISOString(),
                },
            ]);
            return;
        }

        const load = async () => {
            try {
                const q = query(collection(dbOrThrow(), 'items'), where('ownerId', '==', user.uid));
                const snap = await getDocs(q);
                const docs: StorageItem[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
                setItems(docs);
            } catch (err) {
                console.error('Failed loading items from Firestore:', err);
                setItems([]);
            }
        };

        load();
    }, [user]);

    const addItem = async (newItem: Omit<StorageItem, 'id' | 'dateAdded' | 'status' | 'hubType'>) => {
        // Determine Hub Type based on Category (Simple logic for demo)
        const isBulky = ['Furniture', 'Sports', 'Appliances'].includes(newItem.category);
        const hubType: HubType = isBulky ? 'mega' : 'micro';

        const payload = {
            ...newItem,
            status: 'in-vault' as ItemStatus,
            hubType,
            ownerId: user?.uid ?? null,
            dateAdded: new Date().toISOString(),
            createdAt: serverTimestamp(),
        } as any;

        if (user) {
            const ref = await addDoc(collection(dbOrThrow(), 'items'), payload);
            setItems((prev) => [{ id: ref.id, ...(payload as any) }, ...prev]);
        } else {
            // local fallback
            const item: StorageItem = {
                ...newItem,
                id: Math.random().toString(36).substr(2, 9),
                dateAdded: new Date().toISOString(),
                status: 'in-vault',
                hubType,
            };
            setItems((prev) => [item, ...prev]);
        }
    };

    const requestRetrieval = async (id: string) => {
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'out-for-delivery' } : item)));
        try {
            const ref = doc(dbOrThrow(), 'items', id);
            await updateDoc(ref, { status: 'out-for-delivery', updatedAt: serverTimestamp() });
        } catch (e) {
            // ignore
        }
    };

    const requestStorage = async (id: string) => {
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'in-vault' } : item)));
        try {
            const ref = doc(dbOrThrow(), 'items', id);
            await updateDoc(ref, { status: 'in-vault', updatedAt: serverTimestamp() });
        } catch (e) {
            // ignore
        }
    };

    return (
        <StorageContext.Provider value={{ items, addItem, requestRetrieval, requestStorage, currentTier, setTier }}>
            {children}
        </StorageContext.Provider>
    );
}

export function useStorage() {
    const context = useContext(StorageContext);
    if (context === undefined) {
        throw new Error('useStorage must be used within a StorageProvider');
    }
    return context;
}
