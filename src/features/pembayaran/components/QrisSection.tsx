import { QrCode, CheckCircle2, UploadCloud } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";

export const QrisSection = ({ proofUrl, setProofUrl }: { proofUrl: string | null; setProofUrl: (url: string | null) => void }) => (
  <div className="space-y-4 pt-2">
    <div className="bg-stone-900 p-6 rounded-2xl text-center text-white space-y-3">
      <div className="bg-white p-3 rounded-xl inline-block shadow-md">
        <QrCode className="w-36 h-36 text-stone-900" />
      </div>
      <p className="font-bold text-sm tracking-wide">QRIS Kafe Tarik</p>
      <p className="text-[11px] text-stone-300">Scan QR di atas dengan BCA, Mandiri, GoPay, OVO, ShopeePay, DANA, dll.</p>
    </div>

    <div className="border-2 border-dashed border-stone-300 p-5 rounded-2xl bg-stone-50 text-center">
      {proofUrl ? (
        <div className="space-y-3">
          <div className="relative w-32 h-32 mx-auto rounded-xl overflow-hidden border border-stone-200 shadow-sm">
            <img src={proofUrl} alt="Bukti Transfer" className="w-full h-full object-cover" />
          </div>
          <p className="text-xs text-emerald-700 font-bold flex items-center justify-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Bukti Ter-upload
          </p>
          <button
            type="button"
            onClick={() => setProofUrl(null)}
            className="text-[11px] text-rose-600 font-semibold underline hover:text-rose-700"
          >
            Ganti Bukti Transfer
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-stone-500 py-2">
          <UploadButton
            endpoint="imageUploader"
            appearance={{
              button: "bg-[#143125] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-2 border-0 shadow-sm hover:bg-emerald-900 transition-colors cursor-pointer",
              allowedContent: "hidden",
            }}
            content={{
              button({ ready, isUploading }) {
                if (isUploading) return "Uploading...";
                if (ready) return (
                  <div className="flex items-center gap-2">
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload Bukti Transfer</span>
                  </div>
                );
                return "Loading...";
              },
            }}
            onClientUploadComplete={(res) => setProofUrl(res[0].url)}
            onUploadError={(error: Error) => alert(`Upload gagal: ${error.message}`)}
          />
          <span className="text-[11px] text-stone-400">Format Gambar JPG, PNG, WEBP (Max 2MB)</span>
        </div>
      )}
    </div>
  </div>
);
