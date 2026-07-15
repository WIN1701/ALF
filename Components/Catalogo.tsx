"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  ImageOff,
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
  const {
    agregarAlCarrito,
    abrirCarrito,
  } = useCart();

  const [paginaActual, setPaginaActual] =
    useState(1);

  const [imagenAmpliada, setImagenAmpliada] =
    useState<string | null>(null);

  const [
    tallasSeleccionadas,
    setTallasSeleccionadas,
  ] = useState<Record<number, Talla>>({});

  const [
    productoAgregado,
    setProductoAgregado,
  ] = useState<number | null>(null);

  const [
    imagenesConError,
    setImagenesConError,
  ] = useState<Record<number, boolean>>({});

  const totalPaginas = Math.ceil(
    productos.length / PRODUCTOS_POR_PAGINA
  );

  const indiceInicial =
    (paginaActual - 1) * PRODUCTOS_POR_PAGINA;

  const productosDeLaPagina = productos.slice(
    indiceInicial,
    indiceInicial + PRODUCTOS_POR_PAGINA
  );

  useEffect(() => {
    if (!imagenAmpliada) {
      return;
    }

    const overflowAnterior =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const cerrarConEscape = (
      evento: KeyboardEvent
    ) => {
      if (evento.key === "Escape") {
        setImagenAmpliada(null);
      }
    };

    window.addEventListener(
      "keydown",
      cerrarConEscape
    );

    return () => {
      document.body.style.overflow =
        overflowAnterior;

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

  const agregarProducto = (
    producto: Producto
  ) => {
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
      setProductoAgregado((actual) =>
        actual === producto.id ? null : actual
      );
    }, 1200);

    window.setTimeout(() => {
      abrirCarrito();
    }, 250);
  };

  const cambiarPagina = (
    nuevaPagina: number
  ) => {
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
        className="
          scroll-mt-24
          overflow-hidden
          bg-black
          px-3
          py-16
          text-white
          sm:px-6
          sm:py-20
          lg:px-8
        "
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
              Selecciona una talla y agrega la
              camisa al carrito. Presiona la imagen
              para verla ampliada.
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-red-500">
              Página {paginaActual} de{" "}
              {totalPaginas}
            </p>
          </div>

          <div
            className="
              catalogo-grid
              grid
              w-full
              grid-cols-2
              items-stretch
              gap-3
              sm:grid-cols-3
              sm:gap-5
              lg:grid-cols-4
              xl:grid-cols-5
            "
          >
            {productosDeLaPagina.map(
              (producto) => {
                const tallaElegida =
                  tallasSeleccionadas[
                    producto.id
                  ];

                const fueAgregado =
                  productoAgregado ===
                  producto.id;

                const imagenConError =
                  imagenesConError[
                    producto.id
                  ] === true;

                return (
                  <article
                    key={producto.id}
                    className="
                      producto-card
                      flex
                      h-full
                      min-w-0
                      flex-col
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/15
                      bg-[#080808]
                    "
                  >
                    <button
                      type="button"
                      disabled={imagenConError}
                      onClick={() => {
                        if (!imagenConError) {
                          setImagenAmpliada(
                            producto.imagen
                          );
                        }
                      }}
                      className="
                        group
                        relative
                        block
                        aspect-[4/5]
                        w-full
                        shrink-0
                        overflow-hidden
                        bg-[#050505]
                        disabled:cursor-default
                      "
                      aria-label={`Ampliar camisa ${producto.id}`}
                    >
                      {imagenConError ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950 px-3 text-zinc-600">
                          <ImageOff size={30} />

                          <span className="text-center text-[9px] font-bold uppercase tracking-wider">
                            Imagen no disponible
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={producto.imagen}
                          alt={`Camisa AlfStore ${producto.id}`}
                          fill
                          priority={
                            paginaActual === 1 &&
                            producto.id <= 4
                          }
                          quality={70}
                          sizes="
                            (max-width: 640px) 50vw,
                            (max-width: 1024px) 33vw,
                            (max-width: 1280px) 25vw,
                            20vw
                          "
                          onError={() => {
                            setImagenesConError(
                              (anteriores) => ({
                                ...anteriores,
                                [producto.id]: true,
                              })
                            );
                          }}
                          className="
                            object-contain
                            object-center
                            transition-transform
                            duration-300
                            group-hover:scale-[1.02]
                          "
                        />
                      )}

                      {!imagenConError && (
                        <>
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/30">
                            <span className="hidden items-center gap-2 rounded-full border border-white/30 bg-black/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white opacity-0 transition group-hover:opacity-100 sm:flex">
                              <ZoomIn size={17} />
                              Ver camisa
                            </span>
                          </div>

                          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/85 text-white sm:hidden">
                            <ZoomIn size={18} />
                          </span>
                        </>
                      )}
                    </button>

                    <div
                      className="
                        flex
                        min-h-[165px]
                        flex-1
                        flex-col
                        border-t
                        border-white/10
                        p-3
                        sm:min-h-[190px]
                        sm:p-4
                      "
                    >
                      <p className="mb-1 text-center text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                        Camisa #{producto.id}
                      </p>

                      <p className="mb-4 text-center text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-zinc-400 sm:text-xs">
                        Selecciona tu talla
                      </p>

                      <div className="grid w-full grid-cols-4 gap-1.5 sm:gap-2">
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
                                min-w-0
                                items-center
                                justify-center
                                rounded-full
                                border
                                text-xs
                                font-semibold
                                transition
                                sm:text-sm

                                ${
                                  seleccionada
                                    ? "border-red-500 bg-red-700 text-white"
                                    : "border-white/20 bg-transparent text-zinc-400 hover:border-white hover:text-white"
                                }
                              `}
                            >
                              {talla}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        disabled={
                          !tallaElegida ||
                          imagenConError
                        }
                        onClick={() =>
                          agregarProducto(
                            producto
                          )
                        }
                        className={`
                          mt-auto
                          flex
                          min-h-11
                          w-full
                          items-center
                          justify-center
                          gap-1.5
                          rounded-xl
                          px-2
                          text-[8px]
                          font-black
                          uppercase
                          leading-4
                          tracking-[0.02em]
                          transition
                          sm:min-h-12
                          sm:text-xs

                          ${
                            tallaElegida &&
                            !imagenConError
                              ? "cursor-pointer bg-red-700 text-white hover:bg-red-600 active:scale-[0.98]"
                              : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                          }
                        `}
                      >
                        {fueAgregado ? (
                          <Check size={16} />
                        ) : (
                          <ShoppingBag size={16} />
                        )}

                        <span>
                          {imagenConError
                            ? "No disponible"
                            : fueAgregado
                              ? "Agregado"
                              : tallaElegida
                                ? "Agregar"
                                : "Elige talla"}
                        </span>
                      </button>
                    </div>
                  </article>
                );
              }
            )}
          </div>

          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() =>
                cambiarPagina(
                  paginaActual - 1
                )
              }
              disabled={paginaActual === 1}
              className="flex h-11 items-center justify-center gap-1 rounded-lg border border-white/15 bg-zinc-950 px-3 text-[10px] font-bold uppercase text-white disabled:opacity-30"
            >
              <ChevronLeft size={17} />
              Anterior
            </button>

            <div className="hidden flex-wrap items-center justify-center gap-2 sm:flex">
              {Array.from(
                { length: totalPaginas },
                (_, indice) => indice + 1
              ).map((pagina) => (
                <button
                  key={pagina}
                  type="button"
                  onClick={() =>
                    cambiarPagina(pagina)
                  }
                  className={`
                    flex
                    h-11
                    min-w-10
                    items-center
                    justify-center
                    rounded-lg
                    border
                    px-2
                    text-sm
                    font-black

                    ${
                      paginaActual === pagina
                        ? "border-red-500 bg-red-700 text-white"
                        : "border-white/15 bg-zinc-950 text-zinc-400"
                    }
                  `}
                >
                  {pagina}
                </button>
              ))}
            </div>

            <span className="flex h-11 min-w-16 items-center justify-center rounded-lg border border-red-700/50 bg-red-950/30 px-3 text-xs font-black text-red-400 sm:hidden">
              {paginaActual}/{totalPaginas}
            </span>

            <button
              type="button"
              onClick={() =>
                cambiarPagina(
                  paginaActual + 1
                )
              }
              disabled={
                paginaActual === totalPaginas
              }
              className="flex h-11 items-center justify-center gap-1 rounded-lg border border-white/15 bg-zinc-950 px-3 text-[10px] font-bold uppercase text-white disabled:opacity-30"
            >
              Siguiente
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {imagenAmpliada && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-sm"
          onClick={() =>
            setImagenAmpliada(null)
          }
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-[#080808]"
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >
            <button
              type="button"
              onClick={() =>
                setImagenAmpliada(null)
              }
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/85 text-white"
            >
              <X size={24} />
            </button>

            <div className="relative h-[70vh] max-h-[680px] w-full bg-black">
              <Image
                src={imagenAmpliada}
                alt="Vista ampliada de la camisa"
                fill
                priority
                quality={85}
                sizes="(max-width: 640px) 92vw, 520px"
                className="object-contain object-center p-2"
              />
            </div>

            <div className="border-t border-white/10 px-5 py-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">
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