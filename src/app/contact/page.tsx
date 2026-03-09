"use client";

import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        <div className="flex flex-col w-full min-h-screen transition-colors duration-200 bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Manrope, sans-serif' }}>

            {/* Blue Themed Hero Header */}
            <div className="w-full bg-indigo-600 dark:bg-indigo-800 pt-16 pb-24 px-4 text-center">
                <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
                    <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="text-indigo-100 text-lg sm:text-xl font-medium max-w-2xl px-4">
                        Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
                    </p>
                </div>
            </div>

            {/* Main Content Area - Overlapping the Header */}
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-12 pb-24">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row">

                    {/* Contact Information Sidebar */}
                    <div className="w-full lg:w-1/3 bg-indigo-50 dark:bg-indigo-950/30 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-indigo-100 dark:border-indigo-900/50">
                        <div>
                            <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-400 mb-6">Contact Information</h2>
                            <p className="text-indigo-700/80 dark:text-indigo-300/80 mb-10 text-sm">
                                Fill up the form and our Team will get back to you within 24 hours.
                            </p>

                            <div className="flex flex-col gap-8">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 size-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                        <Phone className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Phone</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 size-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                        <Mail className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Email</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">sales@flashstore.com</p>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">support@flashstore.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 size-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                        <MapPin className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Office</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                                            123 Storage Lane<br />
                                            Suite 400<br />
                                            San Francisco, CA 94103
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links / Back Link */}
                        <div className="mt-12 pt-8 border-t border-indigo-200 dark:border-indigo-900/50">
                            <Link href="/pricing" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors text-sm font-semibold">
                                <ArrowRight className="size-4 rotate-180" />
                                Back to Pricing
                            </Link>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="w-full lg:w-2/3 p-8 sm:p-10 lg:p-12">
                        {isSubmitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                                <div className="size-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4">
                                    <Send className="size-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent successfully!</h3>
                                <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-8">
                                    Thank you for reaching out. A member of our sales team will contact you shortly.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-lg transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="firstName" className="text-sm font-semibold text-slate-700 dark:text-slate-300">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            required
                                            placeholder="John"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="lastName" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            required
                                            placeholder="Doe"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Work Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        placeholder="john@company.com"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="company" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company (Optional)</label>
                                    <input
                                        type="text"
                                        id="company"
                                        placeholder="Company Name"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">How can we help?</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        placeholder="Tell us about your storage needs, team size, or any specific requirements..."
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400 resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-2 w-full h-12 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20"
                                >
                                    {isSubmitting ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-4 h-4 ml-1" />
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
                                    By submitting this form, you agree to our privacy policy and terms of service.
                                </p>
                            </form>
                        )}
                    </div>

                </div>
            </div>

            {/* Simple Footer */}
            <footer className="mt-auto py-8 border-t w-full border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="max-w-[1200px] mx-auto px-4 text-center">
                    <p className="text-slate-500 text-sm">© 2026 FlashStore Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
