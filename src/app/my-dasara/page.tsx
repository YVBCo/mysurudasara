import { getSavedEvents } from "@/app/actions";
import { Calendar, MapPin, Trash2, Heart } from "lucide-react";
import Link from "next/link";

export default async function MyDasaraPage() {
  const MOCK_USER_ID = "test-user-123";
  const savedEvents = await getSavedEvents(MOCK_USER_ID);

  return (
    <div className="bg-brand-bg min-h-[calc(100vh-64px)] pb-20">
      
      {/* Passbook Header */}
      <div className="bg-gradient-to-b from-brand-surface to-brand-bg border-b border-brand-gold/20 px-6 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <Heart size={28} />
        </div>
        <h1 className="text-4xl font-serif font-bold text-brand-ivory mb-3">My Dasara Passbook</h1>
        <p className="text-brand-ivory/60 max-w-md mx-auto">Your personalized digital journal for the Nada Habba. Keep track of your itinerary and experiences.</p>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="glass-panel-solid rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
            <h2 className="text-2xl font-serif font-bold text-brand-ivory">Saved Events ({savedEvents.length})</h2>
            <span className="bg-brand-gold text-brand-navy font-bold text-xs px-3 py-1 rounded-full uppercase tracking-widest">Itinerary</span>
          </div>
          
          {savedEvents.length === 0 ? (
            <div className="text-center py-16">
              <Calendar size={48} className="text-brand-ivory/20 mx-auto mb-4" />
              <p className="text-brand-ivory/50 text-lg mb-6">Your passbook is currently empty.</p>
              <Link href="/events" className="inline-block bg-brand-gold text-brand-navy font-bold px-6 py-3 rounded-lg hover:bg-[#FFF8D6] transition-colors">
                Discover Events
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {savedEvents.map((event: any) => (
                <div key={event.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-brand-bg/50 border border-white/5 hover:border-brand-gold/30 transition-colors group">
                  <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden shrink-0 relative">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg text-brand-ivory">{event.title}</h3>
                      <button className="text-brand-ivory/30 hover:text-red-500 transition-colors p-2" title="Remove from Itinerary">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-brand-ivory/60 mt-1">
                      <span className="flex items-center gap-1"><Calendar size={14} className="text-brand-gold"/> {new Date(event.startTime).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} className="text-brand-gold"/> {event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
