import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const BOOT_SEQUENCE = [
    { text: 'INIT: Booting Woravut OS v2.4.1...', delay: 100 },
    { text: 'Loading Webpack bundles... [OK]', delay: 350 },
    { text: 'Connecting to main database (SQLite)... [OK]', delay: 650 },
    { text: 'Validating Prisma Schemas... 20 relational tables loaded.', delay: 1000 },
    { text: 'Mounting Next.js Server Actions... [OK]', delay: 1300 },
    { text: 'Initializing React Virtual DOM... [OK]', delay: 1700 },
    { text: 'Fetching user authentication state... [200 OK]', delay: 2000 },
    { text: 'Compiling Tailwind CSS classes... [OK]', delay: 2200 },
    { text: 'SYSTEM BOOT SEQUENCE COMPLETE.', delay: 2500 }
];

export default function MinimalLoader({ onFinish }) {
    const [progress, setProgress] = useState(0);
    const [visibleLines, setVisibleLines] = useState([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onFinish();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onFinish]);

    useEffect(() => {
        const timers = BOOT_SEQUENCE.map((item, index) => {
            return setTimeout(() => {
                setVisibleLines(prev => [...prev, item.text]);
                setProgress(Math.floor(((index + 1) / BOOT_SEQUENCE.length) * 100));
                
                if (index === BOOT_SEQUENCE.length - 1) {
                    setTimeout(onFinish, 900); // Hold for almost a second on 100% so they can read it
                }
            }, item.delay);
        });

        return () => timers.forEach(clearTimeout);
    }, [onFinish]);

    return (
        <motion.div
            className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center p-4 sm:p-8"
            exit={{
                y: '-100%',
                opacity: 0,
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            <div className="w-full max-w-2xl bg-[#0a0f16] rounded-xl border border-slate-800 shadow-2xl shadow-blue-900/10 overflow-hidden font-mono text-sm sm:text-base">
                {/* Terminal Header */}
                <div className="flex items-center px-4 py-3 bg-slate-900/80 border-b border-slate-800/80">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <div className="mx-auto flex items-center gap-2 text-slate-500 text-xs font-bold tracking-widest uppercase">
                        <Terminal className="w-4 h-4" /> root@woravut-dev:~
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 h-[280px] sm:h-[320px] overflow-y-auto flex flex-col justify-end">
                    <div className="space-y-2.5">
                        {visibleLines.map((line, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`${
                                    line.includes('[OK]') || line.includes('[200') || line.includes('loaded.')
                                        ? 'text-emerald-400'
                                        : line.includes('COMPLETE') 
                                        ? 'text-blue-400 font-bold'
                                        : 'text-slate-300'
                                }`}
                            >
                                <span className="text-blue-500 mr-2 opacity-70">{'>'}</span> {line}
                            </motion.div>
                        ))}
                        {progress < 100 && (
                            <motion.div 
                                animate={{ opacity: [1, 0] }} 
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-2.5 h-5 bg-emerald-500 ml-4 translate-y-1"
                            />
                        )}
                    </div>
                </div>

                {/* Terminal Footer Loading Bar */}
                <div className="px-6 pb-6 pt-2">
                    <div className="flex justify-between text-xs text-slate-500 mb-2 font-bold tracking-widest uppercase">
                        <span>system_boot_progress</span>
                        <span className="text-emerald-500">{progress}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>
                </div>
            </div>

            {/* Skip hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 text-[10px] text-slate-600 font-mono uppercase tracking-widest"
            >
                Press ESC to bypass boot sequence
            </motion.div>
        </motion.div>
    );
}
