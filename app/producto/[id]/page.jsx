import { notFound } from "next/navigation";
import Link from "next/link";
import { obtenerCatalogo, obtenerProducto } from "@/lib/catalogo";
import { optimizarImagen } from "@/lib/cloudinary";
import SelectorTalleYConsultar from "@/components/SelectorTalleYConsultar";

export async function generateStaticParams() {
  const productos = await obtenerCatalogo();
  return productos.map((producto) => ({ id: producto.id }));
}

export default async function FichaProducto({ params }) {
  const producto = await obtenerProducto(params.id);

  if (!producto) {
    notFound();
  }

  return (
    <main className="pagina-ficha">
      <Link href="/" className="volver-link">
        ← Volver al catálogo
      </Link>

      <div className="ficha-fotos">
        {producto.fotos.map((foto, i) => (
          <img
            key={i}
            src={optimizarImagen(foto, 800)}
            alt={`${producto.nombre} - foto ${i + 1}`}
            loading="lazy"
          />
        ))}
      </div>

      <div className="ficha-info">
        <p className="ficha-marca">{producto.marca}</p>
        <h1 className="ficha-nombre">{producto.nombre}</h1>

        <SelectorTalleYConsultar
          nombre={producto.nombre}
          marca={producto.marca}
          talles={producto.talles}
        />
      </div>
    </main>
  );
}