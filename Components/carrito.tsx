"use client";

import { useEffect } from "react";
import {
  MessageCircle,
  Minus,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useCart } from "@/app/context/cartcontext";
import ImagenProducto from "@/Components/imagenproducto";

interface CarritoProps {
  abierto: boolean;
  cerrar: () => void;
}

export default function Carrito({
  abierto,
  cerrar,
}: CarritoProps) {
  const {
    carrito,
    eliminarDelCarrito,
    aumentarCantidad,
    disminuirCantidad,
    vaciarCarrito,
  } = useCart();

  const totalArticulos = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  useEffect(() => {
    if (!abierto) {
      return;
    }

    const desplazamientoAnterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const cerrarConEscape = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        cerrar();
      }
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      document.body.style.overflow = desplazamientoAnterior;
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, [abierto, cerrar]);

  const finalizarPorWhatsApp = () => {
    if (carrito.length === 0) {
      return;
    }

    const detalleDelPedido = carrito
      .map((producto) => {
        const numeroProducto = String(producto.id).padStart(3, "0");

        return (
          `• Camisa #${numeroProducto}\n` +
          `  Talla: ${producto.talla}\n` +
          `  Cantidad: ${producto.cantidad}`
        );
      })
      .join("\n\n");

    const mensaje =
      `Hola AlfStore, quiero realizar el siguiente pedido:\n\n` +
      `${detalleDelPedido}\n\n` +
      `Total de prendas: ${totalArticulos}`;

    const enlace = `https://wa.me/50360197818?text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(enlace, "_blank", "noopener,noreferrer");
  };

  if (!abierto) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100]"
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compras"
    >
      {/* Fondo oscuro */}

      <button
        type="button"
        onClick={cerrar}
        aria-label="Cerrar carrito"
        className="absolute inset-0 h-full w-full bg-black/80 backdrop-blur-sm"
      />

      {/* Panel lateral */}

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950 shadow-2xl">
        {/* Encabezado */}

        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-red-600">
              AlfStore
            </p>

            <h2 className="mt-1 text-xl font-black uppercase tracking-wider text-white">
              Mi carrito
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              {totalArticulos}{" "}
              {totalArticulos === 1 ? "prenda" : "prendas"}
            </p>
          </div>

          <button
            type="button"
            onClick={cerrar}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 text-white transition hover:border-red-600 hover:text-red-500"
            aria-label="Cerrar carrito"
          >
            <X size={22} />
          </button>
        </div>

        {/* Productos */}

        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-5">
          {carrito.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-zinc-800 bg-black">
                <span className="text-4xl">🛍️</span>
              </div>

              <h3 className="mt-6 text-lg font-black uppercase text-white">
                Tu carrito está vacío
              </h3>

              <p className="mt-3 max-w-xs text-sm leading-7 text-zinc-500">
                Selecciona una talla en el catálogo y presiona el botón
                para agregar la camisa.
              </p>

              <button
                type="button"
                onClick={cerrar}
                className="mt-7 rounded-lg bg-red-600 px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-red-700"
              >
                Ver colección
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {carrito.map((producto) => {
                const numeroProducto = String(producto.id).padStart(
                  3,
                  "0"
                );

                return (
                  <article
                    key={`${producto.id}-${producto.talla}`}
                    className="flex min-w-0 gap-3 overflow-hidden rounded-xl border border-zinc-800 bg-black p-3 sm:gap-4"
                  >
                    {/* Imagen */}

                    <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-900">
                      <ImagenProducto
                        src={producto.imagen}
                        alt={`Camisa AlfStore ${numeroProducto}`}
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    {/* Información */}

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black uppercase text-white">
                          Camisa #{numeroProducto}
                        </p>

                        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                          Talla:{" "}
                          <span className="text-red-500">
                            {producto.talla}
                          </span>
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        {/* Cantidad */}

                        <div className="flex items-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-950">
                          <button
                            type="button"
                            onClick={() =>
                              disminuirCantidad(
                                producto.id,
                                producto.talla
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center text-zinc-300 transition hover:bg-zinc-800 hover:text-red-500"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="flex h-9 min-w-8 items-center justify-center text-sm font-black text-white">
                            {producto.cantidad}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              aumentarCantidad(
                                producto.id,
                                producto.talla
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center text-zinc-300 transition hover:bg-zinc-800 hover:text-red-500"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        {/* Eliminar */}

                        <button
                          type="button"
                          onClick={() =>
                            eliminarDelCarrito(
                              producto.id,
                              producto.talla
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 text-zinc-500 transition hover:border-red-600 hover:text-red-500"
                          aria-label={`Eliminar camisa ${numeroProducto}`}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Parte inferior */}

        <div className="border-t border-zinc-800 bg-black/70 p-5">
          {carrito.length > 0 && (
            <>
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-zinc-500">
                  Total de prendas
                </span>

                <span className="text-xl font-black text-white">
                  {totalArticulos}
                </span>
              </div>

              <button
                type="button"
                onClick={vaciarCarrito}
                className="mb-4 w-full text-center text-xs font-black uppercase tracking-wider text-zinc-500 transition hover:text-red-500"
              >
                Vaciar carrito
              </button>
            </>
          )}

          <button
            type="button"
            onClick={finalizarPorWhatsApp}
            disabled={carrito.length === 0}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-green-600 px-5 py-4 text-xs font-black uppercase tracking-wider text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
          >
            <MessageCircle size={20} />
            Pedir por WhatsApp
          </button>
        </div>
      </aside>
    </div>
  );
}