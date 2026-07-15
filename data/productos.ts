export interface Producto {
  id: number;
  imagen: string;
}

export const productos: Producto[] =
  Array.from(
    { length: 120 },
    (_, posicion) => {
      const id = posicion + 1;

      const numero = String(id).padStart(
        3,
        "0"
      );

      return {
        id,
        imagen: `/productos/camisa${numero}.webp`,
      };
    }
  );