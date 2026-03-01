import Navbar from "@/components/layout/Navbar";
import Background3D from "@/components/layout/Background3D";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-cyan-500/30 overflow-x-hidden">
      <Background3D />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <footer className="relative z-10 py-8 text-center text-white/30 text-sm border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <p>© 2025 Darsika Nagaraja. All rights reserved.</p>
        <p className="mt-2">Built with React, Three.js & Tailwind CSS</p>
      </footer>
    </div>
  );
}
