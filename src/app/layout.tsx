import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import './globals.css';

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.890arq.cl'),
  title: {
    default: '890 ARQ | Arquitectura, Construcción y Gestión Municipal en Región de Valparaíso',
    template: '%s | 890 ARQ',
  },
  description:
    '890 ARQ – Estudio de Arquitectura, Tasación y Gestión Municipal DOM (890 ARQ Ltda.) y Constructora de Obras Civiles e Industriales (890 ARQ SpA) en la Región de Valparaíso.',
  keywords: [
    '890 ARQ',
    'Arquitectura Región de Valparaíso',
    'Construcción Civil Valparaíso',
    'Tasación Inmobiliaria',
    'Gestión Municipal DOM',
    'Regularización Ley 20.898',
    'Inspección Técnica de Obras ITO',
    'Viviendas Modulares',
    'Viña del Mar',
    'Quilpué',
  ],
  openGraph: {
    title: '890 ARQ | Arquitectura, Construcción y Gestión Municipal en Región de Valparaíso',
    description:
      'Diseño arquitectónico, gestión normativa DOM, tasaciones (890 ARQ Ltda.) y ejecución de obras civiles e industriales (890 ARQ SpA).',
    locale: 'es_CL',
    type: 'website',
    siteName: '890 ARQ',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${ibmPlexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-black font-mono">
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
