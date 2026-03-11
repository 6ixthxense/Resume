import React from 'react';

const Skills = function({ lang, isDark, sections, skills }) {
  return (
    <section id="skills" className="mb-8" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className={`text-sm font-bold tracking-wider uppercase mb-5 pb-2 border-b ${isDark ? 'text-slate-200 border-white/10' : 'text-slate-800 border-slate-200'}`}>
        {sections.analytics}
      </h2>
      <div className="space-y-5">
        {skills.map((skill, i) => (
          <div key={i} className="flex flex-col gap-1">
            <h3 className={`text-[12px] font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              {skill.name}
            </h3>
            <p className={`text-[11px] leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {skill.useCase?.[lang] || skill.useCase?.en}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default React.memo(Skills);
