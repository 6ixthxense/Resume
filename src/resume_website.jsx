import React from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumePage() {
  const handleDownload = () => {
    window.open("/Resume.pdf", "_blank");
  };

  // Framer Motion variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 * i, duration: 0.6, ease: "easeOut" },
    }),
  };

  const skills = [
    { name: "Python", level: 90 },
    { name: "R", level: 75 },
    { name: "Power BI", level: 70 },
    { name: "Google Sheets", level: 75 },
    { name: "RapidMiner", level: 65 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 font-sans p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-extrabold text-blue-700">Woravut Dairoop</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Data Analyst | IT Support | Web Developer @ Bigmall Plus
          </p>
          <p className="text-gray-500">woravutdairoop.work@gmail.com | +66 62 610 0297</p>
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all"
          >
            <Download className="w-5 h-5 mr-2" /> Download PDF
          </motion.button>
        </motion.header>

        {/* Sections */}
        {[
          {
            title: "💼 Professional Summary",
            content: (
              <p className="text-gray-700">
                Highly motivated and detail-oriented Data Analyst with a strong academic foundation in Data Science. Currently working as Data Analyst, IT Support, and Web Developer at Bigmall Plus. Skilled in Python, R, Power BI, and Excel with experience in data analytics, dashboard creation, and system support. Proven leadership as President of the Faculty of Science Student Union.
              </p>
            ),
          },
          {
            title: "🎓 Education",
            content: (
              <p className="text-gray-700">
                Bachelor of Science in Data Science - Silpakorn University (2020 - 2025)
              </p>
            ),
          },
          {
            title: "🧑‍💻 Experience",
            content: (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <motion.li
                  custom={1}
                  initial="hidden"
                  whileInView="visible"
                  variants={containerVariants}
                >Head of Recreation (2021)</motion.li>
                <motion.li
                  custom={2}
                  initial="hidden"
                  whileInView="visible"
                  variants={containerVariants}
                >Head of Recreation (2022)</motion.li>
                <motion.li
                  custom={3}
                  initial="hidden"
                  whileInView="visible"
                  variants={containerVariants}
                >President (2023)</motion.li>
                <motion.li
                  custom={4}
                  initial="hidden"
                  whileInView="visible"
                  variants={containerVariants}
                >Student Union Advisor (2024)</motion.li>
              </ul>
            ),
          },
          {
            title: "📂 Projects",
            content: (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Lung cancer prediction by factors and behavior (Nov 2022 - Mar 2023)</li>
                <li>Text Processing of Sunthorn Phu's Poetry for Corpus Construction and Automatic Poem Generation (Nov 2024 - Mar 2025)</li>
                <li>Comparative Study on ML and DL Models in Predicting Football Match Outcomes (Jan 2025 - Mar 2025)</li>
              </ul>
            ),
          },
        ].map((section, idx) => (
          <motion.section
            key={section.title}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-3 text-blue-800 flex items-center">
              {section.title}
            </h2>
            {section.content}
          </motion.section>
        ))}

        {/* Core Competencies with progress bars */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow"
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 flex items-center">🛠 Core Competencies</h2>
          <div className="space-y-4">
            {skills.map((skill, i) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-gray-700">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="mt-4 text-gray-700 space-x-2 flex flex-wrap">
              {['Teamwork','Communication','Adaptability','Event Management'].map((soft, idx) => (
                <motion.span
                  key={soft}
                  whileHover={{ scale: 1.1 }}
                  className={`px-3 py-1 rounded-full text-sm ${idx % 2 === 0 ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}
                >
                  {soft}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Awards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-0 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow"
        >
          <h2 className="text-2xl font-semibold mb-3 text-blue-800 flex items-center">🏆 Awards & Achievements</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Outstanding Activity Award - 2023</li>
            <li>Outstanding Activity Award - 2024</li>
          </ul>
        </motion.section>
      </div>
    </div>
  );
}
