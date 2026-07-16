"use client";

import { useEffect } from "react";
import Image from "next/image";

import {
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

import { useCart } from "../app/context/cartcontext";

const NUMERO_WHATSAPP = "50360197818";

export default function Carrito() {
  const {
    carrito,
    carritoAbierto,
    cantidadTotal,
    cerrarCarrito,
    eliminarDelCarrito,
    aumentarCantidad,
    disminuirCantidad,
    vaciarCarrito,
  } = useCart();

  useEffect(() => {
    if (!carritoAbierto) {
      return;
    }

    const overflowAnterior =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        overflowAnterior;
    };
  }, [carritoAbierto]);

  const continuarComprando = () => {
    cerrarCarrito();

    window.setTimeout(() => {
      document
        .getElementById("catalogo")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 200);
  };

  const enviarPedido = () => {
    if (carrito.length === 0) {
      return;
    }

    const detalle = carrito
      .map((item, indice) => {
        const enlaceImagen =
          `${window.location.origin}${item.imagen}`;

        return [
          `*Producto ${indice + 1}*`,
          `Camisa: #${item.id}`,
          `Talla: ${item.talla}`,
          `Cantidad: ${item.cantidad}`,
          `Imagen: ${enlaceImagen}`,
        ].join("\n");
      })
      .join("\n\n");

    const mensaje = [
      "Hola, quiero realizar este pedido en *AlfStore*:",
      "",
      detalle,
      "",
      `*Total de productos: ${cantidadTotal}*`,
      "",
      "¿Me pueden confirmar disponibilidad y forma de entrega?",
    ].join("\n");

    const enlace =
      `https://wa.me/${NUMERO_WHATSAPP}` +
      `?text=${encodeURIComponent(mensaje)}`;

    window.open(
      enlace,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (!carritoAbierto) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/80"
      onClick={cerrarCarrito}
    >
      <aside
        role="dialog"
        aria-modal="true"
        className="
          absolute
          right-0
          top-0
          flex
          h-[100dvh]
          w-full
          max-w-md
          flex-col
          overflow-hidden
          border-l
          border-white/10
          bg-[#080808]
          text-white
        "
        onClick={(evento) =>
          evento.stopPropagation()
        }
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-black px-5 py-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">
              AlfStore
            </p>

            <h2 className="mt-1 flex items-center gap-2 text-xl font-black uppercase">
              <ShoppingBag size={22} />
              Tu carrito
            </h2>
          </div>

          <button
            type="button"
            onClick={cerrarCarrito}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-zinc-950"
          >
            <X size={22} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          {carrito.length === 0 ? (
            <div className="flex min-h-full flex-col items-center justify-center text-center">
              <ShoppingBag
                size={46}
                className="text-zinc-600"
              />

              <h3 className="mt-5 text-lg font-black uppercase">
                Tu carrito está vacío
              </h3>

              <button
                type="button"
                onClick={continuarComprando}
                className="mt-6 rounded-full bg-red-700 px-7 py-3 text-xs font-black uppercase"
              >
                Ver colección
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {carrito.map((item) => (
                <article
                  key={`${item.id}-${item.talla}`}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-zinc-950 p-3"
                >
                  <div className="flex h-28 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black">
                    <Image
                      src={item.imagen}
                      alt={`Camisa AlfStore ${item.id}`}
                      width={240}
                      height={300}
                      unoptimized
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-black uppercase">
                        Camisa #{item.id}
                      </p>

                      <p className="mt-1 text-xs uppercase text-zinc-400">
                        Talla:{" "}
                        <span className="text-red-500">
                          {item.talla}
                        </span>
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="flex overflow-hidden rounded-lg border border-white/15">
                        <button
                          type="button"
                          onClick={() =>
                            disminuirCantidad(
                              item.id,
                              item.talla
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="flex h-9 min-w-9 items-center justify-center border-x border-white/15">
                          {item.cantidad}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            aumentarCantidad(
                              item.id,
                              item.talla
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          eliminarDelCarrito(
                            item.id,
                            item.talla
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-950/40 text-red-500"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {carrito.length > 0 && (
          <div className="border-t border-white/10 bg-black px-5 pb-5 pt-5">
            <div className="mb-4 flex justify-between">
              <span className="text-xs font-bold uppercase text-zinc-400">
                Total de productos
              </span>

              <span className="text-xl font-black">
                {cantidadTotal}
              </span>
            </div>

            <button
              type="button"
              onClick={enviarPedido}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 text-xs font-black uppercase"
            >
              <MessageCircle size={19} />
              Enviar pedido por WhatsApp
            </button>

            <button
              type="button"
              onClick={vaciarCarrito}
              className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-zinc-950 text-xs font-bold uppercase"
            >
              <Trash2 size={17} />
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}