import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

import { resumeData, socialLinks, skills as skillsData } from "./data/resumeData";
// Import components
import Header from "./components/Header";
import Summary from "./components/Summary";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

const GitHubHeatmap = React.lazy(() => import("./GitHubHeatmap"));

export default function ResumePage({ lang, setLang, theme, setTheme }) {
  const data = resumeData[lang];
  const { personalInfo, professionalSummary, education, experience, projects, sections, stats } = data;

  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme, isDark]);

  useEffect(() => {
    document.body.classList.toggle("lang-th", lang === "th");
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownload = type => {
    const url = type === "resume" ? "/Resume.pdf" : "/CV.pdf";
    window.open(url, "_blank");
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className={`relative min-h-screen ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'} transition-colors duration-500`} role="main">
      <a href="#summary" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[200] px-4 py-2 bg-blue-600 text-white rounded-lg">
        Skip to content
      </a>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 z-[100] origin-left print:hidden"
        style={{ scaleX }}
        role="progressbar"
      />

      <div className="max-w-5xl mx-auto p-4 sm:p-8 lg:p-12 relative overflow-hidden">
        <Header 
          lang={lang} 
          setLang={setLang} 
          theme={theme} 
          setTheme={setTheme} 
          personalInfo={personalInfo} 
          socialLinks={socialLinks} 
          stats={stats} 
          handleDownload={handleDownload} 
        />

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full mt-8">
          {/* LEFT COLUMN - 30% */}
          <div className="w-full md:w-[30%] flex-shrink-0 space-y-10">
            <Skills 
              lang={lang} 
              isDark={isDark} 
              sections={sections} 
              skills={skillsData || []} 
            />
            <Education 
              lang={lang} 
              isDark={isDark} 
              sections={sections} 
              education={education} 
            />
          </div>

          {/* RIGHT COLUMN - 70% */}
          <div className="w-full md:w-[70%] space-y-12">
            <Summary 
              lang={lang} 
              isDark={isDark} 
              sections={sections} 
              professionalSummary={professionalSummary} 
            />
            <Experience 
              lang={lang} 
              isDark={isDark} 
              sections={sections} 
              experience={experience} 
            />
            <Projects 
              lang={lang} 
              isDark={isDark} 
              sections={sections} 
              projects={projects} 
            />
          </div>
        </div>

        <div className="mt-16">
          <React.Suspense fallback={<div className="h-[200px] animate-pulse rounded-[32px] bg-slate-200 dark:bg-slate-800" />}>
            <GitHubHeatmap isDark={isDark} lang={lang} />
          </React.Suspense>
        </div>

        <Footer 
          lang={lang} 
          isDark={isDark} 
          personalInfo={personalInfo} 
          socialLinks={socialLinks} 
        />
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md shadow-lg transition-colors print:hidden"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
