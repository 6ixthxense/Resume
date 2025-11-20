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
              className="absolute inset-0 z-10 overflow-auto"
            >
              <ResumePage />
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
}
