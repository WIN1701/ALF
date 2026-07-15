"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Producto } from "@/data/productos";

export type Talla = "S" | "M" | "L" | "XL";

export interface ProductoCarrito extends Producto {
  talla: Talla;
  cantidad: number;
}

interface CartContextType {
  carrito: ProductoCarrito[];
  totalArticulos: number;
  agregarAlCarrito: (
    producto: Producto,
    talla: Talla
  ) => void;
  eliminarDelCarrito: (
    id: number,
    talla: Talla
  ) => void;
  aumentarCantidad: (
    id: number,
    talla: Talla
  ) => void;
  disminuirCantidad: (
    id: number,
    talla: Talla
  ) => void;
  vaciarCarrito: () => void;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [carrito, setCarrito] = useState<
    ProductoCarrito[]
  >([]);

  const agregarAlCarrito = (
    producto: Producto,
    talla: Talla
  ) => {
    setCarrito((carritoActual) => {
      const productoExistente =
        carritoActual.find(
          (item) =>
            item.id === producto.id &&
            item.talla === talla
        );

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id &&
          item.talla === talla
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        );
      }

      return [
        ...carritoActual,
        {
          ...producto,
          talla,
          cantidad: 1,
        },
      ];
    });
  };

  const eliminarDelCarrito = (
    id: number,
    talla: Talla
  ) => {
    setCarrito((carritoActual) =>
      carritoActual.filter(
        (item) =>
          !(
            item.id === id &&
            item.talla === talla
          )
      )
    );
  };

  const aumentarCantidad = (
    id: number,
    talla: Talla
  ) => {
    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.id === id &&
        item.talla === talla
          ? {
              ...item,
              cantidad: item.cantidad + 1,
            }
          : item
      )
    );
  };

  const disminuirCantidad = (
    id: number,
    talla: Talla
  ) => {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) =>
          item.id === id &&
          item.talla === talla
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalArticulos = carrito.reduce(
    (total, item) =>
      total + item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        totalArticulos,
        agregarAlCarrito,
        eliminarDelCarrito,
        aumentarCantidad,
        disminuirCantidad,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const contexto = useContext(CartContext);

  if (!contexto) {
    throw new Error(
      "useCart debe utilizarse dentro de CartProvider"
    );
  }

  return contexto;
}