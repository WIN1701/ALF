"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  id: number;
  imagen: string;
  talla: string;
  cantidad: number;
}

interface CartContextType {
  carrito: CartItem[];
  agregarAlCarrito: (producto: CartItem) => void;
  eliminarDelCarrito: (id: number, talla: string) => void;
  aumentarCantidad: (id: number, talla: string) => void;
  disminuirCantidad: (id: number, talla: string) => void;
  vaciarCarrito: () => void;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

const CLAVE_CARRITO = "alfstore-carrito";

export function CartProvider({
  children,
}: CartProviderProps) {
  const [carrito, setCarrito] = useState<CartItem[]>([]);
  const [carritoCargado, setCarritoCargado] = useState(false);

  /*
   * Recupera el carrito guardado al abrir la página.
   */

  useEffect(() => {
    try {
      const carritoGuardado =
        window.localStorage.getItem(CLAVE_CARRITO);

      if (carritoGuardado) {
        const productosGuardados =
          JSON.parse(carritoGuardado) as CartItem[];

        if (Array.isArray(productosGuardados)) {
          setCarrito(productosGuardados);
        }
      }
    } catch (error) {
      console.error(
        "No se pudo recuperar el carrito:",
        error
      );
    } finally {
      setCarritoCargado(true);
    }
  }, []);

  /*
   * Guarda automáticamente el carrito cuando cambia.
   */

  useEffect(() => {
    if (!carritoCargado) {
      return;
    }

    try {
      window.localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
      );
    } catch (error) {
      console.error(
        "No se pudo guardar el carrito:",
        error
      );
    }
  }, [carrito, carritoCargado]);

  const agregarAlCarrito = (
    nuevoProducto: CartItem
  ) => {
    setCarrito((carritoActual) => {
      const productoExistente =
        carritoActual.find(
          (producto) =>
            producto.id === nuevoProducto.id &&
            producto.talla === nuevoProducto.talla
        );

      if (productoExistente) {
        return carritoActual.map((producto) =>
          producto.id === nuevoProducto.id &&
          producto.talla === nuevoProducto.talla
            ? {
                ...producto,
                cantidad:
                  producto.cantidad +
                  nuevoProducto.cantidad,
              }
            : producto
        );
      }

      return [...carritoActual, nuevoProducto];
    });
  };

  const eliminarDelCarrito = (
    id: number,
    talla: string
  ) => {
    setCarrito((carritoActual) =>
      carritoActual.filter(
        (producto) =>
          !(
            producto.id === id &&
            producto.talla === talla
          )
      )
    );
  };

  const aumentarCantidad = (
    id: number,
    talla: string
  ) => {
    setCarrito((carritoActual) =>
      carritoActual.map((producto) =>
        producto.id === id &&
        producto.talla === talla
          ? {
              ...producto,
              cantidad: producto.cantidad + 1,
            }
          : producto
      )
    );
  };

  const disminuirCantidad = (
    id: number,
    talla: string
  ) => {
    setCarrito((carritoActual) =>
      carritoActual.reduce<CartItem[]>(
        (resultado, producto) => {
          const esProductoSeleccionado =
            producto.id === id &&
            producto.talla === talla;

          if (!esProductoSeleccionado) {
            resultado.push(producto);
            return resultado;
          }

          if (producto.cantidad > 1) {
            resultado.push({
              ...producto,
              cantidad: producto.cantidad - 1,
            });
          }

          return resultado;
        },
        []
      )
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
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
      "useCart debe utilizarse dentro de CartProvider."
    );
  }

  return contexto;
}