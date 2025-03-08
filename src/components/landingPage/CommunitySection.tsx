"use client";

import { MapPin, Navigation, Flag, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

type Route = {
  name: string;
  level: string;
  length: string;
  cover: string;
  description: string;
};

const routes: Route[] = [
  {
    name: "Niseko Gate A",
    level: "Intermedio",
    length: "2.4 km",
    cover: "https://res.cloudinary.com/dumlcvjok/image/upload/v1741199310/bkymqhd4dwv5qtdcujvm.jpg",
    description: "Atraviesa un bosque nevado con descensos suaves y vistas espectaculares de Niseko."
  },
  {
    name: "Whistler Backcountry",
    level: "Avanzado",
    length: "3.8 km",
    cover: "https://res.cloudinary.com/dumlcvjok/image/upload/v1741199309/isrtrygzjr0z9aam6pgb.jpg",
    description: "Una ruta desafiante entre montañas y pendientes pronunciadas, ideal para los más experimentados."
  },
  {
    name: "Annupuri Secret",
    level: "Principiante",
    length: "1.6 km",
    cover: "https://res.cloudinary.com/dumlcvjok/image/upload/v1741199309/aruyoxyvwrzfhgs49bcv.jpg",
    description: "Explora una travesía tranquila con paisajes mágicos y una ruta accesible para todos."
  },
];

export default function CommunitySection() {
  return (
    <section id="community" className="mb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-2xl rounded-3xl p-10 border border-white/10 shadow-lg transition-all duration-300">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            Únete a la comunidad PowNav
          </h3>
          <p className="text-white/80 max-w-3xl mx-auto text-lg leading-relaxed">
            Más de 5,000 freeriders comparten sus mejores rutas y experiencias. La seguridad en la montaña es un esfuerzo colectivo.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route, index) => (
            <RouteCard key={index} route={route} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

type RouteCardProps = {
  route: Route;
  index: number;
};

function RouteCard({ route, index }: RouteCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getLevelColor = (level: string) => {
    switch(level) {
      case "Principiante": return "bg-emerald-500/80";
      case "Intermedio": return "bg-amber-500/80";
      case "Avanzado": return "bg-rose-500/80";
      default: return "bg-blue-500/80";
    }
  };

  const animationDelay = `${index * 100}ms`;
  
  return (
    <div 
      ref={cardRef}
      className="group relative overflow-hidden rounded-3xl transition-all duration-500 ease-out"
      style={{ animationDelay }}
    >
      <div className="relative h-full bg-white/8 backdrop-blur-xl rounded-3xl border border-white/20 shadow-lg overflow-hidden transition-all duration-300 group-hover:border-white/30 group-hover:shadow-xl">
        <div className="h-56 sm:h-64 relative overflow-hidden">
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 to-gray-700/80 animate-pulse" />
          )}
          <img
            src={route.cover}
            alt={route.name}
            loading="lazy"
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              "group-hover:scale-105",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className={cn(
            "absolute top-4 left-4 px-3 py-1.5 rounded-full text-white text-sm font-medium",
            "flex items-center gap-1.5 backdrop-blur-md",
            getLevelColor(route.level)
          )}>
            <Flag className="w-3.5 h-3.5" />
            {route.length}
          </div>
        </div>
        <div className="p-6 flex flex-col">
          <h5 className="text-xl font-bold text-white mb-3">
            {route.name}
          </h5>
          <div className="flex items-center gap-2 mb-4">
            <span className={cn(
              "px-3 py-1 rounded-full text-white text-sm font-medium",
              getLevelColor(route.level)
            )}>
              {route.level}
            </span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            {route.description}
          </p>
          <div className="mt-auto">
            <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group-hover:bg-white/20">
              <span>Ver detalles</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
