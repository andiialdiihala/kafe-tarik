import { LucideIcon } from "lucide-react";

export const StatsCard = ({ label, value, icon: Icon, bg, color }: { label: string; value: string; icon: LucideIcon; bg: string; color: string }) => (
  <div className="bg-white rounded-xl p-4 border border-stone-200/70 shadow-xs flex items-center gap-4">
    <div className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[11px] font-medium text-stone-500">{label}</p>
      <p className="text-xl font-extrabold text-stone-900 leading-none mt-1">{value}</p>
    </div>
  </div>
);
