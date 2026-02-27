'use client';

import { usePricing } from '@/hooks/usePricing';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useStorage, StorageTier } from '@/context/StorageContext';

export function PricingCalculator() {
    const { calculateTotal, tiers } = usePricing();
    const { currentTier, setTier } = useStorage();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.entries(tiers ?? {}) as [StorageTier, any][]).map(([key, tier], idx) => (
                <Card
                    key={key}
                    className={`relative ${currentTier === key ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'} transition-all duration-300 ${idx === 3 ? 'md:col-start-2' : ''}`}
                >
                    {currentTier === key && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                            CURRENT PLAN
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle>{tier.name}</CardTitle>
                        <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">
                            ₹{tier.price}<span className="text-sm font-normal text-muted-foreground">/mo</span>
                        </div>
                        <ul className="space-y-2">
                            {(tier.features || []).map((feature: string, index: number) => (
                                <li key={index} className="flex items-center text-sm">
                                    <Check className="w-4 h-4 text-green-500 mr-2" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() => setTier(key)}
                            variant={currentTier === key ? 'default' : 'outline'}
                            className="w-full"
                        >
                            {currentTier === key ? 'Active' : 'Select Plan'}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
