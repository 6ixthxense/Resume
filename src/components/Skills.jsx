import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaJs, FaHtml5, FaCss3, FaDatabase, FaChartBar, FaChartLine, FaFileExcel } from "react-icons/fa";

export default function Skills({ lang, isDark, sections, skills }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const icons = {
    "Python": <FaPython className="text-blue-400 text-3xl" />,
    "Power BI": <FaChartBar className="text-yellow-400 text-3xl" />,
    "R": <FaChartLine className="text-blue-500 text-3xl" />,
    "JavaScript": <FaJs className="text-yellow-300 text-3xl" />,
    "HTML": <FaHtml5 className="text-orange-500 text-3xl" />,
    "CSS": <FaCss3 className="text-blue-500 text-3xl" />,
    "Google Sheets": <FaFileExcel className="text-green-500 text-3xl" />,
    "SQL": <FaDatabase className="text-slate-400 text-3xl" />
  };

  return (
    <motion.section 
      id="skills" 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }} 
      variants={containerVariants}
      className={`p-8 lg:p-12 ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/60 border-white/30'} border rounded-[40px] shadow-2xl relative overflow-hidden transform-gpu print:shadow-none print:border-slate-200`}
      aria-labelledby="skills-heading"
    >
      {/* Ambient Background Glow for Skills */}
      <div className={`absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none`} aria-hidden="true" />
      <div className={`absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none`} aria-hidden="true" />

      <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent print:text-slate-800 relative z-10">
        ⚡ {sections.analytics}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 relative z-10">
        {skills.map((skill, i) => {
          // Bento grid spanning logic
          let spanClass = "col-span-1";
          if (i === 0) spanClass = "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2";
          else if (i === 3) spanClass = "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2";
          else if (i === 6) spanClass = "col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2";
          else if (i === 7) spanClass = "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2";

          return (
            <motion.div key={i} variants={staggerItem} whileHover={{ y: -4, scale: 1.01 }}
              className={`p-6 sm:p-8 ${spanClass} ${isDark ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]' : 'bg-white/70 border-white/40 hover:bg-white/90'} border rounded-[32px] flex flex-col justify-between gap-4 transition-all duration-300 group relative overflow-hidden print:border-slate-200 print:bg-white backdrop-blur-xl shadow-lg hover:shadow-2xl`}
            >
              {/* Giant blurred background icon */}
              <div className="absolute -bottom-6 -right-6 text-9xl opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 transform group-hover:scale-110 group-hover:-rotate-12 pointer-events-none" aria-hidden="true">
                {icons[skill.name]}
              </div>

              {/* Animated gradient top border on hover */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="flex items-start justify-between relative z-10">
                <div className={`p-3.5 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-100'} shadow-sm group-hover:scale-110 transition-transform duration-300`} aria-hidden="true">
                  {icons[skill.name]}
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'} group-hover:bg-gradient-to-r group-hover:${skill.color.split(' ')[0]} group-hover:${skill.color.split(' ')[1]} hover:!text-white transition-all duration-300`}>
                  {skill.category?.[lang] || "Core"}
                </div>
              </div>

              <div className="relative z-10 mt-2">
                <h3 className={`text-2xl font-black mb-2 ${isDark ? 'text-slate-100 group-hover:text-white' : 'text-slate-800'}`}>{skill.name}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-600'}`}>
                  {skill.useCase?.[lang] || skill.useCase?.en}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
