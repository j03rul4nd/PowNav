"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import * as THREE from 'three';

export default function Register() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Configuración de Three.js para crear un fondo fluido estilo Replicate
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Añadir el renderer como fondo absoluto
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    document.body.appendChild(renderer.domElement);

    // Creamos un shader para generar el gradiente fluido vibrante
    const fragmentShader = `
      uniform float time;
      uniform vec2 resolution;

      void main() {
        vec2 position = gl_FragCoord.xy / resolution.xy;
        
        // Creamos múltiples gradientes fluidos superpuestos
        float r1 = 0.5 + 0.5 * sin(position.x * 3.0 + time * 0.3 + position.y * 2.0);
        float g1 = 0.5 + 0.5 * sin(position.y * 4.0 + time * 0.2 + 1.5);
        float b1 = 0.9 * sin(position.x * position.y * 4.0 + time * 0.1);
        
        // Segunda capa de colores más brillantes
        float r2 = 0.8 + 0.2 * sin(position.y * 3.5 - time * 0.2);
        float g2 = 0.2 + 0.3 * cos(position.x * 2.5 + time * 0.3);
        float b2 = 0.6 + 0.4 * sin(position.x * position.y * 5.0 - time * 0.25);
        
        // Mezclamos las capas para crear el efecto vibrante de Replicate
        float mixer = 0.5 + 0.5 * sin(position.x * 5.0 + position.y * 5.0 + time * 0.2);
        
        vec3 color1 = vec3(r1, g1, b1);
        vec3 color2 = vec3(r2, g2, b2);
        vec3 finalColor = mix(color1, color2, mixer);
        
        // Añadimos un toque de rosa y amarillo similar al fondo de Replicate
        finalColor.r = finalColor.r * 1.2; // Potenciar rojos para el tono rosa
        finalColor.g = finalColor.g * 1.1; // Potenciar verdes para el tono amarillo
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Configurar el material con los shaders
    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });

    // Crear un plano que cubra toda la pantalla
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Función de animación para actualizar el shader
    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.time.value += 0.01;
      renderer.render(scene, camera);
    };
    
    // Manejar el redimensionamiento de la ventana
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Iniciar animación
    animate();
    
    // Limpieza al desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validación simple
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setError(error.message);
      } else {
        setUser(data.user); // Guarda usuario en Zustand
        router.push("/dashboard"); // Redirige al dashboard tras registrarse
      }
    } catch (err) {
      setError("Error inesperado. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black rounded-lg shadow-2xl overflow-hidden flex flex-col items-center py-12 px-8">
        {/* Logo o icono similar al de Replicate */}
        <div className="mb-6">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="12" height="12" stroke="white" strokeWidth="2" />
            <rect x="12" y="12" width="12" height="12" stroke="white" strokeWidth="2" />
            <rect x="20" y="20" width="12" height="12" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-medium text-white mb-10">Crear cuenta</h1>
        
        <form onSubmit={handleRegister} className="w-full space-y-5">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
              className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/25 transition-all duration-200"
            />
          </div>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/25 transition-all duration-200"
            />
          </div>
          
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar contraseña"
              required
              className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/25 transition-all duration-200"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 rounded-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-500/50 rounded-md text-red-200 text-sm w-full">
            {error}
          </div>
        )}
        
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>¿Ya tienes una cuenta?</p>
          <a href="/auth" className="text-white hover:underline mt-2 inline-block">
            Iniciar sesión
          </a>
        </div>
        
        <p className="mt-6 text-center text-gray-400 text-sm">
          Al registrarte, aceptas nuestros <a href="#" className="text-white hover:underline">términos de servicio</a> y 
          <a href="#" className="text-white hover:underline"> política de privacidad</a>.
        </p>
      </div>
    </div>
  );
}