import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, GraduationCap, Code, Rocket, Briefcase, Award, MessageSquare, BookOpen } from 'lucide-react';

const navItems = [
  { label: 'Home', icon: Home, id: 'header' },
  { label: 'Summary', icon: User, id: 'summary' },
  { label: 'Skills', icon: Code, id: 'skills' },
  { label: 'Experience', icon: Briefcase, id: 'experience' },
  { label: 'Projects', icon: Rocket, id: 'projects' },
];

export default function FloatingNav({ isDark, lang }) {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('header');

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling 300px
      setVisible(window.scrollY > 300);

      // Simple active section detection
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 100, opacity: 0, x: '-50%' }}
          className="fixed bottom-8 left-1/2 z-[100] print:hidden"
        >
          <div className={`flex items-center gap-2 p-2 rounded-full border shadow-2xl backdrop-blur-xl ${
            isDark ? 'bg-slate-900/80 border-white/10' : 'bg-white/80 border-slate-200'
          }`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative p-3 rounded-full transition-all group ${
                  activeSection === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
                aria-label={`Go to ${item.label}`}
              >
                <item.icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border ${
                  isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl'
                }`}>
                  {item.label}
                  <div className={`absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-b border-r ${
                    isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                  }`}></div>
                </div>

                {activeSection === item.id && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-full bg-blue-600 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
