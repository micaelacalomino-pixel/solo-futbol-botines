"use client";

import { useRouter } from "next/navigation";

export default function VolverAlCatalogo() {
  const router = useRouter();

  function volver() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <button type="button" onClick={volver} className="volver-link">
      ← Volver al catálogo
    </button>
  );
}