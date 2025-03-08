"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);

  // Control de scroll para cambiar estilos del header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Puedes elegir entre estas opciones de fondo cambiando la clase en el className condicional
  
  // OPCIÓN 1: Gradiente que coincide con el fondo del sitio
  const gradientMatchBg = "bg-gradient-to-r from-red-900/90 via-purple-900/90 to-indigo-900/90 backdrop-blur-md shadow-lg";
  
  // OPCIÓN 2: Color sólido que complementa el gradiente
  const solidPurpleBg = "bg-purple-900/95 backdrop-blur-md shadow-lg";
  
  // OPCIÓN 3: Azul mejorado que armoniza con el sitio
  const enhancedBlueBg = "bg-indigo-900/95 backdrop-blur-md shadow-lg";
  
  // OPCIÓN 4: El original (azul oscuro) por si prefieres mantenerlo
  const originalBg = "bg-blue-900/95 backdrop-blur-md shadow-lg";

  return (
    <>
      <header 
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-4 md:px-6 lg:px-8 py-4 transition-all duration-300",
          isScrolled 
            ? gradientMatchBg // Cambia a la opción que prefieras: gradientMatchBg, solidPurpleBg, enhancedBlueBg, originalBg
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            < img
              src="/vercel.svg"
              alt="PowNav Logo"
              className="mr-2 w-10 h-10 rounded-lg shadow-md transition-transform duration-300 group-hover:scale-110"
            />
            <h1 className="text-white text-2xl md:text-3xl font-bold tracking-tighter">
              Pow<span className="text-blue-300">Nav</span>
            </h1>
          </Link>
          
          {/* Navegación desktop */}
          <nav className="hidden lg:flex space-x-8 text-white">
            {["Características", "Comunidad", "Planes", "Soporte"].map((item, index) => (
              <a 
                key={index}
                href={`#${item.toLowerCase()}`} 
                className="relative py-2 px-1 text-sm font-medium hover:text-blue-300 transition-colors"
              >
                <span>{item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          {/* Botones de autenticación desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/auth/login" 
              className="px-4 py-2 text-white hover:text-blue-200 transition-colors text-sm font-medium"
            >
              Iniciar sesión
            </Link>
            <Link 
              href="/auth/register" 
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-md text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-px hover:from-blue-500 hover:to-blue-400"
            >
              Registrarse
            </Link>
          </div>
          
          {/* Botón de menú móvil */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-white hover:bg-blue-800/50 transition-colors"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>
      
      {/* Menú móvil - adaptar también el color de fondo aquí */}
      <div 
        className={cn(
          "fixed inset-0 z-40 pt-20 px-4 transition-transform duration-300 lg:hidden",
          isMenuOpen ? "translate-y-0" : "-translate-y-full",
          gradientMatchBg // Mantener consistente con la opción elegida arriba
        )}
      >
        <nav className="flex flex-col space-y-6 text-white text-center">
          {["Características", "Comunidad", "Planes", "Soporte"].map((item, index) => (
            <a 
              key={index}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="py-3 text-lg font-medium border-b border-white/10 hover:text-blue-300 transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="flex flex-col space-y-4 pt-4">
            <Link 
              href="/auth/login" 
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 text-white border border-white/20 rounded-md text-center hover:bg-white/10 transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link 
              href="/auth/register" 
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-md text-center shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-400"
            >
              Registrarse
            </Link>
          </div>
        </nav>
      </div>
      
      {/* Spacer para compensar el header fijo */}
      <div className="h-20"></div>
    </>
  );
}