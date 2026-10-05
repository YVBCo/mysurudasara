import { ShieldAlert, Users, Database, LayoutDashboard, Calendar, Bell, FileText, Map as MapIcon, Shield, Activity } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="bg-brand-bg min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-brand-surface border-r border-white/10 p-6 flex flex-col gap-2 shrink-0">
        <div className="flex items-center gap-3 mb-8 text-brand-ivory">
          <ShieldAlert size={28} className="text-red-500" />
          <h2 className="font-serif font-bold text-xl">Platform Admin</h2>
        </div>
        
        <nav className="flex flex-col gap-1">
          <Link href="/admin" className="flex items-center gap-3 bg-brand-gold/10 text-brand-gold px-4 py-3 rounded-lg font-bold text-sm">
            <LayoutDashboard size={18}/> Overview
          </Link>
          <Link href="/admin" className="flex items-center gap-3 text-brand-ivory/70 hover:bg-white/5 hover:text-brand-ivory px-4 py-3 rounded-lg font-bold text-sm transition-colors">
            <Users size={18}/> Users & Roles
          </Link>
          <Link href="/admin" className="flex items-center gap-3 text-brand-ivory/70 hover:bg-white/5 hover:text-brand-ivory px-4 py-3 rounded-lg font-bold text-sm transition-colors">
            <Calendar size={18}/> Events & Melas
          </Link>
          <Link href="/admin" className="flex items-center gap-3 text-brand-ivory/70 hover:bg-white/5 hover:text-brand-ivory px-4 py-3 rounded-lg font-bold text-sm transition-colors">
            <MapIcon size={18}/> Venues & Map
          </Link>
          <Link href="/admin" className="flex items-center gap-3 text-brand-ivory/70 hover:bg-white/5 hover:text-brand-ivory px-4 py-3 rounded-lg font-bold text-sm transition-colors">
            <Bell size={18}/> Notifications
          </Link>
          <Link href="/admin" className="flex items-center gap-3 text-brand-ivory/70 hover:bg-white/5 hover:text-brand-ivory px-4 py-3 rounded-lg font-bold text-sm transition-colors">
            <Shield size={18}/> Moderation
          </Link>
          <Link href="/admin" className="flex items-center gap-3 text-brand-ivory/70 hover:bg-white/5 hover:text-brand-ivory px-4 py-3 rounded-lg font-bold text-sm transition-colors">
            <FileText size={18}/> Reports & Audit
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <div>
              <h1 className="text-3xl font-serif font-bold text-brand-ivory">Dashboard Overview</h1>
              <p className="text-brand-ivory/60 text-sm mt-1">Super Admin Dashboard • Mysuru Dasara 2026</p>
            </div>
            <button className="bg-brand-gold text-brand-navy font-bold px-4 py-2 rounded-lg text-sm hover:bg-[#FFF8D6] transition-colors">
              + Quick Action
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glass-panel-solid p-6 rounded-xl border-l-4 border-l-brand-gold relative overflow-hidden group">
              <h3 className="text-brand-ivory/60 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">Total Visitors</h3>
              <p className="text-3xl font-bold text-brand-ivory relative z-10">142,853</p>
              <Users className="absolute -right-4 -bottom-4 text-brand-gold/10 group-hover:scale-110 transition-transform" size={100} />
            </div>
            <div className="glass-panel-solid p-6 rounded-xl border-l-4 border-l-blue-500 relative overflow-hidden group">
              <h3 className="text-brand-ivory/60 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">Active Vendors</h3>
              <p className="text-3xl font-bold text-brand-ivory relative z-10">412</p>
              <Users className="absolute -right-4 -bottom-4 text-blue-500/10 group-hover:scale-110 transition-transform" size={100} />
            </div>
            <div className="glass-panel-solid p-6 rounded-xl border-l-4 border-l-green-500 relative overflow-hidden group">
              <h3 className="text-brand-ivory/60 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">Official Events</h3>
              <p className="text-3xl font-bold text-brand-ivory relative z-10">84</p>
              <Calendar className="absolute -right-4 -bottom-4 text-green-500/10 group-hover:scale-110 transition-transform" size={100} />
            </div>
            <div className="glass-panel-solid p-6 rounded-xl border-l-4 border-l-purple-500 relative overflow-hidden group">
              <h3 className="text-brand-ivory/60 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">Sync Status</h3>
              <p className="text-3xl font-bold text-brand-ivory flex items-center gap-2 relative z-10">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span> Turso Live
              </p>
              <Database className="absolute -right-4 -bottom-4 text-purple-500/10 group-hover:scale-110 transition-transform" size={100} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel-solid rounded-xl border border-white/5 overflow-hidden">
              <div className="p-5 border-b border-white/10 bg-white/5">
                <h3 className="font-bold text-brand-ivory flex items-center gap-2"><Activity size={18} className="text-brand-gold"/> Recent Audit Logs</h3>
              </div>
              <div className="p-0">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-white/5">
                    <tr className="text-brand-ivory/80 hover:bg-white/5">
                      <td className="p-4 py-3"><span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded mr-2">UPDATE</span> Vendor profile approved</td>
                      <td className="p-4 py-3 text-right text-brand-ivory/40">2m ago</td>
                    </tr>
                    <tr className="text-brand-ivory/80 hover:bg-white/5">
                      <td className="p-4 py-3"><span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded mr-2">CREATE</span> New official event added</td>
                      <td className="p-4 py-3 text-right text-brand-ivory/40">15m ago</td>
                    </tr>
                    <tr className="text-brand-ivory/80 hover:bg-white/5">
                      <td className="p-4 py-3"><span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded mr-2">DELETE</span> Removed offensive review</td>
                      <td className="p-4 py-3 text-right text-brand-ivory/40">1h ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-panel-solid rounded-xl border border-white/5 overflow-hidden">
              <div className="p-5 border-b border-white/10 bg-white/5">
                <h3 className="font-bold text-brand-ivory flex items-center gap-2"><ShieldAlert size={18} className="text-red-400"/> Security Alerts</h3>
              </div>
              <div className="p-6 text-center text-brand-ivory/60">
                <Shield className="mx-auto mb-3 text-green-500/30" size={48} />
                <p>No active security threats detected.</p>
                <p className="text-xs mt-1">Last scan: Just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
