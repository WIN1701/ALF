"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";
import { ImageOff } from "lucide-react";

interface ImagenProductoProps {
  id: number;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  onRutaValida?: (ruta: string) => void;
  onFalloTotal?: () => void;
}

export default function ImagenProducto({
  id,
  alt,
  priority = false,
  sizes = "(max-width: 640px) 50vw, 25vw",
  className = "",
  onRutaValida,
  onFalloTotal,
}: ImagenProductoProps) {
  const extensiones = useMemo(() => {
    if (id <= 4) {
      return ["webp", "jpg", "jpeg", "png"];
    }

    return ["jpg", "webp", "jpeg", "png"];
  }, [id]);

  const [indiceExtension, setIndiceExtension] =
    useState(0);

  useEffect(() => {
    setIndiceExtension(0);
  }, [id]);

  const numero = String(id).padStart(3, "0");

  const sinImagen =
    indiceExtension >= extensiones.length;

  if (sinImagen) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950 text-zinc-600">
        <ImageOff size={30} />

        <span className="text-[9px] font-black uppercase">
          Imagen no disponible
        </span>
      </div>
    );
  }

  const extension = extensiones[indiceExtension];

  const ruta =
    `/productos/camisa${numero}.${extension}`;

  return (
    <Image
      key={ruta}
      src={ruta}
      alt={alt}
      fill
      unoptimized
      priority={priority}
      sizes={sizes}
      draggable={false}
      onLoad={() => {
        onRutaValida?.(ruta);
      }}
      onError={() => {
        const siguiente = indiceExtension + 1;

        if (siguiente >= extensiones.length) {
          onFalloTotal?.();
        }

        setIndiceExtension(siguiente);
      }}
      className={`producto-foto ${className}`}
    />
  );
}