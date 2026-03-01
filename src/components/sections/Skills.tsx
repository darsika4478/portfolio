import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "Figma"],
    color: "border-cyan-500/50"
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "Java", "PHP", "Python"],
    color: "border-blue-500/50"
  },
  {
    title: "Database",
    skills: ["MongoDB", "MySQL", "Data Structures", "Algorithms"],
    color: "border-purple-500/50"
  },
  {
    title: "Mobile & Tools",
    skills: ["Android Studio", "Kotlin", "XML", "Git", "GitHub"],
    color: "border-pink-500/50"
  }
];

const certifications = [
  "Indexing Design Fundamentals – MongoDB",
  "MongoDB Basics for Students",
  "Python for Beginners – UoM",
  "AI/ML Engineer – Stage 1 – SLIIT"
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-4xl font-bold font-heading mb-10 text-white"
            >
              Technical <span className="text-cyan-400">Expertise</span>
            </motion.h2>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={containerVariants}
            >
              {skillCategories.map((category, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                >
                  <GlassCard className={`p-6 h-full border-t-4 ${category.color}`}>
                    <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-white/5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="space-y-12">
            
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                className="text-3xl font-bold font-heading mb-8 text-white"
              >
                Certifications
              </motion.h2>
              <motion.div
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={containerVariants}
              >
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5 },
                      },
                    }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                    <span className="text-white/80 font-medium">{cert}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div>
              <motion.h2 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                className="text-3xl font-bold font-heading mb-8 text-white"
              >
                Soft Skills
              </motion.h2>
              <motion.div 
                className="flex flex-wrap gap-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={containerVariants}
              >
                {["Communication", "Teamwork", "Problem-Solving", "Adaptability", "Time Management", "Critical Thinking"].map((skill, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.4 },
                      },
                    }}
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
