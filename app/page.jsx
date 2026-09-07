import { obtenerCatalogo } from "@/lib/catalogo";
import CatalogoConFiltros from "@/components/CatalogoConFiltros";

export default async function Home() {
  const productos = await obtenerCatalogo();

  return (
    <main className="pagina-catalogo">
      <header className="catalogo-header">
        <h1>Solo Futbol Botines</h1>
      </header>
      <CatalogoConFiltros productos={productos} />
    </main>
  );
}