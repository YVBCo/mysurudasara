import { getSession } from '@/app/actions';
import { Store, Package, Star, Clock, AlertTriangle, ShieldAlert } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function VendorDashboard() {
  const session = await getSession();
  if (!session || (session.role !== 'VENDOR' && session.role !== 'ADMIN')) {
    redirect('/login');
  }

  // Mock Vendor Data for demo
  const stall = {
    name: "Karnataka Handicrafts Co.",
    id: "stall-402",
    status: "APPROVED",
    rating: 4.8,
    reviews: 124,
    location: "Exhibition Grounds - A Block",
    products: [
      { id: 1, name: "Mysuru Sandalwood Soap", price: "₹150", stock: "In Stock" },
      { id: 2, name: "Channapatna Toys", price: "₹450", stock: "Low Stock" },
      { id: 3, name: "Mysuru Silk Saree", price: "₹5500", stock: "In Stock" }
    ]
  };

  return (
    <div className="bg-brand-bg min-h-[calc(100vh-64px)] p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-ivory mb-2">Vendor Dashboard</h1>
            <p className="text-brand-ivory/60 flex items-center gap-2">
              <Store size={16}/> {stall.name} • {stall.location}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> {stall.status}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel-solid p-6 rounded-xl flex items-start gap-4">
            <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-lg"><Star size={24}/></div>
            <div>
              <p className="text-xs font-bold text-brand-ivory/60 uppercase tracking-widest mb-1">Customer Rating</p>
              <h3 className="text-2xl font-bold text-brand-ivory">{stall.rating} <span className="text-sm text-brand-ivory/40 font-normal">({stall.reviews} reviews)</span></h3>
            </div>
          </div>
          <div className="glass-panel-solid p-6 rounded-xl flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg"><Package size={24}/></div>
            <div>
              <p className="text-xs font-bold text-brand-ivory/60 uppercase tracking-widest mb-1">Active Products</p>
              <h3 className="text-2xl font-bold text-brand-ivory">{stall.products.length} Items</h3>
            </div>
          </div>
          <div className="glass-panel-solid p-6 rounded-xl flex items-start gap-4">
            <div className="p-3 bg-red-500/10 text-red-400 rounded-lg"><AlertTriangle size={24}/></div>
            <div>
              <p className="text-xs font-bold text-brand-ivory/60 uppercase tracking-widest mb-1">Pending Actions</p>
              <h3 className="text-2xl font-bold text-brand-ivory">0</h3>
            </div>
          </div>
        </div>

        {/* Products Manager */}
        <div className="glass-panel-solid rounded-xl overflow-hidden border border-white/5">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-brand-ivory">Product Inventory</h2>
            <button className="bg-brand-gold text-brand-navy font-bold px-4 py-2 rounded-lg text-sm hover:bg-[#FFF8D6] transition-colors">
              + Add Product
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-navy/30 text-brand-ivory/60 text-xs uppercase tracking-widest">
                  <th className="p-4 font-bold">Product Name</th>
                  <th className="p-4 font-bold">Price</th>
                  <th className="p-4 font-bold">Stock Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stall.products.map(p => (
                  <tr key={p.id} className="text-brand-ivory hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">{p.name}</td>
                    <td className="p-4">{p.price}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded font-bold ${p.stock === 'In Stock' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-brand-gold text-sm font-bold hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
