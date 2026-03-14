'use client';

import React, { useCallback } from 'react';
import { StorageItem, useStorage } from '@/context/StorageContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Truck, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ItemCardProps {
    item: StorageItem;
}

export const ItemCard = React.memo(function ItemCard({ item }: ItemCardProps) {
    const { requestRetrieval, requestStorage } = useStorage();

    const canRequestRetrieval = item.status === 'in-vault';
    const canRequestStorage = item.status === 'with-user';
    const actionEnabled = canRequestRetrieval || canRequestStorage;

    const handleAction = useCallback(() => {
        if (canRequestRetrieval) {
            requestRetrieval(item.id);
        } else if (canRequestStorage) {
            requestStorage(item.id);
        }
    }, [canRequestRetrieval, canRequestStorage, item.id, requestRetrieval, requestStorage]);

    const statusColor: Record<StorageItem['status'], React.ComponentProps<typeof Badge>['variant']> = {
        placed: 'outline',
        'pickup-scheduled': 'secondary',
        'out-for-pickup': 'secondary',
        'in-vault': 'default',
        'out-for-delivery': 'secondary',
        'with-user': 'outline',
    };

    const statusIcon: Record<StorageItem['status'], React.ReactNode> = {
        placed: <Package className="w-4 h-4 mr-1" />,
        'pickup-scheduled': <Clock className="w-4 h-4 mr-1" />,
        'out-for-pickup': <Truck className="w-4 h-4 mr-1" />,
        'in-vault': <Package className="w-4 h-4 mr-1" />,
        'out-for-delivery': <Truck className="w-4 h-4 mr-1" />,
        'with-user': <Clock className="w-4 h-4 mr-1" />,
    };

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link href={`/items/${item.id}`} className="block">
                <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center">
                    <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-2"
                    />
                    <div className="absolute top-2 right-2">
                        <Badge variant={statusColor[item.status]}>
                            {statusIcon[item.status]}
                            {item.status.replace(/-/g, ' ')}
                        </Badge>
                    </div>
                </div>
                <CardHeader>
                    <CardTitle className="text-lg hover:text-primary transition-colors">{item.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between text-sm">
                        <span>Value: ₹{item.value}</span>
                        <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full uppercase font-bold tracking-wider">
                            {item.hubType} HUB
                        </span>
                    </div>
                </CardContent>
            </Link>
            <CardFooter>
                <Button
                    onClick={handleAction}
                    className="w-full"
                    variant={canRequestRetrieval ? 'default' : 'secondary'}
                    disabled={!actionEnabled}
                >
                    {canRequestRetrieval ? 'Retrieval (10m)' : canRequestStorage ? 'Store Item' : 'No Action Available'}
                </Button>
            </CardFooter>
        </Card>
    );
});
