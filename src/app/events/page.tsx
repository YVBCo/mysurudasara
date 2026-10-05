import Link from "next/link";
import { Calendar, MapPin, Search, ArrowRight, ShieldAlert, BadgeCheck } from "lucide-react";
import { getEvents } from "@/app/actions";
import SearchEvents from "@/components/SearchEvents";
import SaveButton from "@/components/SaveButton";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string, q?: string }>
}) {
  const resolvedParams = await searchParams;
  const selectedCategory = resolvedParams.category || "All";
  const searchQuery = resolvedParams.q || "";
  
  const events = await getEvents(searchQuery, selectedCategory);
  
  return (
    <div className="bg-brand-bg min-h-screen pb-24">
      
      {/* Premium Events Header */}
      <div className="bg-gradient-to-b from-brand-surface to-brand-bg pt-12 pb-8 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-ivory mb-2">Events & Programs</h1>
            <p className="text-brand-ivory/60 mb-3">Discover cultural, religious, and entertainment events</p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <span className="text-brand-ivory/40">Data Source Status:</span>
              {events.length > 0 ? (
                <span className="text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> HEALTHY
                </span>
              ) : (
                <span className="text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20 flex items-center gap-1">
                   UNAVAILABLE
                </span>
              )}
            </div>
          </div>
          <SearchEvents />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
        
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {["All", "Cultural", "Religious", "Exhibition", "Sports", "Mela"].map((cat) => (
            <Link 
              key={cat} 
              href={`/events?category=${cat}${searchQuery ? `&q=${searchQuery}` : ''}`}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold border transition-colors ${selectedCategory === cat ? "bg-brand-gold text-brand-navy border-brand-gold" : "glass-panel text-brand-ivory hover:border-brand-gold/50"}`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {events.length === 0 ? (
          <div className="glass-panel-solid rounded-2xl p-16 text-center border-dashed border-white/20">
             <Search size={48} className="text-brand-gold mx-auto mb-4 opacity-50" />
             <h3 className="text-xl font-bold text-brand-ivory mb-2">No events found</h3>
             <p className="text-brand-ivory/60">Try adjusting your search criteria or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: any) => (
              <div key={event.id} className="glass-panel-solid rounded-2xl overflow-hidden hover:border-brand-gold/40 hover:-translate-y-1 transition-all group flex flex-col shadow-xl">
                
                <div className="h-56 relative overflow-hidden bg-brand-surface">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg to-transparent"></div>
                  
                  {/* Badges on Image */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className="badge-official backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                      <BadgeCheck size={12} /> Official
                    </span>
                    <span className="bg-brand-gold text-brand-navy px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      {event.category}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                     <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border mb-2 ${event.status === 'LIVE NOW' ? 'bg-red-500/20 border-red-500/50 text-red-400 animate-pulse' : 'bg-brand-surface/80 border-white/20 text-brand-ivory/80'}`}>
                        {event.status === 'LIVE NOW' ? '🔴 LIVE' : event.status}
                     </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col bg-brand-bg">
                  <h3 className="text-xl font-serif font-bold mb-3 text-brand-ivory leading-tight">{event.title}</h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-sm text-brand-ivory/60 flex items-center gap-2">
                       <Calendar size={14} className="text-brand-gold" /> {new Date(event.startTime).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-brand-ivory/60 flex items-center gap-2">
                       <MapPin size={14} className="text-brand-gold" /> {event.location}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <SaveButton eventId={event.id} isSaved={false} />
                    
                    <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-brand-ivory/40">Source: {event.source || 'Mysuru Dasara 2026'}</span>
                        <Link 
                          href={`/events/${event.id}`}
                          className="text-sm font-bold text-brand-gold hover:text-[#FFF8D6] transition-colors flex items-center gap-1"
                        >
                          Details <ArrowRight size={14} />
                        </Link>
                      </div>
                      <span className="text-[9px] uppercase tracking-widest text-brand-ivory/30">
                        Verified: {event.lastVerifiedAt ? new Date(event.lastVerifiedAt).toLocaleString() : 'Data Unavailable'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
