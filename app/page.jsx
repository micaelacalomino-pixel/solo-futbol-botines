import { obtenerCatalogo } from "@/lib/catalogo";
import ProductoGrid from "@/components/ProductoGrid";

export const revalidate = 300;

export default async function Home() {
  const productos = await obtenerCatalogo();

  return (
    <main className="pagina-catalogo">
      <header className="catalogo-header">
        <h1>Solo Futbol Botines</h1>
      </header>
      <ProductoGrid productos={productos} />
    </main>
  );
}
