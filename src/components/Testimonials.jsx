import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

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

export default function Testimonials({ lang, isDark, sections, testimonials }) {
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
      id="testimonials" 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={containerVariants} 
      className="space-y-10" 
      aria-labelledby="test-heading"
    >
      <h2 id="test-heading" className="text-3xl sm:text-4xl font-bold text-center">💬 {sections.testimonials}</h2>
      <LangTransition lang={lang}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
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
        </motion.div>
      </LangTransition>
    </motion.section>
  );
}
