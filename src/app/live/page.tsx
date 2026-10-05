import { getLiveEvents } from "@/app/actions";
import { Activity, MapPin, ArrowRight, ShieldAlert, BadgeCheck, Clock } from "lucide-react";
import Link from "next/link";

export default async function LiveNowPage() {
  const liveEvents = await getLiveEvents();
  
  const today = new Date();
  const dasaraStart = new Date("2026-10-11T09:00:00+05:30");
  const diffTime = dasaraStart.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-brand-bg min-h-screen pb-24">
      <div className="bg-gradient-to-b from-brand-surface to-brand-bg pt-12 pb-8 px-6 md:px-12 border-b border-white/10 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-red-500 mb-2 font-bold tracking-widest text-sm uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Dasara Pulse
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-ivory mb-2">Live Now</h1>
            <p className="text-brand-ivory/60">Real-time updates, crowding information, and live events.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {liveEvents.length === 0 ? (
          <div className="glass-panel-solid rounded-2xl p-16 text-center border-dashed border-white/20">
            <Clock size={48} className="text-brand-gold mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-brand-ivory mb-2">Dasara has not started yet.</h3>
            <p className="text-brand-ivory/60 mb-6">The festival officially inaugurates on October 11, 2026. Live tracking will begin then.</p>
            <div className="inline-flex bg-brand-surface border border-white/10 px-6 py-3 rounded-lg text-brand-gold font-bold text-xl font-serif tracking-widest">
              {diffDays > 0 ? `${diffDays} DAYS TO GO` : "STARTING SOON"}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}
