import { Navigation } from "lucide-react";
import MapWrapper from "@/components/MapWrapper";

export default function MapPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] relative bg-brand-bg">
      <div className="p-4 md:p-6 absolute top-0 left-0 right-0 z-10 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div className="bg-brand-surface/80 backdrop-blur-md border border-white/10 p-4 rounded-xl pointer-events-auto shadow-2xl">
            <h1 className="text-2xl font-serif font-bold text-brand-ivory flex items-center gap-2">
              <Navigation className="text-brand-gold" /> Interactive Map
            </h1>
            <p className="text-xs text-brand-ivory/60 mt-1">Explore all real venues and events.</p>
          </div>
        </div>
      </div>
      
      {/* Full screen actual Leaflet map */}
      <div className="w-full h-full relative z-0">
         <MapWrapper />
      </div>
    </div>
  );
}
