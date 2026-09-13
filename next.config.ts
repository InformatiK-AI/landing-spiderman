import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // No hay imágenes rasterizadas en el proyecto: todo el arte es CSS/SVG.
  // Desactivar el optimizador mantiene el build compatible con export estático.
  images: { unoptimized: true },
};

export default nextConfig;
