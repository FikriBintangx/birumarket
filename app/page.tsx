'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Zap, Lock, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
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

      {/* Hero Section Card (Teal / Blue-Gray 3D Claymorphic Canvas) */}
      <section className="hero-teal-canvas rounded-[2.2rem] md:rounded-[2.8rem] p-7 md:p-12 min-h-[500px] md:min-h-[560px] flex flex-col justify-between text-white relative shadow-inner">
        {/* 3D Claymation Background Scene */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute right-24 top-16 w-14 h-14 rounded-full bg-gradient-to-tr from-white/90 to-white/40 shadow-xl opacity-90 blur-[1px]"></div>

          <svg viewBox="0 0 1000 600" className="absolute right-0 bottom-0 w-full h-full opacity-90 object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="pinkCloudGrad1" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFCAD4" />
                <stop offset="50%" stopColor="#F49097" />
                <stop offset="100%" stopColor="#DF5E6C" />
              </radialGradient>
              <radialGradient id="pinkCloudGrad2" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFDFD3" />
                <stop offset="60%" stopColor="#F28B82" />
                <stop offset="100%" stopColor="#C54E57" />
              </radialGradient>
              <linearGradient id="buildingRoof" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E76F51" />
                <stop offset="100%" stopColor="#B83B1D" />
              </linearGradient>
              <linearGradient id="buildingWall" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDFBF7" />
                <stop offset="100%" stopColor="#E2DDD5" />
              </linearGradient>
              <linearGradient id="classicalColumn" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F0EDE6" />
                <stop offset="100%" stopColor="#D4CEC3" />
              </linearGradient>
            </defs>

            <g className="clay-tree">
              <path d="M 460 280 C 440 200, 520 150, 580 180 C 640 140, 720 180, 730 240 C 780 250, 800 320, 760 360 C 720 400, 600 420, 520 380 C 460 350, 470 310, 460 280 Z" fill="url(#pinkCloudGrad1)" opacity="0.95" />
              <circle cx="780" cy="280" r="85" fill="url(#pinkCloudGrad2)" opacity="0.9" />
              <circle cx="850" cy="320" r="70" fill="url(#pinkCloudGrad1)" opacity="0.85" />
              <circle cx="700" cy="220" r="60" fill="url(#pinkCloudGrad2)" opacity="0.95" />
              <circle cx="610" cy="180" r="50" fill="url(#pinkCloudGrad1)" opacity="0.95" />
            </g>

            <g className="clay-house" transform="translate(480, 210)">
              <polygon points="120,40 260,40 190,0" fill="url(#buildingRoof)" />
              <rect x="125" y="40" width="130" height="15" fill="#EAE5DC" />
              <rect x="135" y="55" width="12" height="70" rx="3" fill="url(#classicalColumn)" />
              <rect x="165" y="55" width="12" height="70" rx="3" fill="url(#classicalColumn)" />
              <rect x="205" y="55" width="12" height="70" rx="3" fill="url(#classicalColumn)" />
              <rect x="235" y="55" width="12" height="70" rx="3" fill="url(#classicalColumn)" />
              <rect x="120" y="125" width="140" height="15" rx="2" fill="#EAE5DC" />

              <g transform="translate(160, 45)">
                <polygon points="40,25 150,25 95,-15" fill="#D9534F" />
                <rect x="45" y="25" width="100" height="90" rx="6" fill="url(#buildingWall)" />
                <rect x="85" y="70" width="22" height="45" rx="3" fill="#3B5763" />
                <rect x="55" y="45" width="22" height="22" rx="4" fill="#64B5F6" />
                <rect x="115" y="45" width="22" height="22" rx="4" fill="#64B5F6" />
              </g>
            </g>

            <ellipse cx="620" cy="480" rx="140" ry="65" fill="#E5989B" opacity="0.9" />
            <ellipse cx="820" cy="510" rx="180" ry="75" fill="#E07A5F" opacity="0.95" />
            <ellipse cx="490" cy="520" rx="90" ry="50" fill="#F4A261" opacity="0.8" />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl pt-4">
          <h1 className="font-['Syne',sans-serif] text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] text-white">
            <span>GET RID OF ANY</span><br />
            <span className="text-white">RISKS TO APPS & WEBS</span>
          </h1>

          <div className="inline-block mt-3 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-white/90 border border-white/20">
            Marketplace BiruMarket — Web & Mobile Apps Ready-to-Run
          </div>

          <p className="mt-4 text-white/90 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed">
            Protect your digital acquisitions from unverified code, fake revenue, and transfer disputes life may throw your way.
          </p>
        </div>

        {/* Horizontal Pill Filters */}
        <div className="relative z-10 mt-12 flex flex-wrap items-center gap-3">
          <Link href="/catalog?category=E-COMMERCE" className="bg-white text-slate-900 px-7 py-3 rounded-full font-black text-xs sm:text-sm tracking-wider uppercase shadow-lg hover:bg-slate-100 transition">
            E-COMMERCE
          </Link>
          <Link href="/catalog?category=SAAS+WEB" className="bg-transparent border border-white/50 text-white hover:bg-white/10 px-7 py-3 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition">
            SAAS WEB
          </Link>
          <Link href="/catalog?category=MOBILE+APPS" className="bg-transparent border border-white/50 text-white hover:bg-white/10 px-7 py-3 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition">
            MOBILE APPS
          </Link>
          <Link href="/catalog?category=SCRIPTS+%26+BOTS" className="bg-transparent border border-white/50 text-white hover:bg-white/10 px-7 py-3 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition">
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

          {/* Featured Product Highlight Card (Matches user reference mockup) */}
          <div className="bg-[#F8E3E3] rounded-[2rem] p-5 relative overflow-hidden shadow-sm border border-rose-100 group">
            
            {/* Top Occasions Header inside Col */}
            <div className="h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-[#FAD2E1] via-[#F69988] to-[#E76F51] flex items-center justify-center relative overflow-hidden p-6 mb-4 shadow-inner">
              
              {/* Circular Link Button (Top Right) */}
              <Link
                href="/catalog"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-md hover:scale-110 hover:bg-[#1C2024] hover:text-white transition duration-200 z-20"
                title="Lihat di Katalog"
              >
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </Link>

              {/* Prev / Next Controls */}
              <button
                onClick={prevHighlight}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition z-20"
                title="Produk Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={nextHighlight}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition z-20"
                title="Produk Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Floating White Card */}
              <div className="relative z-10 w-60 sm:w-64 bg-white rounded-2xl p-5 shadow-2xl border border-white/80 text-center sm:text-left transition-all duration-300">
                
                {/* Red Overlapping Top Badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D9534F] text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm whitespace-nowrap">
                  FEATURED APP
                </div>

                <div className="pt-1">
                  <h4 className="text-sm font-extrabold text-slate-900 line-clamp-1">
                    {currentHighlight.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {currentHighlight.description}
                  </p>
                </div>

                <div className="my-3 border-t border-slate-100"></div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700">
                    {currentHighlight.is_portfolio ? 'Showcase' : 'Ready to Deploy'}
                  </span>
                  <span className="text-xs font-black text-[#D9534F]">
                    {currentHighlight.is_portfolio
                      ? 'Portfolio'
                      : `Rp ${Number(currentHighlight.price).toLocaleString('id-ID')}`}
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Footer Text */}
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="font-bold text-xs text-slate-900">
                {currentHighlight.category === 'E-COMMERCE'
                  ? 'Turnkey E-commerce Property'
                  : currentHighlight.category === 'SAAS WEB'
                  ? 'Cloud SaaS Architecture'
                  : currentHighlight.category === 'MOBILE APPS'
                  ? 'Cross-Platform App Native'
                  : 'Automated Bot & Script'}
              </span>
              <span className="text-xs font-bold text-[#D9534F]">
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
              <span className="border border-slate-300 text-slate-700 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest inline-block">
                MAIN RISKS
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Benefit 1 */}
            <div className="py-5 first:pt-2 flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#FDE8E8] flex items-center justify-center shrink-0 shadow-sm border border-rose-100 text-rose-600">
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
              <div className="w-14 h-14 rounded-2xl bg-[#E2EEF2] flex items-center justify-center shrink-0 shadow-sm border border-sky-100 text-[#3B5763]">
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
              <div className="w-14 h-14 rounded-2xl bg-[#F8E7E1] flex items-center justify-center shrink-0 shadow-sm border border-orange-100 text-orange-600">
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
              className="bg-[#1C2024] hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-full inline-flex items-center gap-2 text-sm shadow-md transition"
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
