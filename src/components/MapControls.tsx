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
    <div className="map-controls">
      {controls.map(({ id, icon, action, label }) => (
        <button
          key={id}
          id={id}
          className="control-button"
          onClick={action}
          aria-label={label}
        >
          <i className={`fa-solid ${icon}`}></i>
        </button>
      ))}

      {/* Botón de grabación */}
      <button
        className={`control-button ${isRecording ? "recording" : ""}`}
        onClick={toggleRecording}
        aria-label={isRecording ? "Detener grabación" : "Iniciar grabación"}
      >
        <i
          className={`fa-solid ${isRecording ? "fa-circle-stop" : "fa-circle-play"}`}
          style={{ color: isRecording ? "red" : "" }}
        ></i>
      </button>
    </div>
  );
}
