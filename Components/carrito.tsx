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
    totalArticulos,
    eliminarDelCarrito,
    aumentarCantidad,
    disminuirCantidad,
    vaciarCarrito,
  } = useCart();

  useEffect(() => {
    if (!abierto) {
      return;
    }

    const overflowAnterior =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const cerrarConEscape = (
      evento: KeyboardEvent
    ) => {
      if (evento.key === "Escape") {
        cerrar();
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
  }, [abierto, cerrar]);

  const finalizarPorWhatsApp = () => {
    if (carrito.length === 0) {
      return;
    }

    const origen = window.location.origin;

    const detalleDelPedido = carrito
      .map((producto) => {
        const numeroProducto = String(
          producto.id
        ).padStart(3, "0");

        const enlaceImagen =
          producto.imagen.startsWith("http")
            ? producto.imagen
            : `${origen}${producto.imagen}`;

        return (
          `• Camisa #${numeroProducto}\n` +
          `  Talla: ${producto.talla}\n` +
          `  Cantidad: ${producto.cantidad}\n` +
          `  Imagen: ${enlaceImagen}`
        );
      })
      .join("\n\n");

    const mensaje =
      `Hola AlfStore, quiero realizar el siguiente pedido:\n\n` +
      `${detalleDelPedido}\n\n` +
      `Total de prendas: ${totalArticulos}`;

    const enlaceWhatsApp =
      `https://wa.me/50360197818?text=` +
      encodeURIComponent(mensaje);

    window.location.assign(enlaceWhatsApp);
  };

  if (!abierto) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[200]"
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compras"
    >
      <button
        type="button"
        onClick={cerrar}
        aria-label="Cerrar carrito"
        className="absolute inset-0 h-full w-full bg-black/85"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-red-950 bg-[#080808] shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
              AlfStore
            </p>

            <h2 className="mt-1 text-2xl font-black uppercase tracking-wider text-white">
              Mi carrito
            </h2>

            <p className="mt-1 text-xs text-zinc-400">
              {totalArticulos}{" "}
              {totalArticulos === 1
                ? "prenda"
                : "prendas"}
            </p>
          </div>

          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar carrito"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-black text-white transition-colors hover:border-red-500 hover:text-red-500"
          >
            <X size={22} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5">
          {carrito.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-red-950 bg-black text-4xl">
                🛍️
              </div>

              <h3 className="mt-6 text-lg font-black uppercase text-white">
                Tu carrito está vacío
              </h3>

              <p className="mt-3 max-w-xs text-sm leading-7 text-zinc-400">
                Selecciona una talla y agrega
                la camisa que quieras comprar.
              </p>

              <button
                type="button"
                onClick={cerrar}
                className="mt-7 rounded-lg bg-red-600 px-7 py-3 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-red-500"
              >
                Ver colección
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {carrito.map((producto) => {
                const numeroProducto =
                  String(
                    producto.id
                  ).padStart(3, "0");

                return (
                  <article
                    key={`${producto.id}-${producto.talla}`}
                    className="flex min-w-0 gap-3 overflow-hidden rounded-2xl border border-zinc-800 bg-black p-3"
                  >
                    <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-950">
                      <ImagenProducto
                        src={producto.imagen}
                        alt={`Camisa AlfStore ${numeroProducto}`}
                        sizes="96px"
                        className="object-contain"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <p className="truncate text-sm font-black uppercase tracking-wide text-white">
                          Camisa #{numeroProducto}
                        </p>

                        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                          Talla:{" "}
                          <span className="text-red-500">
                            {producto.talla}
                          </span>
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <div className="flex items-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-950">
                          <button
                            type="button"
                            onClick={() =>
                              disminuirCantidad(
                                producto.id,
                                producto.talla
                              )
                            }
                            aria-label="Disminuir cantidad"
                            className="flex h-9 w-9 items-center justify-center text-white transition-colors hover:bg-zinc-800 hover:text-red-500"
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
                            aria-label="Aumentar cantidad"
                            className="flex h-9 w-9 items-center justify-center text-white transition-colors hover:bg-zinc-800 hover:text-red-500"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            eliminarDelCarrito(
                              producto.id,
                              producto.talla
                            )
                          }
                          aria-label={`Eliminar camisa ${numeroProducto}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors hover:border-red-500 hover:text-red-500"
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

        <div className="border-t border-zinc-800 bg-black p-5">
          {carrito.length > 0 && (
            <>
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
                  Total de prendas
                </span>

                <span className="text-2xl font-black text-white">
                  {totalArticulos}
                </span>
              </div>

              <button
                type="button"
                onClick={vaciarCarrito}
                className="mb-4 w-full text-center text-xs font-black uppercase tracking-wider text-zinc-500 transition-colors hover:text-red-500"
              >
                Vaciar carrito
              </button>
            </>
          )}

          <button
            type="button"
            onClick={finalizarPorWhatsApp}
            disabled={carrito.length === 0}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 px-5 py-4 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
          >
            <MessageCircle size={20} />
            Pedir por WhatsApp
          </button>
        </div>
      </aside>
    </div>
  );
}