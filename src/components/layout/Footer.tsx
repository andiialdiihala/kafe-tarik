export const Footer = () => (
  <footer className="bg-[#0f281e] text-stone-200 pt-16 pb-12 px-6 border-t border-white/10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDziL0FnTz2V0gGqCcIP7Nz-pYtTOD3bOxxCbWNkuBMhpiBQSdU7MBGwBAf9lRGVArLPAcduJgzp9ZT79XpZpBIvuPOf-vD5CkI8-6of_58XyPoDDspKp_9Yq26wXPtfd3lCvZjr0f-LREeZ_79IW3An_VwkeOHG2uCUfuPl0aRot8h6uj51mIh9dxXquU68flTVzcrx_fwaKoMCx0YhHbYk_aHyITXUfXuKfF6nQQ1dkOHROy_5RWz4Vn-pLWIW15faGo" alt="Kafe Tarik Logo" className="h-12 w-auto object-contain brightness-0 invert" />
        </div>
        <span className="inline-block text-[11px] font-bold tracking-widest text-brand-mint uppercase bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
          KOPITIAM TRADISI SIS AL JUFRI
        </span>
        <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
          Racikan kopi &amp; teh tarik autentik berbusa pekat khas peranakan. Menghadirkan kenikmatan tradisi dengan kenyamanan modern di jantung Kota Palu.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-brand-mint font-display font-semibold text-base sm:text-lg">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span>Lokasi Kedai</span>
        </div>
        <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
          Jl. Sis Al Jufri, Kel. Siranindi, Kec. Palu Barat, Kota Palu, Sulawesi Tengah 94221
        </p>
        <div className="pt-1">
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-brand-mint hover:text-white font-medium transition-colors underline underline-offset-4">
            Buka di Google Maps ↗
          </a>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-brand-mint font-display font-semibold text-base sm:text-lg">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Jam Buka</span>
        </div>
        <div className="space-y-1 text-xs sm:text-sm text-stone-300 leading-relaxed">
          <p className="font-medium text-white">Buka Setiap Hari:</p>
          <p className="text-brand-mint font-semibold text-base">07.00 – 23.00 WITA</p>
          <p className="text-stone-400 text-xs pt-1">Melayani Dine-in &amp; Takeaway langsung di meja via QR code.</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-brand-mint font-display font-semibold text-base sm:text-lg">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          <span>Silaturahmi Online</span>
        </div>
        <p className="text-stone-300 text-xs leading-relaxed">
          Kunjungi akun media sosial kami untuk promo harian atau hubungi admin kami untuk reservasi.
        </p>
        <div className="flex items-center gap-3 pt-1">
          <a aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-mint hover:text-brand-dark flex items-center justify-center transition shadow" href="#">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
          </a>
          <a aria-label="TikTok" className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-mint hover:text-brand-dark flex items-center justify-center transition shadow" href="#">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>
          </a>
          <a aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-mint hover:text-brand-dark flex items-center justify-center transition shadow" href="#">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path></svg>
          </a>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
      <p>© 2025 Kafe Tarik. All rights reserved.</p>
      <p className="text-stone-400 text-center sm:text-right">
        Cabang Sis Al Jufri, Palu • Kopitiam Tradisi &amp; Modern
      </p>
    </div>
  </footer>
);
