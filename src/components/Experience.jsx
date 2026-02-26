import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

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

export default function Experience({ lang, isDark, sections, experience }) {
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
      id="experience" 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={containerVariants} 
      className="space-y-10" 
      aria-labelledby="exp-heading"
    >
      <h2 id="exp-heading" className="text-3xl sm:text-4xl font-bold text-center">🚀 {sections.experience}</h2>
      <div className="relative">
        <div className={`absolute left-6 sm:left-8 top-0 bottom-0 w-px ${isDark ? 'bg-gradient-to-b from-blue-500 via-purple-500 to-transparent' : 'bg-gradient-to-b from-blue-400 via-purple-400 to-transparent'} print:bg-slate-300`} aria-hidden="true" />
        <LangTransition lang={lang}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
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
          </motion.div>
        </LangTransition>
      </div>
    </motion.section>
  );
}
