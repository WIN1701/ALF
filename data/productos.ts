export interface Producto {
  id: number;
  imagen: string;
}

export const productos: Producto[] = Array.from(
  { length: 120 },
  (_, indice): Producto => {
    const id = indice + 1;
    const numero = String(id).padStart(3, "0");
    const extension =
      id <= 4 ? "webp" : "jpg";

    return {
      id,
      imagen: `/productos/camisa${numero}.${extension}`,
    };
  }
);