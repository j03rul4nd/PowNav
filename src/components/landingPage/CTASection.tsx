import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { ArrowRight, Mountain, Snowflake, ChevronRight } from "lucide-react";

const CTASection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [count, setCount] = useState(0);
  
  // Efecto de contador para mostrar usuarios registrados
  useEffect(() => {
    const timer = setTimeout(() => {
      if (count < 4872) {
        setCount(prev => Math.min(prev + Math.floor(Math.random() * 10) + 1, 4872));
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [count]);

  // Gestionar movimiento de parallax
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section className="mb-16 px-4 sm:px-6 lg:px-8 py-12">
      <div 
        className="relative overflow-hidden rounded-3xl max-w-4xl mx-auto"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Fondo con gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 opacity-90"></div>
        
        {/* Efecto de partículas/copos de nieve */}
        <div className="absolute inset-0 opacity-20">
          {Array(12).fill().map((_, i) => (
            <Snowflake 
              key={i}
              className="absolute text-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                transform: `scale(${Math.random() * 0.8 + 0.5})`,
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`
              }}
              size={Math.random() * 16 + 10}
            />
          ))}
        </div>
        
        {/* Montañas decorativas */}
        <div className="absolute bottom-0 left-0 w-full h-24 opacity-30">
          <Mountain className="absolute bottom-0 left-10 text-white opacity-20" size={140} />
          <Mountain className="absolute bottom-0 left-1/3 text-white opacity-30" size={120} />
          <Mountain className="absolute bottom-0 right-10 text-white opacity-20" size={100} />
        </div>
        
        {/* Overlay de resplandor en hover */}
        <div 
          className="absolute inset-0 bg-blue-500 opacity-0 transition-opacity duration-700 ease-in-out"
          style={{ 
            opacity: isHovered ? 0.1 : 0,
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.6) 0%, rgba(0, 0, 0, 0) 60%)`
          }}
        ></div>
        
        {/* Borde con resplandor */}
        <div className="absolute inset-0 rounded-3xl border border-white/20 shadow-[0_0_15px_rgba(79,70,229,0.45)]"></div>
        
        {/* Contenido principal */}
        <div className="relative p-8 sm:p-10 lg:p-14 text-center backdrop-blur-sm">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
              <Mountain className="w-8 h-8 text-blue-300" />
            </div>
          </div>
          
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
            ¿Listo para conquistar <span className="text-blue-300">tu mejor línea?</span>
          </h3>
          
          <p className="text-white/80 max-w-lg sm:max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Únete a los <span className="font-semibold text-blue-300">{count.toLocaleString()}</span> freeriders que ya navegan el backcountry con confianza. 
            PowNav te guía hacia las mejores líneas con datos en tiempo real.
          </p>
          
          {/* Características destacadas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left max-w-2xl mx-auto">
            {[
              {icon: <Snowflake className="w-5 h-5 text-blue-300" />, text: "Datos de nieve en tiempo real"},
              {icon: <Mountain className="w-5 h-5 text-blue-300" />, text: "Rutas seguras verificadas"},
              {icon: <ArrowRight className="w-5 h-5 text-blue-300" />, text: "Navegación offline"}
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-2 text-white/70">
                {item.icon}
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Principal */}
          <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4 sm:justify-center">
            <Link
              href="/auth/register"
              className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3.5 overflow-hidden text-base font-medium rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white transition-all duration-300 ease-out shadow-lg hover:shadow-blue-500/30 w-full sm:w-auto"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent transform translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              <span className="relative flex items-center">
                Crear cuenta gratis
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            
            <Link
              href="/features"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base text-white/90 hover:text-white font-medium transition-all w-full sm:w-auto border border-white/10 rounded-xl hover:bg-white/5"
            >
              Ver funcionalidades
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          {/* Social proof */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-white/60">Recomendado por guías profesionales de montaña y atletas de freeride</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;