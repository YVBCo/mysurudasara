import Link from "next/link";
import { Utensils, MapPin, Star, Coffee, Info, ArrowRight } from "lucide-react";

export default function FoodPage() {
  return (
    <div className="bg-brand-bg min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-surface to-brand-bg pt-12 pb-8 px-6 md:px-12 border-b border-white/10 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-ivory mb-2 flex items-center gap-3">
            <Utensils className="text-brand-gold" size={40} /> Food & Cuisine
          </h1>
          <p className="text-brand-ivory/60">Experience the royal taste of Karnataka and traditional Mysuru delicacies.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Featured Food Mela */}
        <div className="glass-panel-solid rounded-3xl overflow-hidden mb-12 shadow-2xl relative border-brand-gold/30">
          <div className="absolute inset-0">
             <img src="https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-40" alt="Mysuru Cuisine" />
             <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/90 to-transparent"></div>
          </div>
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <span className="bg-brand-gold text-brand-navy font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest mb-4 inline-block">Culinary Hub</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-ivory mb-4">Dasara Aahara Mela</h2>
              <p className="text-brand-ivory/80 text-lg mb-8 max-w-xl leading-relaxed">
                Over 150 stalls offering authentic tribal cuisine, traditional coastal delicacies, and the iconic Mysore Pak.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/melas"
                  className="bg-brand-gold text-brand-navy font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#FFF8D6] transition-colors shadow-lg"
                >
                  <MapPin size={18} /> Scouts & Guides Grounds
                </Link>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-serif font-bold text-brand-ivory mb-6 border-b border-white/10 pb-4">Must Try Delicacies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-panel-solid p-6 rounded-2xl border border-white/10 hover:border-brand-gold/30 transition-colors group">
            <h3 className="font-bold text-xl text-brand-ivory mb-2 group-hover:text-brand-gold transition-colors">Mysore Pak</h3>
            <p className="text-sm text-brand-ivory/60 mb-4">The legendary sweet born in the royal kitchens of the Mysuru Palace, made with pure ghee, sugar, and gram flour.</p>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-ivory/40 uppercase tracking-widest"><Star size={12} className="text-brand-gold"/> Heritage Sweet</div>
          </div>
          <div className="glass-panel-solid p-6 rounded-2xl border border-white/10 hover:border-brand-gold/30 transition-colors group">
            <h3 className="font-bold text-xl text-brand-ivory mb-2 group-hover:text-brand-gold transition-colors">Mylari Dosa</h3>
            <p className="text-sm text-brand-ivory/60 mb-4">Soft, melt-in-the-mouth dosas served with a unique saagu (curry) and butter. A staple breakfast delicacy.</p>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-ivory/40 uppercase tracking-widest"><Coffee size={12} className="text-brand-gold"/> Breakfast Special</div>
          </div>
          <div className="glass-panel-solid p-6 rounded-2xl border border-white/10 hover:border-brand-gold/30 transition-colors group">
            <h3 className="font-bold text-xl text-brand-ivory mb-2 group-hover:text-brand-gold transition-colors">Bamboo Biryani</h3>
            <p className="text-sm text-brand-ivory/60 mb-4">Tribal delicacy cooked inside hollow bamboo shoots, infusing the meat and rice with a distinct earthy flavor.</p>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-ivory/40 uppercase tracking-widest"><Info size={12} className="text-brand-gold"/> Tribal Cuisine</div>
          </div>
        </div>

      </div>
    </div>
  );
}
