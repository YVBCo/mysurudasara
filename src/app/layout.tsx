import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import { Search, Globe, Bell, User, Map, Calendar, Home, Tent, Heart, LayoutDashboard, LogOut } from "lucide-react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { getSession } from "@/app/actions";
import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "@/components/ThemeToggle";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-[#FDFBF7] text-[#050609] dark:bg-[#050609] dark:text-[#FDFBF7] min-h-screen transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex flex-col min-h-screen">
            
            {/* Desktop & Tablet Header */}
            <header className="sticky top-0 z-50 transition-all duration-300 bg-brand-surface/80 backdrop-blur-xl border-b border-white/10">
              <div className="px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
                
                {/* LEFT: Logo & Emblem */}
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-gold to-brand-gold-dark rounded-full flex items-center justify-center text-brand-navy shadow-lg shadow-brand-gold/20 group-hover:scale-105 transition-transform">
                    {/* Palace-inspired emblem placeholder */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 12h3v8h14v-8h3L12 2z"/><path d="M12 10v10"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-lg md:text-xl font-bold tracking-wider leading-none text-brand-ivory">MYSURU DASARA</span>
                    <span className="text-[10px] md:text-xs text-brand-gold tracking-widest uppercase mt-1">Nada Habba 2026</span>
                  </div>
                </Link>
                
                {/* CENTER: Navigation (Desktop only) */}
                <nav className="hidden lg:flex items-center gap-8 text-sm font-bold tracking-wider">
                  <Link href="/" className="text-brand-ivory/80 hover:text-brand-gold transition-colors">Home</Link>
                  <Link href="/events" className="text-brand-ivory/80 hover:text-brand-gold transition-colors">Events</Link>
                  <Link href="/sports" className="text-brand-ivory/80 hover:text-brand-gold transition-colors">Sports</Link>
                  <Link href="/melas" className="text-brand-ivory/80 hover:text-brand-gold transition-colors">Melas</Link>
                  <Link href="/food" className="text-brand-ivory/80 hover:text-brand-gold transition-colors">Food</Link>
                  <Link href="/live" className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>Live Now</Link>
                  <Link href="/map" className="text-brand-ivory/80 hover:text-brand-gold transition-colors">Map</Link>
                  <Link href="/community" className="text-brand-ivory/80 hover:text-brand-gold transition-colors">Community</Link>
                </nav>

                {/* RIGHT: Quick Actions */}
                <div className="flex items-center gap-4">
                  <button className="text-brand-ivory/60 hover:text-brand-gold transition-colors hidden sm:block"><Search size={20} /></button>
                  <button className="text-brand-ivory/60 hover:text-brand-gold transition-colors hidden sm:block"><Globe size={20} /></button>
                  <ThemeToggle />
                  <button className="text-brand-ivory/60 hover:text-brand-gold transition-colors hidden sm:block"><Bell size={20} /></button>
                  
                  {session ? (
                    <div className="flex items-center gap-3">
                      <Link href={session.role === 'ADMIN' ? '/admin' : session.role === 'VENDOR' ? '/vendor-dashboard' : '/my-dasara'} className="hidden md:flex bg-white/10 hover:bg-white/20 text-brand-ivory px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors gap-2 items-center border border-white/10">
                        {session.userId} <User size={14}/>
                      </Link>
                      <LogoutButton />
                    </div>
                  ) : (
                    <Link href="/login" className="hidden md:flex bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors items-center gap-2 border border-brand-gold/30">
                      Login <User size={14} />
                    </Link>
                  )}
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full relative z-0">
              {children}
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-surface/90 backdrop-blur-xl border-t border-white/10 pb-safe">
              <div className="flex items-center justify-around h-16">
                <Link href="/" className="flex flex-col items-center gap-1 text-brand-ivory/60 hover:text-brand-gold transition-colors">
                  <Home size={20} />
                  <span className="text-[10px] font-bold">Home</span>
                </Link>
                <Link href="/events" className="flex flex-col items-center gap-1 text-brand-ivory/60 hover:text-brand-gold transition-colors">
                  <Calendar size={20} />
                  <span className="text-[10px] font-bold">Events</span>
                </Link>
                <Link href="/map" className="flex flex-col items-center gap-1 text-brand-ivory/60 hover:text-brand-gold transition-colors">
                  <Map size={20} />
                  <span className="text-[10px] font-bold">Map</span>
                </Link>
                <Link href="/melas" className="flex flex-col items-center gap-1 text-brand-ivory/60 hover:text-brand-gold transition-colors">
                  <Tent size={20} />
                  <span className="text-[10px] font-bold">Melas</span>
                </Link>
                <Link href={session ? "/my-dasara" : "/login"} className="flex flex-col items-center gap-1 text-brand-gold hover:text-[#FFF8D6] transition-colors relative">
                  <Heart size={20} />
                  <span className="text-[10px] font-bold">My Dasara</span>
                </Link>
              </div>
            </nav>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
