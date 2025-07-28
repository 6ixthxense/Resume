// import React, { useState } from "react";
// import { Download, FileText } from "lucide-react";
// import { motion } from "framer-motion";

// export default function ResumePage() {
//   const [view, setView] = useState("resume"); // "resume" or "cv"

//   const handleDownload = (type: string) => {
//     const url = type === "resume" ? "/Resume.pdf" : "/CV.pdf";
//     window.open(url, "_blank");
//   };

//   // Framer Motion variants for staggered animation
//   const containerVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: (i = 1) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: 0.2 * i, duration: 0.6, ease: "easeOut" },
//     }),
//   };

//   const skills = [
//     { name: "Python", level: 90 },
//     { name: "R", level: 75 },
//     { name: "Power BI", level: 70 },
//     { name: "Google Sheets", level: 75 },
//     { name: "RapidMiner", level: 65 },
//   ];

//   // Common header content
//   const HeaderContent = () => (
//     <>      
//       <img
//         src="/pro1_1_2.png"
//         alt="Profile Photo"
//         className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
//       />
//       <h1 className="text-5xl font-extrabold text-blue-700">Woravut Dairoop</h1>
//       <p className="text-gray-600 mt-2 text-lg">
//         Data Analyst | IT Support | Web Developer @ Bigmall Plus
//       </p>
//       <p className="text-gray-500">woravutdairoop.work@gmail.com | +66 62 610 0297</p>
//       <div className="mt-4 flex justify-center space-x-4">
//         <motion.button
//           onClick={() => { setView("resume"); handleDownload("resume"); }}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className={`inline-flex items-center px-6 py-3 rounded-full shadow-lg transition-all ${
//             view === "resume" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           <Download className="w-5 h-5 mr-2" />
//           Download Resume
//         </motion.button>
//         <motion.button
//           onClick={() => { setView("cv"); handleDownload("cv"); }}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className={`inline-flex items-center px-6 py-3 rounded-full shadow-lg transition-all ${
//             view === "cv" ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           <FileText className="w-5 h-5 mr-2" />
//           Download CV
//         </motion.button>
//       </div>
//     </>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 font-sans p-6">
//       <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10">
//         {/* Header */}
//         <motion.header
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-8"
//         >
//           <HeaderContent />
//         </motion.header>

//         {/* Content */}
//         {view === "resume" ? (
//           <>
//             {[
//               {
//                 title: "💼 Professional Summary",
//                 content: (
//                   <p className="text-gray-700">
//                     Highly motivated and detail-oriented Data Analyst with a strong academic foundation in Data Science. Currently working as Data Analyst, IT Support, and Web Developer at Bigmall Plus. Skilled in Python, R, Power BI, and Excel with experience in data analytics, dashboard creation, and system support. Proven leadership as President of the Faculty of Science Student Union.
//                   </p>
//                 ),
//               },
//               {
//                 title: "🎓 Education",
//                 content: (
//                   <p className="text-gray-700">
//                     Bachelor of Science in Data Science - Silpakorn University (2020 - 2025)
//                   </p>
//                 ),
//               },
//               {
//                 title: "🧑‍💻 Experience",
//                 content: (
//                   <ul className="list-disc list-inside text-gray-700 space-y-1">
//                     <motion.li custom={1} initial="hidden" whileInView="visible" variants={containerVariants}>
//                       Head of Recreation (2021)
//                     </motion.li>
//                     <motion.li custom={2} initial="hidden" whileInView="visible" variants={containerVariants}>
//                       Head of Recreation (2022)
//                     </motion.li>
//                     <motion.li custom={3} initial="hidden" whileInView="visible" variants={containerVariants}>
//                       President (2023)
//                     </motion.li>
//                     <motion.li custom={4} initial="hidden" whileInView="visible" variants={containerVariants}>
//                       Student Union Advisor (2024)
//                     </motion.li>
//                   </ul>
//                 ),
//               },
//               {
//                 title: "📂 Projects",
//                 content: (
//                   <ul className="list-disc list-inside text-gray-700 space-y-1">
//                     <li>Lung cancer prediction by factors and behavior (Nov 2022 - Mar 2023)</li>
//                     <li>Text Processing of Sunthorn Phu's Poetry for Corpus Construction and Automatic Poem Generation (Nov 2024 - Mar 2025)</li>
//                     <li>Comparative Study on ML and DL Models in Predicting Football Match Outcomes (Jan 2025 - Mar 2025)</li>
//                   </ul>
//                 ),
//               },
//             ].map((section, idx) => (
//               <motion.section
//                 key={section.title}
//                 custom={idx}
//                 initial="hidden"
//                 whileInView="visible"
//                 variants={containerVariants}
//                 className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
//               >
//                 <h2 className="text-2xl font-semibold mb-3 text-blue-800 flex items-center">
//                   {section.title}
//                 </h2>
//                 {section.content}
//               </motion.section>
//             ))}

//             {/* Core Competencies */}
//             <motion.section
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ duration: 0.6 }}
//               className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow"
//             >
//               <h2 className="text-2xl font-semibold mb-4 text-blue-800 flex items-center">🛠 Core Competencies</h2>
//               <div className="space-y-4">
//                 {skills.map((skill, i) => (
//                   <div key={skill.name} className="space-y-1">
//                     <div className="flex justify-between text-gray-700">
//                       <span>{skill.name}</span>
//                       <span>{skill.level}%</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-3">
//                       <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${skill.level}%` }} />
//                     </div>
//                   </div>
//                 ))}
//                 <div className="mt-4 text-gray-700 space-x-2 flex flex-wrap">
//                   {['Teamwork','Communication','Adaptability','Event Management'].map((soft, idx) => (
//                     <motion.span key={soft} whileHover={{ scale: 1.1 }} className={`px-3 py-1 rounded-full text-sm ${idx % 2 === 0 ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{soft}</motion.span>
//                   ))}
//                 </div>
//               </div>
//             </motion.section>

//             {/* Awards */}
//             <motion.section
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="mb-0 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow"
//             >
//               <h2 className="text-2xl font-semibold mb-3 text-blue-800 flex items-center">🏆 Awards & Achievements</h2>
//               <ul className="list-disc list-inside text-gray-700">
//                 <li>Outstanding Activity Award - 2023</li>
//                 <li>Outstanding Activity Award - 2024</li>
//               </ul>
//             </motion.section>
//           </>
//         ) : (
//           <div className="w-full h-screen">
//             <object
//               data="/CV.pdf"
//               type="application/pdf"
//               width="100%"
//               height="100%"
//             >
//               <p>ดูเอกสาร CV ไม่ได้ ดู <a href="/CV.pdf" target="_blank" rel="noopener noreferrer">คลิกที่นี่</a> แทน</p>
//             </object>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Download, FileText, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import Typical from "react-typical";

export default function ResumePage() {
  const [view, setView] = useState("resume"); // "resume" or "cv"
  const [theme, setTheme] = useState("light");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownload = (type: string) => {
    const url = type === "resume" ? "/Resume.pdf" : "/CV.pdf";
    window.open(url, "_blank");
    setView(type);
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 * i, duration: 0.6, ease: "easeOut" }
    })
  };

  const skills = [
    { name: "Python", level: 90 },
    { name: "R", level: 75 },
    { name: "Power BI", level: 70 },
    { name: "Google Sheets", level: 75 },
    { name: "RapidMiner", level: 65 }
  ];

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 h-1 bg-blue-500 z-50" style={{ width: `${scrollProgress}%` }} />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 transition-colors font-sans p-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10">

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="absolute top-6 right-6 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:scale-105 transition-transform"
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </button>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-8"
          >
            <img
              src="/pro1_1_2.png"
              alt="Profile Photo"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg hover:scale-105 transition-transform"
            />
            <h1 className="text-5xl font-extrabold text-blue-700 dark:text-blue-300">
              Woravut Dairoop
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg h-8">
              <Typical
                steps={[
                  'Data Analyst', 2000,
                  'IT Support', 2000,
                  'Web Developer', 2000
                ]}
                loop={Infinity}
                wrapper="span"
              /> @ Bigmall Plus
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              woravutdairoop.work@gmail.com | +66 62 610 0297
            </p>

            <div className="mt-4 flex justify-center space-x-4">
              <motion.button
                onClick={() => handleDownload("resume")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`inline-flex items-center px-6 py-3 rounded-full shadow-lg transition-colors ${view === "resume" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"}`}
              >
                <Download className="w-5 h-5 mr-2" /> Resume
              </motion.button>
              <motion.button
                onClick={() => handleDownload("cv")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`inline-flex items-center px-6 py-3 rounded-full shadow-lg transition-colors ${view === "cv" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"}`}
              >
                <FileText className="w-5 h-5 mr-2" /> CV
              </motion.button>
            </div>
          </motion.header>

          {/* Content */}
          {view === "resume" ? (
            <>
              {[
                { title: "💼 Professional Summary", content: <p className="text-gray-700 dark:text-gray-300">Highly motivated and detail-oriented Data Analyst ...</p> },
                { title: "🎓 Education", content: <p className="text-gray-700 dark:text-gray-300">Bachelor of Science in Data Science - Silpakorn University (2020 - 2025)</p> },
                { title: "🧑‍💻 Experience", content: (
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                      {['Head of Recreation (2021)','Head of Recreation (2022)','President (2023)','Student Union Advisor (2024)'].map((item,i)=>(
                        <motion.li key={i} custom={i+1} initial="hidden" whileInView="visible" variants={containerVariants} whileHover={{ scale:1.05 }}>{item}</motion.li>
                      ))}
                    </ul>
                  )
                },
                { title: "📂 Projects", content: (
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Lung cancer prediction by factors and behavior (Nov 2022 - Mar 2023)</li>
                      <li>Text Processing of Sunthorn Phu's Poetry ...</li>
                      <li>Comparative Study on ML and DL Models ...</li>
                    </ul>
                  )
                }
              ].map((sec, i) => (
                <motion.section key={sec.title} custom={i} initial="hidden" whileInView="visible" variants={containerVariants} className="mb-8 p-6 rounded-xl shadow-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 hover:shadow-2xl transition-all">
                  <h2 className="text-2xl font-semibold mb-3 text-blue-800 dark:text-blue-300 flex items-center">{sec.title}</h2>
                  {sec.content}
                </motion.section>
              ))}

              {/* Core Competencies with hover tooltip */}
              <motion.section initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration:0.6 }} className="mb-8 p-6 rounded-xl shadow-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800">
                <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300 flex items-center">🛠 Core Competencies</h2>
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill,i)=>(
                    <motion.div key={i} whileHover={{ y:-5 }} className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-xl transition-all relative group">
                      <p className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width:`${skill.level}%`}} />
                      </div>
                      {/* Tooltip */}
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">Level: {skill.level}%</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Awards with confetti on reveal */}
              <motion.section initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.6 }} className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800">
                <h2 className="text-2xl font-semibold mb-3 text-blue-800 dark:text-blue-300 flex items-center">🏆 Awards & Achievements</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Outstanding Activity Award - 2023</li>
                  <li>Outstanding Activity Award - 2024</li>
                </ul>
              </motion.section>
            </>
          ) : (
            <div className="w-full h-screen">
              <object data="/CV.pdf" type="application/pdf" width="100%" height="100%">
                <p>ดูเอกสาร CV ไม่ได้ ดู <a href="/CV.pdf" target="_blank">คลิกที่นี่</a> แทน</p>
              </object>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

