"use client";

import { useMemo, useState } from "react";
import ProductoGrid from "./ProductoGrid";

function tallesMinimo(talles) {
  const numeros = talles
    .map((t) => parseFloat(t.replace(",", ".")))
    .filter((n) => !Number.isNaN(n));
  return numeros.length > 0 ? Math.min(...numeros) : Infinity;
}

const CATEGORIAS_FIJAS = ["Futbol 11", "Futbol 5", "Accesorios", "Guantes", "Camisetas"];

export default function CatalogoConFiltros({ productos }) {
  const categoriasDisponibles = useMemo(() => {
    const presentes = new Set(
      productos.map((p) => p.categoria).filter(Boolean)
    );
    const extras = [...presentes].filter(
      (c) => !CATEGORIAS_FIJAS.some((f) => f.toLowerCase() === c.toLowerCase())
    );
    return [...CATEGORIAS_FIJAS, ...extras];
  }, [productos]);

  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = useMemo(() => {
    let resultado = productos;

    if (categoriaActiva !== "Todos") {
      resultado = resultado.filter(
        (p) => p.categoria.toLowerCase() === categoriaActiva.toLowerCase()
      );
    }

    const termino = busqueda.trim().toLowerCase();
    if (termino !== "") {
      resultado = resultado.filter(
        (p) =>
          p.nombre.toLowerCase().includes(termino) ||
          p.marca.toLowerCase().includes(termino) ||
          p.talles.some((t) => t.toLowerCase().includes(termino))
      );
    }

      return resultado
      .slice()
      .sort((a, b) => tallesMinimo(a.talles) - tallesMinimo(b.talles));
  }, [productos, categoriaActiva, busqueda]);

  return (
    <div>
      <div className="buscador">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="buscador-icono" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre, marca o talle..."
          className="buscador-input"
          aria-label="Buscar productos"
        />
        {busqueda !== "" && (
          <button type="button" className="buscador-limpiar" onClick={() => setBusqueda("")} aria-label="Limpiar búsqueda">
            ×
          </button>
        )}
      </div>

      <div className="filtros-categoria" role="tablist" aria-label="Categorías">
        <button type="button" role="tab" aria-selected={categoriaActiva === "Todos"} className={categoriaActiva === "Todos" ? "filtro-boton filtro-boton-activo" : "filtro-boton"} onClick={() => setCategoriaActiva("Todos")}>
          Todos
        </button>
        {categoriasDisponibles.map((categoria) => (
          <button key={categoria} type="button" role="tab" aria-selected={categoriaActiva === categoria} className={categoriaActiva === categoria ? "filtro-boton filtro-boton-activo" : "filtro-boton"} onClick={() => setCategoriaActiva(categoria)}>
            {categoria}
          </button>
        ))}
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="catalogo-vacio">
          No encontramos productos que coincidan con tu búsqueda.
        </p>
      ) : (
        <ProductoGrid productos={productosFiltrados} />
      )}
    </div>
  );
}