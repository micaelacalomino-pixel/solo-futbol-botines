import "./globals.css";

export const metadata = {
  title: "Solo Futbol Botines",
  description: "Botines de fútbol — consultá disponibilidad por WhatsApp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
