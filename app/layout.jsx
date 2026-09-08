import "./globals.css";
import { Oswald } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

export const metadata = {
  metadataBase: new URL("https://www.solofutbolbotines.com"),
  title: "Solo Futbol Botines",
  description: "Botines de fútbol — consultá disponibilidad por WhatsApp",
  openGraph: {
    title: "Solo Futbol Botines",
    description: "Botines de fútbol — consultá disponibilidad por WhatsApp",
    url: "https://www.solofutbolbotines.com",
    siteName: "Solo Futbol Botines",
    images: [
      {
        url: "/logo.jpg",
        width: 1320,
        height: 1475,
        alt: "Solo Futbol Botines",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solo Futbol Botines",
    description: "Botines de fútbol — consultá disponibilidad por WhatsApp",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={oswald.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}