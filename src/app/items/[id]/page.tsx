"use client";

import { useStorage } from '@/context/StorageContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';

export default function ItemDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { items, requestRetrieval, requestStorage } = useStorage();
    const resolvedParams = use(params);
    const item = items.find(i => i.id === resolvedParams.id);

    if (!items.length) {
        // Data might be loading, we handle this gracefully or assume context is loaded
        return <div className="p-12 text-center text-text-secondary-light dark:text-text-secondary-dark">Loading item...</div>;
    }

    if (!item) {
        return notFound();
    }

    const isOut = item.status === 'out-for-delivery' || item.status === 'with-user';

    return (
        <ProtectedRoute>
            <div className="flex-1 w-full max-w-[1200px] mx-auto transition-colors duration-200" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-8 text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">
                    <Link href="/dashboard" className="hover:text-primary-custom transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="hover:text-primary-custom transition-colors cursor-pointer">Orders</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="hover:text-primary-custom transition-colors cursor-pointer">Order #12345</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-text-primary-light dark:text-text-primary-dark truncate">{item.name || 'UltraSpeed Wireless Earbuds'}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column: Item Photo & Details */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* Product Card */}
                        <div className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-border-light dark:border-border-dark">
                            <div className="aspect-[4/3] w-full bg-background-light dark:bg-background-dark relative overflow-hidden group">
                                <div className="absolute inset-0 bg-center bg-contain bg-no-repeat transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url("${item.imageUrl}")` }}></div>
                                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-text-primary-light dark:text-text-primary-dark shadow-sm uppercase tracking-wider">
                                    In Stock
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">{item.name || 'UltraSpeed Wireless Earbuds'}</h1>
                                    <div className="text-xl font-bold text-primary-custom">{item.value ? `₹${item.value}` : '$129.00'}</div>
                                </div>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-base leading-relaxed mb-6">
                                    Experience high-fidelity sound with our latest UltraSpeed Wireless Earbuds. Featuring active noise cancellation, 30-hour battery life, and seamless connectivity.
                                </p>

                                <div className="flex flex-wrap gap-4 text-sm text-text-secondary-light dark:text-text-secondary-dark border-t border-border-light dark:border-border-dark pt-6">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary-custom">inventory_2</span>
                                        <span className="capitalize">SKU: FS-9921-X</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary-custom">palette</span>
                                        <span className="uppercase">Color: Midnight Black</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary-custom">verified</span>
                                        <span className="truncate max-w-[150px]">Warranty: 2 Years</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Retrieval/Storage CTA Banner */}
                        <div className="bg-gradient-to-r from-[#2c3e50] to-[#1a252f] dark:from-[#1a252f] dark:to-black rounded-xl p-6 text-white relative overflow-hidden shadow-md">
                            {/* Abstract Background Pattern */}
                            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,32.2C59,42.9,47.1,51.4,35.2,58.3C23.3,65.2,11.4,70.5,-1.6,73.3C-14.6,76.1,-30.2,76.4,-43.3,69.9C-56.4,63.4,-67,50.1,-74.3,35.3C-81.6,20.5,-85.6,4.2,-82.9,-10.8C-80.2,-25.8,-70.8,-39.5,-58.5,-47.5C-46.2,-55.5,-31,-57.8,-17.7,-60.1C-4.4,-62.4,7,-64.7,19.8,-68.8" fill="#FF6933" transform="translate(100 100)"></path>
                                </svg>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary-custom">local_shipping</span>
                                        Express Delivery Available
                                    </h3>
                                    <p className="text-gray-300 text-sm mb-4">
                                        Get it by <span className="text-white font-bold">Tomorrow, 2:00 PM</span> if you order within the next 2 hours.
                                    </p>
                                    <button
                                        disabled={item.status === 'out-for-delivery'}
                                        onClick={() => !isOut ? requestRetrieval(item.id) : requestStorage(item.id)}
                                        className="bg-primary-custom hover:bg-primary-dark disabled:opacity-50 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-primary-custom/30 flex items-center gap-2 w-full sm:w-auto justify-center"
                                    >
                                        Schedule Delivery
                                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                    </button>
                                </div>
                                {/* Illustration Placeholder */}
                                <div className="w-full sm:w-48 h-32 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center p-4 relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-6xl text-primary-custom/80 animate-pulse">rocket_launch</span>
                                    </div>
                                    <div className="absolute top-2 right-2 bg-primary-custom text-white text-[10px] font-bold px-2 py-0.5 rounded-full">FAST</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Status & Location */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Tracking Status Card */}
                        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                            <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary-custom">radar</span>
                                Live Tracking
                            </h3>

                            {/* Network Diagram */}
                            <div className="relative bg-background-light dark:bg-background-dark rounded-lg p-6 mb-8 border border-border-light dark:border-border-dark h-64 flex items-center justify-center overflow-hidden">
                                {/* Abstract Map Grid */}
                                <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{ backgroundImage: 'radial-gradient(#8d6a5e 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                                {/* Connecting Lines */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                                    <path className={`opacity-40 transition-all duration-1000 ${item.status === 'out-for-delivery' ? 'stroke-primary-custom animate-pulse' : 'stroke-[#8d6a5e]'}`} d="M 80 160 L 160 80 L 240 140" fill="none" strokeDasharray="4 4" strokeWidth="2"></path>
                                </svg>

                                {/* Vault Node */}
                                <div className="absolute left-[20%] top-[60%] flex flex-col items-center gap-2">
                                    <div className={`size-3 rounded-full ${item.status === 'in-vault' ? 'bg-primary-custom ring-4 ring-primary-custom/20' : 'bg-neutral-300 dark:bg-neutral-600'}`}></div>
                                    <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">South Hub</span>
                                </div>

                                {/* Transit Node (Active) */}
                                <div className="absolute left-[50%] top-[30%] -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                                    <div className="relative size-6">
                                        {item.status === 'out-for-delivery' && <div className="absolute inset-0 bg-primary-custom rounded-full animate-pulse opacity-50 relative animate-ping"></div>}
                                        <div className={`absolute inset-1.5 rounded-full ${item.status === 'out-for-delivery' ? 'bg-primary-custom shadow-[0_0_10px_#ff6933]' : 'bg-neutral-300 dark:bg-neutral-600'}`}></div>
                                    </div>
                                    {item.status === 'out-for-delivery' && (
                                        <div className="bg-white dark:bg-surface-dark px-3 py-1 rounded shadow-lg border border-primary-custom/20 flex flex-col items-center min-w-[140px] mt-2">
                                            <span className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark">North East Mega-Hub</span>
                                            <span className="text-[10px] text-primary-custom font-medium">Processing...</span>
                                        </div>
                                    )}
                                </div>

                                {/* User Node */}
                                <div className="absolute right-[20%] top-[55%] flex flex-col items-center gap-2">
                                    <div className={`size-3 rounded-full border-2 ${item.status === 'with-user' ? 'border-primary-custom bg-white ring-4 ring-primary-custom/20' : 'border-neutral-300 dark:border-neutral-600'}`}></div>
                                    <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Local Hub</span>
                                </div>
                            </div>

                            {/* Step Tracker */}
                            <div className="relative pl-4 space-y-8 before:absolute before:left-[21px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border-light dark:before:bg-border-dark">
                                {/* Step 1: In Vault */}
                                <div className="relative flex items-start gap-4">
                                    <div className={`absolute left-0 mt-1 size-3 rounded-full ring-4 ring-white dark:ring-surface-dark z-10 ${item.status === 'in-vault' ? 'bg-primary-custom border-2 border-primary-custom' : 'bg-primary-custom'}`}></div>
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-bold ${item.status === 'in-vault' ? 'text-primary-custom' : 'text-text-primary-light dark:text-text-primary-dark'}`}>Order Requested</span>
                                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Oct 24, 09:41 AM</span>
                                    </div>
                                </div>

                                {/* Step 2: Packed */}
                                <div className={`relative flex items-start gap-4 ${item.status === 'in-vault' ? 'opacity-50' : ''}`}>
                                    <div className={`absolute left-0 mt-1 size-3 rounded-full ring-4 ring-white dark:ring-surface-dark z-10 ${item.status === 'out-for-delivery' ? 'bg-primary-custom' : (item.status === 'with-user' ? 'bg-primary-custom' : 'bg-primary-custom')}`}></div>
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-bold ${item.status === 'out-for-delivery' ? 'text-text-primary-light dark:text-text-primary-dark' : 'text-text-primary-light dark:text-text-primary-dark'}`}>Packed & Ready</span>
                                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Oct 24, 02:15 PM</span>
                                    </div>
                                </div>

                                {/* Step 3: Transit */}
                                <div className={`relative flex items-start gap-4 ${item.status === 'in-vault' ? 'opacity-50' : ''}`}>
                                    <div className={`absolute left-0 mt-1 size-3 rounded-full ring-4 ring-white dark:ring-surface-dark z-10 ${item.status === 'out-for-delivery' ? 'bg-white dark:bg-surface-dark border-[3px] border-primary-custom shadow-[0_0_10px_#ff6933_inset]' : (item.status === 'with-user' ? 'bg-primary-custom' : 'bg-border-light dark:bg-border-dark')}`}></div>
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-bold ${item.status === 'out-for-delivery' ? 'text-primary-custom' : 'text-text-primary-light dark:text-text-primary-dark'}`}>In Transit to Hub</span>
                                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Currently at North East Node 4A</span>
                                    </div>
                                </div>

                                {/* Step 4: With User */}
                                <div className={`relative flex items-start gap-4 ${item.status !== 'with-user' ? 'opacity-50' : ''}`}>
                                    <div className={`absolute left-0 mt-1 size-3 rounded-full ring-4 ring-white dark:ring-surface-dark z-10 ${item.status === 'with-user' ? 'bg-primary-custom border-2 border-primary-custom' : 'bg-border-light dark:bg-border-dark'}`}></div>
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-bold ${item.status === 'with-user' ? 'text-primary-custom' : 'text-text-primary-light dark:text-text-primary-dark'}`}>Delivered</span>
                                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Estimated Oct 26</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Support Card */}
                        <div className="bg-background-light dark:bg-background-dark rounded-xl p-5 border border-transparent dark:border-border-dark flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-white dark:bg-surface-dark p-2 rounded-full text-text-secondary-light dark:text-text-secondary-dark shadow-sm">
                                    <span className="material-symbols-outlined">support_agent</span>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">Need help with this item?</div>
                                    <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Our team is available 24/7</div>
                                </div>
                            </div>
                            <button className="text-primary-custom hover:text-primary-dark text-sm font-bold transition-colors">Contact</button>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
