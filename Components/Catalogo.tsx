"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { productos } from "@/data/productos";

type Talla = "S" | "M" | "L" | "XL";

const tallas: Talla[] = ["S", "M", "L", "XL"];

export default function Catalogo() {
  const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(
    null
  );

  const [tallasSeleccionadas, setTallasSeleccionadas] = useState<
    Record<number, Talla>
  >({});

  // Bloquea el movimiento de la página cuando la imagen está abierta
  useEffect(() => {
    if (imagenAmpliada) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const cerrarConEscape = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        setImagenAmpliada(null);
      }
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, [imagenAmpliada]);

  const seleccionarTalla = (
    productoId: number,
    talla: Talla
  ) => {
    setTallasSeleccionadas((tallasAnteriores) => ({
      ...tallasAnteriores,
      [productoId]: talla,
    }));
  };

  return (
    <>
      {/* SECCIÓN PRINCIPAL DEL CATÁLOGO */}
      <section
        id="catalogo"
        className="scroll-mt-20 bg-black px-3 py-20 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-[1600px]">
          {/* ENCABEZADO */}
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-red-600">
              AlfStore
            </p>

            <h2 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
              Nuestra colección
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
              Selecciona tu talla y presiona cualquier camisa para
              verla en tamaño ampliado.
            </p>
          </div>

          {/* CUADRÍCULA DE PRODUCTOS */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {productos.map((producto) => {
              const tallaElegida =
                tallasSeleccionadas[producto.id];

              return (
                <article
                  key={producto.id}
                  className="overflow-hidden rounded-2xl border border-white/15 bg-[#080808] transition duration-300 hover:border-red-700/60"
                >
                  {/* IMAGEN DEL PRODUCTO */}
                  <button
                    type="button"
                    onClick={() =>
                      setImagenAmpliada(producto.imagen)
                    }
                    className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-black"
                    aria-label={`Ampliar imagen de la camisa ${producto.id}`}
                  >
                    <Image
                      src={producto.imagen}
                      alt={`Camisa AlfStore ${producto.id}`}
                      fill
                      sizes="
                        (max-width: 640px) 50vw,
                        (max-width: 1024px) 33vw,
                        (max-width: 1280px) 25vw,
                        20vw
                      "
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* CAPA OSCURA */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/35">
                      {/* BOTÓN VISIBLE EN COMPUTADORA */}
                      <div className="hidden items-center gap-2 rounded-full border border-white/30 bg-black/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white opacity-0 transition duration-300 group-hover:opacity-100 sm:flex">
                        <ZoomIn size={17} />
                        Ver camisa
                      </div>
                    </div>

                    {/* ICONO VISIBLE EN CELULAR */}
                    <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white sm:hidden">
                      <ZoomIn size={18} />
                    </span>
                  </button>

                  {/* INFORMACIÓN DE TALLAS */}
                  <div className="p-3 sm:p-5">
                    <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400 sm:text-sm">
                      Selecciona tu talla
                    </p>

                    {/* BOTONES DE TALLA */}
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                      {tallas.map((talla) => {
                        const estaSeleccionada =
                          tallaElegida === talla;

                        return (
                          <button
                            key={talla}
                            type="button"
                            onClick={() =>
                              seleccionarTalla(
                                producto.id,
                                talla
                              )
                            }
                            className={`
                              flex
                              aspect-square
                              items-center
                              justify-center
                              rounded-full
                              border
                              text-xs
                              font-semibold
                              transition
                              duration-200
                              sm:text-base
                              ${
                                estaSeleccionada
                                  ? "border-red-600 bg-red-700 text-white"
                                  : "border-white/20 bg-transparent text-zinc-400 hover:border-white hover:text-white"
                              }
                            `}
                            aria-label={`Seleccionar talla ${talla}`}
                          >
                            {talla}
                          </button>
                        );
                      })}
                    </div>

                    {/* MENSAJE DE TALLA SELECCIONADA */}
                    <div
                      className={`
                        mt-4
                        flex
                        min-h-10
                        w-full
                        items-center
                        justify-center
                        rounded-lg
                        border
                        px-2
                        text-center
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.08em]
                        sm:text-xs
                        ${
                          tallaElegida
                            ? "border-red-700/50 bg-red-950/40 text-red-400"
                            : "border-white/10 bg-zinc-900 text-zinc-500"
                        }
                      `}
                    >
                      {tallaElegida
                        ? `Talla ${tallaElegida} seleccionada`
                        : "Elige una talla"}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* VENTANA DE IMAGEN AMPLIADA */}
      {imagenAmpliada && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada del producto"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-sm"
          onClick={() => setImagenAmpliada(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-[#080808] shadow-2xl"
            onClick={(evento) => evento.stopPropagation()}
          >
            {/* BOTÓN CERRAR */}
            <button
              type="button"
              onClick={() => setImagenAmpliada(null)}
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white transition hover:border-red-500 hover:bg-red-700"
              aria-label="Cerrar imagen"
            >
              <X size={24} />
            </button>

            {/* IMAGEN GRANDE */}
            <div className="relative h-[70vh] max-h-[680px] w-full">
              <Image
                src={imagenAmpliada}
                alt="Vista ampliada de la camisa"
                fill
                priority
                sizes="(max-width: 640px) 92vw, 520px"
                className="object-contain"
              />
            </div>

            {/* TEXTO INFERIOR */}
            <div className="border-t border-white/10 px-5 py-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Vista del producto
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Presiona fuera de la imagen para cerrar
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}