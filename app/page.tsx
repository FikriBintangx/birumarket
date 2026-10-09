'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Zap, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setFeaturedProducts(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const currentHighlight = featuredProducts[activeHighlightIndex] || {
    title: 'QRIS Digital Dropship Platform',
    category: 'E-COMMERCE',
    price: 650000,
    is_portfolio: false,
    thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0a67daf4002a?auto=format&fit=crop&w=800&q=80',
    demo_url: 'https://birumarket.web.id',
    description: 'Sistem marketplace auto-order digital product terintegrasi QRIS Tripay.',
    tech_stack: ['Playwright', 'Express', 'Tripay'],
  };

  const nextHighlight = () => {
    if (featuredProducts.length > 0) {
      setActiveHighlightIndex((prev) => (prev + 1) % featuredProducts.length);
    }
  };

  const prevHighlight = () => {
    if (featuredProducts.length > 0) {
      setActiveHighlightIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    }
  };

  return (
    <main>
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section Card (Deep Blue 3D Claymorphic Canvas) */}
      <section className="hero-teal-canvas rounded-[2.2rem] md:rounded-[2.8rem] p-7 md:p-12 min-h-[500px] md:min-h-[560px] flex flex-col justify-between text-white relative shadow-inner">
        {/* 3D Claymation Background Scene */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute right-24 top-16 w-14 h-14 rounded-full bg-gradient-to-tr from-white/90 to-white/40 shadow-xl opacity-90 blur-[1px]"></div>

          <svg viewBox="0 0 1000 600" className="absolute right-0 bottom-0 w-full h-full opacity-90 object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="blueCloudGrad1" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="50%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#2563EB" />
              </radialGradient>
              <radialGradient id="blueCloudGrad2" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#BAE6FD" />
                <stop offset="60%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
              </radialGradient>
              <linearGradient id="buildingRoof" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <linearGradient id="buildingWall" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
              <linearGradient id="classicalColumn" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F1F5F9" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
            </defs>

            <g className="clay-tree">
              <path d="M 460 280 C 440 200, 520 150, 580 180 C 640 140, 720 180, 730 240 C 780 250, 800 320, 760 360 C 720 400, 600 420, 520 380 C 460 350, 470 310, 460 280 Z" fill="url(#blueCloudGrad1)" opacity="0.95" />
              <circle cx="780" cy="280" r="85" fill="url(#blueCloudGrad2)" opacity="0.9" />
              <circle cx="850" cy="320" r="70" fill="url(#blueCloudGrad1)" opacity="0.85" />
              <circle cx="700" cy="220" r="60" fill="url(#blueCloudGrad2)" opacity="0.95" />
              <circle cx="610" cy="180" r="50" fill="url(#blueCloudGrad1)" opacity="0.95" />
            </g>

            <g className="clay-house" transform="translate(480, 210)">
              <polygon points="120,40 260,40 190,0" fill="url(#buildingRoof)" />
              <rect x="125" y="40" width="130" height="15" fill="#E2E8F0" />
              <rect x="135" y="55" width="12" height="70" rx="3" fill="url(#classicalColumn)" />
              <rect x="165" y="55" width="12" height="70" rx="3" fill="url(#classicalColumn)" />
              <rect x="205" y="55" width="12" height="70" rx="3" fill="url(#classicalColumn)" />
              <rect x="235" y="55" width="12" height="70" rx="3" fill="url(#classicalColumn)" />
              <rect x="120" y="125" width="140" height="15" rx="2" fill="#E2E8F0" />

              <g transform="translate(160, 45)">
                <polygon points="40,25 150,25 95,-15" fill="#2563EB" />
                <rect x="45" y="25" width="100" height="90" rx="6" fill="url(#buildingWall)" />
                <rect x="85" y="70" width="22" height="45" rx="3" fill="#1E3A8A" />
                <rect x="55" y="45" width="22" height="22" rx="4" fill="#38BDF8" />
                <rect x="115" y="45" width="22" height="22" rx="4" fill="#38BDF8" />
              </g>
            </g>

            <ellipse cx="620" cy="480" rx="140" ry="65" fill="#93C5FD" opacity="0.9" />
            <ellipse cx="820" cy="510" rx="180" ry="75" fill="#3B82F6" opacity="0.95" />
            <ellipse cx="490" cy="520" rx="90" ry="50" fill="#60A5FA" opacity="0.8" />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl pt-2 sm:pt-4">
          <h1 className="font-['Syne',sans-serif] text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight leading-[1.1] text-white">
            <span>GET RID OF ANY</span><br />
            <span className="text-blue-200">RISKS TO APPS & WEBS</span>
          </h1>

          <div className="inline-block mt-3 bg-white/10 backdrop-blur-md px-3 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase text-white/90 border border-white/20">
            Marketplace BiruMarket — Web & Mobile Apps Ready-to-Run
          </div>

          <p className="mt-3 sm:mt-4 text-white/90 text-xs sm:text-base md:text-lg max-w-xl font-normal leading-relaxed">
            Protect your digital acquisitions from unverified code, fake revenue, and transfer disputes life may throw your way.
          </p>
        </div>

        {/* Horizontal Pill Filters */}
        <div className="relative z-10 mt-8 sm:mt-12 flex items-center gap-2 sm:gap-3 overflow-x-auto max-w-full pb-2 no-scrollbar">
          <Link href="/catalog?category=E-COMMERCE" className="bg-white text-blue-900 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm tracking-wider uppercase shadow-lg hover:bg-blue-50 transition whitespace-nowrap shrink-0">
            E-COMMERCE
          </Link>
          <Link href="/catalog?category=SAAS+WEB" className="bg-white/10 backdrop-blur-md border border-white/40 text-white hover:bg-white/20 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition whitespace-nowrap shrink-0">
            SAAS WEB
          </Link>
          <Link href="/catalog?category=MOBILE+APPS" className="bg-white/10 backdrop-blur-md border border-white/40 text-white hover:bg-white/20 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition whitespace-nowrap shrink-0">
            MOBILE APPS
          </Link>
          <Link href="/catalog?category=SCRIPTS+%26+BOTS" className="bg-white/10 backdrop-blur-md border border-white/40 text-white hover:bg-white/20 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition whitespace-nowrap shrink-0">
            SCRIPTS & BOTS
          </Link>
        </div>
      </section>

      {/* Lower Section Grid */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col (5): Occasions & Featured Item */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900 leading-none">
                SOFTWARE FOR ANY OCCASIONS
              </h2>

              <div className="flex items-center -space-x-2 shrink-0 ml-3">
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Customer avatar" />
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Developer avatar" />
              </div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed max-w-md">
              Different types of web apps & verified digital software. Choose according to your goals and tech stack.
            </p>
          </div>

          {/* Featured Product Highlight Card (Icy Blue Theme) */}
          <div className="bg-[#E0F2FE] rounded-[2rem] p-4 sm:p-5 relative overflow-hidden shadow-sm border border-sky-200 group">
            
            {/* Top Occasions Header inside Col */}
            <div className="min-h-[260px] sm:h-72 rounded-2xl bg-gradient-to-b from-[#DBEAFE] via-[#60A5FA] to-[#1D4ED8] flex items-center justify-center relative overflow-hidden p-4 sm:p-6 mb-4 shadow-inner">
              
              {/* Circular Link Button (Top Right) */}
              <Link
                href="/catalog"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-md hover:scale-110 hover:bg-blue-600 hover:text-white transition duration-200 z-20"
                title="Lihat di Katalog"
              >
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </Link>

              {/* Prev / Next Controls */}
              <button
                onClick={prevHighlight}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition z-20"
                title="Produk Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={nextHighlight}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition z-20"
                title="Produk Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Floating White Card */}
              <div className="relative z-10 w-[88%] sm:w-full max-w-[280px] sm:max-w-xs bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/80 text-left transition-all duration-300">
                
                {/* Blue Overlapping Top Badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-3 sm:px-3.5 py-1 rounded-full shadow-md whitespace-nowrap">
                  FEATURED APP
                </div>

                <div className="pt-2">
                  <h4 className="text-sm font-extrabold text-slate-900 line-clamp-2">
                    {currentHighlight.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {currentHighlight.description}
                  </p>
                </div>

                <div className="my-2.5 sm:my-3 border-t border-slate-100"></div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-700">
                    {currentHighlight.is_portfolio ? 'Showcase' : 'Ready to Deploy'}
                  </span>
                  <span className="text-xs font-black text-blue-600">
                    {currentHighlight.is_portfolio
                      ? 'Portfolio'
                      : `Rp ${Number(currentHighlight.price).toLocaleString('id-ID')}`}
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Footer Text */}
            <div className="flex items-center justify-between px-1 sm:px-2 pt-1">
              <span className="font-bold text-xs text-slate-900">
                {currentHighlight.category === 'E-COMMERCE'
                  ? 'Turnkey E-commerce Property'
                  : currentHighlight.category === 'SAAS WEB'
                  ? 'Cloud SaaS Architecture'
                  : currentHighlight.category === 'MOBILE APPS'
                  ? 'Cross-Platform App Native'
                  : 'Automated Bot & Script'}
              </span>
              <span className="text-xs font-bold text-blue-600">
                100% Verified SQLite
              </span>
            </div>

          </div>
        </div>

        {/* Right Col (7): Benefits Section */}
        <div className="lg:col-span-7 bg-white rounded-[2rem] p-7 md:p-9 shadow-sm border border-slate-200/70 flex flex-col justify-between space-y-7">
          <div>
            <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900 leading-tight">
              BENEFITS YOU CAN GET BY USING OUR SERVICES
            </h2>
            <div className="mt-4">
              <span className="border border-blue-200 bg-blue-50 text-blue-700 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest inline-block">
                MAIN RISKS
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Benefit 1 */}
            <div className="py-5 first:pt-2 flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 shadow-sm border border-blue-100 text-blue-600">
                <Zap className="w-7 h-7 stroke-[2]" />
              </div>
              <div>
                <h3 className="font-['Syne',sans-serif] font-extrabold text-slate-900 text-base uppercase tracking-wider">
                  MISHAPPENINGS
                </h3>
                <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                  It helps personal or commercial apps during the time of mishappening, server crashes, or fatal codebase bugs.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="py-5 flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center shrink-0 shadow-sm border border-sky-100 text-sky-600">
                <ShieldCheck className="w-7 h-7 stroke-[2]" />
              </div>
              <div>
                <h3 className="font-['Syne',sans-serif] font-extrabold text-slate-900 text-base uppercase tracking-wider">
                  LIABILITY ELEMENTS
                </h3>
                <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                  The escrow coverage element helps save time and money against disputes, fake revenue claims, and transaction lawsuits.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="py-5 last:pb-2 flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0 shadow-sm border border-indigo-100 text-indigo-600">
                <Lock className="w-7 h-7 stroke-[2]" />
              </div>
              <div>
                <h3 className="font-['Syne',sans-serif] font-extrabold text-slate-900 text-base uppercase tracking-wider">
                  BUSINESS SAFETY
                </h3>
                <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                  To safeguard the digital belongings of the website or business property, that includes all domain licenses and database assets.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Link
              href="/catalog"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-full inline-flex items-center gap-2 text-sm shadow-md transition"
            >
              <span>Explore All Catalog Products</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
