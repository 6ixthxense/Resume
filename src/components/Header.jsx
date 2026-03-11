import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Mail, Phone, Github, Linkedin, Globe, Download } from 'lucide-react';

function LangTransition({ children, lang, className = "" }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lang}
        className={className}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

const Header = function({ lang, setLang, theme, setTheme, personalInfo, socialLinks, stats, handleDownload }) {
  const isDark = theme === "dark";

  return (
    <header
      id="header"
      className={`relative py-8 px-6 sm:px-10 mb-8 border-b ${isDark ? 'border-white/10' : 'border-slate-200'} flex flex-col md:flex-row md:items-end md:justify-between gap-6 print:border-slate-300 print:pb-4`}
      role="banner"
    >
      {/* Top Controls - absolute positioning so it doesn't mess with natural flex layout */}
      <div className="absolute top-4 right-4 flex gap-2 items-center print:hidden" role="toolbar" aria-label="Settings">
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`p-1.5 rounded-md transition-all ${isDark ? 'bg-white/10 hover:bg-white/20 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>
        <div className={`h-4 w-px ${isDark ? 'bg-white/20' : 'bg-slate-300'}`} />
        <button
          onClick={() => setLang('en')}
          className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold transition-all ${lang === 'en' ? 'bg-blue-600 text-white' : isDark ? 'text-slate-400 hover:bg-white/10' : 'text-slate-500 hover:bg-slate-200'}`}
        >
          EN
        </button>
        <button
          onClick={() => setLang('th')}
          className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold transition-all ${lang === 'th' ? 'bg-blue-600 text-white' : isDark ? 'text-slate-400 hover:bg-white/10' : 'text-slate-500 hover:bg-slate-200'}`}
        >
          TH
        </button>
      </div>

      <div className="flex-1">
        <LangTransition lang={lang}>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight leading-snug mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            {personalInfo.name}
          </h1>
        </LangTransition>
        <h2 className={`text-sm tracking-wide font-medium uppercase mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          {personalInfo.roles[0]}
        </h2>

        {/* Links section */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 hover:underline ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
              <Github className="w-3.5 h-3.5" /><span>Open Source Activity</span>
            </a>
          )}
          {socialLinks.portfolio && (
            <a href={socialLinks.portfolio} target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 hover:underline ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
              <Globe className="w-3.5 h-3.5" /><span>Portfolio</span>
            </a>
          )}
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 hover:underline ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
              <Linkedin className="w-3.5 h-3.5" /><span>LinkedIn</span>
            </a>
          )}
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className={`flex items-center gap-1.5 hover:underline ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
              <Mail className="w-3.5 h-3.5" /><span>Email</span>
            </a>
          )}
          {personalInfo.phone && (
            <div className={`flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <Phone className="w-3.5 h-3.5" /><span>{personalInfo.phone}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 print:hidden">
        <button
          onClick={() => handleDownload("resume")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${isDark ? 'border-white/20 hover:bg-white/10 text-white' : 'border-slate-300 hover:bg-slate-100 text-slate-800'}`}
        >
          <Download className="w-3.5 h-3.5" /> Resume
        </button>
      </div>
    </header>
  );
}

export default React.memo(Header);
