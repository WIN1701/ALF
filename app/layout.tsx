"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Talla = "S" | "M" | "L" | "XL";

export interface ProductoParaCarrito {
  id: number;
  imagen: string;
}

export interface ProductoCarrito {
  id: number;
  imagen: string;
  talla: Talla;
  cantidad: number;
}

interface CartContextType {
  carrito: ProductoCarrito[];
  carritoAbierto: boolean;
  cantidadTotal: number;

  agregarAlCarrito: (
    producto: ProductoParaCarrito,
    talla: Talla
  ) => void;

  eliminarDelCarrito: (
    productoId: number,
    talla: Talla
  ) => void;

  aumentarCantidad: (
    productoId: number,
    talla: Talla
  ) => void;

  disminuirCantidad: (
    productoId: number,
    talla: Talla
  ) => void;

  abrirCarrito: () => void;
  cerrarCarrito: () => void;
  vaciarCarrito: () => void;
}

const CartContext = createContext<
  CartContextType | undefined
>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [carrito, setCarrito] = useState<
    ProductoCarrito[]
  >([]);

  const [carritoAbierto, setCarritoAbierto] =
    useState(false);

  const agregarAlCarrito = useCallback(
    (
      producto: ProductoParaCarrito,
      talla: Talla
    ) => {
      setCarrito((carritoAnterior) => {
        const productoExistente =
          carritoAnterior.find(
            (item) =>
              item.id === producto.id &&
              item.talla === talla
          );

        if (productoExistente) {
          return carritoAnterior.map((item) =>
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
          ...carritoAnterior,
          {
            id: producto.id,
            imagen: producto.imagen,
            talla,
            cantidad: 1,
          },
        ];
      });
    },
    []
  );

  const eliminarDelCarrito = useCallback(
    (productoId: number, talla: Talla) => {
      setCarrito((carritoAnterior) =>
        carritoAnterior.filter(
          (item) =>
            !(
              item.id === productoId &&
              item.talla === talla
            )
        )
      );
    },
    []
  );

  const aumentarCantidad = useCallback(
    (productoId: number, talla: Talla) => {
      setCarrito((carritoAnterior) =>
        carritoAnterior.map((item) =>
          item.id === productoId &&
          item.talla === talla
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        )
      );
    },
    []
  );

  const disminuirCantidad = useCallback(
    (productoId: number, talla: Talla) => {
      setCarrito((carritoAnterior) =>
        carritoAnterior
          .map((item) =>
            item.id === productoId &&
            item.talla === talla
              ? {
                  ...item,
                  cantidad: item.cantidad - 1,
                }
              : item
          )
          .filter((item) => item.cantidad > 0)
      );
    },
    []
  );

  const abrirCarrito = useCallback(() => {
    setCarritoAbierto(true);
  }, []);

  const cerrarCarrito = useCallback(() => {
    setCarritoAbierto(false);
  }, []);

  const vaciarCarrito = useCallback(() => {
    setCarrito([]);
  }, []);

  const cantidadTotal = useMemo(() => {
    return carrito.reduce(
      (total, item) => total + item.cantidad,
      0
    );
  }, [carrito]);

  const valorContexto = useMemo<CartContextType>(
    () => ({
      carrito,
      carritoAbierto,
      cantidadTotal,
      agregarAlCarrito,
      eliminarDelCarrito,
      aumentarCantidad,
      disminuirCantidad,
      abrirCarrito,
      cerrarCarrito,
      vaciarCarrito,
    }),
    [
      carrito,
      carritoAbierto,
      cantidadTotal,
      agregarAlCarrito,
      eliminarDelCarrito,
      aumentarCantidad,
      disminuirCantidad,
      abrirCarrito,
      cerrarCarrito,
      vaciarCarrito,
    ]
  );

  return (
    <CartContext.Provider value={valorContexto}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const contexto = useContext(CartContext);

  if (!contexto) {
    throw new Error(
      "useCart debe utilizarse dentro de CartProvider"
    );
  }

  return contexto;
}