import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function Blog({ lang, isDark, sections, blog }) {
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
      id="blog" 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={containerVariants} 
      className="space-y-10" 
      aria-labelledby="blog-heading"
    >
      <h2 id="blog-heading" className="text-3xl sm:text-4xl font-bold text-center">📝 {sections.blog}</h2>
      <LangTransition lang={lang}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
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
            </motion.article>
          ))}
        </motion.div>
      </LangTransition>
    </motion.section>
  );
}
