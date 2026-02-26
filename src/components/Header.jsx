import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Mail, Phone, Github, Linkedin, Instagram, Facebook, Download, FileText } from 'lucide-react';
import Typical from 'react-typical';
import { AnimatePresence } from 'framer-motion';

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

export default function Header({ lang, setLang, theme, setTheme, personalInfo, socialLinks, stats, handleDownload }) {
  const isDark = theme === "dark";

  return (
    <motion.header
      id="header"
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
  );
}
