"use client";

import {
  useEffect,
  useState,
} from "react";

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
} from "../data/productos";

import {
  useCart,
  type Talla,
} from "../app/context/cartcontext";

const TALLAS: Talla[] = [
  "S",
  "M",
  "L",
  "XL",
];

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
    (paginaActual - 1) *
    PRODUCTOS_POR_PAGINA;

  const productosVisibles = productos.slice(
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
    setTallasSeleccionadas((anterior) => ({
      ...anterior,
      [productoId]: talla,
    }));
  };

  const agregarProducto = (
    producto: Producto
  ) => {
    const talla =
      tallasSeleccionadas[producto.id];

    if (!talla) {
      return;
    }

    agregarAlCarrito(producto, talla);
    setProductoAgregado(producto.id);

    window.setTimeout(() => {
      setProductoAgregado(null);
    }, 1000);

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
    }, 100);
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
            <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-red-600">
              AlfStore
            </p>

            <h2 className="text-3xl font-black uppercase sm:text-5xl">
              Nuestra colección
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-400">
              Selecciona una talla y agrega la
              camisa al carrito.
            </p>

            <p className="mt-3 text-xs font-bold uppercase text-red-500">
              Página {paginaActual} de{" "}
              {totalPaginas}
            </p>
          </div>

          <div
            className="
              catalogo-grid
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-3
              sm:gap-5
              lg:grid-cols-4
              xl:grid-cols-5
            "
          >
            {productosVisibles.map(
              (producto) => {
                const tallaSeleccionada =
                  tallasSeleccionadas[
                    producto.id
                  ];

                const agregado =
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
                        block
                        aspect-[4/5]
                        w-full
                        overflow-hidden
                        border-0
                        bg-[#050505]
                        p-0
                      "
                    >
                      {imagenConError ? (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-zinc-950 text-zinc-600">
                          <ImageOff size={30} />

                          <span className="text-[9px] font-black uppercase">
                            Imagen no disponible
                          </span>
                        </div>
                      ) : (
                        <div className="relative h-full w-full">
                          <Image
                            src={producto.imagen}
                            alt={`Camisa AlfStore ${producto.id}`}
                            width={900}
                            height={1125}
                            unoptimized
                            priority={
                              paginaActual === 1 &&
                              producto.id <= 4
                            }
                            onError={() => {
                              setImagenesConError(
                                (anterior) => ({
                                  ...anterior,
                                  [producto.id]:
                                    true,
                                })
                              );
                            }}
                            className="
                              h-full
                              w-full
                              object-contain
                              object-center
                            "
                          />

                          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/85 text-white">
                            <ZoomIn size={18} />
                          </span>
                        </div>
                      )}
                    </button>

                    <div className="flex min-h-[175px] flex-1 flex-col border-t border-white/10 p-3 sm:min-h-[195px] sm:p-4">
                      <p className="mb-1 text-center text-[9px] font-bold uppercase text-zinc-600">
                        Camisa #{producto.id}
                      </p>

                      <p className="mb-4 text-center text-[10px] font-bold uppercase text-zinc-400 sm:text-xs">
                        Selecciona tu talla
                      </p>

                      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                        {TALLAS.map((talla) => (
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
                              font-bold

                              ${
                                tallaSeleccionada ===
                                talla
                                  ? "border-red-500 bg-red-700 text-white"
                                  : "border-white/20 bg-black text-zinc-400"
                              }
                            `}
                          >
                            {talla}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        disabled={
                          !tallaSeleccionada ||
                          imagenConError
                        }
                        onClick={() =>
                          agregarProducto(producto)
                        }
                        className={`
                          mt-auto
                          flex
                          min-h-11
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          px-2
                          text-[8px]
                          font-black
                          uppercase
                          sm:text-xs

                          ${
                            tallaSeleccionada &&
                            !imagenConError
                              ? "bg-red-700 text-white"
                              : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                          }
                        `}
                      >
                        {agregado ? (
                          <Check size={16} />
                        ) : (
                          <ShoppingBag size={16} />
                        )}

                        {imagenConError
                          ? "No disponible"
                          : agregado
                            ? "Agregado"
                            : tallaSeleccionada
                              ? "Agregar"
                              : "Elige talla"}
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
              className="flex h-11 items-center gap-1 rounded-lg border border-white/15 bg-zinc-950 px-3 text-[9px] font-black uppercase disabled:opacity-30"
            >
              <ChevronLeft size={17} />
              Anterior
            </button>

            <span className="flex h-11 min-w-16 items-center justify-center rounded-lg border border-red-700/50 bg-red-950/30 px-3 text-xs font-black text-red-400">
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
              className="flex h-11 items-center gap-1 rounded-lg border border-white/15 bg-zinc-950 px-3 text-[9px] font-black uppercase disabled:opacity-30"
            >
              Siguiente
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {imagenAmpliada && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4 py-6"
          onClick={() =>
            setImagenAmpliada(null)
          }
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-black"
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >
            <button
              type="button"
              onClick={() =>
                setImagenAmpliada(null)
              }
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/90"
            >
              <X size={24} />
            </button>

            <Image
              src={imagenAmpliada}
              alt="Vista ampliada de la camisa"
              width={900}
              height={1125}
              unoptimized
              priority
              className="max-h-[75dvh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}