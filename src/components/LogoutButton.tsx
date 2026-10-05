'use client';
import { useTransition } from 'react';
import { logoutAction } from '@/app/actions';
import { LogOut, Loader2 } from 'lucide-react';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <button 
      onClick={() => startTransition(() => logoutAction())}
      disabled={isPending}
      className="text-brand-ivory/60 hover:text-red-400 transition-colors p-2"
      title="Logout"
    >
      {isPending ? <Loader2 className="animate-spin" size={16} /> : <LogOut size={16} />}
    </button>
  );
}
