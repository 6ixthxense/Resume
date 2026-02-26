import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

import { resumeData, socialLinks, skills as skillsData } from "./data/resumeData";
import GitHubHeatmap from "./GitHubHeatmap";

// Import new components
import Header from "./components/Header";
import Summary from "./components/Summary";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Awards from "./components/Awards";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import FloatingNav from "./components/ui/FloatingNav";

export default function ResumePage({ lang, setLang, theme, setTheme }) {
  const data = resumeData[lang];
  const { personalInfo, professionalSummary, education, experience, projects, awards, sections, stats, testimonials, blog } = data;

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
    <div className="relative selection:bg-blue-500/30" role="main">
      {/* Skip to content link for accessibility */}
      <a href="#summary" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">
        Skip to content
      </a>

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[100] origin-left print:hidden"
        style={{ scaleX }}
        role="progressbar"
        aria-label="Page scroll progress"
      />

      <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-5 text-slate-800'} p-4 sm:p-6 lg:p-12 transition-colors duration-500 relative overflow-hidden`}>

        {/* Ambient Blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 translate-z-0 print:hidden" aria-hidden="true">
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] ${isDark ? 'bg-blue-600/10' : 'bg-blue-400/10'} rounded-full blur-[100px] transform-gpu`}
          />
          <motion.div
            animate={{ x: [0, -80, 0], y: [0, 100, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className={`absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] ${isDark ? 'bg-purple-600/10' : 'bg-purple-400/10'} rounded-full blur-[100px] transform-gpu`}
          />
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
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

          <div className="grid lg:grid-cols-2 gap-8">
            <Summary 
              lang={lang} 
              isDark={isDark} 
              sections={sections} 
              professionalSummary={professionalSummary} 
            />
            <Education 
              lang={lang} 
              isDark={isDark} 
              sections={sections} 
              education={education} 
            />
          </div>

          <Skills 
            lang={lang} 
            isDark={isDark} 
            sections={sections} 
            skills={skillsData || []} 
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

          <Awards 
            lang={lang} 
            isDark={isDark} 
            sections={sections} 
            awards={awards} 
          />

          <Testimonials 
            lang={lang} 
            isDark={isDark} 
            sections={sections} 
            testimonials={testimonials} 
          />

          <Blog 
            lang={lang} 
            isDark={isDark} 
            sections={sections} 
            blog={blog} 
          />

          <GitHubHeatmap isDark={isDark} lang={lang} />
      <FloatingNav isDark={isDark} lang={lang} />

          <Footer 
            lang={lang} 
            isDark={isDark} 
            personalInfo={personalInfo} 
            socialLinks={socialLinks} 
          />
        </div>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/30 transition-colors print:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
