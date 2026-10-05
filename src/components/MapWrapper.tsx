'use client';

import dynamic from 'next/dynamic';

const DasaraMap = dynamic(() => import("@/components/DasaraMap"), { 
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-brand-surface border border-white/10 rounded-2xl flex items-center justify-center text-brand-ivory/50">Loading Premium Map...</div>
});

export default function MapWrapper() {
  return <DasaraMap />;
}
