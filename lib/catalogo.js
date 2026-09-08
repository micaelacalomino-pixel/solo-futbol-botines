// Parser CSV simple: soporta comas dentro de campos entre comillas.
function parseCSV(texto) {
  const filas = [];
  let fila = [];
  let campo = "";
  let entreComillas = false;

  for (let i = 0; i < texto.length; i++) {
    const char = texto[i];
    const siguiente = texto[i + 1];

    if (entreComillas) {
      if (char === '"' && siguiente === '"') {
        campo += '"';
        i++;
      } else if (char === '"') {
        entreComillas = false;
      } else {
        campo += char;
      }
    } else {
      if (char === '"') {
        entreComillas = true;
      } else if (char === ",") {
        fila.push(campo);
        campo = "";
      } else if (char === "\n" || char === "\r") {
        if (campo !== "" || fila.length > 0) {
          fila.push(campo);
          filas.push(fila);
          fila = [];
          campo = "";
        }
        if (char === "\r" && siguiente === "\n") i++;
      } else {
        campo += char;
      }
    }
  }
  if (campo !== "" || fila.length > 0) {
    fila.push(campo);
    filas.push(fila);
  }
  return filas;
}

function aSlug(nombre) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function obtenerCatalogo() {
  const url = process.env.CATALOGO_CSV_URL;
  if (!url) {
    throw new Error(
      "Falta CATALOGO_CSV_URL en las variables de entorno. Ver README."
    );
  }

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; SoloFutbolBotinesBot/1.0; +https://vercel.com)",
      Accept: "text/csv,*/*",
    },
  });
  if (!res.ok) {
    throw new Error(`No se pudo leer el catalogo (status ${res.status})`);
  }
  const texto = (await res.text()).replace(/^\uFEFF/, "");
  if (texto.trim().startsWith("<")) {
    throw new Error(
      "La URL de CATALOGO_CSV_URL no devolvió un CSV (parece HTML). Revisá que la Sheet siga publicada como CSV."
    );
  }
    const productos = resto
    .filter((fila) => fila[idx.nombre] && fila[idx.nombre].trim() !== "")
    .map((fila, indice) => {
      const nombre = fila[idx.nombre].trim();
      const fotos = [fila[idx.foto1], fila[idx.foto2], fila[idx.foto3]]
        .map((f) => (f || "").trim())
        .filter(Boolean);
      const talles = (fila[idx.talles] || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      return {
        id: `${aSlug(nombre)}-${indice + 1}`,
        nombre,
        marca: (fila[idx.marca] || "").trim(),
        categoria: (fila[idx.categoria] || "").trim(),
        talles,
        fotos,
      };
    });

export async function obtenerProducto(id) {
  const catalogo = await obtenerCatalogo();
  return catalogo.find((p) => p.id === id) ?? null;
}