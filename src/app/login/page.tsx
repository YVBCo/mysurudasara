'use client';
import { useState, useTransition } from 'react';
import { loginAction } from '@/app/actions';
import { ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill out all fields.');
      return;
    }

    startTransition(async () => {
      const res = await loginAction(email, password);
      if (res.success) {
        router.push(res.redirect || '/');
      } else {
        setError(res.error || 'Authentication failed');
      }
    });
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md glass-panel-solid rounded-3xl p-8 border-brand-gold/30 shadow-2xl relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-surface border border-brand-gold rounded-full flex items-center justify-center shadow-lg shadow-brand-gold/20">
          <ShieldAlert className="text-brand-gold" size={24} />
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-center text-brand-ivory mt-6 mb-2">Sign In</h1>
        <p className="text-center text-brand-ivory/60 text-sm mb-8">Access your My Dasara passbook, vendor dashboard, or admin portal.</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-6 flex items-center gap-2">
            <ShieldAlert size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-ivory/50 mb-1">Email / Role ID</label>
            <input 
              type="text" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-brand-ivory focus:outline-none focus:border-brand-gold transition-colors"
              placeholder="visitor / vendor / admin"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-ivory/50 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-brand-ivory focus:outline-none focus:border-brand-gold transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-brand-gold text-brand-navy font-bold py-3 rounded-xl hover:bg-[#FFF8D6] transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
          >
            {isPending ? <Loader2 className="animate-spin" size={18} /> : 'Secure Login'}
            {!isPending && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-xs text-brand-ivory/40 text-center mb-2">Demo Credentials for QA:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-brand-ivory/60">admin / password</span>
            <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-brand-ivory/60">vendor / password</span>
            <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-brand-ivory/60">visitor / password</span>
          </div>
        </div>
      </div>
    </div>
  );
}
