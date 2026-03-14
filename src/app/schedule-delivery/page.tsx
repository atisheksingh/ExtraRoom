"use client";

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CalendarClock, CheckCircle2 } from 'lucide-react';
import { useStorage } from '@/context/StorageContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const TIME_SLOTS = ['09:00 AM', '11:00 AM', '02:00 PM', '04:30 PM'];

function todayISO() {
    return new Date().toISOString().split('T')[0];
}

export default function ScheduleDeliveryPage() {
    const router = useRouter();
    const params = useSearchParams();
    const { items } = useStorage();

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

    const [date, setDate] = useState(todayISO());
    const [time, setTime] = useState('');

    const canContinue = selectedItems.length > 0 && Boolean(date) && Boolean(time);

    const continueToPayment = () => {
        if (!canContinue) return;
        const itemIds = encodeURIComponent(selectedItems.map((i) => i.id).join(','));
        const qDate = encodeURIComponent(date);
        const qTime = encodeURIComponent(time);
        router.push(`/payment?itemIds=${itemIds}&date=${qDate}&time=${qTime}`);
    };

    return (
        <ProtectedRoute>
            <div className="mx-auto w-full max-w-4xl py-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Schedule Delivery</h1>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Choose one date and time slot for all selected items before payment.</p>
                    </div>
                    <Link href="/dashboard" className="text-sm font-semibold text-primary-custom hover:underline">Back to Dashboard</Link>
                </div>

                {selectedItems.length === 0 ? (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
                        <p className="font-semibold">No placed items selected.</p>
                        <p className="text-sm mt-1">Go back and select one or more items first.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-5">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <CalendarClock className="w-5 h-5 text-primary-custom" />
                                Schedule Details
                            </h2>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="delivery-date" className="block text-sm font-semibold mb-2">Delivery Date</label>
                                    <input
                                        id="delivery-date"
                                        type="date"
                                        min={todayISO()}
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
                                    />
                                </div>
                                <div>
                                    <p className="block text-sm font-semibold mb-2">Time Slot</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {TIME_SLOTS.map((slot) => (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => setTime(slot)}
                                                className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${time === slot
                                                    ? 'border-primary-custom bg-primary-custom text-white'
                                                    : 'border-slate-300 dark:border-slate-700'
                                                    }`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                                <p className="text-sm font-semibold mb-3">Selected Items ({selectedItems.length})</p>
                                <div className="space-y-3">
                                    {selectedItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <img src={item.imageUrl} alt={item.name} className="h-12 w-12 rounded bg-slate-100 object-contain p-1" />
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold truncate">{item.name}</p>
                                                <p className="text-xs text-slate-500">{item.category}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 h-fit space-y-4">
                            <h2 className="text-lg font-bold">Ready to Continue</h2>
                            <div className="text-sm space-y-1">
                                <p>Date: <span className="font-semibold">{date || 'Not selected'}</span></p>
                                <p>Time: <span className="font-semibold">{time || 'Not selected'}</span></p>
                            </div>
                            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-800 text-xs flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 mt-0.5" />
                                <span>Next step is payment. After payment, all these items move to pickup-scheduled.</span>
                            </div>
                            <button
                                type="button"
                                disabled={!canContinue}
                                onClick={continueToPayment}
                                className="w-full bg-primary-custom hover:bg-primary-dark disabled:opacity-50 text-white font-bold py-2.5 rounded-lg"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}
