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
    setTallasSeleccionadas(
      (estadoAnterior) => ({
        ...estadoAnterior,
        [productoId]: talla,
      })
    );
  };

  const agregarProducto = (
    producto: Producto
  ) => {
    const tallaSeleccionada =
      tallasSeleccionadas[producto.id];

    if (!tallaSeleccionada) {
      return;
    }

    agregarAlCarrito(
      producto,
      tallaSeleccionada
    );

    setProductoAgregado(producto.id);

    window.setTimeout(() => {
      setProductoAgregado(null);
      abrirCarrito();
    }, 350);
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
          {/* ENCABEZADO */}
          <div className="mb-10 text-center">
            <p
              className="
                mb-3
                text-xs
                font-black
                uppercase
                tracking-[0.35em]
                text-red-600
              "
            >
              AlfStore
            </p>

            <h2
              className="
                text-3xl
                font-black
                uppercase
                tracking-tight
                sm:text-5xl
              "
            >
              Nuestra colección
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-zinc-400
                sm:text-base
              "
            >
              Selecciona una talla y agrega la
              camisa al carrito. Presiona la imagen
              para verla ampliada.
            </p>

            <p
              className="
                mt-3
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-red-500
              "
            >
              Página {paginaActual} de{" "}
              {totalPaginas}
            </p>
          </div>

          {/* PRODUCTOS */}
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
                    {/* IMAGEN */}
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
                        border-0
                        bg-[#050505]
                        p-0
                      "
                      aria-label={`Ampliar producto ${producto.id}`}
                    >
                      {imagenConError ? (
                        <div
                          className="
                            absolute
                            inset-0
                            flex
                            flex-col
                            items-center
                            justify-center
                            gap-3
                            bg-zinc-950
                            px-3
                            text-zinc-600
                          "
                        >
                          <ImageOff size={30} />

                          <span
                            className="
                              text-center
                              text-[9px]
                              font-black
                              uppercase
                              tracking-wider
                            "
                          >
                            Imagen no disponible
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={producto.imagen}
                          alt={`Diseño AlfStore ${producto.id}`}
                          width={800}
                          height={1000}
                          unoptimized
                          priority={
                            paginaActual === 1 &&
                            producto.id <= 4
                          }
                          onError={() => {
                            setImagenesConError(
                              (
                                estadoAnterior
                              ) => ({
                                ...estadoAnterior,
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
                            transition-transform
                            duration-300
                            group-hover:scale-[1.02]
                          "
                        />
                      )}

                      {!imagenConError && (
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
                            border-white/25
                            bg-black/85
                            text-white
                          "
                        >
                          <ZoomIn size={18} />
                        </span>
                      )}
                    </button>

                    {/* TALLAS Y CARRITO */}
                    <div
                      className="
                        flex
                        min-h-[165px]
                        flex-1
                        flex-col
                        border-t
                        border-white/10
                        p-3
                        sm:min-h-[185px]
                        sm:p-4
                      "
                    >
                      <p
                        className="
                          mb-4
                          text-center
                          text-[10px]
                          font-bold
                          uppercase
                          leading-4
                          tracking-[0.08em]
                          text-zinc-400
                          sm:text-xs
                        "
                      >
                        Selecciona tu talla
                      </p>

                      <div
                        className="
                          grid
                          w-full
                          grid-cols-4
                          gap-1.5
                          sm:gap-2
                        "
                      >
                        {TALLAS.map((talla) => {
                          const seleccionada =
                            tallaSeleccionada ===
                            talla;

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
                                font-bold
                                transition
                                sm:text-sm

                                ${
                                  seleccionada
                                    ? "border-red-500 bg-red-700 text-white"
                                    : "border-white/20 bg-black text-zinc-400"
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
                          !tallaSeleccionada ||
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
                          tracking-wide
                          transition
                          sm:min-h-12
                          sm:text-xs

                          ${
                            tallaSeleccionada &&
                            !imagenConError
                              ? "bg-red-700 text-white hover:bg-red-600 active:scale-[0.98]"
                              : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                          }
                        `}
                      >
                        {agregado ? (
                          <Check size={16} />
                        ) : (
                          <ShoppingBag
                            size={16}
                          />
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

          {/* PAGINACIÓN */}
          <div
            className="
              mt-12
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <button
              type="button"
              onClick={() =>
                cambiarPagina(
                  paginaActual - 1
                )
              }
              disabled={paginaActual === 1}
              className="
                flex
                h-11
                items-center
                justify-center
                gap-1
                rounded-lg
                border
                border-white/15
                bg-zinc-950
                px-3
                text-[9px]
                font-black
                uppercase
                text-white
                disabled:opacity-30
                sm:text-xs
              "
            >
              <ChevronLeft size={17} />
              Anterior
            </button>

            <span
              className="
                flex
                h-11
                min-w-16
                items-center
                justify-center
                rounded-lg
                border
                border-red-700/50
                bg-red-950/30
                px-3
                text-xs
                font-black
                text-red-400
              "
            >
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
              className="
                flex
                h-11
                items-center
                justify-center
                gap-1
                rounded-lg
                border
                border-white/15
                bg-zinc-950
                px-3
                text-[9px]
                font-black
                uppercase
                text-white
                disabled:opacity-30
                sm:text-xs
              "
            >
              Siguiente
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* IMAGEN AMPLIADA */}
      {imagenAmpliada && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada"
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
          "
          onClick={() =>
            setImagenAmpliada(null)
          }
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
              bg-black
            "
            onClick={(evento) => {
              evento.stopPropagation();
            }}
          >
            <button
              type="button"
              onClick={() =>
                setImagenAmpliada(null)
              }
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
                bg-black/90
                text-white
              "
              aria-label="Cerrar imagen"
            >
              <X size={24} />
            </button>

            <div
              className="
                flex
                h-[70dvh]
                max-h-[680px]
                w-full
                items-center
                justify-center
                overflow-hidden
                bg-black
              "
            >
              <Image
                src={imagenAmpliada}
                alt="Vista ampliada del producto"
                width={900}
                height={1125}
                unoptimized
                priority
                className="
                  h-full
                  w-full
                  object-contain
                  object-center
                "
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}