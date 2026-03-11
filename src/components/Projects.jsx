import React from 'react';

const Projects = function({ lang, isDark, sections, projects }) {
  return (
    <section id="projects" className="mb-10" aria-labelledby="proj-heading">
      <h2 id="proj-heading" className={`text-sm font-bold tracking-wider uppercase mb-6 pb-2 border-b ${isDark ? 'text-slate-200 border-white/10' : 'text-slate-800 border-slate-200'}`}>
        {sections.projects}
      </h2>
      <div className="space-y-8">
        {projects.map((item, i) => (
          <article key={i} className="flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
              <h3 className={`text-[14px] font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {item.title} 
                {item.status === 'production' && (
                  <span className={`ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                    <span className="w-1 h-1 bg-current rounded-full" /> Live
                  </span>
                )}
                {item.status === 'development' && (
                  <span className={`ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
                    <span className="w-1 h-1 bg-current rounded-full animate-pulse" /> In Dev
                  </span>
                )}
              </h3>
              <span className={`text-[10px] font-mono tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'} whitespace-nowrap`}>
                {item.period}
              </span>
            </div>
            
            {item.impact && (
              <p className={`text-[12px] italic opacity-85 mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {item.impact}
              </p>
            )}

            {item.techStack ? (
              <div className="flex flex-wrap gap-2 mb-3 mt-1">
                {item.techStack.replace('Tech: ', '').split(', ').map((tech, tIdx) => (
                  <span key={tIdx} className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide border ${isDark ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                    {tech}
                  </span>
                ))}
              </div>
            ) : item.tech && (
              <div className="flex flex-wrap gap-2 mb-3 mt-1">
                {item.tech.map((tech, tIdx) => (
                  <span key={tIdx} className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide border ${isDark ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {item.highlights && (
              <ul className="space-y-1.5 ml-4 list-outside list-disc marker:text-slate-400">
                {item.highlights.map((h, j) => {
                  const highlightedText = h.replace(/(\d+\+?\s*(?:tables|REST API endpoints|admin pages|major events)?)/g, (match) => 
                    `<span class="font-bold ${isDark ? 'text-blue-300' : 'text-blue-600'}">${match}</span>`
                  );
                  return (
                    <li 
                      key={j} 
                      className={`text-[11.5px] leading-relaxed pl-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                      dangerouslySetInnerHTML={{ __html: highlightedText }}
                    />
                  );
                })}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default React.memo(Projects);
