'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PricingCalculator } from '@/components/features/PricingCalculator';
import { ArrowRight, Zap, Box, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Your Closet in the <span className="text-blue-600">Cloud</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Secure physical storage for your stuff, with 10-minute flash retrieval.
          Stop paying for square footage you use once a year.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              View My Vault <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/add-item">
            <Button size="lg" variant="outline" className="px-8">
              Store Item
            </Button>
          </Link>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-12 bg-slate-50 rounded-3xl px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
              The Problem
            </div>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">
              City living shouldn't mean living in a box.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              You're forced to choose between a cramped apartment or getting rid of things you love.
              Traditional storage units are miles away, dark, expensive, and you never remember
              what you put in which box.
            </p>
          </div>
          <div className="space-y-6">
            <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              The Solution
            </div>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">
              Infinite closet space, on demand.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We pick up your items, photograph and catalog everything online, and store them securely.
              When you need something back, tap a button and get it delivered to your door in minutes.
              It's like having an extra room, without the extra rent.
            </p>
          </div>
        </div>
      </section>


      {/* How It Works */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            How It Works
          </h2>
          <p className="text-lg text-slate-600">
            A streamlined process for your storage needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="relative flex flex-col items-center text-center p-6 space-y-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-200">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900">Pickup</h3>
            <p className="text-slate-600 leading-relaxed">
              Conveniently schedule item collection from your home, making it hassle-free to store seasonal or infrequently used belongings.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-center text-center p-6 space-y-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-200">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900">Safe Vault</h3>
            <p className="text-slate-600 leading-relaxed">
              Our secure, climate-controlled storage facilities ensure your items are protected from damage while providing peace of mind for customers.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-center text-center p-6 space-y-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-200">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-900">On-Demand Delivery</h3>
            <p className="text-slate-600 leading-relaxed">
              Enjoy fast item delivery within 10 minutes, granting you instant access to your belongings whenever you need them.
            </p>
          </div>
        </div>
      </section>

      {/* Insurance & Trust */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Insurance & Trust
          </h2>
          <p className="text-lg text-slate-300">
            Comprehensive protection for your items and peace of mind
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Comprehensive Coverage</h3>
            <p className="text-slate-300 leading-relaxed">
              Every item stored with us is fully insured against damage, theft, and loss, giving you total confidence.
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Secure Vaults</h3>
            <p className="text-slate-300 leading-relaxed">
              State-of-the-art facilities with 24/7 surveillance and strict climate control to preserve your belongings.
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Transparent Tracking</h3>
            <p className="text-slate-300 leading-relaxed">
              Real-time inventory tracking and dedicated customer support whenever you need assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold mb-2">Flash Retrieval</h3>
          <p className="text-slate-500">Get your items back in as little as 10 minutes with our network of Micro-hubs.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <Box className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold mb-2">Itemized Storage</h3>
          <p className="text-slate-500">Pay per item, not per room. Track everything digitally in your dashboard.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold mb-2">Bank-Grade Security</h3>
          <p className="text-slate-500">24/7 surveillance, climate control, and full insurance coverage for all items.</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Simple, Transparent Pricing</h2>
          <p className="text-slate-600">Choose the plan that fits your lifestyle.</p>
        </div>
        <PricingCalculator />
      </section>
    </div >
  );
}
