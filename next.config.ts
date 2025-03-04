import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "es", "fr", "de", "ja"], // Idiomas disponibles
    defaultLocale: "en", // Idioma por defecto
  },
};

export default nextConfig;
