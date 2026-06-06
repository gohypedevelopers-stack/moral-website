import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
