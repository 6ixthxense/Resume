import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

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

export default function Education({ lang, isDark, sections, education }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.section 
      id="education" 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }} 
      variants={containerVariants}
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
  );
}
