"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";

import Carrito from "@/Components/carrito";
import { useCart } from "@/app/context/cartcontext";

const enlaces = [
  {
    nombre: "Inicio",
    href: "#inicio",
  },
  {
    nombre: "Historia",
    href: "#historia",
  },
  {
    nombre: "Catálogo",
    href: "#catalogo",
  },
  {
    nombre: "Beneficios",
    href: "#beneficios",
  },
  {
    nombre: "Contacto",
    href: "#contacto",
  },
];

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] =
    useState(false);

  const [carritoAbierto, setCarritoAbierto] =
    useState(false);

  const { totalArticulos } = useCart();

  /*
   * Cierra el menú móvil cuando la pantalla
   * cambia al tamaño de computadora.
   */
  useEffect(() => {
    const revisarPantalla = () => {
      if (window.innerWidth >= 1024) {
        setMenuAbierto(false);
      }
    };

    window.addEventListener(
      "resize",
      revisarPantalla
    );

    return () => {
      window.removeEventListener(
        "resize",
        revisarPantalla
      );
    };
  }, []);

  /*
   * Evita que la página se mueva cuando
   * el menú móvil está abierto.
   */
  useEffect(() => {
    if (!menuAbierto) {
      return;
    }

    const overflowAnterior =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        overflowAnterior;
    };
  }, [menuAbierto]);

  return (
    <>
      <header className="sticky top-0 z-[100] w-full border-b border-red-950 bg-black">
        {/* Línea roja superior */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />

        <div className="relative mx-auto flex min-h-[92px] w-full max-w-[1700px] items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Luz urbana detrás del logo */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-72 bg-gradient-to-r from-red-950/30 to-transparent" />

          {/* LOGO */}
          <a
            href="#inicio"
            aria-label="Ir al inicio de AlfStore"
            className="relative z-10 flex min-h-[65px] items-center"
            onClick={() =>
              setMenuAbierto(false)
            }
          >
            <Image
              src="/logo.png.jpeg"
              alt="Logo oficial de AlfStore"
              width={250}
              height={100}
              priority
              className="h-auto w-[155px] object-contain drop-shadow-[0_0_16px_rgba(220,38,38,0.35)] sm:w-[190px] lg:w-[220px]"
            />
          </a>

          {/* MENÚ DE COMPUTADORA */}
          <nav
            className="relative z-10 hidden items-center gap-8 lg:flex"
            aria-label="Navegación principal"
          >
            {enlaces.map((enlace) => (
              <a
                key={enlace.nombre}
                href={enlace.href}
                className="group relative py-4 text-xs font-black uppercase tracking-[0.18em] text-zinc-200 transition-colors duration-200 hover:text-white"
              >
                {enlace.nombre}

                <span className="absolute bottom-2 left-0 h-[2px] w-0 bg-red-600 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* BOTONES DERECHOS */}
          <div className="relative z-10 flex items-center gap-3">
            {/* CARRITO */}
            <button
              type="button"
              onClick={() =>
                setCarritoAbierto(true)
              }
              aria-label={`Abrir carrito. ${totalArticulos} productos`}
              className="relative flex h-14 w-14 items-center justify-center rounded-full border border-zinc-700 bg-[#080808] text-white transition-colors duration-200 hover:border-red-500 hover:bg-red-950/30 hover:text-red-500 sm:h-16 sm:w-16"
            >
              <ShoppingBag
                size={27}
                strokeWidth={2}
              />

              {totalArticulos > 0 && (
                <span className="absolute -right-1 -top-1 flex min-h-6 min-w-6 items-center justify-center rounded-full border-2 border-black bg-red-600 px-1 text-[10px] font-black text-white">
                  {totalArticulos > 99
                    ? "99+"
                    : totalArticulos}
                </span>
              )}
            </button>

            {/* BOTÓN MENÚ MÓVIL */}
            <button
              type="button"
              onClick={() =>
                setMenuAbierto(
                  (estadoActual) =>
                    !estadoActual
                )
              }
              aria-expanded={menuAbierto}
              aria-controls="menu-movil"
              aria-label={
                menuAbierto
                  ? "Cerrar menú"
                  : "Abrir menú"
              }
              className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-700 bg-[#080808] text-white transition-colors duration-200 hover:border-red-500 hover:bg-red-950/30 hover:text-red-500 sm:h-16 sm:w-16 lg:hidden"
            >
              {menuAbierto ? (
                <X
                  size={30}
                  strokeWidth={2}
                />
              ) : (
                <Menu
                  size={32}
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
        </div>

        {/* MENÚ PARA CELULARES */}
        {menuAbierto && (
          <div
            id="menu-movil"
            className="fixed inset-x-0 bottom-0 top-[94px] z-[110] bg-black lg:hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black" />

            {/* Marca de agua */}
            <div className="pointer-events-none absolute bottom-8 right-[-45px] select-none text-[110px] font-black uppercase leading-none tracking-[-0.1em] text-white/[0.025]">
              ALF
            </div>

            <nav
              className="relative z-10 flex h-full flex-col px-5 pb-8 pt-7"
              aria-label="Menú móvil"
            >
              <p className="mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-red-500">
                Navegación AlfStore
              </p>

              <div className="space-y-2">
                {enlaces.map(
                  (enlace, posicion) => (
                    <a
                      key={enlace.nombre}
                      href={enlace.href}
                      onClick={() =>
                        setMenuAbierto(false)
                      }
                      className="group flex items-center justify-between rounded-2xl border border-zinc-900 bg-[#070707] px-5 py-5 transition-colors duration-200 hover:border-red-900 hover:bg-red-950/20"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-red-600">
                          0{posicion + 1}
                        </span>

                        <span className="text-lg font-black uppercase tracking-[0.1em] text-white">
                          {enlace.nombre}
                        </span>
                      </div>

                      <span className="text-xl font-black text-zinc-700 transition-colors group-hover:text-red-500">
                        →
                      </span>
                    </a>
                  )
                )}
              </div>

              <div className="mt-auto border-t border-zinc-900 pt-6">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-white">
                  No hacemos ropa.
                </p>

                <p className="mt-2 text-xs font-black uppercase tracking-[0.24em] text-red-500">
                  Creamos identidad.
                </p>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* CARRITO LATERAL */}
      <Carrito
        abierto={carritoAbierto}
        cerrar={() =>
          setCarritoAbierto(false)
        }
      />
    </>
  );
}