'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PricingCalculator } from '@/components/features/PricingCalculator';
import { ArrowRight, Zap, Box, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 min-h-[90vh] flex items-center">
        {/* Slanted Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600 transform -skew-x-12 translate-x-1/4 z-0 hidden lg:block" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <div className="space-y-8 max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Cloud Storage for Your <span className="text-blue-600">Home</span>
              </h1>
              <p className="text-xl text-slate-600 lg:text-slate-800 leading-relaxed max-w-lg">
                Secure physical storage for your stuff, with 10-minute flash retrieval.
                Stop paying for square footage you use once a year.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-blue-200 hover:shadow-2xl transition-all">
                    Get Started <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2">
                    Watch How It Works
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/hero_reference.png"
                  alt="Organized Living"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
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

      {/* Digital Closet Feature */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-100">
                <img
                  src="/digital_closet_reference.png"
                  alt="Digital Closet App"
                  className="w-full h-auto"
                />
              </div>
              {/* Decor elements */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
                <Box className="w-4 h-4" />
                <span>Smart Inventory</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Your Digital Closet. <br />
                <span className="text-slate-400">See everything you store.</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Forget digging through dusty boxes. We photograph every item you store and create a beautiful online catalog.
                Browse your stuff on your phone, organize into collections, and request delivery with a tap.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "High-quality photo catalog of every item",
                  "Organize with custom tags and categories",
                  "One-click retrieval requests"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Storage Simplified
            </h2>
            <p className="text-lg text-slate-600">
              Three simple steps to reclaim your space.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-blue-100 -z-10"></div>

            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-blue-50 shadow-lg z-10">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">We Pick Up</h3>
              <p className="text-slate-600 leading-relaxed max-w-sm">
                Schedule a pickup time that works for you. We bring durable storage bins and handle all the heavy lifting.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-blue-50 shadow-lg z-10">
                <span className="text-3xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">We Store</h3>
              <p className="text-slate-600 leading-relaxed max-w-sm">
                Your items are stored in our secure, climate-controlled facility. We create a photo catalog so you always know what's there.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-blue-50 shadow-lg z-10">
                <span className="text-3xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">We Deliver</h3>
              <p className="text-slate-600 leading-relaxed max-w-sm">
                Need something back? Tap the item in your app, and we'll rush it to your door in as little as 10 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-24 bg-[#FDFAF5]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-16 px-4">
            Perfect For Urban Indian Living
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[
              {
                label: "Seasonal Storage",
                img: "/use_case_seasonal.png",
                text: "Store heavy quilts, woolens, and winter gear during summer months. Retrieve them instantly when the temperature drops—no more hunting through packed cupboards."
              },
              {
                label: "Hobby Equipment",
                img: "/use_case_hobby.png",
                text: "Keep your table tennis table, badminton gear, or photography equipment safe without sacrificing your living room. Access them whenever inspiration strikes."
              },
              {
                label: "Life Transitions",
                img: "/use_case_sentimental.png", // Using the sentimental image for life transitions based on context
                text: "Moving flats? Renovating? Store your belongings securely during transitions. We'll keep everything safe until you're ready for delivery to your new address."
              },
              {
                label: "Festival Essentials",
                img: "/use_case_decor.png",
                text: "Store Diwali decorations, Holi colours, or Durga Puja items between celebrations. They'll stay fresh and accessible without taking up year-round cupboard space."
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-start group">
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 shadow-sm">
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-3">{item.label}</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance & Trust */}
      {/* Insurance & Trust */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Bank-Grade Security & Trust
            </h2>
            <p className="text-lg text-slate-600">
              We take the safety of your belongings as seriously as you do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "24/7 Surveillance",
                desc: "Our facilities are monitored 'round the clock with HD CCTV and motion sensors.",
                icon: <ShieldCheck className="w-8 h-8 text-blue-600" />
              },
              {
                title: "Comprehensive Insurance",
                desc: "Every item is insured against damage, theft, and loss up to ₹50,000 per box.",
                icon: <Zap className="w-8 h-8 text-blue-600" />
              },
              {
                title: "Climate Control",
                desc: "Temperature and humidity are strictly regulated to preserve fabrics, photos, and electronics.",
                icon: <Box className="w-8 h-8 text-blue-600" />
              },
              {
                title: "Condition Documentation",
                desc: "We photograph and document the condition of every item upon arrival for full transparency.",
                icon: <ShieldCheck className="w-8 h-8 text-blue-600" /> // Using ShieldCheck again or similar
              }
            ].map((feature, i) => (
              <div key={i} className="flex gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retrieval Speeds Section */}
      <section className="py-24 bg-blue-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Understanding Retrieval Speeds: <br />
              <span className="text-blue-600">Fast or Scheduled</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We've designed a hybrid system that balances speed with affordability.
              Here's how delivery timing works based on what you're retrieving:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Flash Items Card */}
            <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Flash Items</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Item Types</h4>
                  <p className="text-slate-700">Jackets, documents, small boxes, hobby kits, seasonal clothing</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Delivery Time</h4>
                  <p className="text-blue-700 font-bold text-lg">10–60 minutes</p>
                  <p className="text-sm text-slate-500">From local Micro-Hubs</p>
                </div>
              </div>
            </div>

            {/* Bulky Items Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                  <Box className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Bulky Items</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Item Types</h4>
                  <p className="text-slate-700">Table tennis tables, furniture, 5+ cartons, sports equipment</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Delivery Time</h4>
                  <p className="text-blue-700 font-bold text-lg">2–4 hour scheduled window</p>
                  <p className="text-sm text-slate-500">From Mega-Hubs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-slate-500 italic">
              This approach keeps costs low whilst ensuring you get everyday essentials instantly and larger items delivered efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-slate-600">
              Pay only for what you store. No hidden fees, ever.
            </p>
          </div>
          <PricingCalculator />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Ready to Reclaim Your Space?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Stop letting clutter dictate how you live. With physical cloud storage, you can enjoy a spacious,
              organised home whilst keeping everything you need just a tap away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200">
                Download App
              </Button>
              <Link href="#pricing">
                <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-full border-2 border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-slate-300">
                  View Pricing
                </Button>
              </Link>
            </div>

            <div className="pt-12 flex flex-wrap justify-center gap-8 text-sm font-bold tracking-widest text-slate-400 uppercase">
              <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-blue-600" /> Fully Insured</span>
              <span className="flex items-center gap-2"><Zap className="w-5 h-5 text-blue-600" /> 10-Min Delivery</span>
              <span className="flex items-center gap-2"><Box className="w-5 h-5 text-blue-600" /> App Controlled</span>
            </div>
          </div>
        </div>
      </section>
    </div >
  );
}
