import Link from "next/link";
import { Users, Heart, Share2, Camera, MessageCircle, ArrowRight } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="bg-brand-bg min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-surface to-brand-bg pt-12 pb-8 px-6 md:px-12 border-b border-white/10 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-ivory mb-2 flex items-center gap-3">
            <Users className="text-brand-gold" size={40} /> Community Hub
          </h1>
          <p className="text-brand-ivory/60">Join the celebration. Share your experiences, volunteer, and connect.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Feed Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-serif font-bold text-brand-ivory border-b border-white/10 pb-2 flex-1">Trending Stories</h2>
            </div>
            
            {/* Mock Post 1 */}
            <div className="glass-panel-solid rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-surface border border-white/20 flex items-center justify-center font-bold text-brand-gold">
                  K
                </div>
                <div>
                  <h3 className="text-brand-ivory font-bold text-sm">Karthik S.</h3>
                  <p className="text-brand-ivory/40 text-xs">2 hours ago • At Mysuru Palace</p>
                </div>
              </div>
              <p className="text-brand-ivory/80 mb-4 text-sm leading-relaxed">
                The Palace illumination tonight was absolutely breathtaking. The weather is perfect and the crowds are managing really well. Can't wait for the Jamboo Savari! ✨
              </p>
              <div className="h-64 rounded-xl overflow-hidden mb-4">
                <img src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Palace" />
              </div>
              <div className="flex items-center gap-6 border-t border-white/10 pt-4">
                <button className="flex items-center gap-2 text-brand-ivory/60 hover:text-red-400 transition-colors text-sm font-bold"><Heart size={16}/> 245</button>
                <button className="flex items-center gap-2 text-brand-ivory/60 hover:text-brand-ivory transition-colors text-sm font-bold"><MessageCircle size={16}/> 18</button>
                <button className="flex items-center gap-2 text-brand-ivory/60 hover:text-brand-ivory transition-colors text-sm font-bold ml-auto"><Share2 size={16}/> Share</button>
              </div>
            </div>

          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            
            <div className="glass-panel-solid rounded-2xl p-6 border border-brand-gold/30">
              <h3 className="font-serif font-bold text-brand-ivory text-xl mb-2 flex items-center gap-2"><Camera className="text-brand-gold"/> Photography Contest</h3>
              <p className="text-sm text-brand-ivory/60 mb-4">Submit your best Dasara captures. Top 10 photos will be featured on the official dashboard.</p>
              <button className="w-full bg-brand-gold text-brand-navy font-bold py-3 rounded-xl hover:bg-[#FFF8D6] transition-colors shadow-lg">Submit Photo</button>
            </div>

            <div className="glass-panel-solid rounded-2xl p-6 border border-white/10">
              <h3 className="font-serif font-bold text-brand-ivory text-xl mb-4 border-b border-white/10 pb-2">Volunteer</h3>
              <p className="text-sm text-brand-ivory/60 mb-4">Join the Dasara youth volunteer force. Help manage crowds, assist tourists, and keep Mysuru clean.</p>
              <Link href="#" className="text-brand-gold hover:text-[#FFF8D6] text-sm font-bold flex items-center gap-1">Register as Volunteer <ArrowRight size={14}/></Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
