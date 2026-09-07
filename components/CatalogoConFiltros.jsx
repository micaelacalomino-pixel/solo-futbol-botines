"use client";

import { useMemo, useState } from "react";
import ProductoGrid from "./ProductoGrid";

const CATEGORIAS_FIJAS = ["Futbol 11", "Futbol 5", "Accesorios", "Guantes"];

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

  const productosFiltrados = useMemo(() => {
    if (categoriaActiva === "Todos") return productos;
    return productos.filter(
      (p) => p.categoria.toLowerCase() === categoriaActiva.toLowerCase()
    );
  }, [productos, categoriaActiva]);

  return (
    <div>
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

      <ProductoGrid productos={productosFiltrados} />
    </div>
  );
}