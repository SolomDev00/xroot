"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function TerminalCube() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const cubeRef = useRef<THREE.Mesh | null>(null)
  const frameIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)
    sceneRef.current = scene

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 3
    cameraRef.current = camera

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    rendererRef.current = renderer

    // Create cube geometry
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)

    // Create materials for each face with different colors representing security layers
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xff4444, transparent: true, opacity: 0.8 }), // Right - Physical Security
      new THREE.MeshBasicMaterial({ color: 0x44ff44, transparent: true, opacity: 0.8 }), // Left - Network Security
      new THREE.MeshBasicMaterial({ color: 0x4444ff, transparent: true, opacity: 0.8 }), // Top - Application Security
      new THREE.MeshBasicMaterial({ color: 0xffff44, transparent: true, opacity: 0.8 }), // Bottom - Data Security
      new THREE.MeshBasicMaterial({ color: 0xff44ff, transparent: true, opacity: 0.8 }), // Front - Identity Security
      new THREE.MeshBasicMaterial({ color: 0x44ffff, transparent: true, opacity: 0.8 }), // Back - Operational Security
    ]

    // Create cube mesh
    const cube = new THREE.Mesh(geometry, materials)
    cubeRef.current = cube
    scene.add(cube)

    // Create wireframe
    const wireframeGeometry = new THREE.EdgesGeometry(geometry)
    const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 })
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial)
    scene.add(wireframe)

    // Add particles around the cube
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 100
    const posArray = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 10 // x
      posArray[i + 1] = (Math.random() - 0.5) * 10 // y
      posArray[i + 2] = (Math.random() - 0.5) * 10 // z
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00ff00,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      rendererRef.current.setSize(width, height)
      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()
    }

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate)

      if (cubeRef.current) {
        cubeRef.current.rotation.x += 0.01
        cubeRef.current.rotation.y += 0.01
      }

      if (wireframe) {
        wireframe.rotation.x += 0.01
        wireframe.rotation.y += 0.01
      }

      // Animate particles
      if (particles) {
        particles.rotation.y += 0.002
        const positions = particles.geometry.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i]) * 0.001
        }
        particles.geometry.attributes.position.needsUpdate = true
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    // Initial setup
    containerRef.current.appendChild(renderer.domElement)
    handleResize()
    window.addEventListener("resize", handleResize)
    animate()

    // Cleanup
    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current)
      }

      window.removeEventListener("resize", handleResize)

      if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }

      // Dispose geometries and materials
      geometry.dispose()
      wireframeGeometry.dispose()
      particlesGeometry.dispose()
      materials.forEach((material) => material.dispose())
      wireframeMaterial.dispose()
      particlesMaterial.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
