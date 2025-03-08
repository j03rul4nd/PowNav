"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Search } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login"); // Redirigir al login tras cerrar sesión
  };

  return (
    <header className="bg-white px-6 py-4 flex justify-between items-center shadow-md border-b border-gray-200">
      <div className="flex items-center">
        <img src="./vercel.svg" alt="PowNav Logo" className="h-9 mr-3 drop-shadow-md" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent tracking-tight">
          PowNav
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-80 border border-gray-300 focus-within:ring-2 focus-within:ring-blue-300">
          <Search className="text-blue-500 opacity-70 mr-3" size={18} />
          <input
            type="text"
            placeholder="Buscar rutas, montañas, amigos..."
            className="w-full bg-transparent outline-none text-sm font-medium"
          />
        </div>

        {/* User Profile con Menú Desplegable */}
        <div className="relative cursor-pointer">
          <div
            className="flex items-center gap-3 p-2 bg-gray-100 rounded-full border border-gray-300 hover:bg-blue-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              src="https://swiftbyte.onrender.com/user_3.png"
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-400 shadow-sm"
            />
            <span className="font-semibold text-gray-800 text-sm">Rider Pro</span>
          </div>

          {/* Menú de Logout */}
          {menuOpen && (
            <div className="absolute top-full right-0 bg-white shadow-lg rounded-md py-2 w-40 border border-gray-200 z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 font-medium"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
