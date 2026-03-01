import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function GlassCard({ children, className = "", glowColor = "rgba(6, 182, 212, 0.3)" }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = mouseX.get() / width - 0.5;
    const yPct = mouseY.get() / height - 0.5;
    
    x.set(clientX - left);
    y.set(clientY - top);
  }
  
  // 3D rotation based on mouse position
  const rotateX = useTransform(mouseY, [0, 500], [5, -5]); // adjust range based on height
  const rotateY = useTransform(mouseX, [0, 500], [-5, 5]); // adjust range based on width

  return (
    <motion.div
      ref={ref}
      className={`glass-card relative overflow-hidden rounded-2xl group preserve-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
