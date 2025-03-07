"use client";

import Link from "next/link";
import { ArrowRight, Mountain, Compass, Snowflake, Users } from "lucide-react";
import { useRef } from "react";

export default function HeroSection() {
  const featureRefs = [useRef(null), useRef(null), useRef(null)];
  
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        
          {/* Left content area */}
          <div className="md:w-1/2 md:pr-6">
            {/* Badge */}
            <div className="inline-flex items-center mb-6 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm">
              <span className="text-xs font-medium text-blue-300">¡Nueva versión beta disponible!</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="block">Encuentra tu línea.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Navega con confianza.
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-lg text-white/80 mb-8 max-w-lg">
              La brújula digital para los exploradores de la nieve. Descubre las mejores rutas de 
              freeride con información en tiempo real y comunidad de expertos.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/auth/register"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-lg flex items-center justify-center transition-all duration-200 shadow-lg shadow-blue-500/20"
              >
                Comenzar ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/demo"
                className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/10 transition-all duration-200"
              >
                Ver demo
              </Link>
            </div>
            
            
          </div>
          
          {/* Right visual area */}
          <div className="md:w-1/2">
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              {/* Main visualization container */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-800/30 to-indigo-900/30 backdrop-blur-md border border-white/20 shadow-xl shadow-blue-900/20">
                {/* Mountain 3D visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/80 text-center p-4">
                    <Mountain className="mx-auto w-20 h-20 mb-4 text-blue-200/90" />
                    <p className="text-sm font-medium">Visualización 3D de terreno</p>
                    
                    {/* Route indicators - would be part of the 3D visualization */}
                    <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating feature cards */}
              <div className="absolute -bottom-6 -right-6 w-40 h-24 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-3 shadow-lg">
                <div className="flex items-start gap-2">
                  <Compass className="w-5 h-5 text-blue-300 mt-1" />
                  <div>
                    <h4 className="text-white text-sm font-medium">Rutas GPS</h4>
                    <p className="text-white/70 text-xs">Navegación precisa en montaña</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 w-40 h-24 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-3 shadow-lg">
                <div className="flex items-start gap-2">
                  <Snowflake className="w-5 h-5 text-blue-300 mt-1" />
                  <div>
                    <h4 className="text-white text-sm font-medium">Datos de nieve</h4>
                    <p className="text-white/70 text-xs">Condiciones en tiempo real</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -left-6 w-40 h-24 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-3 shadow-lg">
                <div className="flex items-start gap-2">
                  <Users className="w-5 h-5 text-blue-300 mt-1" />
                  <div>
                    <h4 className="text-white text-sm font-medium">Comunidad</h4>
                    <p className="text-white/70 text-xs">Consejos de expertos locales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}