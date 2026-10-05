'use client';

import Link from "next/link";
import { Trophy, MapPin, Calendar, ArrowRight, Activity } from "lucide-react";

export default function SportsPage() {
  return (
    <div className="bg-brand-bg min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-surface to-brand-bg pt-12 pb-8 px-6 md:px-12 border-b border-white/10 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-ivory mb-2 flex items-center gap-3">
            <Trophy className="text-brand-gold" size={40} /> Sports Hub
          </h1>
          <p className="text-brand-ivory/60">Discover traditional and modern sports competitions happening across Mysuru.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Featured Sports Hero */}
        <div className="glass-panel-solid rounded-3xl overflow-hidden mb-12 shadow-2xl relative border-brand-gold/30">
          <div className="absolute inset-0">
             <img src="https://images.unsplash.com/photo-1544365558-35aa4af41199?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-40" alt="Nada Kusti" />
             <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/90 to-transparent"></div>
          </div>
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <span className="bg-brand-gold text-brand-navy font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest mb-4 inline-block">Featured Championship</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-ivory mb-4">Nada Kusti Finals</h2>
              <p className="text-brand-ivory/80 text-lg mb-8 max-w-xl leading-relaxed">
                Experience the raw power of traditional Mysore wrestling. Hundreds of Pehlwans compete for the prestigious Dasara Kesari title.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  className="bg-brand-gold text-brand-navy font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#FFF8D6] transition-colors shadow-lg"
                  onClick={() => alert("Live Matches dashboard will be active on Oct 5th.")}
                >
                  <Activity size={18} /> View Live Matches
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <h2 className="text-2xl font-serif font-bold text-brand-ivory mb-6 border-b border-white/10 pb-4">Tournament Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {["Traditional Sports", "Athletics", "Team Sports", "Water Sports"].map((cat, i) => (
            <div key={i} className="glass-panel-solid p-6 rounded-2xl border border-white/10 hover:border-brand-gold/50 hover:-translate-y-1 transition-all cursor-pointer group">
              <h3 className="font-bold text-lg text-brand-ivory mb-2 group-hover:text-brand-gold transition-colors">{cat}</h3>
              <p className="text-sm text-brand-ivory/50 flex items-center gap-1"><ArrowRight size={14}/> Explore events</p>
            </div>
          ))}
        </div>

        {/* Upcoming Matches */}
        <h2 className="text-2xl font-serif font-bold text-brand-ivory mb-6 border-b border-white/10 pb-4">Upcoming Fixtures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel-solid p-6 rounded-2xl flex flex-col md:flex-row gap-6 border border-white/10">
            <div className="w-16 h-16 rounded-xl bg-brand-surface border border-white/10 flex items-center justify-center flex-shrink-0 text-brand-gold font-serif font-bold text-xl">
              14
              <span className="text-[10px] block -mt-1 text-brand-ivory/50 font-sans">OCT</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-brand-ivory text-xl mb-1">State Level Marathon</h3>
              <p className="text-sm text-brand-ivory/60 mb-3">Dasara CM Cup Men & Women's Half Marathon</p>
              <div className="flex items-center gap-4 text-xs font-bold text-brand-ivory/40 uppercase tracking-widest">
                <span className="flex items-center gap-1"><MapPin size={12}/> Chamundi Vihar Stadium</span>
                <span className="flex items-center gap-1"><Calendar size={12}/> 6:00 AM</span>
              </div>
            </div>
          </div>
          <div className="glass-panel-solid p-6 rounded-2xl flex flex-col md:flex-row gap-6 border border-white/10">
            <div className="w-16 h-16 rounded-xl bg-brand-surface border border-white/10 flex items-center justify-center flex-shrink-0 text-brand-gold font-serif font-bold text-xl">
              15
              <span className="text-[10px] block -mt-1 text-brand-ivory/50 font-sans">OCT</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-brand-ivory text-xl mb-1">Kabaddi Championship</h3>
              <p className="text-sm text-brand-ivory/60 mb-3">Inter-district knockout tournament.</p>
              <div className="flex items-center gap-4 text-xs font-bold text-brand-ivory/40 uppercase tracking-widest">
                <span className="flex items-center gap-1"><MapPin size={12}/> D. Devaraj Urs Stadium</span>
                <span className="flex items-center gap-1"><Calendar size={12}/> 9:00 AM</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
