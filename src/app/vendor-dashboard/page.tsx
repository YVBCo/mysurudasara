import { getSession, getProducts, addProduct } from '@/app/actions';
import { Store, Package, Star, Clock, AlertTriangle } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function VendorDashboard() {
  const session = await getSession();
  if (!session || (session.role !== 'VENDOR' && session.role !== 'ADMIN')) {
    redirect('/login');
  }

  // Fetch real products from Turso instead of Mock
  const products = await getProducts(session.userId);

  return (
    <div className="bg-brand-bg min-h-[calc(100vh-64px)] p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-ivory mb-2">Vendor Dashboard</h1>
            <p className="text-brand-ivory/60 flex items-center gap-2">
              <Store size={16}/> Karnataka Handicrafts Co. • Exhibition Grounds
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> APPROVED
            </span>
          </div>
        </div>

        {/* Products Manager */}
        <div className="glass-panel-solid rounded-xl overflow-hidden border border-white/5">
          <div className="p-6 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2 className="text-xl font-serif font-bold text-brand-ivory flex items-center gap-2"><Package size={20}/> Product Inventory</h2>
            
            {/* Add Product Form (Server Action) */}
            <form action={async (formData) => { "use server"; await addProduct(formData); }} className="flex gap-2 w-full md:w-auto">
              <input type="text" name="name" placeholder="Product Name" required className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-brand-ivory focus:outline-none focus:border-brand-gold w-full md:w-40" />
              <input type="text" name="price" placeholder="Price (₹)" required className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-brand-ivory focus:outline-none focus:border-brand-gold w-full md:w-24" />
              <button type="submit" className="bg-brand-gold text-brand-navy font-bold px-4 py-2 rounded-lg text-sm hover:bg-[#FFF8D6] transition-colors whitespace-nowrap">
                + Add
              </button>
            </form>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-navy/30 text-brand-ivory/60 text-xs uppercase tracking-widest">
                  <th className="p-4 font-bold">Product Name</th>
                  <th className="p-4 font-bold">Price</th>
                  <th className="p-4 font-bold">Stock Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.length === 0 ? (
                  <tr><td colSpan={3} className="p-8 text-center text-brand-ivory/50">No products added yet.</td></tr>
                ) : (
                  products.map((p: any) => (
                    <tr key={p.id} className="text-brand-ivory hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium">{p.name}</td>
                      <td className="p-4">{p.price}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded font-bold ${p.stock === 'In Stock' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {p.stock}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
