"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag, X, ZoomIn } from "lucide-react";
import { productos } from "@/data/productos";

type Talla = "S" | "M" | "L" | "XL";

const tallas: Talla[] = ["S", "M", "L", "XL"];

export default function Catalogo() {
  const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(
    null
  );

  const [tallasSeleccionadas, setTallasSeleccionadas] = useState<
    Record<string, Talla>
  >({});

  /* BLOQUEA EL MOVIMIENTO DE LA PÁGINA
     CUANDO LA IMAGEN ESTÁ ABIERTA */
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
    productoId: string | number,
    talla: Talla
  ) => {
    setTallasSeleccionadas((anteriores) => ({
      ...anteriores,
      [String(productoId)]: talla,
    }));
  };

  return (
    <>
      <section
        id="catalogo"
        className="min-h-screen bg-black px-4 py-16 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-[1600px]">
          {/* TÍTULO */}
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-red-600">
              AlfStore
            </p>

            <h2 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
              Nuestra colección
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-400 sm:text-base">
              Presiona una camisa para verla en tamaño ampliado.
            </p>
          </div>

          {/* PRODUCTOS */}
          <div
            className="
              grid
              grid-cols-2
              gap-4
              sm:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
            "
          >
            {productos.map((producto) => {
              const productoId = String(producto.id);
              const tallaElegida =
                tallasSeleccionadas[productoId];

              return (
                <article
                  key={producto.id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/15
                    bg-[#080808]
                    transition
                    duration-300
                    hover:border-red-700/60
                  "
                >
                  {/* IMAGEN DEL PRODUCTO */}
                  <button
                    type="button"
                    onClick={() =>
                      setImagenAmpliada(producto.imagen)
                    }
                    className="
                      group
                      relative
                      block
                      aspect-[4/5]
                      w-full
                      cursor-zoom-in
                      overflow-hidden
                      bg-black
                    "
                    aria-label="Ampliar imagen de la camisa"
                  >
                    <Image
                      src={producto.imagen}
                      alt="Camisa AlfStore"
                      fill
                      sizes="
                        (max-width: 640px) 50vw,
                        (max-width: 1024px) 33vw,
                        (max-width: 1280px) 25vw,
                        20vw
                      "
                      className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />

                    {/* OSCURECIDO AL PASAR EL MOUSE */}
                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        bg-black/0
                        transition
                        duration-300
                        group-hover:bg-black/30
                      "
                    >
                      <div
                        className="
                          hidden
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-white/30
                          bg-black/80
                          px-4
                          py-2
                          text-xs
                          font-bold
                          uppercase
                          tracking-wider
                          text-white
                          opacity-0
                          transition
                          duration-300
                          group-hover:opacity-100
                          sm:flex
                        "
                      >
                        <ZoomIn size={17} />

                        Ver camisa
                      </div>
                    </div>

                    {/* ICONO VISIBLE EN CELULAR */}
                    <span
                      className="
                        absolute
                        bottom-3
                        right-3
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        bg-black/80
                        text-white
                        sm:hidden
                      "
                    >
                      <ZoomIn size={18} />
                    </span>
                  </button>

                  {/* TALLAS */}
                  <div className="p-4 sm:p-5">
                    <p
                      className="
                        mb-4
                        text-center
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        text-zinc-400
                        sm:text-sm
                      "
                    >
                      Selecciona tu talla
                    </p>

                    <div className="grid grid-cols-4 gap-2">
                      {tallas.map((talla) => {
                        const seleccionada =
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
                              text-sm
                              font-semibold
                              transition
                              duration-200
                              sm:text-base

                              ${
                                seleccionada
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

                    {/* BOTÓN DEL PRODUCTO */}
                    <button
                      type="button"
                      disabled={!tallaElegida}
                      className={`
                        mt-5
                        flex
                        min-h-12
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        px-3
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.08em]
                        transition
                        sm:text-sm

                        ${
                          tallaElegida
                            ? "cursor-pointer bg-red-700 text-white hover:bg-red-600 active:scale-[0.98]"
                            : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                        }
                      `}
                    >
                      <ShoppingBag size={19} />

                      {tallaElegida
                        ? `Talla ${tallaElegida} seleccionada`
                        : "Elige talla"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* VENTANA CON LA IMAGEN AMPLIADA */}
      {imagenAmpliada && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/90
            px-4
            py-6
            backdrop-blur-sm
          "
          onClick={() => setImagenAmpliada(null)}
        >
          <div
            className="
              relative
              w-full
              max-w-lg
              overflow-hidden
              rounded-2xl
              border
              border-white/20
              bg-[#080808]
              shadow-2xl
            "
            onClick={(evento) => evento.stopPropagation()}
          >
            {/* BOTÓN CERRAR */}
            <button
              type="button"
              onClick={() => setImagenAmpliada(null)}
              className="
                absolute
                right-3
                top-3
                z-20
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-black/80
                text-white
                transition
                hover:bg-red-700
              "
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