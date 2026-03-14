"use client";

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useStorage } from '@/context/StorageContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { CreditCard, IndianRupee, ShieldCheck } from 'lucide-react';

export default function PaymentPage() {
    const router = useRouter();
    const params = useSearchParams();
    const { items, schedulePickup } = useStorage();
    const [processing, setProcessing] = useState(false);
    const scheduledDate = params.get('date') || '';
    const scheduledTime = params.get('time') || '';

    const selectedIds = useMemo(() => {
        const raw = params.get('itemIds') || '';
        return raw
            .split(',')
            .map((x) => x.trim())
            .filter(Boolean);
    }, [params]);

    const selectedItems = useMemo(
        () => items.filter((item) => selectedIds.includes(item.id) && item.status === 'placed'),
        [items, selectedIds],
    );

    const totalAmount = useMemo(() => {
        // Flat handling fee demo: 199 per item
        return selectedItems.length * 199;
    }, [selectedItems.length]);

    const handlePayAndSchedule = async () => {
        if (!selectedItems.length || !scheduledDate || !scheduledTime) return;

        setProcessing(true);
        try {
            await Promise.all(selectedItems.map((item) => schedulePickup(item.id, scheduledDate, scheduledTime)));
            router.push('/dashboard');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="mx-auto w-full max-w-4xl py-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Delivery Payment</h1>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Pay once for one or multiple selected items and schedule delivery.</p>
                    </div>
                    <Link href="/dashboard" className="text-sm font-semibold text-primary-custom hover:underline">Back to Dashboard</Link>
                </div>

                {selectedItems.length === 0 ? (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
                        <p className="font-semibold">No valid placed items selected.</p>
                        <p className="text-sm mt-1">Please select one or more items from the dashboard first.</p>
                    </div>
                ) : (!scheduledDate || !scheduledTime) ? (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
                        <p className="font-semibold">Delivery schedule missing.</p>
                        <p className="text-sm mt-1">Please choose date and time before payment.</p>
                        <Link href="/dashboard" className="text-sm font-semibold text-primary-custom hover:underline mt-3 inline-block">Back to Dashboard</Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-5">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-primary-custom" />
                                Selected Items
                            </h2>
                            <div className="space-y-3">
                                {selectedItems.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 p-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <img src={item.imageUrl} alt={item.name} className="h-14 w-14 rounded object-contain bg-slate-100 p-1" />
                                            <div className="min-w-0">
                                                <p className="font-semibold truncate">{item.name}</p>
                                                <p className="text-xs text-slate-500">{item.category}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-semibold">Fee: INR 199</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-4 h-fit">
                            <h2 className="text-lg font-bold">Payment Summary</h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Items</span>
                                    <span>{selectedItems.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Handling Fee</span>
                                    <span>INR 199 x {selectedItems.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Scheduled Date</span>
                                    <span>{scheduledDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Time Slot</span>
                                    <span>{scheduledTime}</span>
                                </div>
                                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base">
                                    <span>Total</span>
                                    <span className="flex items-center gap-1"><IndianRupee className="w-4 h-4" />{totalAmount}</span>
                                </div>
                            </div>

                            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-800 text-xs flex items-start gap-2">
                                <ShieldCheck className="w-4 h-4 mt-0.5" />
                                <span>Secure payment. After payment, all selected items move to pickup-scheduled.</span>
                            </div>

                            <button
                                type="button"
                                disabled={processing || selectedItems.length === 0}
                                onClick={handlePayAndSchedule}
                                className="w-full bg-primary-custom hover:bg-primary-dark disabled:opacity-50 text-white font-bold py-2.5 rounded-lg"
                            >
                                {processing ? 'Processing Payment...' : 'Pay & Schedule Delivery'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}
