import { TrendingUp } from "lucide-react";
import { TopProduct } from "../types/dashboard.types";

export const TopProductsList = ({ products }: { products: TopProduct[] }) => {
  const formatted = products.map((p, i) => ({
    name: p.name || "Menu",
    price: `Rp ${Number(p.price || 0).toLocaleString()}`,
    sold: `${p.sold || 0} terjual`,
    rank: i + 1,
    image: p.image || "https://via.placeholder.com/150",
  }));

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col">
      <h3 className="text-sm font-bold text-[#143125] mb-5 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-emerald-600" /> Produk Favorit
      </h3>
      <div className="flex-1 space-y-4">
        {formatted.map((p) => (
          <div key={p.rank} className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100">
            <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-xl shadow-inner border border-stone-100" />
            <div className="flex-1">
              <h4 className="text-xs font-bold text-stone-900">{p.name}</h4>
              <p className="text-[10px] text-emerald-700 font-semibold">{p.price}</p>
            </div>
            <div className="text-right">
              <div className="text-xs font-black text-[#143125]">#{p.rank}</div>
              <div className="text-[9px] text-stone-400 font-medium">{p.sold.split(' ')[0]} terjual</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
