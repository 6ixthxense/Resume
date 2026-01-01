// src/App.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Terminal from './Terminal';
import HexRain from './HexRain';
import ResumePage from './ResumePage';
import CommandPalette from './CommandPalette';
import ChatBot from './ChatBot';
import { welcomeAscii } from './asciiArt';
import pkg from '../package.json';

export default function App() {
  const [showApp, setShowApp] = useState(false);

  // Collect dependencies from package.json for terminal animation
  const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const moduleNames = Object.entries(allDeps).map(
    ([name, version]) => `${name}@${version}`
  );

  const lines = [
    '> git pull origin main',
    { type: 'progress', label: 'Fetching origin…', duration: 800, length: 40 },
    '',
    '> npm install',
    { type: 'modules', modules: moduleNames, speed: 15 },
    '',
    '> npm run build',
    { type: 'progress', label: 'Compiling modules', duration: 1000, length: 40 },
    '',
    '✨  Build complete!',
    '',
    { type: 'ascii-block', art: welcomeAscii },
    '',
    '🚀  SYSTEM READY. ACCESS GRANTED.',
    'Launching app…',
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {!showApp ? (
          <Terminal
            key="terminal"
            lines={lines}
            onFinish={() => setShowApp(true)}
          />
        ) : (
          <motion.div
            key="app-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 overflow-hidden"
          >
            {/* Background Layer */}
            <HexRain fontSize={12} speed={40} />

            {/* Content Layer */}
            <div className="absolute inset-0 z-10 overflow-y-auto scroll-smooth">
              <ResumePage />
            </div>

            {/* Interactive Layer (Global Components) */}
            <CommandPalette />
            <ChatBot />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
