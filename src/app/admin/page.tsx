import { ShieldAlert, Users, Database, LayoutDashboard, Calendar } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="bg-brand-bg min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
          <div className="w-12 h-12 rounded-lg bg-red-500/20 text-red-500 flex items-center justify-center border border-red-500/30">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-ivory">Platform Control Center</h1>
            <p className="text-brand-ivory/60 text-sm">Super Admin Dashboard • Mysuru Dasara 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-panel-solid p-6 rounded-xl border-l-4 border-l-brand-gold">
            <h3 className="text-brand-ivory/60 text-xs font-bold uppercase tracking-widest mb-2">Total Visitors</h3>
            <p className="text-3xl font-bold text-brand-ivory">142,853</p>
          </div>
          <div className="glass-panel-solid p-6 rounded-xl border-l-4 border-l-blue-500">
            <h3 className="text-brand-ivory/60 text-xs font-bold uppercase tracking-widest mb-2">Active Vendors</h3>
            <p className="text-3xl font-bold text-brand-ivory">412</p>
          </div>
          <div className="glass-panel-solid p-6 rounded-xl border-l-4 border-l-green-500">
            <h3 className="text-brand-ivory/60 text-xs font-bold uppercase tracking-widest mb-2">Official Events</h3>
            <p className="text-3xl font-bold text-brand-ivory">84</p>
          </div>
          <div className="glass-panel-solid p-6 rounded-xl border-l-4 border-l-purple-500">
            <h3 className="text-brand-ivory/60 text-xs font-bold uppercase tracking-widest mb-2">Database Status</h3>
            <p className="text-3xl font-bold text-brand-ivory flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span> Turso Edge</p>
          </div>
        </div>
      </div>
    </div>
  );
}
