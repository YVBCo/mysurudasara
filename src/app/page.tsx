import Link from "next/link";
import { 
  Calendar, MapPin, Navigation, Heart, Activity, Clock, ArrowRight, Tent, Trophy, BadgeCheck, ShieldAlert, Sparkles
} from "lucide-react";
import { getLiveEvents, getEvents, getPlaces } from "@/app/actions";
import AIAssistant from "@/components/AIAssistant";
import MapWrapper from "@/components/MapWrapper";
import CinematicHero from "@/components/CinematicHero";

export default async function Home() {
  const liveEvents = await getLiveEvents();
  const allEvents = await getEvents();
  const places = await getPlaces();
  
  // Calculate Days until Dasara (Oct 11, 2026)
  const today = new Date();
  const dasaraStart = new Date("2026-10-11T09:00:00+05:30");
  const diffTime = dasaraStart.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      
      {/* 2 & 3. HERO — COMPLETELY REBUILT CINEMATIC MYSURU PALACE */}
      <CinematicHero diffDays={diffDays} liveEventsCount={liveEvents.length} />

      {/* 4. HERO QUICK DISCOVERY */}
      <div className="relative z-20 -mt-16 px-6 md:px-12 max-w-[1400px] mx-auto w-full mb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link href="/live" className="glass-panel-solid hover:bg-brand-surface p-5 rounded-xl flex items-center gap-3 transition-transform hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-full bg-red-900/30 border border-red-500/20 text-red-500 flex items-center justify-center shrink-0"><Activity size={18} /></div>
            <span className="font-bold text-sm tracking-wide text-brand-ivory">Live Now</span>
          </Link>
          <Link href="/events" className="glass-panel-solid hover:bg-brand-surface p-5 rounded-xl flex items-center gap-3 transition-transform hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-full bg-blue-900/30 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0"><Calendar size={18} /></div>
            <span className="font-bold text-sm tracking-wide text-brand-ivory">Events</span>
          </Link>
          <Link href="/sports" className="glass-panel-solid hover:bg-brand-surface p-5 rounded-xl flex items-center gap-3 transition-transform hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-full bg-green-900/30 border border-green-500/20 text-green-400 flex items-center justify-center shrink-0"><Trophy size={18} /></div>
            <span className="font-bold text-sm tracking-wide text-brand-ivory">Sports</span>
          </Link>
          <Link href="/melas" className="glass-panel-solid hover:bg-brand-surface p-5 rounded-xl flex items-center gap-3 transition-transform hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-full bg-orange-900/30 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0"><Tent size={18} /></div>
            <span className="font-bold text-sm tracking-wide text-brand-ivory">Melas</span>
          </Link>
          <Link href="/map" className="glass-panel-solid hover:bg-brand-surface p-5 rounded-xl flex items-center gap-3 transition-transform hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-full bg-purple-900/30 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0"><Navigation size={18} /></div>
            <span className="font-bold text-sm tracking-wide text-brand-ivory">Map</span>
          </Link>
          <Link href="/my-dasara" className="glass-panel-solid border-brand-gold/30 hover:bg-brand-surface p-5 rounded-xl flex items-center gap-3 transition-transform hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold flex items-center justify-center shrink-0"><Heart size={18} /></div>
            <span className="font-bold text-sm tracking-wide text-brand-ivory">My Plan</span>
          </Link>
        </div>
      </div>

      <div className="px-6 md:px-12 max-w-[1400px] mx-auto w-full pb-24">
        
        {/* 15. LIVE NOW PAGE / STRIP LOGIC */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-serif font-bold text-brand-ivory flex items-center gap-3">
              <span className="w-2 h-8 bg-brand-gold block"></span>
              Live Now
            </h2>
            <span className="text-xs text-brand-ivory/50 font-mono">UPDATED: JUST NOW</span>
          </div>

          {liveEvents.length === 0 ? (
            <div className="glass-panel-solid rounded-2xl p-10 text-center border-dashed border-white/20">
              <Clock size={40} className="text-brand-gold mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-brand-ivory mb-2">Dasara has not started yet.</h3>
              <p className="text-brand-ivory/60 mb-6">The festival officially inaugurates on October 11, 2026.</p>
              <div className="inline-flex bg-brand-surface border border-white/10 px-6 py-3 rounded-lg text-brand-gold font-bold text-xl font-serif tracking-widest">
                {diffDays} DAYS TO GO
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {liveEvents.map((e: any) => (
                 <div key={e.id} className="glass-panel-solid rounded-xl p-6 border-l-4 border-l-red-500">
                    <div className="flex justify-between items-start mb-4">
                      <span className="badge-official px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><BadgeCheck size={12}/> {e.source}</span>
                      <span className="text-red-500 text-xs font-bold animate-pulse">LIVE</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-brand-ivory mb-2">{e.title}</h3>
                    <p className="text-sm text-brand-ivory/60 mb-4 flex items-center gap-2"><MapPin size={14} className="text-brand-gold"/> {e.location}</p>
                    <Link href={`/events/${e.id}`} className="text-brand-gold hover:text-brand-ivory text-sm font-bold flex items-center gap-1">Watch / Details <ArrowRight size={14}/></Link>
                 </div>
              ))}
            </div>
          )}
        </section>

        {/* 6. DISCOVER MYSURU (Real Places) */}
        <section className="mb-24">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-brand-ivory mb-2">Discover Mysuru</h2>
            <p className="text-brand-ivory/60">Beyond Dasara, discover the city of palaces.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {places.map((place: any) => (
              <div key={place.id} className="group relative rounded-2xl overflow-hidden glass-panel-solid border-transparent hover:border-brand-gold/50 transition-colors h-[400px]">
                <img src={place.image} alt={place.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="bg-black/50 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{place.category}</span>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl font-bold text-brand-ivory mb-2 leading-tight">{place.name}</h3>
                  <p className="text-sm text-brand-ivory/80 mb-4 line-clamp-2">{place.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${place.status === 'OPEN' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>{place.status}</span>
                    <button className="text-brand-gold hover:text-[#FFF8D6] font-bold text-sm flex items-center gap-1">Explore <ArrowRight size={16}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. FEATURED EVENTS (Strong Imagery) */}
        <section className="mb-24">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-brand-ivory">Featured Programmes</h2>
            <Link href="/events" className="text-brand-gold hover:text-brand-ivory font-bold text-sm flex items-center gap-1 uppercase tracking-wider">
              View Schedule <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allEvents.slice(1, 3).map((event: any) => (
              <Link href={`/events/${event.id}`} key={event.id} className="flex flex-col md:flex-row bg-brand-surface rounded-2xl border border-white/10 overflow-hidden hover:border-brand-gold/30 transition-colors group">
                <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 badge-official px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><BadgeCheck size={12}/> Official</div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-2">{event.category}</span>
                  <h3 className="font-serif text-2xl font-bold text-brand-ivory mb-3">{event.title}</h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-brand-ivory/60"><Calendar size={16} className="text-brand-gold/50"/> Oct 21, 2026 • 2:00 PM</div>
                    <div className="flex items-center gap-2 text-sm text-brand-ivory/60"><MapPin size={16} className="text-brand-gold/50"/> {event.location}</div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="bg-brand-bg px-3 py-1 rounded-md text-xs font-bold text-brand-ivory/50 uppercase tracking-widest border border-white/5">{event.status}</span>
                    <span className="text-brand-gold font-bold text-sm">View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 20. INTERACTIVE MAP */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-brand-ivory mb-2">Explore the Map</h2>
              <p className="text-brand-ivory/60">Discover events, venues, parking, and facilities across Mysuru.</p>
            </div>
            <Link href="/map" className="hidden md:flex bg-brand-surface border border-white/10 px-4 py-2 rounded-lg text-brand-ivory hover:text-brand-gold text-sm font-bold transition-colors">
              Full Screen Map
            </Link>
          </div>
          <MapWrapper />
        </section>

        {/* 21. AI ASSISTANT */}
        <section className="mb-24">
          <AIAssistant />
        </section>

        {/* 22. MY DASARA PASSBOOK PREVIEW */}
        <section className="mb-10">
           <div className="flex items-center justify-between mb-8 border-b border-brand-gold/30 pb-4">
              <h2 className="text-3xl font-serif font-bold text-brand-ivory flex items-center gap-3">
                <Heart className="text-brand-gold" />
                My Dasara
              </h2>
           </div>
           <div className="glass-panel-solid rounded-2xl p-8 border-dashed border-brand-gold/40 text-center">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mx-auto mb-4 border border-brand-gold/30">
                <Calendar size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-ivory mb-2">Your Personal Itinerary</h3>
              <p className="text-brand-ivory/60 mb-6 max-w-md mx-auto">Build your digital passbook. Save official events, discover sports, and create your perfect royal festival experience.</p>
              <Link href="/my-dasara" className="inline-flex items-center gap-2 text-brand-navy bg-brand-gold hover:bg-[#FFF8D6] font-bold py-3 px-6 rounded-lg transition-colors">
                 Open Passbook <ArrowRight size={16} />
              </Link>
           </div>
        </section>

      </div>
    </div>
  );
}
