import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-brand-cream text-stone-800 font-sans antialiased overflow-x-hidden">
        <Providers>
          {children}
          <Toaster position="top-center" richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
