"use client";

import { useState } from "react";
import { armarLinkWhatsApp } from "@/lib/whatsapp";

export default function SelectorTalleYConsultar({ nombre, marca, talles }) {
  const [talleElegido, setTalleElegido] = useState(null);

  const link = talleElegido
    ? armarLinkWhatsApp(nombre, marca, talleElegido)
    : null;

  return (
    <div className="selector-talle">
      <p className="selector-talle-label">Elegí tu talle</p>
      <div className="selector-talle-opciones">
        {talles.map((talle) => (
          <button
            key={talle}
            type="button"
            className={
              talle === talleElegido
                ? "talle-boton talle-boton-activo"
                : "talle-boton"
            }
            onClick={() => setTalleElegido(talle)}
            aria-pressed={talle === talleElegido}
          >
            {talle}
          </button>
        ))}
      </div>

      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="boton-whatsapp"
        >
          Consultar por WhatsApp
        </a>
      ) : (
        <button type="button" className="boton-whatsapp boton-whatsapp-disabled" disabled>
          Elegí un talle primero
        </button>
      )}
    </div>
  );
}
