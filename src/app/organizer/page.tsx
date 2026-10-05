import { getSession, createEvent } from '@/app/actions';
import { redirect } from 'next/navigation';
import { Calendar, PlusCircle } from 'lucide-react';
import { db } from '@/lib/db';

export default async function OrganizerDashboard() {
  const session = await getSession();
  if (!session || (session.role !== 'ORGANIZER' && session.role !== 'ADMIN')) {
    redirect('/login');
  }

  const result = await db.execute('SELECT * FROM events WHERE source_name = "Organizer Dashboard" ORDER BY start_time DESC');
  const orgEvents = result.rows;

  return (
    <div className="bg-brand-bg min-h-[calc(100vh-64px)] p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-serif font-bold text-brand-ivory mb-2">Organizer Dashboard</h1>
        
        <div className="glass-panel-solid rounded-xl overflow-hidden border border-white/5 p-6">
          <h2 className="text-xl font-bold text-brand-ivory mb-4 flex items-center gap-2"><PlusCircle/> Create Event</h2>
          <form action={async (formData) => { "use server"; await createEvent(formData); }} className="flex flex-col gap-4 max-w-md">
            <input type="text" name="title" placeholder="Event Title" required className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-brand-ivory" />
            <input type="text" name="category" placeholder="Category (e.g. Cultural, Sports)" required className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-brand-ivory" />
            <input type="datetime-local" name="startTime" required className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-brand-ivory" />
            <input type="datetime-local" name="endTime" required className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-brand-ivory" />
            <input type="text" name="venue" placeholder="Venue" required className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-brand-ivory" />
            <button type="submit" className="bg-brand-gold text-brand-navy font-bold px-4 py-2 rounded-lg">Publish Event</button>
          </form>
        </div>

        <div className="glass-panel-solid rounded-xl overflow-hidden border border-white/5 p-6">
          <h2 className="text-xl font-bold text-brand-ivory mb-4 flex items-center gap-2"><Calendar/> Managed Events</h2>
          {orgEvents.length === 0 ? <p className="text-brand-ivory/50">No events created.</p> : (
            <ul className="space-y-3">
              {orgEvents.map((ev: any) => (
                <li key={ev.id as string} className="text-brand-ivory border-b border-white/10 pb-2">
                  <strong className="text-brand-gold">{ev.title}</strong> — {ev.start_time} @ {ev.venue}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
