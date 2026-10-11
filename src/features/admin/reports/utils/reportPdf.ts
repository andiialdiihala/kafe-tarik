import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ReportsData, ReportPeriod } from "../types/report.types";

export const generateReportPdf = (data: ReportsData, period: ReportPeriod) => {
  const doc = new jsPDF();

  // Primary brand color: #143125 -> RGB (20, 49, 37)
  const primaryColor = [20, 49, 37];

  // Header Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("KAFE TARIK - LAPORAN PENJUALAN", 14, 20);

  // Subtitle / Meta info
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Periode: ${period}`, 14, 27);
  doc.text(`Tanggal Export: ${new Date().toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })}`, 14, 33);

  // 1. Ringkasan Tabel
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("1. Ringkasan Performa", 14, 43);

  const summaryRows = [
    ["Total Pendapatan", `Rp ${Number(data.revenue.total).toLocaleString("id-ID")}`, `${data.revenue.change >= 0 ? '+' : ''}${data.revenue.change.toFixed(1)}%`],
    ["Total Pesanan", data.orders.total.toString(), `${data.orders.change >= 0 ? '+' : ''}${data.orders.change.toFixed(1)}%`],
    ["Total Menu Terjual", data.sold.total.toString(), `${data.sold.change >= 0 ? '+' : ''}${data.sold.change.toFixed(1)}%`],
    ["Pelanggan Baru", data.customers.total.toString(), `${data.customers.change >= 0 ? '+' : ''}${data.customers.change.toFixed(1)}%`],
  ];

  autoTable(doc, {
    startY: 47,
    head: [["Kategori", "Nilai", "Perubahan"]],
    body: summaryRows,
    headStyles: { fillColor: primaryColor as [number, number, number] },
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 4 },
  });

  const lastTableY = (doc as any).lastAutoTable.finalY || 80;

  // 2. Pendapatan Harian
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("2. Pendapatan Harian", 14, lastTableY + 12);

  const dailyRows = data.dailyRevenue.map((d) => [d.name, `Rp ${d.total.toLocaleString("id-ID")}`]);

  autoTable(doc, {
    startY: lastTableY + 16,
    head: [["Hari", "Pendapatan"]],
    body: dailyRows,
    headStyles: { fillColor: primaryColor as [number, number, number] },
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 4 },
  });

  const lastTableY2 = (doc as any).lastAutoTable.finalY || 130;

  // 3. Ringkasan Metode Pembayaran
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("3. Metode Pembayaran", 14, lastTableY2 + 12);

  const paymentRows = data.paymentMethods.map((pm) => [
    pm.method ?? "Lainnya",
    `Rp ${pm.total.toLocaleString("id-ID")}`,
    `${pm.percentage.toFixed(2)}%`,
  ]);

  autoTable(doc, {
    startY: lastTableY2 + 16,
    head: [["Metode", "Total", "Persentase"]],
    body: paymentRows,
    headStyles: { fillColor: primaryColor as [number, number, number] },
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 4 },
  });

  // Save PDF
  doc.save(`laporan-kafe-tarik_${period.toLowerCase().replace(/\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.pdf`);
};
