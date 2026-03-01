import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Box } from '@react-three/drei';
import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Global state for mouse and scroll (minimal updates)
const globalState = {
  mouseX: 0,
  mouseY: 0,
  scrollY: 0,
  maxScroll: 1,
};

// Optimized easing function
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function ParticlesWithAutoMotion() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Memoize positions - create once, never change
  const positions = useMemo(() => {
    const count = 1200; // Reduced from 2000
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 100;
      pos[i + 1] = (Math.random() - 0.5) * 100;
      pos[i + 2] = (Math.random() - 0.5) * 100;
    }
    return pos;
  }, []);

  const state = useRef({
    rotX: 0,
    rotY: 0,
    posZ: 0,
    opacity: 0.6,
  });

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const t = clock.elapsedTime * 0.1; // Pre-scaled time
    
    // === AUTO MOTION ===
    const autoRotX = Math.sin(t * 1.5) * 0.5;
    const autoRotY = Math.cos(t) * 0.5;

    // === MOUSE INTERACTION ===
    const targetRotX = autoRotX + globalState.mouseY * 0.25;
    const targetRotY = autoRotY + globalState.mouseX * 0.25;

    // === SCROLL INTERACTION ===
    const scrollProgress = globalState.scrollY / globalState.maxScroll;
    const targetPosZ = scrollProgress * 20;

    // Smooth easing with optimized lerp
    state.current.rotX = lerp(state.current.rotX, targetRotX, 0.08);
    state.current.rotY = lerp(state.current.rotY, targetRotY, 0.08);
    state.current.posZ = lerp(state.current.posZ, targetPosZ, 0.1);

    pointsRef.current.rotation.x = state.current.rotX;
    pointsRef.current.rotation.y = state.current.rotY;
    pointsRef.current.position.z = state.current.posZ;

    // Optimize opacity update - only update material when needed
    const targetOpacity = 0.55 + Math.sin(clock.elapsedTime * 0.5) * 0.05;
    if (Math.abs(state.current.opacity - targetOpacity) > 0.01) {
      state.current.opacity = targetOpacity;
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.opacity = targetOpacity;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#06b6d4"
        size={0.15}
        sizeAttenuation={true}
        opacity={0.6}
        depthWrite={false}
      />
    </Points>
  );
}

function FloatingShapesWithAutoMotion() {
  const group1Ref = useRef<THREE.Group>(null);
  const group2Ref = useRef<THREE.Group>(null);
  const group3Ref = useRef<THREE.Group>(null);

  const state1 = useRef({ x: -30, y: 0, z: -50 });
  const state2 = useRef({ x: 40, y: 20, z: -60 });
  const state3 = useRef({ x: 0, y: -30, z: -40 });

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const parallaxX = globalState.mouseX * 5;
    const parallaxY = globalState.mouseY * 5;
    const scrollProgress = globalState.scrollY / globalState.maxScroll;

    // === SHAPE 1 - Cyan Sphere ===
    if (group1Ref.current) {
      const autoX = Math.sin(t * 0.2) * 3;
      const autoY = Math.cos(t * 0.25) * 4;
      const targetX = -30 + autoX + parallaxX * 0.3;
      const targetY = autoY + parallaxY * 0.3;
      const targetZ = -50 + scrollProgress * 40;

      state1.current.x = lerp(state1.current.x, targetX, 0.1);
      state1.current.y = lerp(state1.current.y, targetY, 0.1);
      state1.current.z = lerp(state1.current.z, targetZ, 0.12);

      group1Ref.current.position.set(state1.current.x, state1.current.y, state1.current.z);
      group1Ref.current.rotation.x = Math.sin(t * 0.1) * 0.3 + globalState.mouseY * 0.0003;
      group1Ref.current.rotation.y = Math.cos(t * 0.15) * 0.2 + globalState.mouseX * 0.0003;
    }

    // === SHAPE 2 - Purple Cube ===
    if (group2Ref.current) {
      const autoX = Math.cos(t * 0.18) * 4;
      const autoY = Math.sin(t * 0.22) * 3;
      const targetX = 40 + autoX + parallaxX * 0.4;
      const targetY = 20 + autoY + parallaxY * 0.4;
      const targetZ = -60 + scrollProgress * 25;

      state2.current.x = lerp(state2.current.x, targetX, 0.1);
      state2.current.y = lerp(state2.current.y, targetY, 0.1);
      state2.current.z = lerp(state2.current.z, targetZ, 0.12);

      group2Ref.current.position.set(state2.current.x, state2.current.y, state2.current.z);
      group2Ref.current.rotation.x = Math.cos(t * 0.12) * 0.25 - globalState.mouseY * 0.0002;
      group2Ref.current.rotation.y = Math.sin(t * 0.14) * 0.25 - globalState.mouseX * 0.0002;
    }

    // === SHAPE 3 - Blue Sphere ===
    if (group3Ref.current) {
      const autoX = Math.sin(t * 0.16) * 2;
      const autoY = Math.cos(t * 0.2) * 3;
      const targetX = autoX + parallaxX * 0.25;
      const targetY = -30 + autoY + parallaxY * 0.25;
      const targetZ = -40 + scrollProgress * 15;

      state3.current.x = lerp(state3.current.x, targetX, 0.1);
      state3.current.y = lerp(state3.current.y, targetY, 0.1);
      state3.current.z = lerp(state3.current.z, targetZ, 0.12);

      group3Ref.current.position.set(state3.current.x, state3.current.y, state3.current.z);
      group3Ref.current.rotation.z = Math.sin(t * 0.1) * 0.2;
      group3Ref.current.rotation.x += 0.0002 + globalState.mouseY * 0.0001;
    }
  });

  return (
    <>
      <group ref={group1Ref} position={[-30, 0, -50]}>
        <Sphere args={[8, 24, 24]}>
          <meshPhongMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.3}
            transparent
            opacity={0.15}
            wireframe={true}
            wireframeLinewidth={1}
          />
        </Sphere>
      </group>

      <group ref={group2Ref} position={[40, 20, -60]}>
        <Box args={[12, 12, 12]}>
          <meshPhongMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
            transparent
            opacity={0.12}
            wireframe={true}
            wireframeLinewidth={1}
          />
        </Box>
      </group>

      <group ref={group3Ref} position={[0, -30, -40]}>
        <Sphere args={[10, 24, 24]}>
          <meshPhongMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.25}
            transparent
            opacity={0.1}
            wireframe={true}
            wireframeLinewidth={1}
          />
        </Sphere>
      </group>
    </>
  );
}

function CameraAutoMotion() {
  const camera = useRef<THREE.Camera | null>(null);
  const state = useRef({ x: 0, y: 0 });

  useFrame(({ camera: threeCamera, clock }) => {
    if (!camera.current) {
      camera.current = threeCamera;
    }

    const t = clock.elapsedTime;
    const autoX = Math.sin(t * 0.08) * 1.5;
    const autoY = Math.cos(t * 0.06) * 1.2;

    const targetX = autoX + globalState.mouseX * 2;
    const targetY = autoY + globalState.mouseY * 2;

    state.current.x = lerp(state.current.x, targetX, 0.08);
    state.current.y = lerp(state.current.y, targetY, 0.08);

    if (camera.current) {
      camera.current.position.x = state.current.x;
      camera.current.position.y = state.current.y;
      camera.current.lookAt(0, 0, 0);
    }
  });

  return null;
}

export default function Background3D() {
  const [canvasError, setCanvasError] = useState(false);

  useEffect(() => {
    // Debounced mouse move for better performance
    let mouseTimeout: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      globalState.mouseX = x;
      globalState.mouseY = y;
      
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        globalState.mouseX = lerp(globalState.mouseX, 0, 0.05);
        globalState.mouseY = lerp(globalState.mouseY, 0, 0.05);
      }, 3000);
    };

    const handleScroll = () => {
      globalState.scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      globalState.maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    setTimeout(() => {
      globalState.maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    }, 300);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(mouseTimeout);
    };
  }, []);

  if (canvasError) {
    return (
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75, near: 0.1, far: 10000 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        onError={() => setCanvasError(true)}
      >
        <color attach="background" args={['#0f172a']} />

        <ambientLight intensity={0.3} />
        <pointLight position={[50, 50, 50]} intensity={0.4} color="#06b6d4" />
        <pointLight position={[-50, -50, -50]} intensity={0.3} color="#8b5cf6" />

        <ParticlesWithAutoMotion />
        <FloatingShapesWithAutoMotion />
        <CameraAutoMotion />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />
    </div>
  );
}
