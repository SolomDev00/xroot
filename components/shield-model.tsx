"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ShieldModelProps {
  isRotating?: boolean;
}

export function ShieldModel({ isRotating = true }: ShieldModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const shieldRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x10b981, 1);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x059669, 1);
    directionalLight2.position.set(-5, -5, 5);
    scene.add(directionalLight2);

    // Create shield group
    const shieldGroup = new THREE.Group();
    shieldRef.current = shieldGroup;
    scene.add(shieldGroup);

    // Create shield base
    const shieldGeometry = new THREE.ShapeGeometry(createShieldShape());
    const shieldMaterial = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x065f46,
      emissiveIntensity: 0.2,
    });
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shieldGroup.add(shield);

    // Create shield border
    const borderGeometry = new THREE.EdgesGeometry(shieldGeometry);
    const borderMaterial = new THREE.LineBasicMaterial({
      color: 0x34d399,
      linewidth: 2,
    });
    const border = new THREE.LineSegments(borderGeometry, borderMaterial);
    border.position.z = 0.01;
    shieldGroup.add(border);

    // Create shield emblem
    const emblemGeometry = new THREE.CircleGeometry(0.5, 32);
    const emblemMaterial = new THREE.MeshStandardMaterial({
      color: 0xd1fae5,
      metalness: 0.5,
      roughness: 0.3,
      emissive: 0x6ee7b7,
      emissiveIntensity: 0.3,
    });
    const emblem = new THREE.Mesh(emblemGeometry, emblemMaterial);
    emblem.position.z = 0.02;
    shieldGroup.add(emblem);

    // Create lock icon
    // const lockGroup = new THREE.Group();

    // // Lock body
    // const lockBodyGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.1);
    // const lockBodyMaterial = new THREE.MeshStandardMaterial({
    //   color: 0xecfdf5,
    //   metalness: 0.8,
    //   roughness: 0.2,
    // });
    // const lockBody = new THREE.Mesh(lockBodyGeometry, lockBodyMaterial);
    // lockGroup.add(lockBody);

    // Lock shackle
    // const lockShackleGeometry = new THREE.TorusGeometry(
    //   0.15,
    //   0.03,
    //   16,
    //   32,
    //   Math.PI
    // );
    // const lockShackle = new THREE.Mesh(lockShackleGeometry, lockBodyMaterial);
    // lockShackle.position.y = 0.15;
    // lockShackle.rotation.x = Math.PI / 2;
    // lockGroup.add(lockShackle);

    // lockGroup.position.z = 0.1;
    // emblem.add(lockGroup);

    // Add glow effect
    const glowGeometry = new THREE.ShapeGeometry(createShieldShape(1.05));
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.z = -0.1;
    shieldGroup.add(glow);

    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 50;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position particles in a shield-like shape
      const angle = Math.random() * Math.PI * 2;
      const radius = 1 + Math.random() * 0.5;
      posArray[i] = Math.cos(angle) * radius;
      posArray[i + 1] = Math.sin(angle) * radius;
      posArray[i + 2] = (Math.random() - 0.5) * 0.5;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x34d399,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    shieldGroup.add(particles);

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current)
        return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      rendererRef.current.setSize(width, height);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    };

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (shieldRef.current && isRotating) {
        shieldRef.current.rotation.y += 0.005;
      }

      // Animate particles
      if (particles) {
        particles.rotation.z += 0.001;

        // Update particle positions
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 2] += (Math.random() - 0.5) * 0.01;
          if (Math.abs(positions[i + 2]) > 0.5) {
            positions[i + 2] *= -0.9;
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      // Pulse glow effect
      if (glow) {
        const time = Date.now() * 0.001;
        glow.material.opacity = 0.1 + Math.sin(time) * 0.05;
        glow.scale.set(
          1 + Math.sin(time * 0.5) * 0.05,
          1 + Math.sin(time * 0.5) * 0.05,
          1
        );
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    // Initial setup
    containerRef.current.appendChild(renderer.domElement);
    handleResize();
    window.addEventListener("resize", handleResize);
    animate();

    // Cleanup
    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }

      window.removeEventListener("resize", handleResize);

      if (
        rendererRef.current &&
        rendererRef.current.domElement &&
        containerRef.current
      ) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }

      // Dispose geometries and materials
      if (shieldGeometry) shieldGeometry.dispose();
      if (shieldMaterial) shieldMaterial.dispose();
      if (borderGeometry) borderGeometry.dispose();
      if (borderMaterial) borderMaterial.dispose();
      if (emblemGeometry) emblemGeometry.dispose();
      if (emblemMaterial) emblemMaterial.dispose();
      if (glowGeometry) glowGeometry.dispose();
      if (glowMaterial) glowMaterial.dispose();
      if (particlesGeometry) particlesGeometry.dispose();
      if (particlesMaterial) particlesMaterial.dispose();
    };
  }, [isRotating]);

  // Helper function to create shield shape
  function createShieldShape(scale = 1) {
    const shape = new THREE.Shape();

    // Shield outline
    shape.moveTo(0, 1.5 * scale);
    shape.bezierCurveTo(
      1 * scale,
      1.5 * scale,
      1.5 * scale,
      1 * scale,
      1.5 * scale,
      0 * scale
    );
    shape.bezierCurveTo(
      1.5 * scale,
      -1 * scale,
      0.75 * scale,
      -1.5 * scale,
      0 * scale,
      -1.75 * scale
    );
    shape.bezierCurveTo(
      -0.75 * scale,
      -1.5 * scale,
      -1.5 * scale,
      -1 * scale,
      -1.5 * scale,
      0 * scale
    );
    shape.bezierCurveTo(
      -1.5 * scale,
      1 * scale,
      -1 * scale,
      1.5 * scale,
      0 * scale,
      1.5 * scale
    );

    return shape;
  }

  return <div ref={containerRef} className="w-full h-full" />;
}
