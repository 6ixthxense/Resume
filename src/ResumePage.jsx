import React, { useState, useEffect } from "react";
import { Download, FileText, Mail, Github, Linkedin, Instagram, Facebook, Brain, Phone, Rocket } from "lucide-react";
import { FaPython, FaJs, FaHtml5, FaCss3, FaDatabase, FaChartBar, FaChartLine, FaFileExcel } from "react-icons/fa";
import { motion, useScroll, useSpring } from "framer-motion";
import Typical from "react-typical";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';
import { personalInfo, professionalSummary, education, experience, projects, skills, awards, socialLinks } from "./data/resumeData";

export default function ResumePage() {
  const [theme, setTheme] = useState("light");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
    else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleDownload = type => {
    const url = type === "resume" ? "/Resume.pdf" : "/CV.pdf";
    window.open(url, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const radarData = skills.map(s => ({
    subject: s.name,
    A: s.level,
    fullMark: 100,
  }));

  return (
    <div className="relative selection:bg-blue-500/30">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-200 p-4 sm:p-6 lg:p-12 transition-colors relative overflow-hidden">

        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 100, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"
          />
        </div>

        <div className="max-w-6xl mx-auto space-y-12">

          <motion.header
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center relative py-12 px-6 backdrop-blur-3xl bg-white/[0.02] border border-white/10 rounded-[40px] shadow-2xl"
          >
            <div className="relative inline-block mb-8 group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-8px] rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-md group-hover:opacity-100 transition-opacity"
              />
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full mx-auto shadow-2xl border-4 border-slate-900 object-cover z-10"
              />
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent mb-6">
              {personalInfo.name}
            </h1>

            <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-light text-blue-400 mb-8">
              <Typical steps={personalInfo.roles} loop={Infinity} wrapper="span" />
              <span className="text-slate-400">@ {personalInfo.company}</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm transition-all hover:scale-105">
                <Mail className="w-5 h-5 text-blue-400" /> {personalInfo.email}
              </a>
              <div className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm">
                <Phone className="w-5 h-5 text-purple-400" /> {personalInfo.phone}
              </div>
            </div>

            <div className="flex justify-center gap-6 mb-12">
              {[
                { icon: Github, url: socialLinks.github, color: 'hover:text-white' },
                { icon: Linkedin, url: socialLinks.linkedin, color: 'hover:text-blue-500' },
                { icon: Instagram, url: socialLinks.instagram, color: 'hover:text-pink-500' },
                { icon: Facebook, url: socialLinks.facebook, color: 'hover:text-blue-600' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  whileHover={{ y: -5, scale: 1.2 }}
                  className={`p-3 bg-white/5 rounded-2xl border border-white/10 transition-colors ${social.color}`}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
                onClick={() => handleDownload("resume")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all font-bold group"
              >
                <Download className="w-6 h-6 mr-3 transition-transform group-hover:-translate-y-1" /> Get Resume
              </motion.button>
              <motion.button
                onClick={() => handleDownload("cv")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-2xl backdrop-blur-md transition-all font-bold"
              >
                <FileText className="w-6 h-6 mr-3 text-purple-400" /> View CV
              </motion.button>
            </div>
          </motion.header>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.section
              id="summary"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="p-8 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] hover:border-blue-500/30 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-2xl group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Strategy</h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-lg whitespace-pre-wrap">
                {professionalSummary}
              </p>
            </motion.section>

            <motion.section
              id="education"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="p-8 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] hover:border-purple-500/30 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-2xl group-hover:scale-110 transition-transform">
                  <Rocket className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Foundation</h2>
              </div>
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                    <p className="text-purple-400 font-medium">{edu.institution}</p>
                    <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-slate-500 font-mono">
                      {edu.period}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <motion.section
            id="skills"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="p-8 lg:p-12 bg-white/[0.02] border border-white/10 rounded-[40px] shadow-2xl relative overflow-hidden"
          >
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Technical Analytics & Proficiency
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="h-[400px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Expertise"
                      dataKey="A"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.5}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, i) => {
                  const icons = {
                    "Python": <FaPython className="text-blue-400" />,
                    "Power BI": <FaChartBar className="text-yellow-400" />,
                    "R": <FaChartLine className="text-blue-500" />,
                    "JavaScript": <FaJs className="text-yellow-300" />,
                    "HTML": <FaHtml5 className="text-orange-500" />,
                    "CSS": <FaCss3 className="text-blue-500" />,
                    "Google Sheets": <FaFileExcel className="text-green-500" />,
                    "SQL": <FaDatabase className="text-slate-400" />
                  };
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-4 group"
                    >
                      <div className="text-3xl opacity-60 group-hover:opacity-100 transition-opacity">
                        {icons[skill.name]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-300">{skill.name}</div>
                        <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                            className="h-full bg-blue-500"
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>

          <motion.section
            id="experience"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Professional Evolution</h2>
            <div className="flex flex-col gap-6">
              {experience.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-8 p-6 bg-white/[0.02] border-l-4 border-blue-600 rounded-r-3xl group"
                >
                  <div className="text-3xl font-mono text-slate-800 font-black group-hover:text-blue-900 transition-colors">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{item}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="projects"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-12"
          >
            <h2 className="text-4xl font-bold text-center">Selected Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-8 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-[32px] flex flex-col items-center justify-center text-center hover:border-blue-500/50 transition-all group cursor-pointer h-full"
                >
                  <FileText className="w-10 h-10 text-slate-500 mb-6 group-hover:text-blue-400 transition-colors mx-auto" />
                  <p className="text-xl font-medium text-slate-300 group-hover:text-white transition-colors">
                    {project}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="awards"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="p-8 lg:p-12 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 rounded-[40px] text-center"
          >
            <h2 className="text-4xl font-bold mb-12">Recognition</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {awards.map((award, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-500/40 transition-all">
                    <span className="text-3xl">🏆</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{award.title}</h3>
                  <p className="text-slate-500 font-mono mt-1">{award.year}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <footer className="py-12 text-center text-slate-600 border-t border-white/5 text-sm uppercase tracking-widest font-mono">
            &copy; {new Date().getFullYear()} Woravut Dairoop &bull; Engineered with passion
          </footer>

        </div>
      </div>
    </div>
  );
}