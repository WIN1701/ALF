"use client";

import { useState } from "react";

import {
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";

import { useCart } from "@/app/context/cartcontext";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] =
    useState(false);

  const {
    cantidadTotal,
    abrirCarrito,
  } = useCart();

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <header
      className="
        fixed
        left-0
        top-0
        z-[1000]
        w-full
        border-b
        border-white/10
        bg-black/90
        text-white
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <a
          href="#inicio"
          onClick={cerrarMenu}
          className="
            text-2xl
            font-black
            tracking-tight
            text-white
          "
        >
          Alf
          <span className="text-red-600">
            Store
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#inicio"
            className="text-xs font-bold uppercase tracking-wider text-zinc-300 transition hover:text-red-500"
          >
            Inicio
          </a>

          <a
            href="#historia"
            className="text-xs font-bold uppercase tracking-wider text-zinc-300 transition hover:text-red-500"
          >
            Historia
          </a>

          <a
            href="#catalogo"
            className="text-xs font-bold uppercase tracking-wider text-zinc-300 transition hover:text-red-500"
          >
            Colección
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={abrirCarrito}
            className="
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-zinc-950
              text-white
              transition
              hover:border-red-600
              hover:bg-red-700
            "
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={22} />

            {cantidadTotal > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-600
                  px-1
                  text-[10px]
                  font-black
                  text-white
                "
              >
                {cantidadTotal > 99
                  ? "99+"
                  : cantidadTotal}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              setMenuAbierto(
                (estadoActual) =>
                  !estadoActual
              )
            }
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-zinc-950
              text-white
              md:hidden
            "
            aria-label="Abrir menú"
          >
            {menuAbierto ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>
      </div>

      {menuAbierto && (
        <nav
          className="
            border-t
            border-white/10
            bg-black
            px-5
            py-5
            md:hidden
          "
        >
          <div className="flex flex-col gap-2">
            <a
              href="#inicio"
              onClick={cerrarMenu}
              className="rounded-lg px-4 py-3 text-sm font-bold uppercase text-zinc-300 hover:bg-zinc-900"
            >
              Inicio
            </a>

            <a
              href="#historia"
              onClick={cerrarMenu}
              className="rounded-lg px-4 py-3 text-sm font-bold uppercase text-zinc-300 hover:bg-zinc-900"
            >
              Historia
            </a>

            <a
              href="#catalogo"
              onClick={cerrarMenu}
              className="rounded-lg px-4 py-3 text-sm font-bold uppercase text-zinc-300 hover:bg-zinc-900"
            >
              Colección
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}