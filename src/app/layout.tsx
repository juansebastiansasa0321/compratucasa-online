import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Compra Tu Casa | Propiedades Exclusivas en Cali, Jamundí, Chía y Bogotá",
  description: "Descubre tu nuevo hogar. Especialistas en venta de casas exclusivas en Jamundí (Hontanar de las Mercedes), Chía (Tejar del Río), Cali y Bogotá. Las mejores ubicaciones y valorización.",
  keywords: ["venta propiedades colombia", "casas campestres chia", "apartamentos bogota", "inmobiliaria cali", "casa a la venta en jamundi", "hontanar de las mercedes jamundi", "tejar del rio chia", "comprar casa en chia"],
  openGraph: {
    title: "Venta de Propiedades Exclusivas en Colombia",
    description: "Casas exclusivas, diseño moderno, espacios amplios y la tranquilidad que mereces. Encuentra propiedades en Chía, Jamundí, Bogotá y Cali.",
    url: "https://compratucasa.co",
    siteName: "Compra Tu Casa",
    images: [
      {
        url: "https://compratucasa.co/uploads/1775487700564-1771722171899-wox8fk.webp",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compra Tu Casa | Oportunidades en Bogotá, Chía, Cali y Jamundí",
    description: "Propiedades exclusivas en venta. Conoce todos los detalles aquí.",
    images: ["https://compratucasa.co/uploads/1775487700564-1771722171899-wox8fk.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11083053229" strategy="afterInteractive" />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11083053229');
          `}
        </Script>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

