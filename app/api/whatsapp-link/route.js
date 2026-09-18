import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const nombre = searchParams.get("nombre");
  const marca = searchParams.get("marca");
  const talle = searchParams.get("talle");
  const urlProducto = searchParams.get("urlProducto");

  const numero = process.env.WHATSAPP_NUMERO;
  const mensaje = `Hola! Vi los ${nombre} de ${marca} en la web y me interesan (talle ${talle}). ¿Están disponibles?\n${urlProducto}`;
  const mensajeCodificado = encodeURIComponent(mensaje);

  return NextResponse.json({ link: `https://wa.me/${numero}?text=${mensajeCodificado}` });
}