import type {
  Metadata,
  Viewport,
} from "next";

import "./globals.css";

import { CartProvider } from "@/app/context/cartcontext";

export const metadata: Metadata = {
  title:
    "AlfStore | Streetwear Oversize",
  description:
    "AlfStore: diseños streetwear oversize. Del caos nace el carácter. No hacemos ropa, creamos identidad.",
  applicationName: "AlfStore",
  icons: {
    icon: "/logo.png.jpeg",
    shortcut: "/logo.png.jpeg",
    apple: "/logo.png.jpeg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}