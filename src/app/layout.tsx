import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import { Search, Globe, Bell, User, Map, Calendar, Home, Tent, Heart, LayoutDashboard } from "lucide-react";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mysuru Dasara 2026 | Digital Companion",
  description: "Experience the Nada Habba in its true royal grandeur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-brand-ivory text-brand-navy dark:bg-brand-navy dark:text-brand-ivory min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          
          {/* Desktop & Tablet Header */}
          <header className="sticky top-0 z-50 transition-all duration-300 bg-brand-navy/95 backdrop-blur-md text-brand-ivory border-b border-white/10">
            <div className="px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
              
              {/* LEFT: Logo & Emblem */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-gold to-brand-gold-dark rounded-full flex items-center justify-center text-brand-navy shadow-lg shadow-brand-gold/20 group-hover:scale-105 transition-transform">
                  {/* Palace-inspired emblem placeholder */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 12h3v8h14v-8h3L12 2z"/><path d="M12 10v10"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-lg md:text-xl font-bold tracking-wider leading-none">MYSURU DASARA</span>
                  <span className="text-[10px] md:text-xs text-brand-gold tracking-widest uppercase mt-1">Nada Habba 2026</span>
                </div>
              </Link>
              
              {/* CENTER: Navigation (Desktop only) */}
              <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
                <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
                <Link href="/events" className="hover:text-brand-gold transition-colors">Events</Link>
                <Link href="/sports" className="hover:text-brand-gold transition-colors">Sports</Link>
                <Link href="/melas" className="hover:text-brand-gold transition-colors">Melas</Link>
                <Link href="/food" className="hover:text-brand-gold transition-colors">Food</Link>
                <Link href="/live" className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>Live Now</Link>
                <Link href="/map" className="hover:text-brand-gold transition-colors">Map</Link>
                <Link href="/community" className="hover:text-brand-gold transition-colors">Community</Link>
              </nav>

              {/* RIGHT: Quick Actions */}
              <div className="flex items-center gap-3 md:gap-5">
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden md:block" aria-label="Search">
                  <Search size={20} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden md:block" aria-label="Language">
                  <Globe size={20} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative" aria-label="Notifications">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-gold rounded-full border border-brand-navy"></span>
                </button>
                <Link href="/my-dasara" className="hidden md:flex items-center gap-2 bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 px-4 py-2 rounded-full font-semibold text-sm transition-colors border border-brand-gold/30">
                  <Heart size={16} /> My Dasara
                </Link>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Profile">
                  <User size={20} />
                </button>
              </div>
            </div>
          </header>
          
          <main className="flex-1">
            {children}
          </main>

          {/* Mobile Bottom Navigation (Highly Native Feel) */}
          <nav className="md:hidden sticky bottom-0 z-50 bg-brand-navy/95 backdrop-blur-xl text-brand-ivory/60 border-t border-white/10 px-6 py-4 flex justify-between items-center pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
            <Link href="/" className="flex flex-col items-center gap-1.5 hover:text-brand-ivory transition-colors group">
              <Home size={22} className="group-hover:-translate-y-1 transition-transform" />
              <span className="text-[10px] font-medium tracking-wide">Home</span>
            </Link>
            <Link href="/events" className="flex flex-col items-center gap-1.5 hover:text-brand-ivory transition-colors group">
              <Calendar size={22} className="group-hover:-translate-y-1 transition-transform" />
              <span className="text-[10px] font-medium tracking-wide">Events</span>
            </Link>
            <Link href="/map" className="flex flex-col items-center gap-1.5 hover:text-brand-ivory transition-colors group">
              <Map size={22} className="group-hover:-translate-y-1 transition-transform" />
              <span className="text-[10px] font-medium tracking-wide">Map</span>
            </Link>
            <Link href="/melas" className="flex flex-col items-center gap-1.5 hover:text-brand-ivory transition-colors group">
              <Tent size={22} className="group-hover:-translate-y-1 transition-transform" />
              <span className="text-[10px] font-medium tracking-wide">Melas</span>
            </Link>
            <Link href="/my-dasara" className="flex flex-col items-center gap-1.5 text-brand-gold transition-colors group">
              <Heart size={22} className="group-hover:-translate-y-1 transition-transform" />
              <span className="text-[10px] font-medium tracking-wide">My Dasara</span>
            </Link>
          </nav>
        </div>
      </body>
    </html>
  );
}
