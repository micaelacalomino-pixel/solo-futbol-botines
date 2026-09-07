export default function Footer() {
  return (
    <footer className="sitio-footer">
      <p className="sitio-footer-texto">Seguinos</p>
      <div className="sitio-footer-links">
        <a href="https://www.instagram.com/solo_futbol_botines" target="_blank" rel="noopener noreferrer" className="sitio-footer-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
          </svg>
          @solo_futbol_botines
        </a>

        <a href="https://www.tiktok.com/@solo_futbol_botines" target="_blank" rel="noopener noreferrer" className="sitio-footer-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M14 3v11.2a2.8 2.8 0 1 1-2.3-2.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 3.5c.4 2.2 2.1 3.9 4.3 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          @solo_futbol_botines
        </a>
      </div>
      <p className="sitio-footer-copy">© {new Date().getFullYear()} Solo Futbol Botines</p>
    </footer>
  );
}