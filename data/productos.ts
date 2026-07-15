export interface Producto {
  id: number;
  imagen: string;
}

export const productos: Producto[] = Array.from(
  { length: 120 },
  (_, indice) => {
    const numero = String(indice + 1).padStart(
      3,
      "0"
    );

    return {
      id: indice + 1,
      imagen: `/productos/camisa${numero}.webp`,
    };
  }
);