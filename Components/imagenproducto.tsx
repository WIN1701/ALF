"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ImagenProductoProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}

export default function ImagenProducto({
  src,
  alt,
  sizes = "100vw",
  className = "object-contain",
}: ImagenProductoProps) {
  const [tieneError, setTieneError] =
    useState(false);

  useEffect(() => {
    setTieneError(false);
  }, [src]);

  if (tieneError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
        <div className="text-center">
          <p className="text-3xl font-black uppercase text-red-600">
            ALF
          </p>

          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
            Imagen no disponible
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={78}
      loading="lazy"
      draggable={false}
      onError={() => setTieneError(true)}
      className={className}
    />
  );
}