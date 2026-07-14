"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { productos } from "@/data/productos";
import { useCart } from "@/app/context/cartcontext";
import ImagenProducto from "@/Components/imagenproducto";

const tallas = ["S", "M", "L", "XL"];
const PRODUCTOS_POR_PAGINA = 20;

export default function Catalogo() {
  const { agregarAlCarrito } = useCart();

  const [tallasSeleccionadas, setTallasSeleccionadas] = useState<
    Record<number, string>
  >({});

  const [paginaActual, setPaginaActual] = useState(1);
  const [ultimoAgregado, setUltimoAgregado] = useState<string | null>(null);

  const primerIndice = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
  const ultimoIndice = primerIndice + PRODUCTOS_POR_PAGINA;

  const productosActuales = productos.slice(primerIndice, ultimoIndice);

  const totalPaginas = Math.ceil(
    productos.length / PRODUCTOS_POR_PAGINA
  );

  const seleccionarTalla = (productoId: number, talla: string) => {
    setTallasSeleccionadas((estadoActual) => ({
      ...estadoActual,
      [productoId]: talla,
    }));
  };

  const agregarProducto = (
    producto: (typeof productos)[number]
  ) => {
    const talla = tallasSeleccionadas[producto.id];

    if (!talla) {
      return;
    }

    agregarAlCarrito({
      id: producto.id,
      imagen: producto.imagen,
      talla,
      cantidad: 1,
    });

    const identificador = `${producto.id}-${talla}`;

    setUltimoAgregado(identificador);

    window.setTimeout(() => {
      setUltimoAgregado((actual) =>
        actual === identificador ? null : actual
      );
    }, 1200);
  };

  const cambiarPagina = (nuevaPagina: number) => {
    setPaginaActual(nuevaPagina);

    document.getElementById("catalogo")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="catalogo"
      className="scroll-mt-24 overflow-hidden bg-black px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-14 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-red-600">
            Catálogo
          </p>

          <h2 className="mt-4 text-4xl font-black uppercase text-white sm:text-5xl">
            Colección
          </h2>

          <p className="mt-4 text-sm text-zinc-500">
            Streetwear • Oversize • Tallas S, M, L y XL
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productosActuales.map((producto) => {
            const tallaSeleccionada =
              tallasSeleccionadas[producto.id];

            const productoAgregado =
              ultimoAgregado ===
              `${producto.id}-${tallaSeleccionada}`;

            return (
              <article
                key={producto.id}
                className="group min-w-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition duration-300 hover:-translate-y-1 hover:border-red-600/70 hover:shadow-2xl hover:shadow-red-950/30"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
                  <ImagenProducto
                    src={producto.imagen}
                    alt={`Camisa AlfStore ${producto.id}`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-3 sm:p-4">
                  <p className="mb-3 text-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Selecciona tu talla
                  </p>

                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                    {tallas.map((talla) => {
                      const seleccionada =
                        tallaSeleccionada === talla;

                      return (
                        <button
                          type="button"
                          key={talla}
                          aria-label={`Seleccionar talla ${talla}`}
                          aria-pressed={seleccionada}
                          onClick={() =>
                            seleccionarTalla(producto.id, talla)
                          }
                          className={`flex aspect-square items-center justify-center rounded-full border text-[11px] font-black transition sm:text-xs ${
                            seleccionada
                              ? "border-red-600 bg-red-600 text-white"
                              : "border-zinc-700 text-zinc-400 hover:border-red-600 hover:text-white"
                          }`}
                        >
                          {talla}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    disabled={!tallaSeleccionada}
                    onClick={() => agregarProducto(producto)}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-2 py-3 text-[10px] font-black uppercase tracking-wider transition sm:text-xs ${
                      tallaSeleccionada
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    <ShoppingBag size={16} />

                    {productoAgregado
                      ? "Agregado"
                      : tallaSeleccionada
                        ? "Agregar"
                        : "Elige talla"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {totalPaginas > 1 && (
          <div className="mt-14 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              disabled={paginaActual === 1}
              onClick={() => cambiarPagina(paginaActual - 1)}
              className="rounded-lg bg-zinc-900 px-4 py-3 text-xs font-black uppercase text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>

            {Array.from({ length: totalPaginas }).map((_, index) => {
              const numeroPagina = index + 1;
              const paginaActiva = paginaActual === numeroPagina;

              return (
                <button
                  type="button"
                  key={numeroPagina}
                  onClick={() => cambiarPagina(numeroPagina)}
                  className={`flex h-11 min-w-11 items-center justify-center rounded-lg px-3 text-sm font-black transition ${
                    paginaActiva
                      ? "bg-red-600 text-white"
                      : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {numeroPagina}
                </button>
              );
            })}

            <button
              type="button"
              disabled={paginaActual === totalPaginas}
              onClick={() => cambiarPagina(paginaActual + 1)}
              className="rounded-lg bg-zinc-900 px-4 py-3 text-xs font-black uppercase text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </section>
  );
}