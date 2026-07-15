export interface Producto {
  id: number;
  imagen: string;
}

export const productos: Producto[] = Array.from(
  { length: 170 },
  (_, indice) => {
    const id = indice + 1;
    const numero = String(id).padStart(3, "0");

    // Las primeras 4 imágenes son WEBP.
    // Desde la número 5 hasta la 170 son JPG.
    const extension = id <= 4 ? "webp" : "jpg";

    return {
      id,
      imagen: `/productos/camisa${numero}.${extension}`,
    };
  }
);