"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import { ArrowRight, Map, Shield, Users, Mountain } from "lucide-react";

import CommunitySection  from "@/components/landingPage/CommunitySection";
import FeaturesSection from "@/components/landingPage/FeaturesSection";
import PricingSection from "@/components/landingPage/PricingSection";
import HeroSection from "@/components/landingPage/HeroSection";

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
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Community Section */}
        <CommunitySection />

        {/* Pricing Section */}
        <PricingSection />
        

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