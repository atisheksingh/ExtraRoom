'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PricingCalculator } from '@/components/features/PricingCalculator';
import FlashStoreHubSection from '@/components/FlashStoreHubSection';
import { ArrowRight, Zap, Box, ShieldCheck, CalendarCheck, PackageSearch, Truck } from 'lucide-react';

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

            {/* Right Column: Network Diagram */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                {/* Use the interactive hub diagram component */}
                <div className="w-[520px] p-6">
                  <FlashStoreHubSection />
                </div>
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
            <div className="relative order-2 md:order-1 flex justify-center py-8">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-100 bg-blue-50 w-full max-w-sm flex items-center justify-center p-12">
                <img
                  src="/manwithbox.png"
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

      {/* Mega-Hubs & Micro-Hubs Explanation */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Mega-Hubs & Micro-Hubs</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We operate a two-tiered network: central Mega-Hubs handle bulk, climate-controlled storage and scheduled deliveries, while Micro-Hubs act as local caches for your most-requested items so they arrive in minutes.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="mb-4 text-xl font-semibold">Mega-Hub</div>
              <p className="text-slate-600">Main warehouse — climate controlled, insured, holds everything long-term. Bulky items and scheduled deliveries are dispatched from Mega-Hubs (typical delivery window: 2–4 hours).</p>
              <div className="mt-4 flex gap-2 flex-wrap">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Cold Storage</span>
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Insured</span>
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Long-term</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="mb-4 text-xl font-semibold">Micro-Hubs</div>
              <p className="text-slate-600">Local cache points scattered across the city that hold your frequently-requested items for instant dispatch. Flash deliveries from Micro-Hubs typically arrive within 10–60 minutes.</p>
              <div className="mt-4 flex gap-2 flex-wrap">
                <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Cache</span>
                <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Flash Items</span>
                <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">10–60 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Vertical Timeline */}
      < section className="py-24 bg-white" >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center space-y-4 mb-20 hidden">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              How It Works
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Timeline */}
            <div className="relative space-y-12 pl-4 md:pl-0 pt-8">
              {/* Vertical Connecting Line (Desktop) */}
              <div className="hidden md:block absolute left-[39px] top-6 bottom-6 w-0.5 bg-slate-100 z-0"></div>

              {[
                {
                  step: "STEP 1",
                  title: "Book Your Storage Online",
                  desc: "Define your needs and book your storage seamlessly through our platform or App.",
                  icon: <CalendarCheck className="w-7 h-7 text-slate-600" />,
                  iconBg: "bg-[#B23A2B] text-white", // specific color for the first icon per screenshot
                  iconBorder: "border-transparent"
                },
                {
                  step: "STEP 2",
                  title: "Professional Packing & Digital Cataloguing",
                  desc: "Our experts will come to your location, pack the goods, and place QR codes on each item.",
                  icon: <PackageSearch className="w-7 h-7 text-slate-500" />,
                  iconBg: "bg-slate-50",
                  iconBorder: "border-slate-100"
                },
                {
                  step: "STEP 3",
                  title: "Safe & Secured Storage",
                  desc: "Your goods will be moved to our warehouse. They will be stored in a specific area demarcated for your goods.",
                  icon: <Truck className="w-7 h-7 text-slate-500" />,
                  iconBg: "bg-slate-50",
                  iconBorder: "border-slate-100"
                },
                {
                  step: "STEP 4",
                  title: "Retrieval & Delivery",
                  desc: "You may log in to your customer account by visiting our website and placing an order to retrieve your goods or get in touch with our team in case you need support.",
                  icon: <Box className="w-7 h-7 text-slate-500" />,
                  iconBg: "bg-slate-50",
                  iconBorder: "border-slate-100"
                }
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col md:flex-row gap-6 md:gap-12">
                  {/* Vertical Connecting Line (Mobile) */}
                  {i !== 3 && <div className="absolute left-[39px] top-16 bottom-[-3rem] w-0.5 bg-slate-100 z-0 md:hidden"></div>}

                  <div className={`flex-shrink-0 relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center self-start ${item.iconBg} border ${item.iconBorder}`}>
                    {i === 0 ? <CalendarCheck className="w-7 h-7 text-white" /> : item.icon}
                  </div>

                  <div className="pt-2">
                    <span className="text-sm font-bold tracking-widest text-[#B23A2B] uppercase mb-2 block">{item.step}</span>
                    <h3 className="text-[1.75rem] font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg max-w-2xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Illustration */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full aspect-square max-w-lg">
                <img
                  src="/delivery_truck.png"
                  alt="Delivery Process"
                  className="w-full h-full object-contain filter drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      < section className="py-24 bg-blue-50/50" >
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
      </section >

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
