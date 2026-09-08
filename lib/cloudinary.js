// Ajusta una URL de Cloudinary para pedir la imagen en un ancho específico,
// con conversión de formato y calidad automáticas. Si la URL no es de
// Cloudinary, la devuelve sin cambios (por si algún día se usa otro hosting).
export function optimizarImagen(url, ancho) {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }
  const [antes, despues] = url.split("/upload/");
  return `${antes}/upload/w_${ancho},c_limit,f_auto,q_auto/${despues}`;
}