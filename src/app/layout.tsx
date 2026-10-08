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
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NQWGD3K3');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NQWGD3K3" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
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

