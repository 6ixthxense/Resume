import React, { useState, useEffect } from "react";
import { Download, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Typical from "react-typical";

export default function ResumePage() {
  const [theme, setTheme] = useState("light");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Load and persist theme preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
    else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownload = type => {
    const url = type === "resume" ? "/Resume.pdf" : "/CV.pdf";
    window.open(url, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" }
    })
  };

  const skills = [
    { name: "Python", level: 95 },
    { name: "Power BI", level: 80 },
    { name: "R", level: 75 },
    { name: "Google Sheets", level: 75 },
    { name: "JavaScript", level: 70 },
    { name: "HTML", level: 70 },
    { name: "CSS", level: 70 },
    { name: "React", level: 70 },
    { name: "SQL", level: 65 }
  ];

  const awards = [
  { title: "Outstanding Activity Award", year : "2023" },
  { title: "Outstanding Activity Award", year : "2024" },
  ];

  return (
    <div className="relative">
      {/* Scroll bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 p-6 transition-colors">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 relative">

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <img
              src="/pro1_1_2.png"
              alt="Woravut Dairoop"
              className="w-32 h-32 rounded-full mx-auto shadow-lg mb-4"
            />
            <h1 className="text-5xl font-extrabold text-blue-700 dark:text-blue-300">Woravut Dairoop</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 h-8">
              <Typical
                steps={["Data Analyst", 1500, "IT Support", 1500, "Web Developer", 1500]}
                loop={Infinity}
                wrapper="span"
              />{' '}
              @ Bigmall Plus
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              woravutdairoop.work@gmail.com | +66 62 610 0297
            </p>

            {/* Download Buttons */}
            <div className="mt-6 flex justify-center gap-6">
              <motion.button
                onClick={() => handleDownload("resume")}
                whileHover={{ scale: 1.05 }}
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors"
              >
                <Download className="w-5 h-5 mr-2" /> Download Resume
              </motion.button>
              <motion.button
                onClick={() => handleDownload("cv")}
                whileHover={{ scale: 1.05 }}
                className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" /> Download CV
              </motion.button>
            </div>
          </motion.header>

          {/* 💼 Professional Summary */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-3">💼 Professional Summary</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Highly motivated and detail-oriented Data Analyst with a strong academic foundation in Data Science. Currently working as Data Analyst, IT Support, and Web Developer at Bigmall Plus. Skilled in Python, R, Power BI, and Excel with experience in data analytics, dashboard creation, and system support. Proven leadership as President of the Faculty of Science Student Union.
            </p>
          </motion.section>

          {/* 🎓 Education */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-3">🎓 Education</h2>
            <p className="text-gray-700 dark:text-gray-300">Bachelor of Science in Data Science - Silpakorn University (2020 - 2025)</p>
          </motion.section>

          {/* 🧑‍💻 Experience */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-4">🧑‍💻 Experience</h2>
            <ul className="space-y-2">
              {["Head of Recreation (2021)","Head of Recreation (2022)","President (2023)","Student Union Advisor (2024)"].map((item, i) => (
                <motion.li key={i} custom={i+1} initial="hidden" whileInView="visible" variants={containerVariants} whileHover={{ scale: 1.03 }} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <ArrowRight className="w-4 h-4 text-blue-500 dark:text-blue-300" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          {/* 📂 Projects */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-3">📂 Projects</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li>Lung cancer prediction by factors and behavior (Nov 2022 - Mar 2023)</li>
              <li>Comparative Study on ML and DL Models in Predicting Football Match Outcomes (Jan 2025 - Mar 2025)</li>
              <li>Text Processing of Sunthorn Phu's Poetry for Corpus Construction and Automatic Poem Generation (Nov 2024 - Mar 2025)</li>
            </ul>
          </motion.section>

          {/* 🛠 Core Competencies */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-3">🛠 Core Competencies</h2>
            <div className="space-y-4">
              {skills.map((skill, i) => (
                <motion.div key={i} whileHover={{ y: -3 }} className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-xl transition-all relative group">
                  <p className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</p>
                  <div className="w-full bg-gray-200 dark:bg.Gray-700 h-2 rounded-full mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${skill.level}%` }} />
                  </div>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Level: {skill.level}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 🏆 Awards & Achievements */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-3">
              🏆 Awards & Achievements
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {awards.map((award, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-xl transition-all"
                >
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {award.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Year: {award.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}