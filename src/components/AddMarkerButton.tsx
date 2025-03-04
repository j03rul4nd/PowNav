"use client";

import useThreeMap from "@/hooks/useThreeMap";

const AddMarkerButton = () => {
  const { addMarker } = useThreeMap();

  return (
    <button
      onClick={() => addMarker(Math.random() * 10 - 5, Math.random() * 10 - 5)}
      className="bg-blue-500 text-white p-2 rounded-md"
    >
      ➕ Agregar Marcador
    </button>
  );
};

export default AddMarkerButton;
