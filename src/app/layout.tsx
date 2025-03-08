import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PowNav - Mapas 3D y Rutas Backcountry para Snowboarders y Freeriders",
  description: "Descubre rutas fuera de pista con mapas 3D, alertas en tiempo real y navegación GPS. PowNav es la app definitiva para snowboarders y freeriders.",
  keywords: "snowboard backcountry, mapas 3D nieve, rutas snowboard, freeride, esquí fuera de pista, navegación GPS nieve, seguridad avalanchas",
  openGraph: {
    title: "PowNav - Mapas 3D y Rutas Backcountry para Snowboarders y Freeriders",
    description: "Navega fuera de pista con seguridad usando PowNav. Rutas 3D, alertas en tiempo real y navegación GPS para snowboard y freeride.",
    url: "https://pownav.vercel.app",
    type: "website",
    images: [
      {
        url: "https://pownav.vercel.app/og-pownav.JPG", // Cambiar por la URL real
        width: 1200,
        height: 630,
        alt: "PowNav - Mapas 3D y Rutas Backcountry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@PowNav",
    title: "PowNav - Mapas 3D y Rutas Backcountry",
    description: "Descubre rutas de freeride y snowboard con navegación en 3D y alertas de avalanchas en tiempo real.",
    images: ["https://pownav.vercel.app/og-pownav.JPG"], // Cambiar por la URL real
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
