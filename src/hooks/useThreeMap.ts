"use client";

import * as THREE from 'three'; 
// import { OrbitControls } from 'three/addons/controls/OrbitControls';
// import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
// import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import { useState, useEffect, useRef } from "react";

export default function useThreeMap() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const markersRef = useRef<THREE.Mesh[]>([]); // Lista de marcadores en la escena

  const [markers, setMarkers] = useState<{ x: number; z: number }[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Inicializar escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe6f2ff);
    sceneRef.current = scene;

    // Cámara y renderer
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Función para añadir un marcador a la escena
  const addMarker = (x: number, z: number) => {
    setMarkers((prev) => [...prev, { x, z }]);
  };

  // Efecto para actualizar los marcadores en Three.js cuando `markers` cambia
  useEffect(() => {
    if (!sceneRef.current) return;

    markers.forEach(({ x, z }) => {
      const markerGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(x, 1, z);
      if(sceneRef){
        if(sceneRef.current){
          sceneRef.current.add(marker);
        }
      }

      markersRef.current.push(marker);
    });

  }, [markers]);

  return { mountRef, addMarker };
}
