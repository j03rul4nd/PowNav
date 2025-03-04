"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login"); // Redirigir al login tras cerrar sesión
  };

  return (
    <header>
      <div className="logo">
        <img src="./vercel.svg" alt="PowNav Logo" />
        <h1>PowNav</h1>
      </div>
      <div className="user-controls">
        <div className="search-bar">
          <i className="fa-solid fa-search"></i>
          <input type="text" placeholder="Buscar rutas, montañas, amigos..." />
        </div>

        {/* User Profile con Menú Desplegable */}
        <div className="user-profile" onClick={() => setMenuOpen(!menuOpen)} style={{ position: "relative", cursor: "pointer" }}>
          <img src="https://swiftbyte.onrender.com/user_3.png" alt="User Profile" />
          <span>Rider Pro</span>

          {/* Menú de Logout */}
          {menuOpen && (
            <div className="dropdown-menu" style={{
              position: "absolute",
              top: "100%",
              right: 0,
              background: "white",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              borderRadius: "5px",
              padding: "10px",
              zIndex: 100,
            }}>
              <button
                onClick={handleLogout}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  cursor: "pointer",
                  width: "100%",
                }}
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
