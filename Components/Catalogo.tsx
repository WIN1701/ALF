"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  X,
  ZoomIn,
} from "lucide-react";

import {
  productos,
  type Producto,
} from "@/data/productos";

import {
  useCart,
  type Talla,
} from "@/app/context/cartcontext";

const tallas: Talla[] = ["S", "M", "L", "XL"];

const PRODUCTOS_POR_PAGINA = 15;

export default function Catalogo() {
  const { agregarAlCarrito, abrirCarrito } = useCart();

  const [paginaActual, setPaginaActual] = useState(1);

  const [imagenAmpliada, setImagenAmpliada] =
    useState<string | null>(null);

  const [tallasSeleccionadas, setTallasSeleccionadas] =
    useState<Record<number, Talla>>({});

  const [productoAgregado, setProductoAgregado] =
    useState<number | null>(null);

  const totalPaginas = Math.ceil(
    productos.length / PRODUCTOS_POR_PAGINA
  );

  const indiceInicial =
    (paginaActual - 1) * PRODUCTOS_POR_PAGINA;

  const indiceFinal =
    indiceInicial + PRODUCTOS_POR_PAGINA;

  const productosDeLaPagina = productos.slice(
    indiceInicial,
    indiceFinal
  );

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

      window.removeEventListener(
        "keydown",
        cerrarConEscape
      );
    };
  }, [imagenAmpliada]);

  const seleccionarTalla = (
    productoId: number,
    talla: Talla
  ) => {
    setTallasSeleccionadas((anteriores) => ({
      ...anteriores,
      [productoId]: talla,
    }));
  };

  const agregarProducto = (producto: Producto) => {
    const tallaElegida =
      tallasSeleccionadas[producto.id];

    if (!tallaElegida) {
      return;
    }

    agregarAlCarrito(
      {
        id: producto.id,
        imagen: producto.imagen,
      },
      tallaElegida
    );

    setProductoAgregado(producto.id);

    window.setTimeout(() => {
      setProductoAgregado((productoActual) =>
        productoActual === producto.id
          ? null
          : productoActual
      );
    }, 1200);

    window.setTimeout(() => {
      abrirCarrito();
    }, 300);
  };

  const cambiarPagina = (nuevaPagina: number) => {
    if (
      nuevaPagina < 1 ||
      nuevaPagina > totalPaginas
    ) {
      return;
    }

    setPaginaActual(nuevaPagina);

    window.setTimeout(() => {
      document
        .getElementById("catalogo")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  return (
    <>
      <section
        id="catalogo"
        className="scroll-mt-24 bg-black px-4 py-20 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-red-600">
              AlfStore
            </p>

            <h2 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
              Nuestra colección
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
              Página {paginaActual} de {totalPaginas}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 min-[430px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {productosDeLaPagina.map((producto) => {
              const tallaElegida =
                tallasSeleccionadas[producto.id];

              const fueAgregado =
                productoAgregado === producto.id;

              return (
                <article
                  key={producto.id}
                  className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#080808] transition duration-300 hover:border-red-700/60"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setImagenAmpliada(producto.imagen)
                    }
                    className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-black"
                    aria-label={`Ampliar camisa ${producto.id}`}
                  >
                    <Image
                      src={producto.imagen}
                      alt={`Camisa AlfStore ${producto.id}`}
                      fill
                      sizes="
                        (max-width: 429px) 92vw,
                        (max-width: 767px) 48vw,
                        (max-width: 1023px) 33vw,
                        (max-width: 1279px) 25vw,
                        20vw
                      "
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/30">
                      <span className="hidden items-center gap-2 rounded-full border border-white/30 bg-black/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white opacity-0 transition duration-300 group-hover:opacity-100 sm:flex">
                        <ZoomIn size={17} />
                        Ver camisa
                      </span>
                    </div>

                    <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/85 text-white sm:hidden">
                      <ZoomIn size={19} />
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col p-4">
                    <p className="mb-1 text-center text-xs font-black uppercase text-white">
                      Camisa #{producto.id}
                    </p>

                    <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.12em] text-zinc-400 sm:text-sm">
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
                              min-h-10
                              items-center
                              justify-center
                              rounded-full
                              border
                              text-sm
                              font-semibold
                              transition
                              duration-200
                              ${
                                seleccionada
                                  ? "border-red-500 bg-red-700 text-white"
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

                    <button
                      type="button"
                      disabled={!tallaElegida}
                      onClick={() =>
                        agregarProducto(producto)
                      }
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
                        text-center
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.05em]
                        transition
                        ${
                          tallaElegida
                            ? "cursor-pointer bg-red-700 text-white hover:bg-red-600 active:scale-[0.98]"
                            : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                        }
                      `}
                    >
                      {fueAgregado ? (
                        <Check size={18} />
                      ) : (
                        <ShoppingBag size={18} />
                      )}

                      {fueAgregado
                        ? "Agregado"
                        : tallaElegida
                          ? "Agregar al carrito"
                          : "Elige una talla"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() =>
                cambiarPagina(paginaActual - 1)
              }
              disabled={paginaActual === 1}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-zinc-950 px-4 text-xs font-bold uppercase text-white transition hover:border-red-600 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={18} />
              Anterior
            </button>

            {Array.from(
              { length: totalPaginas },
              (_, indice) => indice + 1
            ).map((pagina) => (
              <button
                key={pagina}
                type="button"
                onClick={() => cambiarPagina(pagina)}
                className={`
                  flex
                  h-11
                  min-w-11
                  items-center
                  justify-center
                  rounded-lg
                  border
                  px-3
                  text-sm
                  font-black
                  transition
                  ${
                    paginaActual === pagina
                      ? "border-red-500 bg-red-700 text-white"
                      : "border-white/15 bg-zinc-950 text-zinc-400 hover:border-white hover:text-white"
                  }
                `}
                aria-label={`Ir a la página ${pagina}`}
              >
                {pagina}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                cambiarPagina(paginaActual + 1)
              }
              disabled={paginaActual === totalPaginas}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-zinc-950 px-4 text-xs font-bold uppercase text-white transition hover:border-red-600 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Siguiente
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

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
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >
            <button
              type="button"
              onClick={() => setImagenAmpliada(null)}
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white transition hover:bg-red-700"
              aria-label="Cerrar imagen"
            >
              <X size={24} />
            </button>

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