"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Map, Shield, Users, Snowflake, Star, Download, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Variantes de animación para elementos
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.03,
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  tap: { scale: 0.97 }
};

// Datos de planes mejorados con iconos y detalles emocionales
const plans = [
  {
    name: "Plan Gratuito",
    description: "Primeros pasos en la montaña con seguridad",
    emotionalAppeal: "Vive tu aventura sin presiones",
    price: "€0",
    priceSuffix: "/mes",
    features: [
      {
        icon: <Map size={18} className="text-green-400" />,
        text: "Rutas en 3D con navegación básica",
        detail: "Visualiza tus descensos con claridad"
      },
      {
        icon: <Users size={18} className="text-green-400" />,
        text: "Comunidad y alertas en tiempo real",
        detail: "Nunca estarás solo en la montaña"
      },
      {
        icon: <Snowflake size={18} className="text-green-400" />,
        text: "Acceso a rutas públicas",
        detail: "Descubre los spots favoritos de la comunidad"
      },
    ],
    buttonText: "Comenzar Aventura",
    buttonLink: "/auth/register",
    cardStyle: "bg-white/10 backdrop-blur-md border border-white/20",
    buttonStyle: "bg-white/20 hover:bg-white/30",
    accentColor: "from-emerald-400/20 to-emerald-600/10",
    glow: "emerald"
  },
  {
    name: "PowNav PRO",
    description: "Para riders que buscan la perfección",
    emotionalAppeal: "Domina cada descenso con confianza total",
    price: "€9,99",
    priceSuffix: "/mes",
    features: [
      {
        icon: <Star size={18} className="text-blue-400" />,
        text: "Todo lo del plan gratuito",
        detail: "La base perfecta para tu experiencia"
      },
      {
        icon: <Download size={18} className="text-blue-400" />,
        text: "Descarga de mapas offline",
        detail: "Aventúrate donde no hay cobertura"
      },
      {
        icon: <Map size={18} className="text-blue-400" />,
        text: "Modelos 3D avanzados con detalle premium",
        detail: "Siente la montaña antes de pisarla"
      },
      {
        icon: <Shield size={18} className="text-blue-400" />,
        text: "Datos de avalanchas históricos y predicciones",
        detail: "Conocimiento que puede salvar vidas"
      },
      {
        icon: <CheckCircle size={18} className="text-blue-400" />,
        text: "Soporte prioritario 24/7",
        detail: "Estamos contigo en cada momento"
      },
    ],
    buttonText: "Eleva Tu Experiencia",
    buttonLink: "/auth/register?plan=pro",
    cardStyle: "bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-md border border-blue-400/30 relative",
    buttonStyle: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
    accentColor: "from-blue-400/30 to-indigo-600/20",
    glow: "blue",
    recommended: true
  },
];

export default function PricingSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  return (
    <section 
      id="pricing" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-900/5 to-black/0 pointer-events-none"></div>
      <div className="absolute -top-96 -left-96 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-96 -right-96 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wide mb-3">Planes Personalizados</h2>
          <h3 className="text-4xl font-bold text-white mb-6">
            Experiencias para cada tipo de rider
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tu relación con la montaña. 
            Desde exploradores ocasionales hasta riders profesionales, tenemos lo que necesitas.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10"
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className={cn(
                `rounded-2xl p-8 transition-all relative overflow-hidden`,
                plan.cardStyle
              )}
            >
              {/* Efecto de resplandor */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${plan.accentColor} blur-xl opacity-30 -z-10`}></div>
              
              {/* Etiqueta Recomendado mejorada */}
              {plan.recommended && (
                <div className="relative">
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="absolute -top-9 right-0 w-40 h-9 overflow-visible"
                  >
                    {/* Forma base de la etiqueta */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-lg rounded-b-lg shadow-lg transform -skew-x-6"></div>
                    
                    {/* Bordes luminosos */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-t-lg rounded-b-lg opacity-50 blur-sm"></div>
                    
                    {/* Texto de la etiqueta */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-white tracking-wide uppercase">Recomendado</span>
                    </div>
                  </motion.div>
                </div>
              )}

              <div className="mb-8">
                <h4 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h4>
                <p className="text-white/70 mb-2">{plan.description}</p>
                <p className="text-sm italic text-white/60">{plan.emotionalAppeal}</p>
                
                <div className="mt-6 text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {plan.price}{" "}
                  <span className="text-base font-normal text-white/60">
                    {plan.priceSuffix}
                  </span>
                </div>
              </div>

              <motion.ul 
                className="space-y-4 mb-8"
                variants={containerVariants}
              >
                {plan.features.map((feature, i) => (
                  <motion.li 
                    key={i}
                    variants={featureVariants} 
                    className="flex items-start group"
                  >
                    <div className="mr-3 mt-1 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <span className="text-white/90 font-medium group-hover:text-white transition-colors">
                        {feature.text}
                      </span>
                      <p className="text-white/50 text-xs mt-1 group-hover:text-white/70 transition-colors">
                        {feature.detail}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href={plan.buttonLink}
                  className={cn(
                    `block text-center py-4 px-6 text-white rounded-lg font-medium transition-all shadow-lg`,
                    plan.buttonStyle,
                    plan.recommended ? "shadow-blue-500/20" : ""
                  )}
                >
                  {plan.buttonText}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12 text-white/60 text-sm"
        >
          ¿Necesitas un plan para un equipo o evento? <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">Contáctanos para planes personalizados</Link>
        </motion.div>
      </div>
    </section>
  );
}