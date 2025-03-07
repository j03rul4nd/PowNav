"use client";

import { Mountain } from "lucide-react";

type Route = {
  name: string;
  level: string;
  length: string;
  cover: string;
};

const routes: Route[] = [
  {
    name: "Niseko Gate A",
    level: "Intermedio",
    length: "2.4 km",
    cover: "https://res.cloudinary.com/dumlcvjok/image/upload/v1741199310/bkymqhd4dwv5qtdcujvm.jpg",
  },
  {
    name: "Whistler Backcountry",
    level: "Avanzado",
    length: "3.8 km",
    cover: "https://res.cloudinary.com/dumlcvjok/image/upload/v1741199309/isrtrygzjr0z9aam6pgb.jpg",
  },
  {
    name: "Annupuri Secret",
    level: "Principiante",
    length: "1.6 km",
    cover: "https://res.cloudinary.com/dumlcvjok/image/upload/v1741199309/aruyoxyvwrzfhgs49bcv.jpg",
  },
];

export default function CommunitySection() {
  return (
    <section id="community" className="mb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-2xl rounded-3xl p-10 border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            Únete a la comunidad PowNav
          </h3>
          <p className="text-white/80 max-w-3xl mx-auto text-lg leading-relaxed">
            Más de 5,000 freeriders comparten sus mejores rutas y experiencias. La seguridad en la montaña es un esfuerzo colectivo.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route, index) => (
            <RouteCard key={index} route={route} />
          ))}
        </div>
      </div>
    </section>
  );
}

type RouteCardProps = {
  route: Route;
};

function RouteCard({ route }: RouteCardProps) {
  return (
    <div className="group relative bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105">
      {/* Image Container with Skeleton Loading */}
      <div className="h-52 relative flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
        
        <img
          src={route.cover}
          alt={route.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:scale-110"
          onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col items-start">
        <h5 className="text-lg font-semibold text-white mb-2 tracking-wide">
          {route.name}
        </h5>
        <div className="flex justify-between w-full">
          <span className="bg-white/10 px-3 py-1 rounded-lg text-white/80 text-sm font-medium">
            {route.level}
          </span>
          <span className="bg-white/10 px-3 py-1 rounded-lg text-white/80 text-sm font-medium">
            {route.length}
          </span>
        </div>
      </div>

      {/* Interactive Overlay */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
        <p className="text-white text-sm opacity-80 leading-relaxed">
          Explora esta ruta y comparte tus experiencias con la comunidad.
        </p>
      </div>
    </div>
  );
}
