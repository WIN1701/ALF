import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import { CartProvider } from "@/app/context/cartcontext";
import Carrito from "@/Components/carrito";

export const metadata: Metadata = {
  title: "AlfStore",
  description:
    "AlfStore Streetwear. Del caos nace el carácter.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          {children}
          <Carrito />
        </CartProvider>
      </body>
    </html>
  );
}