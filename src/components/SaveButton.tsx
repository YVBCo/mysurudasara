'use client';

import { useTransition, useState } from 'react';
import { saveEvent } from '@/app/actions';
import { Bookmark, BookmarkCheck } from 'lucide-react';

export default function SaveButton({ eventId, isSaved }: { eventId: string, isSaved: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [savedState, setSavedState] = useState(isSaved);

  const MOCK_USER_ID = "test-user-123";

  return (
    <button 
      onClick={() => {
        startTransition(async () => {
          const res = await saveEvent(eventId, MOCK_USER_ID);
          if (res.success) {
            setSavedState(!savedState);
            alert(res.message);
          }
        });
      }}
      disabled={isPending}
      className={`w-full mb-3 text-sm font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 border ${
        savedState 
          ? 'bg-brand-gold/20 text-brand-gold border-brand-gold/40 hover:bg-brand-gold/30' 
          : 'bg-brand-surface border-white/10 text-brand-ivory hover:bg-white/10 hover:border-brand-gold/50'
      }`}
    >
      {savedState ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
      {isPending ? 'Saving...' : savedState ? 'Saved to My Dasara' : 'Save to My Dasara'}
    </button>
  );
}
