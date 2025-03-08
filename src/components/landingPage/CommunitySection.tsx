"use client";

import { MapPin, Navigation, Flag, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

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
    <section id="community" className="mb-24 px-6 md:px-12 py-16 ">
      <div className="max-w-6xl mx-auto backdrop-blur-xl rounded-3xl p-10 border border-indigo-500/10 shadow-2xl transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-slate-800/20 to-purple-900/30 opacity-60 z-0"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <span className="h-1 w-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full mr-4"></span>
              <h3 className="text-4xl font-extrabold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                Únete a la comunidad PowNav
              </h3>
              <span className="h-1 w-16 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full ml-4"></span>
            </div>
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
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getLevelColor = (level: string) => {
    switch(level) {
      case "Principiante": return "from-emerald-500 to-teal-400";
      case "Intermedio": return "from-amber-500 to-orange-400";
      case "Avanzado": return "from-rose-500 to-red-400";
      default: return "from-blue-500 to-indigo-400";
    }
  };

  const getLevelBg = (level: string) => {
    switch(level) {
      case "Principiante": return "bg-emerald-500/20 border-emerald-500/40";
      case "Intermedio": return "bg-amber-500/20 border-amber-500/40";
      case "Avanzado": return "bg-rose-500/20 border-rose-500/40";
      default: return "bg-blue-500/20 border-blue-500/40";
    }
  };

  const getLevelIcon = (level: string) => {
    switch(level) {
      case "Principiante": return "🌱";
      case "Intermedio": return "🏔️";
      case "Avanzado": return "⚡";
      default: return "❄️";
    }
  };

  const animationDelay = `${index * 150}ms`;
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "transform transition-all duration-700 ease-out",
        isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      )}
      style={{ transitionDelay: animationDelay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group h-full relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-102 hover:shadow-[0_15px_60px_-15px_rgba(107,70,193,0.5)]">
        {/* Card unified background with gradient overlay - eliminates the line between sections */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-slate-900/90 to-indigo-900/90 opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-10"></div>
        
        {/* Static background that shows by default */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/80 to-indigo-900/80 z-5"></div>
        
        {/* Glass effect layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-800/10 backdrop-blur-md z-0 border border-white/10 rounded-2xl"></div>
        
        {/* Animated glow border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt z-20"></div>
        
        {/* Card content */}
        <div className="relative z-30 h-full flex flex-col">
          {/* Image section */}
          <div className="h-60 sm:h-64 relative overflow-hidden">
            {!isLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800/80 to-indigo-900/80 animate-pulse" />
            )}
            <img
              src={route.cover}
              alt={route.name}
              loading="lazy"
              className={cn(
                "w-full h-full object-cover transition-all duration-700",
                "group-hover:scale-110 group-hover:filter group-hover:brightness-110",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsLoaded(true)}
            />
            
            {/* Image overlay gradient - seamless transition */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent"></div>
            
            {/* Route length badge */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-white text-sm font-medium flex items-center gap-1.5 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30">
              <Navigation className="w-3.5 h-3.5 text-indigo-300" />
              {route.length}
            </div>
            
            {/* Level badge */}
            <div className="absolute bottom-4 left-4">
              <div className={cn(
                "px-3 py-1.5 rounded-full text-white text-sm font-semibold flex items-center gap-2",
                "border backdrop-blur-md shadow-lg transition-all duration-300",
                getLevelBg(route.level),
                "group-hover:bg-opacity-30 group-hover:border-opacity-50"
              )}>
                <span>{getLevelIcon(route.level)}</span>
                {route.level}
              </div>
            </div>
          </div>
          
          {/* Content section - no separate background to avoid line */}
          <div className="p-6 flex flex-col flex-grow z-30 relative">
            <h5 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
              {route.name}
            </h5>
            
            <p className="text-white/80 text-sm leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
              {route.description}
            </p>
            
            <div className="mt-auto">
              <button className={cn(
                "w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-500 font-medium shadow-lg",
                "bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white shadow-indigo-600/20",
                "group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:shadow-indigo-500/30"
              )}>
                <span>Ver detalles</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}