'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, BadgeCheck } from 'lucide-react';
import { askAI } from '@/app/actions';

export default function AIAssistant() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse(null);
    try {
      const res = await askAI(query);
      setResponse(res);
    } catch (error) {
      setResponse({ response: "An error occurred connecting to the knowledge base.", source: "System" });
    } finally {
      setLoading(false);
    }
  };

  const suggest = (text: string) => {
    setQuery(text);
  };

  return (
    <div className="bg-brand-surface rounded-2xl border border-white/10 p-1">
      <div className="bg-gradient-to-br from-brand-bg to-brand-surface p-6 md:p-10 rounded-xl relative overflow-hidden">
        
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Sparkles size={120} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-serif font-bold text-brand-ivory mb-2 flex items-center gap-2">
              <Sparkles className="text-brand-gold" /> Ask Dasara AI
            </h2>
            <p className="text-brand-ivory/60 mb-6">Your personal guide to the Nada Habba. Powered by official verified data.</p>
            
            <form onSubmit={handleAsk} className="relative mb-4">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What is happening near Mysuru Palace today?"
                className="w-full bg-brand-bg border border-white/20 rounded-xl py-4 pl-4 pr-14 text-brand-ivory placeholder:text-brand-ivory/30 focus:outline-none focus:border-brand-gold transition-colors"
              />
              <button 
                type="submit"
                disabled={loading || !query.trim()}
                className="absolute right-2 top-2 bottom-2 bg-brand-gold text-brand-navy w-10 rounded-lg flex items-center justify-center hover:bg-[#FFF8D6] transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
              </button>
            </form>
            
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => suggest("What is happening today?")} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-brand-ivory/70 transition-colors">"What is happening today?"</button>
              <button type="button" onClick={() => suggest("When is the Jamboo Savari?")} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-brand-ivory/70 transition-colors">"When is the Jamboo Savari?"</button>
              <button type="button" onClick={() => suggest("Where can I eat?")} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-brand-ivory/70 transition-colors">"Where can I eat?"</button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 min-h-[160px]">
            {response ? (
              <div className="bg-brand-bg/80 backdrop-blur-md rounded-xl p-6 border border-brand-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.1)] h-full flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge-ai px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={10} /> AI Recommendation
                  </span>
                  {response.verified && (
                     <span className="badge-official px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                       <BadgeCheck size={10} /> Official Source Data
                     </span>
                  )}
                </div>
                <p className="text-brand-ivory text-lg leading-relaxed font-serif italic">"{response.response}"</p>
              </div>
            ) : (
              <div className="bg-white/5 rounded-xl border border-white/10 border-dashed h-full flex items-center justify-center p-6 text-brand-ivory/30 text-center">
                Ask a question to receive intelligent recommendations based on real-time official Dasara data.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
