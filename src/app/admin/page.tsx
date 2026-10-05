import { ShieldAlert, Users, Database, LayoutDashboard, Calendar, Bell, FileText, Map as MapIcon, Shield, Activity, Trash2 } from "lucide-react";
import Link from "next/link";
import { db } from '@/lib/db';
import { getSession, deleteEvent, createShuttle } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') redirect('/login');

  const [eventCountRes, vendorCountRes] = await Promise.all([
    db.execute('SELECT COUNT(*) as count FROM events'),
    db.execute('SELECT COUNT(DISTINCT vendor_id) as count FROM products')
  ]);

  const eventCount = eventCountRes.rows[0]?.count || 0;
  const vendorCount = vendorCountRes.rows[0]?.count || 0;

  const eventsResult = await db.execute('SELECT id, title, start_time FROM events ORDER BY start_time DESC LIMIT 10');
  const allEvents = eventsResult.rows;

  return (
    <div className="bg-brand-bg min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-64 bg-brand-surface border-r border-white/10 p-6 flex flex-col gap-2 shrink-0">
        <div className="flex items-center gap-3 mb-8 text-brand-ivory">
          <ShieldAlert size={28} className="text-red-500" />
          <h2 className="font-serif font-bold text-xl">Platform Admin</h2>
        </div>
        
        <nav className="flex flex-col gap-1">
          <Link href="/admin" className="flex items-center gap-3 bg-brand-gold/10 text-brand-gold px-4 py-3 rounded-lg font-bold text-sm">
            <LayoutDashboard size={18}/> Overview
          </Link>
          <Link href="/organizer" className="flex items-center gap-3 text-brand-ivory/70 hover:bg-white/5 hover:text-brand-ivory px-4 py-3 rounded-lg font-bold text-sm">
            <Calendar size={18}/> Organizer Tools
          </Link>
          <Link href="/moderator" className="flex items-center gap-3 text-brand-ivory/70 hover:bg-white/5 hover:text-brand-ivory px-4 py-3 rounded-lg font-bold text-sm">
            <Shield size={18}/> Moderation Tools
          </Link>
        </nav>
      </div>

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <div>
              <h1 className="text-3xl font-serif font-bold text-brand-ivory">Dashboard Overview</h1>
              <p className="text-brand-ivory/60 text-sm mt-1">Super Admin Dashboard • Real Data</p>
            </div>
            
            <form action={async (formData) => { "use server"; await createShuttle(formData); }} className="flex gap-2">
              <input type="text" name="route" placeholder="Quick Shuttle Route" required className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-brand-ivory" />
              <button type="submit" className="bg-brand-gold text-brand-navy font-bold px-4 py-2 rounded-lg text-sm hover:bg-[#FFF8D6] transition-colors">
                + Create Shuttle
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-panel-solid p-6 rounded-xl border-l-4 border-l-brand-gold relative overflow-hidden group">
              <h3 className="text-brand-ivory/60 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">Active Vendors (Products)</h3>
              <p className="text-3xl font-bold text-brand-ivory relative z-10">{vendorCount as number}</p>
              <Users className="absolute -right-4 -bottom-4 text-brand-gold/10 group-hover:scale-110 transition-transform" size={100} />
            </div>
            <div className="glass-panel-solid p-6 rounded-xl border-l-4 border-l-green-500 relative overflow-hidden group">
              <h3 className="text-brand-ivory/60 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">Total DB Events</h3>
              <p className="text-3xl font-bold text-brand-ivory relative z-10">{eventCount as number}</p>
              <Calendar className="absolute -right-4 -bottom-4 text-green-500/10 group-hover:scale-110 transition-transform" size={100} />
            </div>
            <div className="glass-panel-solid p-6 rounded-xl border-l-4 border-l-purple-500 relative overflow-hidden group">
              <h3 className="text-brand-ivory/60 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">Database Status</h3>
              <p className="text-3xl font-bold text-brand-ivory flex items-center gap-2 relative z-10">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span> Turso Online
              </p>
              <Database className="absolute -right-4 -bottom-4 text-purple-500/10 group-hover:scale-110 transition-transform" size={100} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="glass-panel-solid rounded-xl border border-white/5 overflow-hidden">
              <div className="p-5 border-b border-white/10 bg-white/5 flex justify-between items-center">
                <h3 className="font-bold text-brand-ivory flex items-center gap-2"><Calendar size={18} className="text-brand-gold"/> Manage Events (Delete)</h3>
              </div>
              <div className="p-0 max-h-96 overflow-y-auto">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-white/5">
                    {allEvents.map((ev: any) => (
                      <tr key={ev.id} className="text-brand-ivory/80 hover:bg-white/5">
                        <td className="p-4 py-3">{ev.title}</td>
                        <td className="p-4 py-3 text-brand-ivory/40">{ev.start_time}</td>
                        <td className="p-4 py-3 text-right">
                          <form action={async () => { "use server"; await deleteEvent(ev.id); }}>
                             <button type="submit" className="text-red-400 hover:text-red-300 p-2"><Trash2 size={16}/></button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
