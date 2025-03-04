"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import { ArrowRight, Map, Shield, Users, Mountain } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from("productos")
          .select("*")
          .limit(1);

        if (error) {
          console.error("Error al conectar con Supabase:", error.message);
        } else {
          console.log("✅ Conexión exitosa a Supabase:", data);
        }
      } catch (err) {
        console.error("Error inesperado:", err);
      } finally {
        setIsLoading(false);
      }
    };

    testConnection();

    // Simulamos la carga de Three.js (en producción usarías una biblioteca real)
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <div className="text-white text-2xl">Cargando experiencia PowNav...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Gradient Background (similar to login page) */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-purple-600 to-blue-500 opacity-70" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <div className="mr-2 w-8 h-8 bg-white rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
            </div>
            <h1 className="text-white text-3xl font-bold">PowNav</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8 text-white">
            <a href="#features" className="hover:text-blue-300 transition-colors">Características</a>
            <a href="#community" className="hover:text-blue-300 transition-colors">Comunidad</a>
            <a href="#pricing" className="hover:text-blue-300 transition-colors">Planes</a>
          </nav>
          
          <div className="flex space-x-4">
            <Link href="/auth/login" className="px-4 py-2 text-white hover:text-blue-200 transition-colors">
              Iniciar sesión
            </Link>
            <Link 
              href="/auth/register" 
              className="px-4 py-2 bg-black text-white rounded transition-colors hover:bg-gray-800"
            >
              Registrarse
            </Link>

          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center mb-24">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Find your line.<br />Ride with confidence.
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-lg">
              La brújula digital para los exploradores de la nieve. Descubre las mejores rutas de freeride con información en tiempo real y comunidad.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/auth/register" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md flex items-center justify-center">
                Comenzar ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/demo" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-md flex items-center justify-center backdrop-blur-sm">
                Ver demo
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20">
              {/* Placeholder for 3D terrain visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/60 text-center p-4">
                  <Mountain className="mx-auto w-16 h-16 mb-4" />
                  <p className="text-sm">Visualización 3D de terreno</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mb-24">
          <h3 className="text-2xl font-bold text-white mb-12 text-center">Todo lo que necesitas para la exploración segura</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-400/30 transition-all hover:bg-white/15">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Map className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Mapas 3D</h4>
              <p className="text-white/80">Visualiza el terreno con precisión y planifica tu descenso con mapas tridimensionales detallados.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-400/30 transition-all hover:bg-white/15">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Alertas en tiempo real</h4>
              <p className="text-white/80">Recibe alertas de avalanchas y condiciones de nieve actualizadas por otros riders en la zona.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-400/30 transition-all hover:bg-white/15">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Comunidad global</h4>
              <p className="text-white/80">Conéctate con freeriders locales y descubre rutas secretas compartidas por nuestra comunidad.</p>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="mb-24">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-white mb-4">Únete a la comunidad PowNav</h3>
              <p className="text-white/80 max-w-2xl mx-auto">Más de 5,000 freeriders comparten sus mejores rutas y experiencias. La seguridad en la montaña es un esfuerzo colectivo.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Niseko Gate A", level: "Intermedio", length: "2.4 km" },
                { name: "Whistler Backcountry", level: "Avanzado", length: "3.8 km" },
                { name: "Annupuri Secret", level: "Principiante", length: "1.6 km" }
              ].map((route, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <div className="h-32 bg-blue-900/30 rounded-md mb-3 flex items-center justify-center">
                    <Mountain className="w-8 h-8 text-white/40" />
                  </div>
                  <h5 className="text-white font-medium mb-1">{route.name}</h5>
                  <div className="flex justify-between text-sm text-white/70">
                    <span>{route.level}</span>
                    <span>{route.length}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="mb-24">
          <h3 className="text-2xl font-bold text-white mb-12 text-center">Planes para todos los riders</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-white mb-2">Plan Gratuito</h4>
                <p className="text-white/70">Para riders ocasionales</p>
                <div className="mt-4 text-3xl font-bold text-white">€0 <span className="text-base font-normal text-white/60">/mes</span></div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {["Rutas en 3D con navegación básica", "Comunidad y alertas en tiempo real", "Acceso a rutas públicas"].map((feature, i) => (
                <li key={i} className="flex items-start">
                  <div className="text-green-400 mr-2">✓</div>
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
              </ul>
              
              <Link href="/auth/register" className="block text-center py-3 bg-white/20 hover:bg-white/30 text-white rounded-md transition-colors">
                Registrarse
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-md rounded-xl p-8 border border-blue-400/30 relative">
              <div className="absolute -top-3 right-8 bg-blue-500 px-3 py-1 rounded-full text-xs font-medium text-white">
                Recomendado
              </div>
              
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-white mb-2">PowNav PRO</h4>
                <p className="text-white/70">Para riders comprometidos</p>
                <div className="mt-4 text-3xl font-bold text-white">€9,99 <span className="text-base font-normal text-white/60">/mes</span></div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Todo lo del plan gratuito",
                  "Descarga de mapas offline",
                  "Modelos 3D avanzados",
                  "Datos de avalanchas históricos",
                  "Soporte prioritario"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="text-green-400 mr-2">✓</div>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/auth/register?plan=pro" className="block text-center py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Empezar ahora
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600/20 to-indigo-700/20 rounded-2xl p-8 text-center backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">¿Listo para encontrar tu mejor línea?</h3>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Únete a miles de freeriders que ya navegan el backcountry con PowNav. Empieza gratis hoy mismo.
            </p>
            <Link href="/auth/register" className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md">
              Crear cuenta gratis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <h5 className="text-white font-semibold mb-4">PowNav</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Sobre nosotros</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Blog</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Prensa</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Características</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Mapas 3D</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Alertas</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Comunidad</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Recursos</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Guía de seguridad</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">FAQ</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Legal</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Términos</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Privacidad</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-white/50 text-sm py-6 border-t border-white/10">
            &copy; {new Date().getFullYear()} PowNav. La brújula digital para los exploradores de la nieve.
          </div>
        </footer>
      </div>
    </div>
  );
}