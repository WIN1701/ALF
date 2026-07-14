"use client";

import { useState } from "react";
import Image from "next/image";

interface ImagenProductoProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

const IMAGEN_RESPALDO = "/productos/placeholder.svg";

export default function ImagenProducto({
  src,
  alt,
  sizes = "100vw",
  className = "object-cover",
  priority = false,
}: ImagenProductoProps) {
  const [imagenActual, setImagenActual] = useState(src);

  const usarImagenDeRespaldo = () => {
    if (imagenActual !== IMAGEN_RESPALDO) {
      setImagenActual(IMAGEN_RESPALDO);
    }
  };

  return (
    <Image
      src={imagenActual}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={imagenActual.endsWith(".svg")}
      className={className}
      onError={usarImagenDeRespaldo}
    />
  );
}