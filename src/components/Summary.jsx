import React from 'react';

const Summary = function({ lang, isDark, sections, professionalSummary }) {
  return (
    <section id="summary" className="mb-2" aria-labelledby="summary-heading">
      <h2 id="summary-heading" className={`text-sm font-bold tracking-wider uppercase mb-5 pb-2 border-b ${isDark ? 'text-slate-200 border-white/10' : 'text-slate-800 border-slate-200'}`}>
        {sections.summary}
      </h2>
      <div className={`text-xs leading-relaxed whitespace-pre-line ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
        {professionalSummary}
      </div>
    </section>
  );
}

export default React.memo(Summary);
