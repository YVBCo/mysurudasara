'use client';

import Link from "next/link";
import { ArrowLeft, Utensils, Navigation, Tent, Star, MapPin } from "lucide-react";

export default function MelasPage() {
  return (
    <div className="bg-brand-bg min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-surface to-brand-bg pt-12 pb-8 px-6 md:px-12 border-b border-white/10 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-ivory mb-2 flex items-center gap-3">
            <Tent className="text-brand-gold" size={40} /> Melas & Exhibitions
          </h1>
          <p className="text-brand-ivory/60">Discover the vibrant markets, food festivals, and handicraft stalls of Dasara.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Featured Hero Mela */}
        <div className="glass-panel-solid rounded-3xl overflow-hidden mb-12 shadow-2xl relative border-brand-gold/30">
          <div className="absolute inset-0">
             <img src="https://images.unsplash.com/photo-1589302168068-98c603fc5c39?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-40" alt="Aahara Mela" />
             <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/90 to-transparent"></div>
          </div>
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <span className="bg-brand-gold text-brand-navy font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest mb-4 inline-block">Featured Exhibition</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-ivory mb-4">Aahara Mela</h2>
              <p className="text-brand-ivory/80 text-lg mb-8 max-w-xl leading-relaxed">
                The grand food festival featuring authentic Karnataka cuisine, tribal foods, and delicacies from across India. A must-visit culinary experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  className="bg-brand-gold text-brand-navy font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#FFF8D6] transition-colors shadow-lg"
                  onClick={() => alert("Stall view loading... (Simulated)")}
                >
                  <Utensils size={18} /> View Food Stalls
                </button>
                <button 
                  className="glass-panel border-white/20 text-brand-ivory font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-colors"
                  onClick={() => alert("Navigation will launch Map application.")}
                >
                  <Navigation size={18} /> Navigate to Venue
                </button>
              </div>
            </div>
            
            {/* Quick Info Card */}
            <div className="w-full md:w-72 shrink-0">
               <div className="bg-brand-surface/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 h-full flex flex-col justify-center">
                  <h3 className="font-bold text-brand-ivory mb-4 border-b border-white/10 pb-2">Venue Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-brand-ivory/50 uppercase tracking-widest mb-1">Location</p>
                      <p className="text-sm text-brand-ivory font-medium flex items-center gap-2"><MapPin size={14} className="text-brand-gold"/> Scouts & Guides Grounds</p>
                    </div>
                    <div>
                      <p className="text-xs text-brand-ivory/50 uppercase tracking-widest mb-1">Timings</p>
                      <p className="text-sm text-brand-ivory font-medium">10:00 AM - 10:30 PM</p>
                    </div>
                    <div>
                      <p className="text-xs text-brand-ivory/50 uppercase tracking-widest mb-1">Status</p>
                      <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded">OPEN NOW</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Grid of other Melas */}
        <h2 className="text-2xl font-serif font-bold text-brand-ivory mb-6">More Exhibitions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-panel-solid rounded-2xl p-6 border border-white/10 hover:border-brand-gold/30 transition-colors group cursor-pointer">
            <h3 className="text-xl font-serif font-bold text-brand-ivory mb-2 group-hover:text-brand-gold transition-colors">Vasthra Mela</h3>
            <p className="text-sm text-brand-ivory/60 mb-4">Exquisite handlooms and traditional textiles from state artisans.</p>
            <div className="flex items-center gap-2 text-xs text-brand-ivory/40"><MapPin size={12}/> J.K. Grounds</div>
          </div>
          <div className="glass-panel-solid rounded-2xl p-6 border border-white/10 hover:border-brand-gold/30 transition-colors group cursor-pointer">
            <h3 className="text-xl font-serif font-bold text-brand-ivory mb-2 group-hover:text-brand-gold transition-colors">Handicraft Mela</h3>
            <p className="text-sm text-brand-ivory/60 mb-4">Traditional arts, sandalwood carvings, and Channapatna toys.</p>
            <div className="flex items-center gap-2 text-xs text-brand-ivory/40"><MapPin size={12}/> Exhibition Grounds</div>
          </div>
          <div className="glass-panel-solid rounded-2xl p-6 border border-white/10 hover:border-brand-gold/30 transition-colors group cursor-pointer">
            <h3 className="text-xl font-serif font-bold text-brand-ivory mb-2 group-hover:text-brand-gold transition-colors">Dasara Book Mela</h3>
            <p className="text-sm text-brand-ivory/60 mb-4">Literature festival featuring Kannada authors and publishers.</p>
            <div className="flex items-center gap-2 text-xs text-brand-ivory/40"><MapPin size={12}/> Maharaja's College</div>
          </div>
        </div>

        {/* Popular Stalls */}
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold text-brand-ivory">Popular Food Stalls</h2>
          <button className="text-brand-gold text-sm font-bold uppercase tracking-widest hover:text-[#FFF8D6]">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-panel-solid rounded-2xl overflow-hidden hover:border-brand-gold/30 transition-colors group">
              <div className="h-40 bg-brand-surface relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" alt="Mylari Dosa" />
                <div className="absolute top-2 right-2 bg-brand-bg/80 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 text-xs font-bold text-brand-gold">
                  <Star size={10} className="fill-brand-gold" /> 4.8
                </div>
              </div>
              <div className="p-5 bg-brand-bg">
                <h4 className="font-bold text-brand-ivory mb-1">Mylari Dosa Stall</h4>
                <p className="text-xs text-brand-ivory/40 mb-4">Aahara Mela • Stall A{i}2</p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-gold/20 text-brand-gold px-2 py-1 rounded">Must Try</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-green-500/20 text-green-400 px-2 py-1 rounded">Open Now</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
