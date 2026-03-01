import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import { User, Code, Database, Smartphone } from "lucide-react";

export default function About() {
  const achievements = [
    {
      icon: <Code className="w-8 h-8 text-cyan-400" />,
      count: "3+",
      label: "Full-Stack Systems",
      desc: "Developed enterprise-grade applications"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-purple-400" />,
      count: "30+",
      label: "Responsive Screens",
      desc: "Built with React & Kotlin"
    },
    {
      icon: <Database className="w-8 h-8 text-blue-400" />,
      count: "20%",
      label: "Performance Boost",
      desc: "Optimized Database Queries"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-6">
              <User size={16} />
              <span>About Me</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold font-heading mb-6 leading-tight">
              Transforming Ideas into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Digital Reality
              </span>
            </motion.h2>
            
            <motion.div variants={containerVariants} className="space-y-4 text-lg text-white/70 font-light leading-relaxed">
              <motion.p variants={itemVariants}>
                I am a motivated and detail-oriented Information Technology undergraduate at SLIIT with hands-on experience in full-stack development, mobile app development, and modern web technologies.
              </motion.p>
              <motion.p variants={itemVariants}>
                Skilled in building scalable, user-friendly applications and implementing end-to-end solutions across web and mobile platforms. My passion lies in solving complex problems through clean code and intuitive design.
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-white/10">
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <h4 className="text-white font-semibold mb-1">Education</h4>
                   <p className="text-white/60 text-sm">BSc (Hons) in IT - SLIIT</p>
                   <p className="text-white/40 text-xs">Oct 2023 – Expected 2027</p>
                 </div>
                 <div>
                    <h4 className="text-white font-semibold mb-1">Languages</h4>
                    <p className="text-white/60 text-sm">English, Sinhala, Tamil</p>
                 </div>
               </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={containerVariants}
          >
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <GlassCard className="p-6 flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {item.count}
                    </h3>
                    <p className="text-white font-medium">{item.label}</p>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[80px] pointer-events-none" />
    </section>
  );
}
