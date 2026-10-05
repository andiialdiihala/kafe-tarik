import { ReportsView } from "@/features/admin/reports/components/ReportsView";
import { getReportsData } from "@/features/admin/reports/actions";

export default async function ReportsPage() {
  const data = await getReportsData();
  return <ReportsView data={data} />;
}
