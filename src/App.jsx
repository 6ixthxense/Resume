// // src/App.jsx
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Terminal from './Terminal';
// import ResumePage from './ResumePage';
// import { welcomeAscii } from './asciiArt';
// import pkg from '../package.json';  // import package.json

// const containerVariants = {
//   hidden: { opacity: 0, x: -50 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { when: 'beforeChildren', staggerChildren: 0.2 },
//   },
// };

// export default function App() {
//   const [showApp, setShowApp] = useState(false);

//   // สมมติชื่อโมดูลจริงหรือจำลอง
//   const allDeps = {
//     ...(pkg.dependencies || {}),
//     ...(pkg.devDependencies || {}),
//   };
//   const moduleNames = Object.entries(allDeps).map(
//     ([name, version]) => `${name}@${version}`
//   );

//   const lines = [
//     '> git pull origin main',
//     { type: 'progress', label: 'Fetching origin…', duration: 2000, length: 40 },

//     '',
//     '> npm install',
//     { type: 'modules', modules: moduleNames, speed: 100 },

//     '',
//     '> npm run build',
//     { type: 'progress', label: 'Compiling modules', duration: 2000, length: 40 },

//     '',
//     '✨  Build complete!',
//     '',

//     // ← ตรงนี้แทรก ASCII art WELCOME
//      { type: 'ascii-block', art: welcomeAscii },
//     '',

//     '🚀  Launching app…',
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//       <AnimatePresence>
//         {!showApp ? (
//           <Terminal
//             key="terminal"
//             lines={lines}
//             onFinish={() => setShowApp(true)}
//           />
//         ) : (
//           <motion.div
//             key="resume"
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             variants={containerVariants}
//             className="p-8"
//           >
//             <ResumePage />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// src/App.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Terminal from './Terminal';
import HexRain from './HexRain';           // ใช้ HexRain แทน MatrixRain
import ResumePage from './ResumePage';
import { welcomeAscii } from './asciiArt';
import pkg from '../package.json';

export default function App() {
  const [showApp, setShowApp] = useState(false);

  // รวบรวม dependencies จริงจาก package.json
  const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const moduleNames = Object.entries(allDeps).map(
    ([name, version]) => `${name}@${version}`
  );

  // กำหนด sequence ของ terminal splash
  const lines = [
    '> git pull origin main',
    { type: 'progress', label: 'Fetching origin…', duration: 2000, length: 40 },

    '',
    '> npm install',
    { type: 'modules', modules: moduleNames, speed: 100 },

    '',
    '> npm run build',
    { type: 'progress', label: 'Compiling modules', duration: 2000, length: 40 },

    '',
    '✨  Build complete!',
    '',

    // แสดง ASCII art พร้อมกันทีเดียว
    { type: 'ascii-block', art: welcomeAscii },
    '',

    '🚀  Launching app…',
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence>
        {!showApp ? (
          // Splash terminal
          <Terminal
            key="terminal"
            lines={lines}
            onFinish={() => setShowApp(true)}
          />
        ) : (
          // หลัง splash: HexRain เบื้องหลัง + Resume overlay
          <React.Fragment key="resume">
            {/* 1) Hacker-style Hex rain */}
            <HexRain fontSize={12} speed={40} />

            {/* 2) Resume overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-10 bg-black bg-opacity-80 flex items-start justify-center p-8
+                         overflow-auto"
            >
              <div className="max-w-3xl w-full">
                <ResumePage />
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
}
