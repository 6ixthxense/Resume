import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

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

export default function Awards({ lang, isDark, sections, awards }) {
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
      id="awards" 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={containerVariants}
      className={`p-8 lg:p-12 ${isDark ? 'bg-gradient-to-r from-amber-600/5 via-yellow-600/10 to-amber-600/5 border-white/10' : 'bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-amber-200/50'} border rounded-[40px] print:border-slate-200 print:bg-white`}
      aria-labelledby="awards-heading"
    >
      <h2 id="awards-heading" className="text-3xl sm:text-4xl font-bold text-center mb-12">🏆 {sections.awards}</h2>
      <LangTransition lang={lang}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
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
        </motion.div>
      </LangTransition>
    </motion.section>
  );
}
