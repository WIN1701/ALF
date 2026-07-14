"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/app/context/cartcontext";
import Carrito from "@/Components/carrito";

export default function Navbar() {
  const { carrito } = useCart();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const totalArticulos = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const abrirCarrito = () => {
    setMenuAbierto(false);
    setCarritoAbierto(true);
  };

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-zinc-800/80 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          {/* Logo gótico */}

          <Link
            href="/"
            onClick={cerrarMenu}
            className="alfstore-logo text-4xl sm:text-5xl"
            aria-label="Ir al inicio de AlfStore"
          >
            AlfStore
          </Link>

          {/* Menú para computadora */}

          <nav className="hidden items-center gap-7 text-xs font-black uppercase tracking-[0.18em] text-zinc-200 md:flex">
            <a
              href="#inicio"
              className="transition-colors hover:text-red-500"
            >
              Inicio
            </a>

            <a
              href="#catalogo"
              className="transition-colors hover:text-red-500"
            >
              Colección
            </a>

            <a
              href="#historia"
              className="transition-colors hover:text-red-500"
            >
              Historia
            </a>

            <a
              href="#filosofia"
              className="transition-colors hover:text-red-500"
            >
              Filosofía
            </a>

            <a
              href="#contacto"
              className="transition-colors hover:text-red-500"
            >
              Contacto
            </a>
          </nav>

          {/* Carrito y menú móvil */}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={abrirCarrito}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-white transition-colors hover:border-red-600 hover:text-red-500"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={21} />

              {totalArticulos > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white">
                  {totalArticulos > 99 ? "99+" : totalArticulos}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                setMenuAbierto((estadoActual) => !estadoActual)
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-white transition-colors hover:border-red-600 hover:text-red-500 md:hidden"
              aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuAbierto}
            >
              {menuAbierto ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú para celular */}

        {menuAbierto && (
          <nav className="border-t border-zinc-800 bg-black px-5 py-3 text-sm font-black uppercase tracking-wider text-zinc-300 md:hidden">
            <a
              href="#inicio"
              onClick={cerrarMenu}
              className="block border-b border-zinc-900 py-4 transition-colors hover:text-red-500"
            >
              Inicio
            </a>

            <a
              href="#catalogo"
              onClick={cerrarMenu}
              className="block border-b border-zinc-900 py-4 transition-colors hover:text-red-500"
            >
              Colección
            </a>

            <a
              href="#historia"
              onClick={cerrarMenu}
              className="block border-b border-zinc-900 py-4 transition-colors hover:text-red-500"
            >
              Historia
            </a>

            <a
              href="#filosofia"
              onClick={cerrarMenu}
              className="block border-b border-zinc-900 py-4 transition-colors hover:text-red-500"
            >
              Filosofía
            </a>

            <a
              href="#contacto"
              onClick={cerrarMenu}
              className="block py-4 transition-colors hover:text-red-500"
            >
              Contacto
            </a>
          </nav>
        )}
      </header>

      <Carrito
        abierto={carritoAbierto}
        cerrar={() => setCarritoAbierto(false)}
      />
    </>
  );
}