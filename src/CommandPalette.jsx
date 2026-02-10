import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X } from 'lucide-react';

const translations = {
    en: {
        placeholder: "Type to search sections...",
        noResults: "No sections found...",
        help: "Navigate with arrows or mouse",
        close: "ESC to close",
        sections: [
            { id: 'summary', label: 'Professional Summary' },
            { id: 'education', label: 'Education' },
            { id: 'experience', label: 'Experience', icon: '🧑‍💻' },
            { id: 'projects', label: 'Projects', icon: '📂' },
            { id: 'skills', label: 'Skills & Analytics', icon: '🛠' },
            { id: 'awards', label: 'Awards', icon: '🏆' },
        ]
    },
    th: {
        placeholder: "ค้นหาหัวข้อต่างๆ...",
        noResults: "ไม่พบหัวข้อที่ค้นหา...",
        help: "ใช้ลูกศรหรือเมาส์เพื่อเลือกหัวข้อ",
        close: "กด ESC เพื่อปิด",
        sections: [
            { id: 'summary', label: 'บทสรุปวิชาชีพ', icon: '💼' },
            { id: 'education', label: 'ประวัติการศึกษา', icon: '🎓' },
            { id: 'experience', label: 'เส้นทางวิชาชีพ', icon: '🧑‍💻' },
            { id: 'projects', label: 'ผลงานที่คัดสรร', icon: '📂' },
            { id: 'skills', label: 'ทักษะและความเชี่ยวชาญ', icon: '🛠' },
            { id: 'awards', label: 'รางวัลและความภูมิใจ', icon: '🏆' },
        ]
    }
};

export default function CommandPalette({ lang = 'en' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    const t = translations[lang] || translations.en;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const filteredSections = t.sections.filter(s =>
        s.label.toLowerCase().includes(query.toLowerCase())
    );

    const navigateTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
            setQuery('');
        }
    };

    return (
        <>
            {/* Help Trigger */}
            <div className="fixed bottom-6 left-6 z-40">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-gray-400 hover:text-white transition-all group"
                    title={`Command Palette (${lang === 'th' ? 'Ctrl+K' : 'Ctrl+K'})`}
                >
                    <Command className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="relative w-full max-w-lg bg-slate-900/90 border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-4 border-b border-white/10 flex items-center gap-3">
                                <Search className="w-5 h-5 text-gray-400" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder={t.placeholder}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="bg-transparent border-none outline-none text-white w-full text-lg placeholder:text-gray-500"
                                />
                                <button onClick={() => setIsOpen(false)}>
                                    <X className="w-5 h-5 text-gray-500 hover:text-white" />
                                </button>
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto p-2">
                                {filteredSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => navigateTo(section.id)}
                                        className="w-full text-left p-3 rounded-xl hover:bg-white/10 flex items-center gap-4 group transition-colors"
                                    >
                                        <span className="text-2xl">{section.icon}</span>
                                        <span className="text-gray-200 group-hover:text-blue-400 font-medium">
                                            {section.label}
                                        </span>
                                    </button>
                                ))}
                                {filteredSections.length === 0 && (
                                    <div className="p-8 text-center text-gray-500">
                                        {t.noResults}
                                    </div>
                                )}
                            </div>

                            <div className="p-3 bg-black/20 border-t border-white/5 text-[10px] text-gray-500 flex justify-between">
                                <span>{t.help}</span>
                                <span>{t.close}</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
