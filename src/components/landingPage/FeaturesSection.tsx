"use client";

import { motion } from "framer-motion";
import { Map, Shield, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const features: Feature[] = [
  {
    title: "Mapas 3D",
    description:
      "Visualiza el terreno con precisión y planifica tu descenso con mapas tridimensionales detallados.",
    icon: Map,
  },
  {
    title: "Alertas en tiempo real",
    description:
      "Recibe alertas de avalanchas y condiciones de nieve actualizadas por otros riders en la zona.",
    icon: Shield,
  },
  {
    title: "Comunidad global",
    description:
      "Conéctate con freeriders locales y descubre rutas secretas compartidas por nuestra comunidad.",
    icon: Users,
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="mb-24 px-6 max-w-7xl mx-auto text-white"
      aria-labelledby="features-heading"
    >
      <motion.h3
        id="features-heading"
        className="text-3xl md:text-5xl font-bold mb-16 text-center leading-tight"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Todo lo que necesitas para la exploración segura
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  return (
    <motion.div
      className={cn(
        "group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 transition-all shadow-lg",
        "hover:border-blue-500/60 hover:bg-white/20 hover:shadow-blue-500/40",
        "flex flex-col items-center text-center"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
        <feature.icon className="w-8 h-8 text-white" />
      </div>
      <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
      <p className="text-white/80 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
};
