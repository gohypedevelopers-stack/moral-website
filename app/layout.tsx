import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "MORAL — Wear Your Values",
  description: "Luxury fashion homepage for MORAL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}