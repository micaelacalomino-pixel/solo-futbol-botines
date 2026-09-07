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

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error(`No se pudo leer el catalogo (status ${res.status})`);
  }
  const texto = await res.text();
  const filas = parseCSV(texto);

  const [encabezado, ...resto] = filas;
  const idx = {
    nombre: encabezado.indexOf("nombre"),
    marca: encabezado.indexOf("marca"),
    talles: encabezado.indexOf("talles"),
    foto1: encabezado.indexOf("foto1"),
    foto2: encabezado.indexOf("foto2"),
    foto3: encabezado.indexOf("foto3"),
  };

  const productos = resto
    .filter((fila) => fila[idx.nombre] && fila[idx.nombre].trim() !== "")
    .map((fila) => {
      const nombre = fila[idx.nombre].trim();
      const fotos = [fila[idx.foto1], fila[idx.foto2], fila[idx.foto3]]
        .map((f) => (f || "").trim())
        .filter(Boolean);
      const talles = (fila[idx.talles] || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      return {
        id: aSlug(nombre),
        nombre,
        marca: (fila[idx.marca] || "").trim(),
        talles,
        fotos,
      };
    });

  return productos;
}

export async function obtenerProducto(id) {
  const catalogo = await obtenerCatalogo();
  return catalogo.find((p) => p.id === id) ?? null;
}
