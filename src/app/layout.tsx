import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// fuente principal del sitio
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "890 ARQ — Arquitectura / Construcción / Tasación / Diseño",
  description:
    "Oficina de arquitectura, construcción y gestión normativa municipal en la Región de Valparaíso, Chile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${ibmPlexMono.variable} h-full antialiased`}>
      <body className="h-full overflow-hidden bg-white text-black font-mono">
        {children}
      </body>
    </html>
  );
}
