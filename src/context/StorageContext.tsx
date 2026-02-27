'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
}

interface StorageContextType {
    items: StorageItem[];
    addItem: (item: Omit<StorageItem, 'id' | 'dateAdded' | 'status' | 'hubType'>) => void;
    requestRetrieval: (id: string) => void;
    requestStorage: (id: string) => void;
    currentTier: StorageTier;
    setTier: (tier: StorageTier) => void;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export function StorageProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<StorageItem[]>([
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
        {
            id: '2',
            name: 'Ping Pong Table',
            category: 'Sports',
            value: 25000,
            imageUrl: '/images/table-tennis-table.png',
            status: 'in-vault',
            hubType: 'mega',
            dateAdded: new Date().toISOString(),
        },
        {
            id: '3',
            name: 'Moving Boxes',
            category: 'Misc',
            value: 2000,
            imageUrl: '/images/cardboard-boxes.png',
            status: 'out-for-delivery',
            hubType: 'mega',
            dateAdded: new Date().toISOString(),
        },
    ]);
    const [currentTier, setTier] = useState<StorageTier>('small');

    const addItem = (newItem: Omit<StorageItem, 'id' | 'dateAdded' | 'status' | 'hubType'>) => {
        // Determine Hub Type based on Category (Simple logic for demo)
        const isBulky = ['Furniture', 'Sports', 'Appliances'].includes(newItem.category);
        const hubType: HubType = isBulky ? 'mega' : 'micro';

        const item: StorageItem = {
            ...newItem,
            id: Math.random().toString(36).substr(2, 9),
            dateAdded: new Date().toISOString(),
            status: 'in-vault',
            hubType,
        };
        setItems((prev) => [item, ...prev]);
    };

    const requestRetrieval = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: 'out-for-delivery' } : item
            )
        );
    };

    const requestStorage = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: 'in-vault' } : item
            )
        );
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
