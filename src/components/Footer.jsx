import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, Facebook } from 'lucide-react';

export default function Footer({ lang, isDark, personalInfo, socialLinks }) {
  return (
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
  );
}
