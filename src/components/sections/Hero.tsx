import { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react";
import * as THREE from "three";

/* ----------------------------- */
/* Utils */
function generateSpherePoints(count: number, radius: number): Float32Array {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.cbrt(Math.random()) * radius;
    points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    points[i * 3 + 2] = r * Math.cos(phi);
  }
  return points;
}

/* ----------------------------- */
/* StarField */
function StarField(props: ThreeElements["group"]) {
  const pointsRef = useRef<THREE.Points>(null!);
  const [positions] = useState(() => generateSpherePoints(4000, 1.5));

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.x -= delta / 20;
    pointsRef.current.rotation.y -= delta / 30;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]} {...props}>
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

/* ----------------------------- */
/* Hero Section */
export default function Hero() {
  const photoRef = useRef<HTMLDivElement | null>(null);

  // Gmail compose in browser
  const openGmail = () => {
    const email = "darsikanagaraja@gmail.com";
    const subject = encodeURIComponent("Hiring Inquiry");
    const body = encodeURIComponent(
      "Hi Darsika,\n\nI would like to discuss potential collaboration or opportunities with you."
    );
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailLink, "_blank");
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-x-hidden pt-28 pb-12 px-6 lg:px-16">
      {/* StarField */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <StarField />
        </Canvas>
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 space-y-6"
        >
          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold">
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Darsika Nagaraja
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl text-white/80">
            Software Engineer | Full Stack Developer
          </h2>

          <p className="text-lg text-white/60 max-w-xl">
            Building scalable, user-centric web and mobile applications with
            modern 3D technologies and enterprise-grade architecture.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.a
              href="#projects"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg flex items-center gap-2 shadow-md"
            >
              View Projects <ArrowRight size={20} />
            </motion.a>

            <motion.a
              href="/Darsika_CV.pdf"
              download
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg flex items-center gap-2 shadow-md"
            >
              Download CV <Download size={20} />
            </motion.a>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-6 pt-6 text-white/60">
            <a
              href="https://github.com/darsika4478"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              <Github size={24} />
            </a>

            <a
              href="https://linkedin.com/in/darsika-nagaraja-25584b338"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              <Linkedin size={24} />
            </a>

            <button
              onClick={openGmail}
              className="focus:outline-none hover:text-cyan-400 transition-colors"
            >
              <Mail size={24} />
            </button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          ref={photoRef}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[28rem] flex-shrink-0 mt-8 lg:mt-0"
        >
          <div className="absolute -inset-4 bg-cyan-500/20 rounded-3xl blur-3xl" />
          <img
            src="/Darsika.png"
            alt="Darsika Nagaraja"
            className="relative w-full h-full object-cover rounded-3xl border-4 border-cyan-500/30 shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
