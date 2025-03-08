"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

export default function Mountain3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene, camera and renderer setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 15);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Controls (for development, can be disabled in final version)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enabled = false; // Disable controls for the cinematic sequence

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Main directional light (like sun)
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -15;
    mainLight.shadow.camera.right = 15;
    mainLight.shadow.camera.top = 15;
    mainLight.shadow.camera.bottom = -15;
    scene.add(mainLight);

    // Rim light for dramatic edge highlighting
    const rimLight = new THREE.DirectionalLight(0x6666ff, 0.8);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);

    // Load texture for heightmap
    const textureLoader = new THREE.TextureLoader();
    const mountainTexture = textureLoader.load(
      "https://res.cloudinary.com/dbxohjdng/image/upload/v1710354049/mxr51pxndort7pe0yzmc.png",
      () => {
        // Start animation after texture is loaded
        startCinematicSequence();
      }
    );

    // Create mountain terrain
    const planeGeometry = new THREE.PlaneGeometry(15, 15, 256, 256);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      displacementMap: mountainTexture,
      displacementScale: 5,
      roughness: 0.8,
      metalness: 0.2,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    
    const mountain = new THREE.Mesh(planeGeometry, planeMaterial);
    mountain.rotation.x = -Math.PI / 2;
    mountain.castShadow = true;
    mountain.receiveShadow = true;
    scene.add(mountain);

    // Create a camera path for the cinematic sequence
    const cameraPathPoints = [
      { position: new THREE.Vector3(0, 8, 15), lookAt: new THREE.Vector3(0, 0, 0), duration: 2 },
      { position: new THREE.Vector3(-10, 5, 8), lookAt: new THREE.Vector3(0, 0, 0), duration: 4 },
      { position: new THREE.Vector3(-8, 3, -5), lookAt: new THREE.Vector3(0, 2, 0), duration: 4 },
      { position: new THREE.Vector3(5, 2, -8), lookAt: new THREE.Vector3(0, 1, 0), duration: 4 },
      { position: new THREE.Vector3(10, 6, 0), lookAt: new THREE.Vector3(0, 1, 0), duration: 4 },
      { position: new THREE.Vector3(3, 10, 10), lookAt: new THREE.Vector3(0, 0, 0), duration: 5 },
      { position: new THREE.Vector3(0, 15, 0), lookAt: new THREE.Vector3(0, 0, 0), duration: 6 },
    ];

    // Function to start the cinematic camera sequence
    function startCinematicSequence() {
      // Start with the first position
      camera.position.copy(cameraPathPoints[0].position);
      
      let timeline = gsap.timeline({
        onComplete: () => {
          // Enable orbit controls after the sequence is complete
          controls.enabled = true;
          gsap.to(controls.target, {
            x: 0,
            y: 0, 
            z: 0,
            duration: 2,
            ease: "power2.inOut"
          });
        }
      });

      // Create the full camera animation sequence
      cameraPathPoints.forEach((point, index) => {
        if (index === 0) return; // Skip first point as we're already there
        
        // Add camera movement to timeline
        timeline.to(camera.position, {
          x: point.position.x,
          y: point.position.y,
          z: point.position.z,
          duration: point.duration,
          ease: "power2.inOut"
        }, `position${index}`);
        
        // Add camera target to timeline
        timeline.to(controls.target, {
          x: point.lookAt.x,
          y: point.lookAt.y,
          z: point.lookAt.z,
          duration: point.duration,
          ease: "power2.inOut"
        }, `position${index}`);
        
        // Add some subtle rotation to the mountain for dramatic effect
        if (index === 2) {
          timeline.to(mountain.rotation, {
            z: Math.PI / 12,
            duration: 8,
            ease: "power1.inOut"
          }, `position${index}`);
        }
        
        // Add lighting changes for dramatic effect
        if (index === 4) {
          timeline.to(mainLight.position, {
            x: -5,
            y: 8,
            z: -7,
            duration: 5,
            ease: "power1.inOut"
          }, `position${index}`);
          
          timeline.to(rimLight, {
            intensity: 1.5,
            duration: 3,
            ease: "power1.inOut"
          }, `position${index}`);
        }
      });
      
      // Add a final dramatic reveal
      timeline.to(camera.position, {
        x: 0,
        y: 8,
        z: 12,
        duration: 4,
        ease: "power2.inOut"
      });
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mountRef.current!.clientWidth / mountRef.current!.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}