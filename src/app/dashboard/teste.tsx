"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ThreeJSMap from "@/components/ThreeJSMap";
import AddMarkerButton from "@/components/AddMarkerButton";
import MapControls from "@/components/MapControls";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Dashboard() {

  const router = useRouter();
  const { user, checkUser, logout } = useAuthStore();

  useEffect(() => {
    checkUser();
    if (!user) {
      router.push("/");
    }
  }, [user, router, checkUser]);


  const handleZoomIn = () => {
    console.log("Zoom In");
    // Aquí puedes llamar a una función de tu mapa, por ejemplo:
    // map.zoomIn();
  };

  const handleZoomOut = () => {
    console.log("Zoom Out");
  };

  const handleLocate = () => {
    console.log("Ubicar usuario");
  };

  const handleReport = () => {
    console.log("Reportar evento");
  };

  return (
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
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onLocate={handleLocate}
            onReport={handleReport}
          />
        </div>
      </div>
    </div>
  );
}
