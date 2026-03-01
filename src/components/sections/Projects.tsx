import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import { ExternalLink, Github, ShoppingBag, Home, Smartphone, Headphones } from "lucide-react";

const projects = [
  {
    title: "Online Clothing Store",
    category: "MERN Stack E-commerce",
    description: "A complete e-commerce platform with product catalog, inventory management, secure payments, and order tracking. Features a robust admin dashboard and responsive customer interface.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/darsika4478/web-project-2.git",
    icon: <ShoppingBag size={32} className="text-cyan-400" />,
    color: "from-cyan-500 to-blue-600"
  },
  {
    title: "Mobile Habit Tracker",
    category: "Android Development",
    description: "Android application focused on personal productivity. Features include habit tracking, hydration reminders, onboarding flows, and local data persistence using SharedPreferences.",
    tech: ["Kotlin", "Android Studio", "XML", "SharedPreferences"],
    github: "https://github.com/darsika4478/Mobile_App.git",
    icon: <Smartphone size={32} className="text-purple-400" />,
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Customer Care System",
    category: "Java Web Application",
    description: "Streamlined system for managing customer appointments, support tickets, and feedback. Includes integrated payment workflows and a dynamic UI.",
    tech: ["Java", "MySQL", "Tailwind CSS", "Alpine.js"],
    github: "https://github.com/darsika4478/web-project-3.git",
    icon: <Headphones size={32} className="text-green-400" />,
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "Property Sales System",
    category: "Full Stack Web App",
    description: "Real estate platform facilitating property listings and sales. Implements role-based access control (RBAC), complex CRUD operations, and optimized database queries.",
    tech: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    github: "https://github.com/darsika4478/web-projects.git",
    icon: <Home size={32} className="text-orange-400" />,
    color: "from-orange-500 to-red-600"
  }
];

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Projects</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A selection of my recent work in web and mobile application development.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <GlassCard className="h-full flex flex-col p-8 group">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} bg-opacity-10 flex items-center justify-center shadow-lg`}>
                    {project.icon}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                  >
                    <Github size={20} />
                  </a>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm font-mono text-cyan-400/80 mb-4 uppercase tracking-wider">
                  {project.category}
                </p>

                <p className="text-white/60 mb-6 leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
