import React, { useState, useEffect, useRef } from "react";
import { Download, FileText, Mail, Github, Linkedin, Instagram, Facebook, Brain, Phone, Sun, Moon, ArrowUp, GraduationCap, Code, Trophy, ChevronRight, Quote } from "lucide-react";
import { FaPython, FaJs, FaHtml5, FaCss3, FaDatabase, FaChartBar, FaChartLine, FaFileExcel } from "react-icons/fa";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Typical from "react-typical";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts';
import { resumeData, skills, socialLinks } from "./data/resumeData";
import GitHubHeatmap from "./GitHubHeatmap";

// ─── Skeleton Loader ──────────────────────────────────────
// eslint-disable-next-line no-unused-vars
function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-2xl ${className}`} role="status" aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// SectionSkeleton available for lazy-loaded sections
// function SectionSkeleton({ isDark }) { ... }

// ─── Animated Counter ─────────────────────────────────────
function AnimatedCounter({ value, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const stepTime = (duration * 1000) / end;
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Language Transition Wrapper ──────────────────────────
// ─── Language Transition Wrapper ──────────────────────────
function LangTransition({ children, lang, className = "" }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lang}
        className={className}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function ResumePage({ lang, setLang, theme, setTheme }) {
  const data = resumeData[lang];
  const { personalInfo, professionalSummary, education, experience, projects, awards, sections } = data;
  const stats = data.stats;
  const testimonials = data.testimonials;

  const blog = data.blog;

  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme, isDark]);

  useEffect(() => {
    document.body.classList.toggle("lang-th", lang === "th");
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownload = type => {
    const url = type === "resume" ? "/Resume.pdf" : "/CV.pdf";
    window.open(url, "_blank");
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };
  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const radarData = skills.map(s => ({ subject: s.name, A: s.level, fullMark: 100 }));

  return (
    <div className="relative selection:bg-blue-500/30" role="main">
      {/* Skip to content link for accessibility */}
      <a href="#summary" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">
        Skip to content
      </a>

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[100] origin-left print:hidden"
        style={{ scaleX }}
        role="progressbar"
        aria-label="Page scroll progress"
      />

      <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'} p-4 sm:p-6 lg:p-12 transition-colors duration-500 relative overflow-hidden`}>

        {/* Ambient Blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 translate-z-0 print:hidden" aria-hidden="true">
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] ${isDark ? 'bg-blue-600/10' : 'bg-blue-400/10'} rounded-full blur-[100px] transform-gpu`}
          />
          <motion.div
            animate={{ x: [0, -80, 0], y: [0, 100, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className={`absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] ${isDark ? 'bg-purple-600/10' : 'bg-purple-400/10'} rounded-full blur-[100px] transform-gpu`}
          />
        </div>

        <div className="max-w-6xl mx-auto space-y-16">

          {/* ═══════════════ HEADER ═══════════════ */}
          <motion.header
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className={`relative py-16 px-8 backdrop-blur-xl ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/60 border-white/30'} border rounded-[40px] shadow-2xl transform-gpu flex flex-col items-center text-center print:shadow-none print:border-slate-200 print:bg-white`}
            role="banner"
          >
            {/* Top Controls */}
            <div className="absolute top-6 right-6 flex gap-2 items-center print:hidden" role="toolbar" aria-label="Settings">
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={`p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-white/5 hover:bg-white/10 text-slate-400' : 'bg-slate-200 hover:bg-slate-300 text-slate-600'}`}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <div className={`h-5 w-px ${isDark ? 'bg-white/10' : 'bg-slate-300'}`} aria-hidden="true" />
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${lang === 'en' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : isDark ? 'bg-white/5 text-slate-400 hover:bg-white/10' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}
                aria-label="Switch to English"
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
              <button
                onClick={() => setLang('th')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${lang === 'th' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : isDark ? 'bg-white/5 text-slate-400 hover:bg-white/10' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}
                aria-label="เปลี่ยนเป็นภาษาไทย"
                aria-pressed={lang === 'th'}
              >
                TH
              </button>
            </div>

            {/* Profile Image + Status Badge */}
            <div className="relative mb-10 group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-8px] rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-md group-hover:opacity-100 transition-opacity print:hidden"
                aria-hidden="true"
              />
              <img
                src={personalInfo.profileImage}
                alt={`${personalInfo.name}`}
                className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full mx-auto shadow-2xl border-4 border-slate-900 object-cover z-10 print:border-slate-300 print:w-32 print:h-32"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500/90 backdrop-blur-sm rounded-full shadow-lg shadow-emerald-500/20 print:bg-emerald-600">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse print:animate-none" aria-hidden="true" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap">{personalInfo.status}</span>
              </div>
            </div>

            <LangTransition lang={lang}>
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-b ${isDark ? 'from-white to-slate-500' : 'from-slate-800 to-slate-500'} bg-clip-text text-transparent mb-6 pb-4 leading-tight ${lang === 'th' ? 'font-bold' : 'font-black tracking-tighter'} print:text-slate-900 print:text-4xl`}>
                {personalInfo.name}
              </h1>
            </LangTransition>

            <div className={`flex items-center justify-center gap-2 text-xl sm:text-2xl font-light ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-8 print:text-blue-700`}>
              <Typical key={lang} steps={personalInfo.roles} loop={Infinity} wrapper="span" />
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>@ {personalInfo.company}</span>
            </div>

            {/* Contact */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <a href={`mailto:${personalInfo.email}`} className={`flex items-center gap-2 px-5 py-2.5 ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-slate-100 hover:bg-slate-200 border-slate-200'} border rounded-full text-sm transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500`} aria-label={`Send email to ${personalInfo.email}`}>
                <Mail className="w-4 h-4 text-blue-400" /> {personalInfo.email}
              </a>
              <div className={`flex items-center gap-2 px-5 py-2.5 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} border rounded-full text-sm`}>
                <Phone className="w-4 h-4 text-purple-400" /> {personalInfo.phone}
              </div>
            </div>

            {/* Social */}
            <nav className="flex justify-center gap-4 mb-10 print:hidden" aria-label="Social links">
              {[
                { icon: Github, url: socialLinks.github, label: "GitHub", color: 'hover:text-white hover:bg-slate-700' },
                { icon: Linkedin, url: socialLinks.linkedin, label: "LinkedIn", color: 'hover:text-white hover:bg-blue-600' },
                { icon: Instagram, url: socialLinks.instagram, label: "Instagram", color: 'hover:text-white hover:bg-pink-600' },
                { icon: Facebook, url: socialLinks.facebook, label: "Facebook", color: 'hover:text-white hover:bg-blue-700' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`p-3 ${isDark ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'} rounded-2xl border transition-all ${social.color} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </nav>

            {/* Download */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 print:hidden">
              <motion.button
                onClick={() => handleDownload("resume")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-7 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all font-bold group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Download className="w-5 h-5 mr-2 transition-transform group-hover:-translate-y-0.5" /> {lang === 'th' ? 'ดาวน์โหลดเรซูเม่' : 'Get Resume'}
              </motion.button>
              <motion.button
                onClick={() => handleDownload("cv")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-7 py-3.5 ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/20' : 'bg-white hover:bg-slate-50 border-slate-200'} border rounded-2xl backdrop-blur-md transition-all font-bold focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <FileText className="w-5 h-5 mr-2 text-purple-400" /> {lang === 'th' ? 'ดู CV' : 'View CV'}
              </motion.button>
            </div>

            {/* Hero Stats */}
            <div className="w-full max-w-2xl" role="list" aria-label="Statistics">
              <LangTransition lang={lang} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="text-center"
                    role="listitem"
                  >
                    <div className={`text-3xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-slate-800'} print:text-slate-900`}>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'} uppercase tracking-wider`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </LangTransition>
            </div>
          </motion.header>

          {/* ═══════════════ SUMMARY + EDUCATION ═══════════════ */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.section id="summary" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
              className={`p-8 ${isDark ? 'bg-white/[0.03] border-white/10 hover:border-blue-500/30' : 'bg-white/60 border-white/30 hover:border-blue-300'} backdrop-blur-lg border rounded-[32px] transition-colors group transform-gpu print:border-slate-200 print:bg-white`}
              aria-labelledby="summary-heading"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-2xl group-hover:scale-110 transition-transform">
                  <Brain className="w-7 h-7 text-blue-400" />
                </div>
                <h2 id="summary-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">💼 {sections.summary}</h2>
              </div>
              <LangTransition lang={lang}>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed text-base whitespace-pre-wrap print:text-slate-700`}>
                  {professionalSummary}
                </p>
              </LangTransition>
            </motion.section>

            <motion.section id="education" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
              className={`p-8 ${isDark ? 'bg-white/[0.03] border-white/10 hover:border-purple-500/30' : 'bg-white/60 border-white/30 hover:border-purple-300'} backdrop-blur-lg border rounded-[32px] transition-colors group transform-gpu print:border-slate-200 print:bg-white`}
              aria-labelledby="education-heading"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-2xl group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-7 h-7 text-purple-400" />
                </div>
                <h2 id="education-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">🎓 {sections.education}</h2>
              </div>
              <LangTransition lang={lang}>
                <div className="space-y-8">
                  {education.map((edu, i) => (
                    <div key={i} className="space-y-2">
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{edu.degree}</h3>
                      <p className="text-purple-400 font-medium">{edu.institution}</p>
                      <div className={`inline-block px-4 py-1.5 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} border rounded-full text-sm text-slate-500 font-mono`}>
                        {edu.period}
                      </div>
                    </div>
                  ))}
                </div>
              </LangTransition>
            </motion.section>
          </div>

          {/* ═══════════════ SKILLS ═══════════════ */}
          <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
            className={`p-8 lg:p-12 ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/60 border-white/30'} border rounded-[40px] shadow-2xl relative overflow-hidden transform-gpu print:shadow-none print:border-slate-200`}
            aria-labelledby="skills-heading"
          >
            <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent print:text-slate-800">
              📊 {sections.analytics}
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="h-[280px] sm:h-[360px] w-full flex items-center justify-center print:hidden" aria-hidden="true">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke={isDark ? '#334155' : '#cbd5e1'} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Expertise" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
                    <Tooltip contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#fff', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, borderRadius: '12px' }} itemStyle={{ color: isDark ? '#fff' : '#1e293b' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
                    <motion.div key={i} variants={staggerItem} whileHover={{ scale: 1.02 }}
                      className={`p-4 ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-100 hover:bg-slate-50'} border rounded-2xl flex items-center gap-4 group transition-colors`}
                    >
                      <div className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity shrink-0" aria-hidden="true">{icons[skill.name]}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'} truncate`}>{skill.name}</span>
                          <span className={`text-xs font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{skill.level}%</span>
                        </div>
                        <div className={`w-full h-1.5 ${isDark ? 'bg-slate-800' : 'bg-slate-200'} rounded-full overflow-hidden`} role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                            className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.section>

          {/* ═══════════════ EXPERIENCE TIMELINE ═══════════════ */}
          <motion.section id="experience" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="space-y-10" aria-labelledby="exp-heading">
            <h2 id="exp-heading" className="text-3xl sm:text-4xl font-bold text-center">🚀 {sections.experience}</h2>
            <div className="relative">
              <div className={`absolute left-6 sm:left-8 top-0 bottom-0 w-px ${isDark ? 'bg-gradient-to-b from-blue-500 via-purple-500 to-transparent' : 'bg-gradient-to-b from-blue-400 via-purple-400 to-transparent'} print:bg-slate-300`} aria-hidden="true" />
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <LangTransition lang={lang} className="space-y-8">
                  {experience.map((item, i) => (
                    <motion.div key={i} variants={staggerItem} className="relative pl-16 sm:pl-20">
                      <div className={`absolute left-4 sm:left-6 w-4 h-4 rounded-full border-2 ${i === 0 ? 'bg-blue-500 border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.5)]' : isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-300'} z-10`} aria-hidden="true" />
                      <article className={`p-6 sm:p-8 ${isDark ? 'bg-white/[0.03] border-white/10 hover:border-blue-500/30' : 'bg-white/70 border-white/30 hover:border-blue-300'} border rounded-3xl transition-all group print:border-slate-200 print:bg-white`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                          <h3 className={`text-xl font-bold ${isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-800 group-hover:text-blue-600'} transition-colors`}>{item.title}</h3>
                          <span className={`inline-flex items-center px-3 py-1 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} border rounded-full text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'} whitespace-nowrap`}>{item.period}</span>
                        </div>
                        <p className={`text-sm font-medium ${isDark ? 'text-blue-400/80' : 'text-blue-600/80'} mb-3`}>{item.company}</p>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-4 leading-relaxed`}>{item.description}</p>
                        <ul className="space-y-2">
                          {item.highlights.map((h, j) => (
                            <li key={j} className={`flex items-start gap-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                              <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} aria-hidden="true" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </article>
                    </motion.div>
                  ))}
                </LangTransition>
              </motion.div>
            </div>
          </motion.section>

          {/* ═══════════════ PROJECTS ═══════════════ */}
          <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="space-y-10" aria-labelledby="proj-heading">
            <h2 id="proj-heading" className="text-3xl sm:text-4xl font-bold text-center">💻 {sections.projects}</h2>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <LangTransition lang={lang} className="grid md:grid-cols-2 gap-6">
                {projects.map((project, i) => (
                  <motion.article key={i} variants={staggerItem} whileHover={{ y: -6 }}
                    className={`p-6 sm:p-8 ${isDark ? 'bg-gradient-to-br from-white/[0.05] to-transparent border-white/10 hover:border-blue-500/40' : 'bg-white/70 border-white/30 hover:border-blue-300'} border rounded-[28px] transition-all group cursor-pointer flex flex-col print:border-slate-200 print:bg-white`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2.5 ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'} rounded-xl`}><Code className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} /></div>
                      {project.status === 'production' && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" aria-hidden="true" />Live
                        </span>
                      )}
                    </div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-800 group-hover:text-blue-600'} transition-colors mb-2`}>{project.title}</h3>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed mb-4 flex-1`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t, j) => (
                        <span key={j} className={`px-2.5 py-1 ${isDark ? 'bg-white/5 text-slate-300 border-white/5' : 'bg-slate-100 text-slate-600 border-slate-200'} border rounded-lg text-[11px] font-medium`}>{t}</span>
                      ))}
                    </div>
                    <div className={`text-xs font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{project.period}</div>
                  </motion.article>
                ))}
              </LangTransition>
            </motion.div>
          </motion.section>

          {/* ═══════════════ CERTIFICATIONS (HIDDEN FOR NOW) ═══════════════ */}
          {/* <motion.section id="certifications" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} aria-labelledby="cert-heading">
            <h2 id="cert-heading" className="text-3xl sm:text-4xl font-bold text-center mb-10">📜 {sections.certifications}</h2>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <LangTransition lang={lang} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {certifications.map((cert, i) => (
                  <motion.div key={i} variants={staggerItem} whileHover={{ y: -4, scale: 1.02 }}
                    className={`p-5 ${isDark ? 'bg-white/[0.03] border-white/10 hover:border-cyan-500/30' : 'bg-white/60 border-white/30 hover:border-cyan-300'} border rounded-2xl text-center transition-all group`}
                  >
                    <div className="text-3xl mb-3">{cert.icon}</div>
                    <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'} mb-1`}>{cert.title}</h3>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'} mb-2`}>{cert.issuer}</p>
                    <span className={`inline-block px-2.5 py-0.5 ${isDark ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-cyan-100 text-cyan-700 border-cyan-200'} border rounded-full text-[10px] font-bold`}>{cert.year}</span>
                  </motion.div>
                ))}
              </LangTransition>
            </motion.div>
          </motion.section> */}

          {/* ═══════════════ AWARDS ═══════════════ */}
          <motion.section id="awards" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
            className={`p-8 lg:p-12 ${isDark ? 'bg-gradient-to-r from-amber-600/5 via-yellow-600/10 to-amber-600/5 border-white/10' : 'bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-amber-200/50'} border rounded-[40px] print:border-slate-200 print:bg-white`}
            aria-labelledby="awards-heading"
          >
            <h2 id="awards-heading" className="text-3xl sm:text-4xl font-bold text-center mb-12">🏆 {sections.awards}</h2>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <LangTransition lang={lang} className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {awards.map((award, i) => (
                  <motion.div key={i} variants={staggerItem} whileHover={{ scale: 1.03, y: -4 }}
                    className={`p-6 ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white/70 border-amber-200/30'} border rounded-3xl text-center group transition-all`}
                  >
                    <motion.div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow"
                      whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
                      <Trophy className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'} mb-2`}>{award.title}</h3>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-3 leading-relaxed`}>{award.description}</p>
                    <span className={`inline-block px-3 py-1 ${isDark ? 'bg-white/5 border-white/10 text-amber-400' : 'bg-amber-100/50 border-amber-200 text-amber-600'} border rounded-full text-xs font-mono`}>{award.year}</span>
                  </motion.div>
                ))}
              </LangTransition>
            </motion.div>
          </motion.section>

          {/* ═══════════════ TESTIMONIALS ═══════════════ */}
          <motion.section id="testimonials" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="space-y-10" aria-labelledby="test-heading">
            <h2 id="test-heading" className="text-3xl sm:text-4xl font-bold text-center">💬 {sections.testimonials}</h2>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <LangTransition lang={lang} className="grid md:grid-cols-2 gap-6">
                {testimonials.map((t, i) => (
                  <motion.blockquote key={i} variants={staggerItem}
                    className={`p-6 sm:p-8 ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white/60 border-white/30'} border rounded-3xl relative group`}
                  >
                    <Quote className={`w-8 h-8 ${isDark ? 'text-blue-500/20' : 'text-blue-400/20'} absolute top-6 right-6`} aria-hidden="true" />
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl shadow-lg">{t.avatar}</div>
                      <div>
                        <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{t.name}</div>
                        <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{t.role}</div>
                      </div>
                    </div>
                    <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed text-sm italic`}>"{t.text}"</p>
                  </motion.blockquote>
                ))}
              </LangTransition>
            </motion.div>
          </motion.section>

          {/* ═══════════════ BLOG / ARTICLES ═══════════════ */}
          <motion.section id="blog" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="space-y-10" aria-labelledby="blog-heading">
            <h2 id="blog-heading" className="text-3xl sm:text-4xl font-bold text-center">📝 {sections.blog}</h2>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <LangTransition lang={lang} className="grid md:grid-cols-3 gap-6">
                {blog.map((post, i) => (
                  <motion.article key={i} variants={staggerItem} whileHover={{ y: -6 }}
                    className={`p-6 ${isDark ? 'bg-white/[0.03] border-white/10 hover:border-indigo-500/30' : 'bg-white/60 border-white/30 hover:border-indigo-300'} border rounded-3xl transition-all group cursor-pointer flex flex-col`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-2.5 py-1 ${isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-100 text-indigo-700 border-indigo-200'} border rounded-full text-[10px] font-bold uppercase tracking-wider`}>{post.tag}</span>
                      <span className={`text-xs ${isDark ? 'text-slate-600' : 'text-slate-400'} font-mono`}>{post.date}</span>
                    </div>
                    <h3 className={`text-base font-bold ${isDark ? 'text-white group-hover:text-indigo-400' : 'text-slate-800 group-hover:text-indigo-600'} transition-colors mb-2`}>{post.title}</h3>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed flex-1`}>{post.excerpt}</p>
                    <div className={`mt-4 flex items-center gap-1 text-xs font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'} group-hover:gap-2 transition-all`}>
                    </div>
                  </motion.article>
                ))}
              </LangTransition>
            </motion.div>
          </motion.section>

          {/* ═══════════════ GITHUB HEATMAP ═══════════════ */}
          <GitHubHeatmap isDark={isDark} lang={lang} />

          {/* ═══════════════ FOOTER ═══════════════ */}
          <footer className={`py-16 ${isDark ? 'border-white/5' : 'border-slate-200'} border-t print:py-8`} role="contentinfo">
            <div className="text-center space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {lang === 'th' ? 'มาร่วมงานกันเถอะ' : "Let's Work Together"}
                </h3>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-md mx-auto text-sm`}>
                  {lang === 'th' ? 'สนใจร่วมงานหรือมีโปรเจกต์? ติดต่อผมได้เลย' : "Interested in collaborating or have a project in mind? Let's connect!"}
                </p>
              </motion.div>
              <div className="flex justify-center gap-3 print:hidden">
                <a href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Mail className="w-4 h-4" /> {lang === 'th' ? 'ส่งอีเมล' : 'Send Email'}
                </a>
              </div>
              <nav className="flex justify-center gap-4 print:hidden" aria-label="Footer social links">
                {[
                  { icon: Github, url: socialLinks.github, label: "GitHub" },
                  { icon: Linkedin, url: socialLinks.linkedin, label: "LinkedIn" },
                  { icon: Instagram, url: socialLinks.instagram, label: "Instagram" },
                  { icon: Facebook, url: socialLinks.facebook, label: "Facebook" }
                ].map((social, i) => (
                  <a key={i} href={social.url} target="_blank" rel="noopener noreferrer"
                    className={`p-2.5 ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-700'} transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </nav>
              <div className={`text-xs ${isDark ? 'text-slate-600' : 'text-slate-400'} font-mono uppercase tracking-widest pt-4`}>
                &copy; {new Date().getFullYear()} Woravut Dairoop &bull; Engineered with passion
              </div>
            </div>
          </footer>

        </div>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/30 transition-colors print:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}