import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MinimalLoader from './MinimalLoader';
import ParticleBackground from './ParticleBackground';
import CursorTrail from './CursorTrail';
import ResumePage from './ResumePage';
import CommandPalette from './CommandPalette';
import ChatBot from './ChatBot';

export default function App() {
  const [showApp, setShowApp] = useState(false);
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('dark');

  const isDark = theme === 'dark';

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {!showApp ? (
          <MinimalLoader
            key="loader"
            onFinish={() => setShowApp(true)}
          />
        ) : (
          <motion.div
            key="app-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 overflow-hidden transform-gpu"
          >
            {/* Background Layer */}
            <ParticleBackground isDark={isDark} />
            <CursorTrail isDark={isDark} />

            {/* Content */}
            <div className="absolute inset-0 z-10 overflow-y-auto scroll-smooth">
              <ResumePage lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
            </div>

            {/* Global Components */}
            <CommandPalette lang={lang} />
            <ChatBot lang={lang} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
