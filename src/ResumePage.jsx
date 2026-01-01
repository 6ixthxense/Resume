
import React, { useState, useEffect } from "react";
import { Download, FileText, Mail, Github, Linkedin, Instagram, Facebook } from "lucide-react";
import { FaPython, FaJs, FaHtml5, FaCss3, FaDatabase, FaChartBar, FaChartLine, FaFileExcel } from "react-icons/fa";
import { motion } from "framer-motion";
import Typical from "react-typical";
import { personalInfo, professionalSummary, education, experience, projects, skills, awards, socialLinks } from "./data/resumeData";

export default function ResumePage() {
  const [theme, setTheme] = useState("light");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Load and persist theme preference
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

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownload = type => {
    const url = type === "resume" ? "/Resume.pdf" : "/CV.pdf";
    window.open(url, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" }
    })
  };

  // Data is now imported from ./data/resumeData.js

  return (
    <div className="relative">
      {/* Scroll bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="min-h-screen bg-slate-900/80 p-4 sm:p-6 lg:p-8 transition-colors">
        <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 lg:p-12 relative overflow-hidden">
          
          {/* Decorative gradient orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block mb-6">
              <motion.img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-full mx-auto shadow-2xl border-4 border-white/30 object-cover"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 rounded-full animate-glow"></div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              {personalInfo.name}
            </h1>
            
            <div className="mt-4 text-xl sm:text-2xl text-gray-200 dark:text-gray-100 h-8 font-light">
              <Typical
                steps={personalInfo.roles}
                loop={Infinity}
                wrapper="span"
              />{' '}
              <span className="text-gold-400">@ {personalInfo.company}</span>
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-gray-200 hover:bg-white/20 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {personalInfo.email}
              </a>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-gray-200">
                {personalInfo.phone}
              </span>
            </div>

            {/* Social Links */}
            <div className="mt-4 flex justify-center gap-4">
              {socialLinks.github && (
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:text-blue-400 transition-colors">
                  <Github className="w-5 h-5 text-gray-200" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:text-blue-400 transition-colors">
                  <Linkedin className="w-5 h-5 text-gray-200" />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:text-pink-400 transition-colors">
                  <Instagram className="w-5 h-5 text-gray-200" />
                </a>
              )}
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:text-blue-600 transition-colors">
                  <Facebook className="w-5 h-5 text-gray-200" />
                </a>
              )}
            </div>

            {/* Download Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={() => handleDownload("resume")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg transition-all font-medium"
              >
                <Download className="w-5 h-5 mr-2" /> Download Resume
              </motion.button>
              <motion.button
                onClick={() => handleDownload("cv")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full shadow-lg transition-all font-medium"
              >
                <FileText className="w-5 h-5 mr-2" /> Download CV
              </motion.button>
            </div>
          </motion.header>

          {/* 💼 Professional Summary */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="mb-8 p-6 sm:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <h2 className="text-3xl font-serif font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">💼 Professional Summary</h2>
            <p className="text-gray-200 dark:text-gray-100 leading-relaxed whitespace-pre-wrap">
              {professionalSummary}
            </p>
          </motion.section>

          {/* 🎓 Education */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="mb-8 p-6 sm:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <h2 className="text-3xl font-serif font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">🎓 Education</h2>
            <p className="text-gray-200 dark:text-gray-100 text-lg">{education.degree} - {education.institution} ({education.period})</p>
          </motion.section>

          {/* 🧑‍💻 Experience - Alternating Timeline */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="mb-12 p-6 sm:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-serif font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8 text-center">🧑‍💻 Experience</h2>
            <div className="relative">
              {/* Center Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-30"></div>
              
              <div className="space-y-12">
                {experience.map((item, i) => (
                  <motion.div 
                    key={i} 
                    custom={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className={`flex items-center justify-between w-full ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Empty space for the other side */}
                    <div className="w-5/12"></div>
                    
                    {/* Timeline Dot */}
                    <div className="z-10 flex items-center justify-center w-8 h-8 bg-slate-900 border-2 border-blue-400 rounded-full shadow-lg shadow-blue-500/20">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Content Card */}
                    <div className="w-5/12">
                      <motion.div 
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="p-5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg hover:shadow-blue-500/10 transition-all group"
                      >
                        <h3 className="text-lg font-medium text-gray-100 group-hover:text-blue-300 transition-colors">{item}</h3>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 📂 Projects */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="mb-8 p-6 sm:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <h2 className="text-3xl font-serif font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">📂 Projects</h2>
            <div className="grid gap-6">
              {projects.map((project, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <p className="text-lg text-gray-200 group-hover:text-blue-300 transition-colors font-medium">
                      {project}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 🛠 Core Competencies */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="mb-8 p-6 sm:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <h2 className="text-3xl font-serif font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">🛠 Core Competencies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((skill, i) => {
                const skillIcons = {
                  "Python": <FaPython className="w-8 h-8 text-blue-400" />,
                  "Power BI": <FaChartBar className="w-8 h-8 text-yellow-400" />,
                  "R": <FaChartLine className="w-8 h-8 text-blue-500" />,
                  "JavaScript": <FaJs className="w-8 h-8 text-yellow-300" />,
                  "HTML": <FaHtml5 className="w-8 h-8 text-orange-500" />,
                  "CSS": <FaCss3 className="w-8 h-8 text-blue-500" />,
                  "Google Sheets": <FaFileExcel className="w-8 h-8 text-green-500" />,
                  "SQL": <FaDatabase className="w-8 h-8 text-gray-400" />
                };

                return (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }} 
                    className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-3 group transition-all cursor-pointer"
                  >
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-700" />
                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={175.93} strokeDashoffset={175.93 - (175.93 * skill.level) / 100} className="text-blue-400" />
                      </svg>
                      <span className="absolute flex items-center justify-center">
                        {skillIcons[skill.name] || <span className="text-sm font-bold text-white">{skill.level}%</span>}
                      </span>
                    </div>
                    <p className="font-medium text-gray-200 group-hover:text-blue-300 transition-colors text-center">{skill.name}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* 🏆 Awards & Achievements */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="mb-8 p-6 sm:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <h2 className="text-3xl font-serif font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              🏆 Awards & Achievements
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {awards.map((award, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, borderColor: "rgba(59, 130, 246, 0.5)" }}
                  className="p-6 bg-white/5 border border-white/10 rounded-xl shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gold-500/20 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-100 group-hover:text-gold-400 transition-colors">
                        {award.title}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Year: {award.year}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}