import ProductoCard from "./ProductoCard";

export default function ProductoGrid({ productos }) {
  if (productos.length === 0) {
    return <p className="catalogo-vacio">Todavía no hay productos cargados.</p>;
  }

  return (
    <div className="producto-grid">
      {productos.map((producto) => (
        <ProductoCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
