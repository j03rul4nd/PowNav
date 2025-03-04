"use client";

import useThreeMap from "@/hooks/useThreeMap";

const ThreeJSMap = () => {
  const { mountRef } = useThreeMap();

  return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeJSMap;
