import { obtenerCatalogo, diagnosticoCatalogo } from "@/lib/catalogo";
import ProductoGrid from "@/components/ProductoGrid";

export default async function Home() {
  const productos = await obtenerCatalogo();
  const diagnostico =
    productos.length === 0 ? await diagnosticoCatalogo() : null;

  return (
    <main className="pagina-catalogo">
      <header className="catalogo-header">
        <h1>Solo Futbol Botines</h1>
      </header>
      <ProductoGrid productos={productos} />
      {diagnostico && (
        <pre
          style={{
            marginTop: 24,
            padding: 12,
            background: "#111",
            color: "#0f0",
            fontSize: 11,
            overflowX: "auto",
            borderRadius: 8,
          }}
        >
          {JSON.stringify(diagnostico, null, 2)}
        </pre>
      )}
    </main>
  );
}
