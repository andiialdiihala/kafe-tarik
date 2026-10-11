"use client";

import { useState } from "react";
import { ReportsData, ReportPeriod } from "../types/report.types";
import { ReportHeader } from "./ReportHeader";
import { ReportStatsCards } from "./ReportStatsCards";
import { RevenueChart } from "./RevenueChart";
import { PaymentMethodSummaryCards } from "./PaymentMethodSummaryCards";
import { generateReportPdf } from "../utils/reportPdf";

export const ReportsView = ({ data }: { data: ReportsData }) => {
  const [period, setPeriod] = useState<ReportPeriod>("7 Hari");

  const handleExportPdf = () => generateReportPdf(data, period);

  return (
    <div className="space-y-6">
      <ReportHeader period={period} setPeriod={setPeriod} onExportPdf={handleExportPdf} />
      <ReportStatsCards data={data} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart data={data.dailyRevenue} period={period} />
        <PaymentMethodSummaryCards methods={data.paymentMethods} revenueChange={data.revenue.change} period={period} />
      </div>
    </div>
  );
};

