import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spider-Man: la era Tom Holland",
  description:
    "El arco completo del Spider-Man de Tom Holland, con sus tráilers oficiales.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL">
      <body className="bg-smoke-ink text-white antialiased">{children}</body>
    </html>
  );
}
