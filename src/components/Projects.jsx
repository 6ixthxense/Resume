import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code } from 'lucide-react';

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

export default function Projects({ lang, isDark, sections, projects }) {
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

  return (
    <motion.section 
      id="projects" 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={containerVariants} 
      className="space-y-10" 
      aria-labelledby="proj-heading"
    >
      <h2 id="proj-heading" className="text-3xl sm:text-4xl font-bold text-center">💻 {sections.projects}</h2>
      <LangTransition lang={lang}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
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
        </motion.div>
      </LangTransition>
    </motion.section>
  );
}
