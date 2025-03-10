"use client";

import { useCallback } from "react";
import useDashboard from "@/hooks/useDashboard";

interface MapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onLocate?: () => void;
  onReport?: () => void;
}

export default function MapControls({
  onZoomIn,
  onZoomOut,
  onLocate,
  onReport,
}: MapControlsProps) {
  const { toggleRecording, isRecording } = useDashboard();

  const controls = [
    { id: "zoom-in", icon: "fa-plus", action: onZoomIn, label: "Acercar mapa" },
    { id: "zoom-out", icon: "fa-minus", action: onZoomOut, label: "Alejar mapa" },
    { id: "location", icon: "fa-location-crosshairs", action: onLocate, label: "Ubicación actual" },
    { id: "report", icon: "fa-flag", action: onReport, label: "Reportar incidencia" },
  ];

  return (
    <div className="absolute right-6 bottom-6 flex flex-col gap-3 z-10">
      {controls.map(({ id, icon, action, label }) => (
        <button
          key={id}
          id={id}
          className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-md border border-gray-200 hover:bg-blue-500 hover:text-white transition-transform transform hover:-translate-y-1"
          onClick={action}
          aria-label={label}
        >
          <i className={`fa-solid ${icon} text-blue-600 text-xl`}></i>
        </button>
      ))}

      {/* Botón de grabación */}
      <button
        className={`w-14 h-14 rounded-lg flex items-center justify-center shadow-md border border-gray-200 transition-transform transform hover:-translate-y-1 ${isRecording ? "bg-red-500 animate-pulse" : "bg-white hover:bg-green-500 hover:text-white"}`}
        onClick={toggleRecording}
        aria-label={isRecording ? "Detener grabación" : "Iniciar grabación"}
      >
        <i className={`fa-solid ${isRecording ? "fa-circle-stop text-white" : "fa-circle-play text-green-600"}`}></i>
      </button>
    </div>
  );
}
