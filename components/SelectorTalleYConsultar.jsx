"use client";

import { useState, useEffect } from "react";

export default function SelectorTalleYConsultar({ nombre, marca, talles }) {
  const [talleElegido, setTalleElegido] = useState(null);
  const [link, setLink] = useState(null);

  useEffect(() => {
    if (!talleElegido) {
      setLink(null);
      return;
    }
    const urlProducto = window.location.href;
    const params = new URLSearchParams({ nombre, marca, talle: talleElegido, urlProducto });
    fetch(`/api/whatsapp-link?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setLink(data.link))
      .catch(() => setLink(null));
  }, [talleElegido, nombre, marca]);

  return (
    <div className="selector-talle">
      <p className="selector-talle-label">Elegí tu talle</p>
      <div className="selector-talle-opciones">
        {talles.map((talle) => (
          <button
            key={talle}
            type="button"
            className={talle === talleElegido ? "talle-boton talle-boton-activo" : "talle-boton"}
            onClick={() => setTalleElegido(talle)}
            aria-pressed={talle === talleElegido}
          >
            {talle}
          </button>
        ))}
      </div>

      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="boton-whatsapp">
          Consultar por WhatsApp
        </a>
      ) : (
        <button type="button" className="boton-whatsapp boton-whatsapp-disabled" disabled>
          {talleElegido ? "Cargando..." : "Elegí un talle primero"}
        </button>
      )}
    </div>
  );
}