import Link from "next/link";

export default function ProductoCard({ producto }) {
  const fotoPrincipal = producto.fotos[0];

  return (
    <Link href={`/producto/${producto.id}`} className="producto-card">
      <div className="producto-card-foto">
        {fotoPrincipal ? (
          <img src={fotoPrincipal} alt={producto.nombre} loading="lazy" />
        ) : (
          <div className="producto-card-foto-vacia" />
        )}
      </div>
      <div className="producto-card-info">
        <p className="producto-card-marca">{producto.marca}</p>
        <p className="producto-card-nombre">{producto.nombre}</p>
        {producto.talles.length > 0 && (
          <p className="producto-card-talles">
            Talles{" "}
            {producto.talles.length === 1
              ? producto.talles[0]
              : `${producto.talles[0]}-${producto.talles[producto.talles.length - 1]}`}
          </p>
        )}
      </div>
    </Link>
  );
}