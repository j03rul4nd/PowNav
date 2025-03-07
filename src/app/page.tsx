"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import { ArrowRight, Map, Shield, Users, Mountain } from "lucide-react";

import CommunitySection  from "@/components/landingPage/CommunitySection";
import FeaturesSection from "@/components/landingPage/FeaturesSection";
import PricingSection from "@/components/landingPage/PricingSection";
import HeroSection from "@/components/landingPage/HeroSection";
import Header  from "@/components/landingPage/Header";
import CTASection  from "@/components/landingPage/CTASection";

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
        <Header />

        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Community Section */}
        <CommunitySection />

        {/* Pricing Section */}
        <PricingSection />
        

        {/* CTA Section */}
        <CTASection />
        

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