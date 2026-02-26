import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';

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

export default function Summary({ lang, isDark, sections, professionalSummary }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.section 
      id="summary" 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }} 
      variants={containerVariants}
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
  );
}
