import { DashboardView } from "@/features/admin/dashboard/components/DashboardView";
import { getDashboardStats } from "@/features/admin/dashboard/queries/dashboard.queries";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  return <DashboardView stats={stats} />;
}
