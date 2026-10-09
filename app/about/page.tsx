'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowUpRight, Globe, Phone, Code, Terminal, Layers } from 'lucide-react';

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <div className="max-w-4xl mx-auto py-6">
        <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-extrabold text-slate-900 uppercase mb-4">
          About BiruMarket & Dev
        </h1>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/80 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-blue-200">
              FB
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Fikri Bintang</h2>
              <p className="text-slate-500 text-sm">Fullstack Developer & Digital Product Architect</p>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed">
            Selamat datang di <strong>BiruMarket</strong>! Platform ini didirikan sebagai tempat transaksi jual beli website siap pakai, aplikasi mobile, script automation bot, serta portofolio showcase karya digital buatan Fikri Bintang.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100/60">
              <Code className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-bold text-sm text-slate-800">Clean Architecture</h3>
              <p className="text-xs text-slate-500 mt-1">Kode terstruktur, tanpa bloatware, siap diserahterimakan.</p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100/60">
              <Terminal className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-bold text-sm text-slate-800">Verified Security</h3>
              <p className="text-xs text-slate-500 mt-1">Setiap project telah melalui tahap pengujian E2E & security audit.</p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100/60">
              <Layers className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-bold text-sm text-slate-800">Escrow Ready</h3>
              <p className="text-xs text-slate-500 mt-1">Garansi masa inspeksi transfer domain & source code 72 jam.</p>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap gap-4">
            <Link 
              href="https://github.com/FikriBintangx" 
              target="_blank" 
              className="bg-blue-600 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 text-sm hover:bg-blue-700 shadow-md shadow-blue-200 transition"
            >
              <Globe className="w-4 h-4" />
              <span>GitHub FikriBintangx</span>
            </Link>
            <Link 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              className="bg-white border border-slate-200 text-slate-800 font-bold px-6 py-3 rounded-full flex items-center gap-2 text-sm hover:bg-slate-50 transition"
            >
              <Phone className="w-4 h-4" />
              <span>Kontak WhatsApp</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
