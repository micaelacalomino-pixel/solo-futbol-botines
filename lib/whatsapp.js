export function armarLinkWhatsApp(nombre, marca, talle) {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO;
  const mensaje = `Hola! Vi los ${nombre} de ${marca} en la web y me interesan (talle ${talle}). ¿Están disponibles?`;
  const mensajeCodificado = encodeURIComponent(mensaje);
  return `https://wa.me/${numero}?text=${mensajeCodificado}`;
}
