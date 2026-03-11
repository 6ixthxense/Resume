import React from 'react';

const Education = function({ lang, isDark, sections, education }) {
  return (
    <section id="education" className="mb-8" aria-labelledby="edu-heading">
      <h2 id="edu-heading" className={`text-sm font-bold tracking-wider uppercase mb-5 pb-2 border-b ${isDark ? 'text-slate-200 border-white/10' : 'text-slate-800 border-slate-200'}`}>
        {sections.education}
      </h2>
      <div className="space-y-6">
        {education.map((edu, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <h3 className={`text-[12px] font-bold leading-tight ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{edu.degree}</h3>
            <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{edu.institution}</p>
            <p className={`text-[10px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{edu.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default React.memo(Education);
