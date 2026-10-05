import { getSession } from '@/app/actions';
import { redirect } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export default async function ModeratorDashboard() {
  const session = await getSession();
  if (!session || (session.role !== 'MODERATOR' && session.role !== 'ADMIN')) {
    redirect('/login');
  }

  // Create table if not exists (for demo)
  await db.execute('CREATE TABLE IF NOT EXISTS reports (id TEXT PRIMARY KEY, content TEXT, status TEXT, timestamp TEXT)');
  
  const result = await db.execute('SELECT * FROM reports ORDER BY timestamp DESC');
  const reports = result.rows;

  async function resolveReport(formData: FormData) {
    "use server";
    const id = formData.get('id') as string;
    await db.execute({ sql: 'UPDATE reports SET status = "RESOLVED" WHERE id = ?', args: [id] });
    revalidatePath('/moderator');
  }

  return (
    <div className="bg-brand-bg min-h-[calc(100vh-64px)] p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-serif font-bold text-brand-ivory mb-2">Moderator Dashboard</h1>
        
        <div className="glass-panel-solid rounded-xl overflow-hidden border border-white/5 p-6">
          <h2 className="text-xl font-bold text-brand-ivory mb-4 flex items-center gap-2"><ShieldAlert/> Pending Reports</h2>
          {reports.length === 0 ? <p className="text-brand-ivory/50">No reports found.</p> : (
            <ul className="space-y-4">
              {reports.map((r: any) => (
                <li key={r.id as string} className="text-brand-ivory border border-white/10 p-4 rounded-lg flex justify-between items-center bg-white/5">
                  <div>
                    <strong className="text-brand-gold">{r.status}</strong>: {r.content}
                  </div>
                  {r.status !== 'RESOLVED' && (
                    <form action={resolveReport}>
                      <input type="hidden" name="id" value={r.id} />
                      <button type="submit" className="bg-green-500/20 text-green-400 font-bold px-3 py-1 rounded">Resolve</button>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
