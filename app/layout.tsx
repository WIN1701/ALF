import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CartProvider } from "@/app/context/cartcontext";
import "./globals.css";

export const metadata: Metadata = {
  title: "AlfStore | Streetwear",
  description:
    "AlfStore: streetwear salvadoreño. Del caos nace el carácter.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}