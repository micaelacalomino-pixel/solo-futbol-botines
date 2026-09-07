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
  title: "Solo Futbol Botines",
  description: "Botines de fútbol — consultá disponibilidad por WhatsApp",
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