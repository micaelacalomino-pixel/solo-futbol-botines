import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sitio-header">
      <Link href="/" className="sitio-header-link">
        <Image
          src="/logo.jpg"
          alt="Solo Futbol Botines"
          width={44}
          height={44}
          className="sitio-header-logo"
        />
        <span className="sitio-header-nombre">
          SOLO<span className="sitio-header-nombre-acento">FUTBOL</span>
          <br />
          BOTINES
        </span>
      </Link>
    </header>
  );
}