'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStorage } from '@/context/StorageContext';
import { useDelivery } from '@/hooks/useDelivery';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Loader2 } from 'lucide-react';

export default function AddItemPage() {
    const router = useRouter();
    const { addItem } = useStorage();
    const { schedulePickup, isScheduling } = useDelivery();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        value: 2000,
    });

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleSubmit = async () => {
        // Simulate pickup scheduling
        await schedulePickup(new Date());

        // Add item to context
        addItem({
            name: formData.name,
            category: formData.category,
            value: formData.value,
            imageUrl: '/images/cardboard-boxes.png', // Default image for new items
        });

        // Redirect to dashboard
        router.push('/dashboard');
    };

    return (
        <div className="max-w-md mx-auto py-12">
            <Card>
                <CardHeader>
                    <CardTitle>Catalog New Item (Step {step}/3)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Item Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Winter Ski Gear"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select onValueChange={(val) => setFormData({ ...formData, category: val })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Clothing">Clothing</SelectItem>
                                        <SelectItem value="Sports">Sports Equipment</SelectItem>
                                        <SelectItem value="Furniture">Furniture</SelectItem>
                                        <SelectItem value="Appliances">Appliances</SelectItem>
                                        <SelectItem value="Misc">Miscellaneous</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label>Declared Value (INR)</Label>
                                    <span className="text-sm font-bold text-blue-600">₹{formData.value}</span>
                                </div>
                                <Slider
                                    defaultValue={[2000]}
                                    max={50000}
                                    step={500}
                                    onValueChange={(vals) => setFormData({ ...formData, value: vals[0] })}
                                />
                                <p className="text-xs text-muted-foreground">Used for insurance coverage calculations.</p>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 text-center">
                            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                <h3 className="font-semibold text-green-800">Ready for Pickup</h3>
                                <p className="text-sm text-green-600 mt-1">
                                    A courier will arrive within 2 hours to collect:
                                </p>
                                <p className="font-bold mt-2">{formData.name}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                By clicking confirm, you agree to the storage terms and conditions.
                            </p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    {step > 1 && (
                        <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
                    )}
                    <div className="ml-auto">
                        {step < 3 ? (
                            <Button onClick={handleNext} disabled={!formData.name || !formData.category}>Next</Button>
                        ) : (
                            <Button onClick={handleSubmit} disabled={isScheduling}>
                                {isScheduling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Confirm Pickup
                            </Button>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
