"use client";

import { useState, useEffect } from "react";

export default function useDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [alerts, setAlerts] = useState<Array<{ type: string; title: string; message: string }>>([]);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Seleccionar una ruta
  const selectRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    setTimeout(() => {
      updateAlerts(routeId);
    }, 1000);
  };

  // Alternar estado de grabación
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // Actualizar alertas basadas en la ruta seleccionada
  const updateAlerts = (routeId: string) => {
    let newAlerts = [];

    if (routeId === "gate-c") {
      newAlerts.push({
        type: "danger",
        title: "¡Alerta de avalancha!",
        message: "Riesgo moderado en ladera este de Gate C. Reportado hace 15 min por 3 riders.",
      });
    } else if (routeId === "gate-a") {
      newAlerts.push({
        type: "warning",
        title: "Precaución: Pozos de árboles",
        message: "Varios riders han reportado pozos de árboles profundos en la zona de Gate A.",
      });
    }

    newAlerts.push({
      type: "warning",
      title: "Condiciones de la nieve",
      message: "La nieve está húmeda en la base. Mejor polvo por encima de 1200m.",
    });

    setAlerts(newAlerts);
  };

  return {
    isSidebarCollapsed,
    toggleSidebar,
    selectedRoute,
    selectRoute,
    isRecording,
    toggleRecording,
    alerts,
  };
}
