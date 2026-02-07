import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Venta de Casa Campestre en Cali y Jamundí | Oportunidad Exclusiva",
  description: "Descubre tu nuevo hogar en el valle del Cauca. Casa campestre con diseño moderno, amplios espacios y ubicación privilegiada entre Cali y Jamundí. Venta directa.",
  keywords: ["venta casa cali", "casa campestre jamundi", "propiedad lujo valle del cauca", "venta directa casa", "inmobiliaria cali"],
  openGraph: {
    title: "Venta de Casa Campestre en Cali y Jamundí",
    description: "Diseño moderno, espacios amplios y la tranquilidad que mereces. Mira los detalles y agenda tu visita.",
    url: "https://tudominio.com",
    siteName: "Venta Propiedad Cali-Jamundí",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-2a4d9f6fac90?q=80&w=2075&auto=format&fit=crop",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oportunidad de Vivienda en Cali / Jamundí",
    description: "Casa campestre moderna en venta. Conoce todos los detalles aquí.",
    images: ["https://images.unsplash.com/photo-1600596542815-2a4d9f6fac90"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
