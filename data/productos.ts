export interface Producto {
  id: number;
  imagen: string;
}

export const productos: Producto[] = Array.from(
  { length: 170 },
  (_, indice): Producto => {
    const id = indice + 1;
    const numero = id.toString().padStart(3, "0");
    const extension = id <= 4 ? "webp" : "jpg";

    return {
      id: id,
      imagen: `/productos/camisa${numero}.${extension}`,
    };
  }
);