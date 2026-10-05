import { getEventById } from "@/app/actions";
import { Calendar, MapPin, Clock, ArrowLeft, Share2, ShieldAlert } from "lucide-react";
import Link from "next/link";
import SaveButton from "@/components/SaveButton";
import { notFound } from "next/navigation";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const event = await getEventById(resolvedParams.id);
  
  if (!event) {
    notFound();
  }

  // Check if saved
  const MOCK_USER_ID = "test-user-123";
  // In a real app, we'd fetch the saved state for this specific event and user here.
  // For the UI, the SaveButton component can handle its own state or we pass it down.
  const isSaved = false; // We can let SaveButton check its own state in a real implementation

  return (
    <div className="bg-brand-ivory dark:bg-brand-navy min-h-screen pb-20">
      
      {/* Cinematic Hero for Event */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-transparent"></div>
        
        {/* Top actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 max-w-7xl mx-auto">
          <Link href="/events" className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Floating Information Panel Content Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto z-10 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-brand-gold text-brand-navy font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest">{event.category}</span>
            <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              <ShieldAlert size={12} className="text-blue-400" /> Official Event
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 drop-shadow-lg leading-tight">{event.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12 flex flex-col md:flex-row gap-8 relative z-20">
        
        {/* Left Column: Details */}
        <div className="flex-1">
          <div className="glass-panel-light dark:glass-panel rounded-3xl p-6 md:p-8 mb-8">
            <h2 className="font-serif text-2xl font-bold text-brand-navy dark:text-brand-ivory mb-4">About this Event</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{event.description}</p>
          </div>

          <div className="glass-panel-light dark:glass-panel rounded-3xl p-6 md:p-8">
            <h2 className="font-serif text-2xl font-bold text-brand-navy dark:text-brand-ivory mb-6">Important Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0"><Calendar size={24} /></div>
                <div>
                  <h3 className="font-bold text-brand-navy dark:text-brand-ivory">Date & Time</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">{new Date(event.startTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'long', timeStyle: 'short' })}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0"><MapPin size={24} /></div>
                <div>
                  <h3 className="font-bold text-brand-navy dark:text-brand-ivory">Venue</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">{event.location}</p>
                  <button className="text-sm font-bold text-brand-gold mt-2 hover:underline">Get Directions</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="w-full md:w-80 shrink-0">
          <div className="sticky top-28 space-y-4">
            <div className="glass-panel-light dark:glass-panel rounded-3xl p-6">
              <div className="text-center mb-6">
                <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Current Status</p>
                <div className={`inline-block px-4 py-2 rounded-xl font-bold tracking-widest uppercase border ${event.status === 'LIVE' || event.status === 'OPEN' ? 'bg-red-500/10 text-red-600 border-red-500/20' : 'bg-brand-navy/5 dark:bg-white/5 text-brand-navy dark:text-brand-ivory border-brand-navy/10 dark:border-white/10'}`}>
                  {event.status === 'LIVE' ? '🔴 Live Now' : event.status}
                </div>
              </div>
              
              <div className="space-y-3">
                <SaveButton eventId={event.id} isSaved={isSaved} />
                <button className="w-full bg-brand-navy dark:bg-brand-ivory text-brand-ivory dark:text-brand-navy font-bold py-3 rounded-xl hover:bg-brand-navy-light transition-colors shadow-lg">
                  Set Reminder
                </button>
              </div>
            </div>

            {/* Official Notice */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-6">
              <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-bold text-sm uppercase tracking-widest mb-2">
                <ShieldAlert size={16} /> Official Notice
              </div>
              <p className="text-sm text-blue-900/80 dark:text-blue-200/80">Please arrive 45 minutes early. Heavy traffic expected around the venue.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
