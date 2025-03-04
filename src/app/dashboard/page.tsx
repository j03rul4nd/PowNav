"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ThreeJSMap from "@/components/ThreeJSMap";
import AddMarkerButton from "@/components/AddMarkerButton";
import MapControls from "@/components/MapControls";

export default function Dashboard() {
  const router = useRouter();
  const { user, checkUser, isLoading } = useAuthStore();

  useEffect(() => {
    const verifyUser = async () => {
      await checkUser(); // Esperar antes de verificar la sesión
    };
    verifyUser();
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/"); // Redirigir solo después de verificar
    }
  }, [isLoading, user, router]); // Ejecuta la redirección solo cuando cambie el estado de usuario o la carga

  if (isLoading) return <p>Cargando sesión...</p>;

  return user ? (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="map-container">
          <ThreeJSMap />
          <div className="absolute top-5 right-5">
            <AddMarkerButton />
          </div>
          <MapControls
            onZoomIn={() => console.log("Zoom In")}
            onZoomOut={() => console.log("Zoom Out")}
            onLocate={() => console.log("Ubicar usuario")}
            onReport={() => console.log("Reportar evento")}
          />
        </div>
      </div>
    </div>
  ) : null; // Evita renderizar si el usuario aún no está verificado
}
