"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Check,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";

import {
  productos,
  type Producto,
} from "@/data/productos";

import {
  type Talla,
  useCart,
} from "@/app/context/cartcontext";

import ImagenProducto from "@/Components/imagenproducto";

const tallas: Talla[] = [
  "S",
  "M",
  "L",
  "XL",
];

export default function Catalogo() {
  const { agregarAlCarrito } = useCart();

  const [
    tallasSeleccionadas,
    setTallasSeleccionadas,
  ] = useState<
    Partial<Record<number, Talla>>
  >({});

  const [
    productoAmpliado,
    setProductoAmpliado,
  ] = useState<Producto | null>(null);

  const [productoAgregado, setProductoAgregado] =
    useState<number | null>(null);

  useEffect(() => {
    if (!productoAmpliado) {
      return;
    }

    const overflowAnterior =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const cerrarConEscape = (
      evento: KeyboardEvent
    ) => {
      if (evento.key === "Escape") {
        setProductoAmpliado(null);
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
  }, [productoAmpliado]);

  const seleccionarTalla = (
    productoId: number,
    talla: Talla
  ) => {
    setTallasSeleccionadas(
      (seleccionesActuales) => ({
        ...seleccionesActuales,
        [productoId]: talla,
      })
    );
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
      setProductoAgregado((idActual) =>
        idActual === producto.id
          ? null
          : idActual
      );
    }, 1400);
  };

  return (
    <>
      <section
        id="catalogo"
        className="urban-section relative overflow-hidden border-y border-zinc-900 px-3 py-20 sm:px-6 lg:px-10"
      >
        <div className="pointer-events-none absolute left-[-180px] top-20 h-[420px] w-[420px] rounded-full bg-red-800/15 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1700px]">
          <div className="mb-12 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-red-500">
              Colección AlfStore
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Diseños nacidos
              <span className="block text-red-600">
                del caos.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
              Selecciona tu talla oversize,
              agrega tus diseños favoritos al
              carrito y envía tu pedido
              directamente por WhatsApp.
            </p>
          </div>

          <div className="catalogo-grid grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {productos.map((producto) => {
              const tallaSeleccionada =
                tallasSeleccionadas[
                  producto.id
                ];

              const agregado =
                productoAgregado ===
                producto.id;

              const numeroProducto =
                String(
                  producto.id
                ).padStart(3, "0");

              return (
                <article
                  key={producto.id}
                  className="producto-card flex min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#070707]"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-zinc-800 bg-black">
                    <ImagenProducto
                      src={producto.imagen}
                      alt={`Camisa AlfStore número ${numeroProducto}`}
                      sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 20vw"
                      className="object-contain"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />

                    <button
                      type="button"
                      onClick={() =>
                        setProductoAmpliado(
                          producto
                        )
                      }
                      aria-label={`Ampliar camisa ${numeroProducto}`}
                      className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/80 text-white transition-colors hover:border-red-500 hover:text-red-500 sm:h-12 sm:w-12"
                    >
                      <Search size={22} />
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col px-3 pb-4 pt-5 sm:px-4 sm:pb-5">
                    <p className="text-center text-[11px] font-black uppercase tracking-[0.15em] text-zinc-300 sm:text-xs">
                      Camisa #{numeroProducto}
                    </p>

                    <p className="mt-4 text-center text-[11px] font-black uppercase tracking-[0.12em] text-white sm:text-sm">
                      Selecciona tu talla
                    </p>

                    <div className="mt-4 grid grid-cols-4 gap-1.5 sm:gap-2">
                      {tallas.map((talla) => {
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
                            aria-pressed={
                              seleccionada
                            }
                            className={
                              seleccionada
                                ? "flex aspect-square items-center justify-center rounded-full border border-red-500 bg-red-600 text-xs font-black text-white shadow-[0_0_16px_rgba(220,38,38,0.35)] sm:text-sm"
                                : "flex aspect-square items-center justify-center rounded-full border border-zinc-700 bg-black text-xs font-black text-zinc-300 transition-colors hover:border-red-500 hover:text-white sm:text-sm"
                            }
                          >
                            {talla}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      disabled={
                        !tallaSeleccionada
                      }
                      onClick={() =>
                        agregarProducto(
                          producto
                        )
                      }
                      className={
                        agregado
                          ? "mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-2 text-[10px] font-black uppercase tracking-wider text-white sm:min-h-14 sm:text-xs"
                          : tallaSeleccionada
                            ? "mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-2 text-[10px] font-black uppercase tracking-wider text-white transition-colors hover:bg-red-500 sm:min-h-14 sm:text-xs"
                            : "mt-5 flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-zinc-800 px-2 text-[10px] font-black uppercase tracking-wider text-zinc-500 sm:min-h-14 sm:text-xs"
                      }
                    >
                      {agregado ? (
                        <>
                          <Check size={18} />
                          Agregada
                        </>
                      ) : (
                        <>
                          <ShoppingBag
                            size={18}
                          />

                          {tallaSeleccionada
                            ? "Agregar"
                            : "Elige talla"}
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {productoAmpliado && (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada del producto"
        >
          <button
            type="button"
            onClick={() =>
              setProductoAmpliado(null)
            }
            aria-label="Cerrar imagen ampliada"
            className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-600 bg-black text-white transition-colors hover:border-red-500 hover:text-red-500 sm:right-7 sm:top-7"
          >
            <X size={25} />
          </button>

          <div className="relative h-[78vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-700 bg-[#050505]">
            <ImagenProducto
              src={productoAmpliado.imagen}
              alt={`Camisa AlfStore ampliada ${productoAmpliado.id}`}
              sizes="95vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}