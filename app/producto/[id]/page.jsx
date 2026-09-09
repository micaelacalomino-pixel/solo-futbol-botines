import { notFound } from "next/navigation";
import { obtenerProducto } from "@/lib/catalogo";
import { optimizarImagen } from "@/lib/cloudinary";
import SelectorTalleYConsultar from "@/components/SelectorTalleYConsultar";
import VolverAlCatalogo from "@/components/VolverAlCatalogo";

export async function generateMetadata({ params }) {
  const producto = await obtenerProducto(params.id);

  if (!producto) {
    return { title: "Producto no encontrado — Solo Futbol Botines" };
  }

  const titulo = `${producto.nombre} — ${producto.marca} | Solo Futbol Botines`;
  const descripcion = `Consultá disponibilidad de ${producto.nombre} (${producto.marca}) por WhatsApp.`;
  const foto = producto.fotos[0];

  return {
    title: titulo,
    description: descripcion,
    openGraph: {
      title: titulo,
      description: descripcion,
      images: foto ? [{ url: optimizarImagen(foto, 800) }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descripcion,
      images: foto ? [optimizarImagen(foto, 800)] : undefined,
    },
  };
}

export default async function FichaProducto({ params }) {
  const producto = await obtenerProducto(params.id);

  if (!producto) {
    notFound();
  }

  return (
    <main className="pagina-ficha">
      <VolverAlCatalogo />

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