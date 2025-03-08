"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import useDashboard from "@/hooks/useDashboard"; // Importar el hook
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ThreeJSMap from "@/components/ThreeJSMap";

export default function Dashboard() {
  const router = useRouter();
  const { user, checkUser, isLoading } = useAuthStore();
 // const { setSidebarState } = useDashboard(); // Acceder a la función para manejar el estado del sidebar

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
  }, [isLoading, user, router]);

  // // Asegurar que el Sidebar inicie colapsado
  // useEffect(() => {
  //   setSidebarState(true);
  // }, [setSidebarState]);

  if (isLoading) return <p className="text-center text-gray-500">Cargando sesión...</p>;

  return user ? (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 relative bg-gray-100 overflow-hidden">
          <ThreeJSMap />
        </div>
      </div>
    </div>
  ) : null;
}
