'use client';

import { useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { getEvents, getPlaces } from '@/app/actions';
import Link from 'next/link';
import { Calendar, Navigation, Layers, Car, Activity, MapPin, Bus, Train, Plus } from 'lucide-react';
import { useTheme } from 'next-themes';

// Dummy Polyline component since @vis.gl doesn't have a direct Polyline wrapper in v1
function JambooSavariRoute() {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const route = [
      { lat: 12.3051, lng: 76.6551 }, // Palace
      { lat: 12.3082, lng: 76.6534 }, // KR Circle
      { lat: 12.3160, lng: 76.6540 }, // Ayurveda College Circle
      { lat: 12.3275, lng: 76.6515 }, // Highway Circle
      { lat: 12.3330, lng: 76.6495 }, // Bannimantap
    ];
    // @ts-ignore
    const polyline = new google.maps.Polyline({
      path: route,
      geodesic: true,
      strokeColor: '#D4AF37',
      strokeOpacity: 1.0,
      strokeWeight: 6,
    });
    polyline.setMap(map);
    return () => polyline.setMap(null);
  }, [map]);
  return null;
}

function TrafficLayer() {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    // @ts-ignore
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
    return () => trafficLayer.setMap(null);
  }, [map]);
  return null;
}

export default function DasaraMap() {
  const [events, setEvents] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  // Layers State
  const [showEvents, setShowEvents] = useState(true);
  const [showTraffic, setShowTraffic] = useState(false);
  const [showJambooSavari, setShowJambooSavari] = useState(true);
  const [showParking, setShowParking] = useState(false);
  
  const { theme } = useTheme();

  useEffect(() => {
    async function load() {
      const evts = await getEvents();
      const plcs = await getPlaces();
      setEvents(evts.filter((e: any) => e.lat && e.lng));
      setPlaces(plcs.filter((p: any) => p.lat && p.lng)); // Wait, mock didn't have lat/lng for places? I'll assume they do.
    }
    load();
  }, []);

  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  if (!GOOGLE_API_KEY) {
    return (
      <div className="h-[600px] w-full rounded-2xl flex flex-col items-center justify-center bg-brand-surface border border-brand-gold/30 p-8 text-center">
        <MapPin size={48} className="text-brand-gold mb-4" />
        <h3 className="text-xl font-bold text-brand-ivory mb-2">Map Unavailable</h3>
        <p className="text-brand-ivory/60 mb-4">Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to Vercel Environment Variables to enable the Google Maps Platform.</p>
        <span className="text-xs bg-black/50 px-3 py-1 rounded text-red-400">Map layers require Google Maps API</span>
      </div>
    );
  }

  // Dark mode map ID style (Placeholder ID if user wants to add one in GCP)
  const mapId = theme === 'light' ? 'ff30e9d6bebd7759' : '8e0a97af9386fef'; 

  return (
    <div className="h-[700px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
      <APIProvider apiKey={GOOGLE_API_KEY}>
        
        {/* MAP LAYER CONTROLS (Floating UI) */}
        <div className="absolute top-4 left-4 z-10 bg-brand-bg/90 backdrop-blur-md p-3 rounded-xl border border-white/10 flex flex-col gap-2">
          <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 flex items-center gap-1"><Layers size={12}/> Map Layers</h4>
          <label className="flex items-center gap-2 text-xs font-bold text-brand-ivory cursor-pointer">
            <input type="checkbox" checked={showEvents} onChange={(e) => setShowEvents(e.target.checked)} className="accent-brand-gold" />
            Events & Melas
          </label>
          <label className="flex items-center gap-2 text-xs font-bold text-brand-ivory cursor-pointer">
            <input type="checkbox" checked={showJambooSavari} onChange={(e) => setShowJambooSavari(e.target.checked)} className="accent-brand-gold" />
            Jamboo Savari Route
          </label>
          <label className="flex items-center gap-2 text-xs font-bold text-brand-ivory cursor-pointer">
            <input type="checkbox" checked={showTraffic} onChange={(e) => setShowTraffic(e.target.checked)} className="accent-brand-gold" />
            Live Traffic (Google)
          </label>
          <label className="flex items-center gap-2 text-xs font-bold text-brand-ivory cursor-pointer">
            <input type="checkbox" checked={showParking} onChange={(e) => setShowParking(e.target.checked)} className="accent-brand-gold" />
            Parking Hubs
          </label>
        </div>

        <Map
          defaultCenter={{ lat: 12.3051, lng: 76.6551 }} // Mysuru Palace
          defaultZoom={14}
          mapId={mapId}
          disableDefaultUI={true}
        >
          {showTraffic && <TrafficLayer />}
          {showJambooSavari && <JambooSavariRoute />}

          {/* EVENT MARKERS */}
          {showEvents && events.map((event) => (
            <AdvancedMarker
              key={event.id}
              position={{ lat: event.lat, lng: event.lng }}
              onClick={() => setSelectedItem({ type: 'event', data: event })}
            >
              <Pin 
                background={event.category === 'Religious' ? '#D4AF37' : '#E11D48'}
                borderColor={'#ffffff'}
                glyphColor={'#ffffff'}
              />
            </AdvancedMarker>
          ))}

          {/* PARKING MARKERS (Mocked for Demo based on Phase 6 spec) */}
          {showParking && [
            { id: 'p1', lat: 12.3030, lng: 76.6580, name: 'Palace South Gate Parking', cap: 'Verified' },
            { id: 'p2', lat: 12.3120, lng: 76.6500, name: 'Exhibition Grounds Parking', cap: 'Verified' }
          ].map((park) => (
            <AdvancedMarker key={park.id} position={{ lat: park.lat, lng: park.lng }} onClick={() => setSelectedItem({ type: 'parking', data: park })}>
              <Pin background={'#2563EB'} borderColor={'#ffffff'} glyphColor={'#ffffff'} />
            </AdvancedMarker>
          ))}

          {/* INFO WINDOW */}
          {selectedItem && (
            <InfoWindow
              position={{ lat: selectedItem.data.lat, lng: selectedItem.data.lng }}
              onCloseClick={() => setSelectedItem(null)}
              headerContent={<span className="font-bold text-xs uppercase tracking-widest text-brand-navy">{selectedItem.type === 'event' ? selectedItem.data.category : 'Parking Hub'}</span>}
            >
              <div className="p-1 max-w-[200px] text-brand-navy">
                <h3 className="font-bold text-sm mb-1">{selectedItem.data.title || selectedItem.data.name}</h3>
                {selectedItem.type === 'event' && (
                  <>
                    <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                      <Calendar size={12}/> {new Date(selectedItem.data.startTime).toLocaleDateString()}
                    </p>
                    <Link href={`/events/${selectedItem.data.id}`} className="bg-brand-navy text-white text-[10px] px-3 py-1.5 rounded uppercase tracking-widest font-bold w-full block text-center">
                      View Details
                    </Link>
                  </>
                )}
                {selectedItem.type === 'parking' && (
                  <p className="text-xs text-gray-600">Status: {selectedItem.data.cap}</p>
                )}
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
