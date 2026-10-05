'use client';

import { Search, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchEvents() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set('q', val);
    } else {
      params.delete('q');
    }
    router.push(`/events?${params.toString()}`);
  };

  const handleFilterClick = () => {
    alert("Advanced filtering options (Date, Distance, Price) will be available closer to the festival dates.");
  };

  return (
    <div className="flex gap-2 w-full md:w-auto">
      <div className="relative flex-1 md:w-80">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ivory/40" size={18} />
        <input 
          type="text" 
          value={query}
          onChange={handleSearch}
          placeholder="Search events..." 
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/20 bg-brand-surface focus:outline-none focus:border-brand-gold text-brand-ivory placeholder:text-brand-ivory/30 transition-colors shadow-lg" 
        />
      </div>
      <button 
        onClick={handleFilterClick}
        className="px-4 py-3 rounded-xl border border-white/20 bg-brand-surface hover:bg-brand-gold/20 hover:border-brand-gold text-brand-ivory flex items-center justify-center transition-all shadow-lg"
        aria-label="Filter"
      >
        <Filter size={20} />
      </button>
    </div>
  );
}
