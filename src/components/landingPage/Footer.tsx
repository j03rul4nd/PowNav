import React from 'react';
import { motion } from "framer-motion";
import { Map, Shield, Users, Mail, Instagram, Twitter, Facebook, Youtube, Globe, ArrowRight, Snowflake } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Framer motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const snowflakeVariants = {
    initial: (i: any) => ({ 
      y: -20, 
      x: 0,
      opacity: 0.7,
      rotate: 0,
      scale: Math.random() * 0.5 + 0.5
    }),
    animate: (i: any) => ({ 
      y: 500, 
      x: Math.sin(i * 0.5) * 50,
      opacity: [0.7, 0.9, 0.7, 0.5, 0],
      rotate: Math.random() * 360,
      transition: { 
        repeat: Infinity, 
        duration: Math.random() * 8 + 10,
        ease: "linear",
        delay: Math.random() * 5
      }
    })
  };

  return (
    <footer className="pt-12 pb-6 relative overflow-hidden">
      {/* Animated Snowflakes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={snowflakeVariants}
            initial="initial"
            animate="animate"
            className="absolute text-white/30"
            style={{ 
              left: `${Math.random() * 100}%`,
            }}
          >
            <Snowflake size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between mb-12">
          {/* Brand Section */}
          <motion.div 
            className="mb-8 md:mb-0 flex flex-col items-center md:items-start"
            variants={itemVariants}
          >
            <motion.div 
              className="flex items-center mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Snowflake className="text-blue-400 mr-2" size={32} />
              <h3 className="text-white text-2xl font-bold tracking-wider">PowNav</h3>
            </motion.div>
            <p className="text-blue-200 text-sm max-w-xs text-center md:text-left mb-6">
              La brújula digital definitiva para exploradores de la nieve. 
              Vive la montaña con seguridad y diversión.
            </p>
            <div className="flex mt-2 space-x-4">
              {[
                { icon: <Facebook size={18} />, color: "hover:text-blue-400" },
                { icon: <Twitter size={18} />, color: "hover:text-blue-300" },
                { icon: <Instagram size={18} />, color: "hover:text-pink-400" },
                { icon: <Youtube size={18} />, color: "hover:text-red-500" }
              ].map((social, idx) => (
                <motion.a 
                  key={idx}
                  href="#" 
                  className={cn("h-10 w-10 rounded-full bg-white/10 flex items-center justify-center transition-colors", social.color)}
                  whileHover={{ scale: 1.15, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { 
                title: "PowNav", 
                icon: <Snowflake size={16} />,
                links: ["Sobre nosotros", "Blog", "Prensa", "Carreras"] 
              },
              { 
                title: "Características", 
                icon: <Map size={16} />,
                links: ["Mapas 3D", "Alertas", "Comunidad", "App Móvil"] 
              },
              { 
                title: "Recursos", 
                icon: <Shield size={16} />,
                links: ["Guía de seguridad", "FAQ", "Contacto", "Soporte"] 
              },
              { 
                title: "Legal", 
                icon: <Globe size={16} />,
                links: ["Términos", "Privacidad", "Cookies", "GDPR"] 
              }
            ].map((section, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <div className="relative mb-5 pb-2 inline-block">
                  <h5 className="text-white font-bold text-lg flex items-center">
                    {section.icon}
                    <span className="ml-2">{section.title}</span>
                  </h5>
                  <motion.div 
                    className="absolute h-1 bg-blue-400 left-0 bottom-0 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  />
                </div>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <motion.li key={linkIdx}>
                      <motion.a 
                        href="#" 
                        className="text-blue-200 hover:text-white group flex items-center text-sm"
                        whileHover={{ x: 5 }}
                      >
                        {link}
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="ml-1 inline-block"
                        >
                          <ArrowRight size={12} />
                        </motion.span>
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Newsletter */}
        <motion.div 
          className="my-12 py-8 border-t border-b border-white/10 flex flex-col md:flex-row items-center justify-between"
          variants={itemVariants}
        >
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h5 className="text-white text-xl font-bold mb-2">¡Únete a nuestra newsletter!</h5>
            <p className="text-blue-200 text-sm">Recibe alertas de condiciones de nieve y ofertas exclusivas.</p>
          </div>
          <motion.div 
            className="flex flex-col sm:flex-row w-full md:w-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <input 
              type="email" 
              placeholder="Tu email" 
              className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 sm:mb-0 sm:mr-2 w-full md:w-64"
            />
            <motion.button 
              className="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-blue-900 font-bold rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail className="mr-2" size={18} />
              Suscribirse
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Copyright and Bottom Links */}
        <motion.div 
          className="pt-6 flex flex-col md:flex-row items-center justify-between text-blue-200 text-sm border-t border-white/10"
          variants={itemVariants}
        >
          <p>&copy; {currentYear} PowNav. La brújula digital para los exploradores de la nieve.</p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-4">
            {["Mapa del sitio", "Accesibilidad", "Español"].map((link, idx) => (
              <React.Fragment key={idx}>
                <motion.a 
                  href="#" 
                  className="hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {link}
                </motion.a>
                {idx < 2 && <span className="hidden md:inline">•</span>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;