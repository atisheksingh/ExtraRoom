"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Package, CheckCircle2, Boxes, Warehouse, Headset, Container, Video, Thermometer, Unlock, Truck } from 'lucide-react';

export default function PricingPage() {
    const [isYearly, setIsYearly] = useState(false);
    return (
        <div className="flex flex-col items-center w-full transition-colors duration-200" style={{ fontFamily: 'Manrope, sans-serif' }}>
            <div className="w-full max-w-7xl pt-8 pb-16 flex flex-col gap-10">

                {/* Hero Section */}
                <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
                    <h1 className="text-text-main dark:text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-text-muted dark:text-gray-400 text-lg sm:text-xl font-medium max-w-2xl">
                        Choose the perfect storage size for your needs. No hidden fees, cancel anytime.
                    </p>

                    {/* Toggle */}
                    <div className="mt-4 inline-flex p-1 bg-white dark:bg-surface-dark border border-border-color dark:border-white/10 rounded-xl relative">
                        <div className={`w-1/2 h-full absolute top-0 left-0 p-1 transition-transform duration-300 ease-in-out ${isYearly ? 'translate-x-full' : 'translate-x-0'}`}>
                            <div className="w-full h-full bg-primary-custom rounded-lg shadow-sm"></div>
                        </div>
                        <button
                            onClick={() => setIsYearly(false)}
                            className={`px-6 py-2 rounded-lg text-sm font-bold z-10 transition-colors ${!isYearly ? 'text-white' : 'text-text-muted dark:text-gray-400 hover:text-text-main dark:hover:text-white'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsYearly(true)}
                            className={`px-6 py-2 rounded-lg text-sm font-bold z-10 transition-colors ${isYearly ? 'text-white' : 'text-text-muted dark:text-gray-400 hover:text-text-main dark:hover:text-white'}`}
                        >
                            Yearly (-15%)
                        </button>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start pt-6">

                    {/* Basic Plan */}
                    <div className="flex flex-col h-full rounded-2xl bg-white dark:bg-surface-dark p-8 border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                        <div className="mb-6">
                            <div className="size-12 rounded-xl bg-primary-custom/10 flex items-center justify-center text-primary-custom mb-4">
                                <Package className="w-8 h-8" />
                            </div>
                            <h3 className="text-text-main dark:text-white text-xl font-bold">Small Locker</h3>
                            <p className="text-text-muted dark:text-gray-400 text-sm mt-1">Perfect for boxes and small items.</p>
                        </div>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-text-main dark:text-white text-4xl font-black tracking-tight">
                                {isYearly ? '₹1,699' : '₹1,999'}
                            </span>
                            <span className="text-text-muted dark:text-gray-400 font-medium">/mo</span>
                        </div>
                        <Link href="/add-item" className="flex items-center justify-center w-full h-11 rounded-xl bg-background-light dark:bg-white/5 border border-transparent hover:border-primary-custom/30 text-text-main dark:text-white text-sm font-bold transition-all mb-8">
                            Select Plan
                        </Link>
                        <div className="flex flex-col gap-3 mt-auto">
                            <div className="flex gap-3 text-sm text-text-main dark:text-gray-200">
                                <CheckCircle2 className="w-5 h-5 text-primary-custom" />
                                5x5 ft unit (Walk-in closet)
                            </div>
                            <div className="flex gap-3 text-sm text-text-main dark:text-gray-200">
                                <CheckCircle2 className="w-5 h-5 text-primary-custom" />
                                Climate control
                            </div>
                            <div className="flex gap-3 text-sm text-text-main dark:text-gray-200">
                                <CheckCircle2 className="w-5 h-5 text-primary-custom" />
                                24/7 Gate Access
                            </div>
                        </div>
                    </div>

                    {/* Popular Plan */}
                    <div className="relative flex flex-col h-full rounded-2xl bg-white dark:bg-surface-dark p-8 border-2 border-primary-custom shadow-lg scale-100 md:scale-105 z-10">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-custom text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                            Most Popular
                        </div>
                        <div className="mb-6">
                            <div className="size-14 rounded-xl bg-primary-custom flex items-center justify-center text-white mb-4 shadow-md shadow-primary-custom/30">
                                <Boxes className="w-10 h-10" />
                            </div>
                            <h3 className="text-text-main dark:text-white text-xl font-bold">Medium Room</h3>
                            <p className="text-text-muted dark:text-gray-400 text-sm mt-1">Ideal for 1-bedroom apartment.</p>
                        </div>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-text-main dark:text-white text-5xl font-black tracking-tight">
                                {isYearly ? '₹5,099' : '₹5,999'}
                            </span>
                            <span className="text-text-muted dark:text-gray-400 font-medium">/mo</span>
                        </div>
                        <Link href="/add-item" className="flex items-center justify-center w-full h-11 rounded-xl bg-primary-custom hover:bg-primary-dark text-white text-sm font-bold transition-all mb-8 shadow-md shadow-primary-custom/20">
                            Select Plan
                        </Link>
                        <div className="flex flex-col gap-3 mt-auto">
                            <div className="flex gap-3 text-sm text-text-main dark:text-gray-200">
                                <CheckCircle2 className="w-5 h-5 text-primary-custom" />
                                10x10 ft unit (Standard bedroom)
                            </div>
                            <div className="flex gap-3 text-sm text-text-main dark:text-gray-200">
                                <CheckCircle2 className="w-5 h-5 text-primary-custom" />
                                Climate control
                            </div>
                            <div className="flex gap-3 text-sm text-text-main dark:text-gray-200">
                                <CheckCircle2 className="w-5 h-5 text-primary-custom" />
                                24/7 Gate Access
                            </div>
                            <div className="flex gap-3 text-sm text-text-main dark:text-gray-200">
                                <CheckCircle2 className="w-5 h-5 text-primary-custom" />
                                Free move-in truck
                            </div>
                        </div>
                    </div>

                    {/* Large Plan */}
                    <div className="flex flex-col h-full rounded-2xl bg-white dark:bg-surface-dark p-8 border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                        <div className="mb-6">
                            <div className="size-12 rounded-xl bg-primary-custom/10 flex items-center justify-center text-primary-custom mb-4">
                                <Warehouse className="w-8 h-8" />
                            </div>
                            <h3 className="text-text-main dark:text-white text-xl font-bold">Large Warehouse</h3>
                            <p className="text-text-muted dark:text-gray-400 text-sm mt-1">Multi-room house capacity.</p>
                        </div>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-text-main dark:text-white text-4xl font-black tracking-tight">
                                {isYearly ? '₹12,749' : '₹14,999'}
                            </span>
                            <span className="text-text-muted dark:text-gray-400 font-medium">/mo</span>
                        </div>
                        <Link href="/add-item" className="flex items-center justify-center w-full h-11 rounded-xl bg-background-light dark:bg-white/5 border border-transparent hover:border-primary-custom/30 text-text-main dark:text-white text-sm font-bold transition-all mb-8">
                            Select Plan
                        </Link>
                        <div className="flex flex-col gap-3 mt-auto">
                            <div className="flex gap-3 text-sm text-text-main dark:text-gray-200">
                                <CheckCircle2 className="w-5 h-5 text-primary-custom" />
                                20x20 ft unit (2-car garage)
                            </div>
                            <div className="flex gap-3 text-sm text-text-main dark:text-gray-200">
                                <CheckCircle2 className="w-5 h-5 text-primary-custom" />
                                Climate control
                            </div>
                            <div className="flex gap-3 text-sm text-text-main dark:text-gray-200">
                                <CheckCircle2 className="w-5 h-5 text-primary-custom" />
                                Drive-up access
                            </div>
                            <div className="flex gap-3 text-sm text-text-main dark:text-gray-200">
                                <CheckCircle2 className="w-5 h-5 text-primary-custom" />
                                Insurance included
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom/XL Card */}
                <div className="mt-8 rounded-2xl border-2 border-dashed border-primary-custom/30 bg-primary-custom/5 p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
                        <div className="flex flex-col gap-4 max-w-lg text-center md:text-left">
                            <div className="size-12 rounded-full bg-white dark:bg-surface-dark text-primary-custom flex items-center justify-center shadow-sm mx-auto md:mx-0">
                                <Headset className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-text-main dark:text-white">Need something bigger?</h3>
                            <p className="text-text-muted dark:text-gray-400">
                                For enterprise solutions, commercial inventory, or custom XL storage needs, our team can build a custom quote just for you.
                            </p>
                            <div className="flex gap-4 justify-center md:justify-start pt-2">
                                <button className="h-10 px-6 rounded-lg bg-text-main dark:bg-white text-white dark:text-background-dark font-bold text-sm hover:opacity-90 transition-opacity">
                                    Contact Sales
                                </button>
                                <button className="h-10 px-6 rounded-lg bg-transparent border border-text-main dark:border-white text-text-main dark:text-white font-bold text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                    View Enterprise
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 aspect-video md:aspect-square relative rounded-xl overflow-hidden bg-gradient-to-br from-primary-custom/20 to-primary-custom/5 flex items-center justify-center">
                            {/* Abstract Illustration */}
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '20px 20px', color: '#ff6933' }}></div>
                            <Container className="w-32 h-32 text-primary-custom/40" />
                        </div>
                    </div>
                </div>

                {/* Features Included */}
                <section className="py-12 w-full">
                    <h2 className="text-center text-2xl md:text-3xl font-black text-text-main dark:text-white mb-10">All Plans Include</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex flex-col items-center text-center gap-3 p-4">
                            <div className="size-12 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center text-primary-custom mb-1">
                                <Video className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-lg text-text-main dark:text-white">24/7 Surveillance</h4>
                            <p className="text-sm text-text-muted dark:text-gray-400">Round-the-clock video monitoring for peace of mind.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3 p-4">
                            <div className="size-12 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center text-primary-custom mb-1">
                                <Thermometer className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-lg text-text-main dark:text-white">Climate Control</h4>
                            <p className="text-sm text-text-muted dark:text-gray-400">Optimal temperature and humidity for your items.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3 p-4">
                            <div className="size-12 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center text-primary-custom mb-1">
                                <Unlock className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-lg text-text-main dark:text-white">App Access</h4>
                            <p className="text-sm text-text-muted dark:text-gray-400">Open gates and doors directly from your phone.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3 p-4">
                            <div className="size-12 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center text-primary-custom mb-1">
                                <Truck className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-lg text-text-main dark:text-white">Loading Docks</h4>
                            <p className="text-sm text-text-muted dark:text-gray-400">Spacious bays for easy loading and unloading.</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer Simple */}
            <footer className="mt-12 py-8 border-t w-full border-border-light dark:border-border-dark bg-white dark:bg-surface-dark">
                <div className="max-w-[1200px] mx-auto px-4 text-center">
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">© 2024 FlashStore Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
