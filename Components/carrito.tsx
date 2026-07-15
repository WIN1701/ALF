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

import { useCart } from "@/app/context/cartcontext";

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

  /*
    Bloquea el movimiento de la página
    cuando el carrito está abierto.
  */
  useEffect(() => {
    if (carritoAbierto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const cerrarConEscape = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        cerrarCarrito();
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
  }, [carritoAbierto, cerrarCarrito]);

  /*
    Envía por WhatsApp:
    - Número de camisa
    - Talla
    - Cantidad
    - Enlace de la imagen
    - Total de productos
  */
  const enviarPedidoWhatsApp = () => {
    if (carrito.length === 0) {
      return;
    }

    /*
      Número configurado:
      +503 6019-7818

      Para WhatsApp debe ir:
      - Sin signo +
      - Sin espacios
      - Sin guiones
    */
    const numeroWhatsApp = "50360197818";

    const productosDelPedido = carrito
      .map((item, indice) => {
        const enlaceImagen = `${window.location.origin}${item.imagen}`;

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
      "Hola, quiero realizar el siguiente pedido en *AlfStore*:",
      "",
      productosDelPedido,
      "",
      `*Total de productos: ${cantidadTotal}*`,
      "",
      "¿Me pueden confirmar disponibilidad, precio y forma de entrega?",
    ].join("\n");

    const enlaceWhatsApp =
      `https://wa.me/${numeroWhatsApp}` +
      `?text=${encodeURIComponent(mensaje)}`;

    window.open(
      enlaceWhatsApp,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (!carritoAbierto) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[10000]
        bg-black/75
        backdrop-blur-sm
      "
      onClick={cerrarCarrito}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className="
          absolute
          right-0
          top-0
          flex
          h-full
          w-full
          max-w-md
          flex-col
          border-l
          border-white/10
          bg-[#080808]
          text-white
          shadow-2xl
        "
        onClick={(evento) => {
          evento.stopPropagation();
        }}
      >
        {/* ENCABEZADO DEL CARRITO */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            px-5
            py-5
          "
        >
          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.25em]
                text-red-600
              "
            >
              AlfStore
            </p>

            <h2
              className="
                mt-1
                flex
                items-center
                gap-2
                text-xl
                font-black
                uppercase
              "
            >
              <ShoppingBag size={22} />

              Tu carrito
            </h2>
          </div>

          <button
            type="button"
            onClick={cerrarCarrito}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-black
              text-white
              transition
              hover:border-red-500
              hover:bg-red-700
            "
            aria-label="Cerrar carrito"
          >
            <X size={23} />
          </button>
        </div>

        {/* CONTENIDO DEL CARRITO */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          {carrito.length === 0 ? (
            <div
              className="
                flex
                h-full
                min-h-72
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-zinc-950
                  text-zinc-500
                "
              >
                <ShoppingBag size={34} />
              </div>

              <h3
                className="
                  mt-5
                  text-lg
                  font-black
                  uppercase
                "
              >
                Tu carrito está vacío
              </h3>

              <p
                className="
                  mt-2
                  max-w-xs
                  text-sm
                  leading-6
                  text-zinc-500
                "
              >
                Selecciona una talla y presiona
                Agregar al carrito.
              </p>

              <button
                type="button"
                onClick={cerrarCarrito}
                className="
                  mt-6
                  rounded-lg
                  bg-red-700
                  px-6
                  py-3
                  text-xs
                  font-black
                  uppercase
                  tracking-wider
                  text-white
                  transition
                  hover:bg-red-600
                "
              >
                Ver colección
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {carrito.map((item) => (
                <article
                  key={`${item.id}-${item.talla}`}
                  className="
                    flex
                    gap-4
                    rounded-xl
                    border
                    border-white/10
                    bg-zinc-950
                    p-3
                  "
                >
                  {/* IMAGEN DEL PRODUCTO */}
                  <div
                    className="
                      relative
                      h-28
                      w-24
                      shrink-0
                      overflow-hidden
                      rounded-lg
                      bg-black
                    "
                  >
                    <Image
                      src={item.imagen}
                      alt={`Camisa AlfStore ${item.id}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  {/* INFORMACIÓN DEL PRODUCTO */}
                  <div
                    className="
                      flex
                      min-w-0
                      flex-1
                      flex-col
                      justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-sm
                          font-black
                          uppercase
                        "
                      >
                        Camisa #{item.id}
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          uppercase
                          tracking-wider
                          text-zinc-400
                        "
                      >
                        Talla:{" "}
                        <span
                          className="
                            font-bold
                            text-red-500
                          "
                        >
                          {item.talla}
                        </span>
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-2
                      "
                    >
                      {/* CONTROLES DE CANTIDAD */}
                      <div
                        className="
                          flex
                          items-center
                          overflow-hidden
                          rounded-lg
                          border
                          border-white/15
                        "
                      >
                        <button
                          type="button"
                          onClick={() =>
                            disminuirCantidad(
                              item.id,
                              item.talla
                            )
                          }
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            text-zinc-300
                            transition
                            hover:bg-white/10
                            hover:text-white
                          "
                          aria-label="Disminuir cantidad"
                        >
                          <Minus size={16} />
                        </button>

                        <span
                          className="
                            flex
                            h-9
                            min-w-9
                            items-center
                            justify-center
                            border-x
                            border-white/15
                            px-2
                            text-sm
                            font-bold
                          "
                        >
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
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            text-zinc-300
                            transition
                            hover:bg-white/10
                            hover:text-white
                          "
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* ELIMINAR PRODUCTO */}
                      <button
                        type="button"
                        onClick={() =>
                          eliminarDelCarrito(
                            item.id,
                            item.talla
                          )
                        }
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-red-900/50
                          bg-red-950/30
                          text-red-500
                          transition
                          hover:bg-red-700
                          hover:text-white
                        "
                        aria-label="Eliminar producto"
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

        {/* PARTE INFERIOR DEL CARRITO */}
        {carrito.length > 0 && (
          <div
            className="
              border-t
              border-white/10
              bg-black
              px-5
              py-5
            "
          >
            <div
              className="
                mb-4
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-sm
                  uppercase
                  tracking-wider
                  text-zinc-400
                "
              >
                Total de productos
              </span>

              <span
                className="
                  text-xl
                  font-black
                  text-white
                "
              >
                {cantidadTotal}
              </span>
            </div>

            {/* ENVIAR POR WHATSAPP */}
            <button
              type="button"
              onClick={enviarPedidoWhatsApp}
              className="
                flex
                min-h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-green-600
                px-4
                text-center
                text-xs
                font-black
                uppercase
                tracking-wider
                text-white
                transition
                hover:bg-green-500
                active:scale-[0.98]
              "
            >
              <MessageCircle size={19} />

              Enviar pedido por WhatsApp
            </button>

            {/* VACIAR CARRITO */}
            <button
              type="button"
              onClick={vaciarCarrito}
              className="
                mt-3
                flex
                min-h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-white/15
                bg-zinc-950
                px-4
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-zinc-300
                transition
                hover:border-red-700
                hover:text-white
              "
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