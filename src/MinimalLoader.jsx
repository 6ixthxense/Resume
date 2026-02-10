import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_MESSAGES = [
    'Loading assets…',
    'Preparing portfolio…',
    'Almost ready…',
];

export default function MinimalLoader({ onFinish }) {
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onFinish();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onFinish]);

    useEffect(() => {
        const duration = 2200; // total load time in ms
        const interval = 20;
        const step = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + step;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(onFinish, 600);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onFinish]);

    useEffect(() => {
        if (progress > 33 && messageIndex === 0) setMessageIndex(1);
        if (progress > 66 && messageIndex === 1) setMessageIndex(2);
    }, [progress, messageIndex]);

    return (
        <motion.div
            className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
            exit={{
                scale: 1.5,
                opacity: 0,
                filter: 'blur(20px)',
                transition: { duration: 0.6, ease: 'easeInOut' }
            }}
        >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            {/* Logo Container */}
            <div className="relative flex items-center justify-center mb-12">
                {/* Outer spinning ring */}
                <motion.div
                    className="absolute w-32 h-32 rounded-full border-2 border-transparent"
                    style={{
                        borderTopColor: '#3B82F6',
                        borderRightColor: 'rgba(59, 130, 246, 0.3)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />

                {/* Middle pulsing ring */}
                <motion.div
                    className="absolute w-36 h-36 rounded-full border border-blue-500/10"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Inner counter-rotating ring */}
                <motion.div
                    className="absolute w-28 h-28 rounded-full border border-transparent"
                    style={{
                        borderBottomColor: '#8B5CF6',
                        borderLeftColor: 'rgba(139, 92, 246, 0.2)',
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />

                {/* Initials */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="relative z-10"
                >
                    <span className="text-5xl font-black bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent select-none tracking-tight">
                        WD
                    </span>
                </motion.div>
            </div>

            {/* Progress bar */}
            <div className="w-48 mb-6">
                <div className="w-full h-0.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={messageIndex}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-[11px] text-slate-500 font-mono"
                        >
                            {LOADING_MESSAGES[messageIndex]}
                        </motion.span>
                    </AnimatePresence>
                    <span className="text-[11px] text-slate-600 font-mono tabular-nums">
                        {Math.round(progress)}%
                    </span>
                </div>
            </div>

            {/* Skip hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 text-[10px] text-slate-700 font-mono uppercase tracking-widest"
            >
                Press ESC to skip
            </motion.div>
        </motion.div>
    );
}
