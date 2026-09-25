import { LayoutDashboard, ClipboardList, CreditCard, Coffee, Package, TrendingUp, Search, Bell, ChevronDown, Calendar, Users, BarChart3, Settings, LogOut, Store, ChevronRight, MapPin, Instagram, MessageCircle } from "lucide-react";

// Dashboard Data
const stats = [
  { label: "Total Pendapatan", value: "Rp 1.240.000", change: "+12.5%", color: "text-emerald-700", bg: "bg-emerald-50", icon: CreditCard },
  { label: "Pesanan Masuk", value: "48", change: "+5.2%", color: "text-blue-700", bg: "bg-blue-50", icon: ClipboardList },
  { label: "Menu Terjual", value: "162", change: "+15.0%", color: "text-amber-700", bg: "bg-amber-50", icon: Package },
  { label: "Pelanggan Baru", value: "37", change: "+10.1%", color: "text-rose-700", bg: "bg-rose-50", icon: Users },
];

const topProducts = [
  { name: "Es Kopi Susu", price: "Rp 17.000", sold: "42 terjual", rank: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2bUFsHc1UOHxMRxsrcFx692H0I-51zXq_7HjCag7yELilqcX9smMjpNdG0XBf5iiqFucLvkX5sw6HnIjTndC_uIJbh9nJAbNPTxQAZ5cvWKmnc0hX2eV4WwrXiP5jI3PiN6iasaNK4wUezEancrLREILYReckMXjbUsmW5QKitc4tP-fBby6J-wwZLejpCXxOEpWBZphHc2WvW8r0_M77omjlsWNUInMdKs4TnIw-9gQ2MG7OMyJBYw" },
  { name: "Kopi Tarik", price: "Rp 14.000", sold: "38 terjual", rank: 2, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANFS7rHiVy8Fp_PHprrwTS09TxAPEsGxR3WrOkFVQ35HObW3sWnESfOu2MNeM7b3SeR1fBprxh_xJH8Vt4NaEKpdoYYVMZXDXRhaBdb3av3Tgm_iTe_ILnpRx0LJ4-Bm-9JYV6UrUN9whGvWeOBU1FMHpBFdUbxl1J-cwIGZIHZCMBqG0UlenCCJi1udiZMHeEgoDhrZugdJ39EQm1P5vWozo0SDPmynMZGN3riG09RyhNk242TZRudA" },
  { name: "Teh Cokelat Tarik", price: "Rp 16.000", sold: "26 terjual", rank: 3, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOPrrza6RbA-SHHs0BheUJEUku0ai3LxEUsT66T3ZMcpVIwcJy7AkZznp-QaHRk4ON1b1OCf6l-y4L9YQzIpW_qFnecelpirYlmiBoEQmsXnAEjeyaLMPp7C56a2uN25UbnrTMg4bCojR47nOMFN2-mjwaHp4WFfW5GXU3Plpk6VamhJnLQlq90oFKR-C1uBTC5Gqj8Dh6UjY2xi_a_q-R5dx9qdKfUNB2vnPqzs2Pe4nP6FS02unbAw" },
  { name: "Pisang Goreng", price: "Rp 12.000", sold: "18 terjual", rank: 4, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZVwJw2mvVBioVogFI9SprEhc3XIcD3KqFrah5eJfEykXWYfZv847ZQPx3e8xLiDNCUMbRuY5tPTKboEzzyyQ-AIqzaljdstPYHc3mN1b6IbhH0e3Hf9gfX--DmzYiQAe2fkSJrSIaSl6A9ioa1Ms6T786dNNOGp8aP0cj_Fdzi429u4Xxv-dq41RPJwHofehEVp5Ic1v_AuTzPCN-Ju9q313R5w0-y9febCVRSJVwqtnB7M2R9gGxAQ" },
];

const recentOrders = [
  { id: "#TK-0012", date: "13 Sep 2025, 20:45", customer: "Rizky A.", menu: "Es Kopi Susu (2)", total: "Rp 34.000", status: "Pending" },
  { id: "#TK-0011", date: "13 Sep 2025, 20:32", customer: "Siti Nurhaliza", menu: "Kopi Tarik (1)", total: "Rp 14.000", status: "Diproses" },
  { id: "#TK-0010", date: "13 Sep 2025, 19:58", customer: "Andi Pratama", menu: "Teh Cokelat Tarik (2)", total: "Rp 32.000", status: "Selesai" },
];

const activities = [
  { text: "Pesanan #TK-0012 baru masuk", time: "13 Sep 2025, 20:45", icon: ClipboardList },
  { text: "Pembayaran QRIS berhasil", time: "13 Sep 2025, 20:32", icon: CreditCard },
  { text: "Staf Kasir mengubah menu Es Kopi Susu", time: "13 Sep 2025, 19:50", icon: Coffee },
];

export const DashboardView = () => (
  <div className="space-y-7">
    {/* Hero Banner */}
    <section className="relative rounded-2xl bg-white p-7 shadow-sm border border-stone-200/60 overflow-hidden flex items-center justify-between min-h-[175px]">
      <div className="z-10 max-w-lg">
        <p className="text-xs font-semibold text-emerald-800 tracking-wide flex items-center gap-1.5">Selamat datang, Admin <span>👋</span></p>
        <h2 className="text-2xl font-bold font-display text-brand-dark tracking-tight">Kelola Kafe Tarik lebih mudah!</h2>
        <p className="text-xs text-stone-500 mt-2 font-normal">Pantau penjualan, pesanan dan kelola menu secara cepat dan efisien.</p>
      </div>
      <div className="relative z-10 flex items-center pr-4">
        <div className="relative">
          <img alt="Kafe Tarik Iced Cup" className="w-36 h-36 object-cover rounded-2xl shadow-md transform -rotate-3 border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLiu0h3JCFdd2YN-kf2ses8fQwX9YGIBlOfZoK8vfMlHxxRg7z27b_WGuvhI4zTHauSZ_jjL7zxBc3rd_BebTZQcpqHT89OaV-9ydmUlnqWP4dGVuI7xDYaYwU4fV_PfvnZ5zpos1KWP1nvtK8PPQwHXlNiuNmKnfycO-xjABeukyLGy7BszClq31zlKZU-6O7N_pt0hi62Zvl_UFXJIGgCtb2YDUxLv7is1-lYH_L13cMikhIfMd4lw" />
          <div className="absolute inset-x-0 bottom-3 flex justify-center">
            <span className="bg-[#143125]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">kafe tarik</span>
          </div>
        </div>
      </div>
    </section>

    {/* Metric Cards */}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{stat.label}</span>
            <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-[#143125] tracking-tight">{stat.value}</div>
            <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1.5 bg-emerald-50 w-fit px-2 py-0.5 rounded-full">
              <span>↑ {stat.change}</span> 
              <span className="text-stone-400 font-medium">vs kemarin</span>
            </div>
          </div>
        </div>
      ))}
    </section>

    {/* Main Grid */}
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
        <h3 className="text-sm font-bold text-[#143125] mb-6 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-600" /> Grafik Pendapatan
        </h3>
        <div className="h-64 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-100 flex items-center justify-center text-stone-400 text-xs font-medium">
          [Analitik Grafik - Akan Datang]
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col">
        <h3 className="text-sm font-bold text-[#143125] mb-5 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" /> Produk Favorit
        </h3>
        <div className="flex-1 space-y-4">
          {topProducts.map((p) => (
            <div key={p.rank} className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100">
              <img src={p.image} className="w-14 h-14 object-cover rounded-xl shadow-inner border border-stone-100" />
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
    </section>
  </div>
);
