'use client';

import { StorageItem, useStorage } from '@/context/StorageContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Truck, Clock } from 'lucide-react';
import Image from 'next/image';

interface ItemCardProps {
    item: StorageItem;
}

export function ItemCard({ item }: ItemCardProps) {
    const { requestRetrieval, requestStorage } = useStorage();

    const handleAction = () => {
        if (item.status === 'in-vault') {
            requestRetrieval(item.id);
        } else {
            requestStorage(item.id);
        }
    };

    const statusColor = {
        'in-vault': 'default',
        'out-for-delivery': 'secondary',
        'with-user': 'outline',
    } as const;

    const statusIcon = {
        'in-vault': <Package className="w-4 h-4 mr-1" />,
        'out-for-delivery': <Truck className="w-4 h-4 mr-1" />,
        'with-user': <Clock className="w-4 h-4 mr-1" />,
    };

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 w-full bg-gray-100">
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-2 right-2">
                    <Badge variant={statusColor[item.status]}>
                        {statusIcon[item.status]}
                        {item.status.replace(/-/g, ' ')}
                    </Badge>
                </div>
            </div>
            <CardHeader>
                <CardTitle className="text-lg">{item.name}</CardTitle>
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
            <CardFooter>
                <Button
                    onClick={handleAction}
                    className="w-full"
                    variant={item.status === 'in-vault' ? 'default' : 'secondary'}
                    disabled={item.status === 'out-for-delivery'}
                >
                    {item.status === 'in-vault' ? 'Retrieval (10m)' : 'Store Item'}
                </Button>
            </CardFooter>
        </Card>
    );
}
