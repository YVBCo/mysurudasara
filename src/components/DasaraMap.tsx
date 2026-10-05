'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getEvents } from '@/app/actions';
import Link from 'next/link';
import { Calendar, Navigation } from 'lucide-react';

// Fix Leaflet's default icon path issues in Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function DasaraMap() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getEvents();
      setEvents(data.filter((e: any) => e.lat && e.lng));
    }
    load();
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative z-0">
      <MapContainer 
        center={[12.3051, 76.6551]} // Mysuru center
        zoom={14} 
        style={{ height: '100%', width: '100%', background: '#0A0D14' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="dark-map-tiles"
        />
        {events.map(event => (
          <Marker key={event.id} position={[event.lat, event.lng]} icon={icon}>
            <Popup className="premium-popup">
              <div className="p-1">
                <img src={event.image} alt={event.title} className="w-full h-24 object-cover rounded-lg mb-2" />
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">{event.category}</span>
                <h3 className="font-bold text-sm text-[#0B132B] mb-1 leading-tight">{event.title}</h3>
                <p className="text-xs text-gray-600 mb-3 flex items-center gap-1">
                  <Calendar size={12}/> {new Date(event.startTime).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <Link href={`/events/${event.id}`} className="bg-[#0B132B] text-white text-xs px-3 py-1.5 rounded-md font-bold flex-1 text-center">
                    Details
                  </Link>
                  <button className="bg-[#D4AF37] text-[#0B132B] px-2 py-1.5 rounded-md">
                    <Navigation size={14} />
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
