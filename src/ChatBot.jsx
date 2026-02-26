import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { resumeData } from './data/resumeData';

const translations = {
    en: {
        welcome: "Hi! I'm Woravut's AI assistant. How can I help you today?",
        placeholder: "Ask me about Woravut...",
        online: "AI Assistant Online",
        quickQuestions: "Suggested Queries",
        questions: [
            "What are your top skills?",
            "Tell me about your experience.",
            "Which projects have you worked on?",
            "How can I contact you?",
            "What is your current role?",
            "Where did you study?"
        ]
    },
    th: {
        welcome: "สวัสดีครับ! ผมคือผู้ช่วย AI ของวรวุฒิ มีอะไรให้ช่วยไหมครับ?",
        placeholder: "ถามเรื่องต่างๆ ของวรวุฒิ...",
        online: "AI ออนไลน์อยู่ครับ",
        quickQuestions: "คำถามแนะนำ",
        questions: [
            "ทักษะเด่นของคุณคืออะไร?",
            "เล่าประสบการณ์ถนัดให้ฟังหน่อย",
            "คุณทำโปรเจกต์อะไรบ้าง?",
            "ติดต่อคุณได้ทางไหน?",
            "ปัจจุบันคุณทำตำแหน่งอะไร?",
            "คุณเรียนจบที่ไหน?"
        ]
    }
};

export default function ChatBot({ lang = 'en', isDark = true }) {
    const [isOpen, setIsOpen] = useState(false);
    const t = translations[lang] || translations.en;
    const data = resumeData[lang] || resumeData.en;

    const [messages, setMessages] = useState([
        { role: 'bot', text: t.welcome }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    useEffect(() => {
        setMessages([{ role: 'bot', text: t.welcome }]);
    }, [lang, t.welcome]);

    const handleBotResponse = (userText) => {
        setIsTyping(true);
        let response = "";
        const text = userText.toLowerCase();

        const getResponse = () => {
            if (lang === 'th') {
                if (text.includes("ทักษะ") || text.includes("เก่ง") || text.includes("ถนัด")) {
                    return `วรวุฒิเชี่ยวชาญด้าน Data Science และการพัฒนาซอฟต์แวร์ ทักษะเด่นคือ Python, Power BI และ JavaScript ครับ นอกจากนี้เขายังมีพื้นฐานด้าน SQL และการทำ Data Visualization ที่แข็งแกร่งด้วย`;
                }
                if (text.includes("ประสบการณ์") || text.includes("ทำงาน")) {
                    return `เขามีประสบการณ์หลากหลาย ตั้งแต่การเป็นผู้นำนักศึกษาไปจนถึงงานด้านเทคนิค ปัจจุบันทำงานที่ Bigmall Plus ในตำแหน่ง Fullstack Developer & IT Support & Data Analyst ครับ`;
                }
                if (text.includes("โปรเจกต์") || text.includes("ผลงาน")) {
                    return `โปรเจกต์ล่าสุดที่น่าสนใจคือ ระบบ WMS (Warehouse Management System), โมเดลทำนายโรคมะเร็งปอด และการใช้ Deep Learning ทำนายผลฟุตบอลครับ`;
                }
                if (text.includes("ติดต่อ") || text.includes("เบอร์") || text.includes("อีเมล")) {
                    return `คุณสามารถติดต่อวรวุฒิได้ที่อีเมล ${data.personalInfo.email} หรือโทร ${data.personalInfo.phone} ครับ`;
                }
                if (text.includes("ตำแหน่ง") || text.includes("ปัจจุบัน")) {
                    return `ปัจจุบันเขาทำงานเป็น Fullstack Developer & Data Analyst ที่ Bigmall Plus ดูแลทั้งระบบหน้าบ้าน หลังบ้าน และการวิเคราะห์ข้อมูลเพื่อธุรกิจครับ`;
                }
                if (text.includes("เรียน") || text.includes("การศึกษา")) {
                    const edu = data.education[0];
                    return `เขาจบการศึกษา ${edu.degree} จาก ${edu.institution} (${edu.period}) ครับ`;
                }
                return `เป็นคำถามที่น่าสนใจครับ! วรวุฒิมีความหลงใหลในเทคโนโลยีและการแก้ปัญหาด้วยข้อมูล อยากให้ผมเล่ารายละเอียดส่วนไหนเพิ่มไหมครับ?`;
            } else {
                if (text.includes("skill") || text.includes("competenc")) {
                    return `Woravut excels in Data Science and Fullstack Development. His primary tech stack includes Python, JavaScript (React/Node.js), SQL, and Power BI for data analytics.`;
                }
                if (text.includes("experience") || text.includes("work")) {
                    return `He has a unique blend of leadership and technical expertise. Currently, he serves as a Fullstack Developer & Data Analyst at Bigmall Plus, managing complex systems and data pipelines.`;
                }
                if (text.includes("project") || text.includes("portfolio")) {
                    return `Some of his key projects include a custom Warehouse Management System (WMS), a lung cancer prediction model, and advanced football outcome predictors using Deep Learning.`;
                }
                if (text.includes("contact") || text.includes("email") || text.includes("phone")) {
                    return `Feel free to reach out to him via email at ${data.personalInfo.email} or call him directly at ${data.personalInfo.phone}.`;
                }
                if (text.includes("role") || text.includes("current")) {
                    return `He is currently working as a Fullstack Developer & Data Analyst at Bigmall Plus, where he integrates business logic with data-driven insights.`;
                }
                if (text.includes("study") || text.includes("education") || text.includes("university")) {
                    const edu = data.education[0];
                    return `He holds a ${edu.degree} from ${edu.institution}, completed during ${edu.period}.`;
                }
                return `That's a great question! Woravut is dedicated to continuous learning and building impactful tech solutions. Would you like to know more about his projects or technical background?`;
            }
        };

        response = getResponse();

        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'bot', text: response }]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000); // Simulate natural thinking time
    };

    const sendMessage = (text) => {
        if (!text.trim()) return;
        setMessages(prev => [...prev, { role: 'user', text: text.trim() }]);
        handleBotResponse(text.trim());
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage(e.target.value);
            e.target.value = '';
        }
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={`mb-6 w-[calc(100vw-32px)] sm:w-[400px] h-[600px] border rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden transform-gpu
                            ${isDark ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-slate-200'} backdrop-blur-2xl shadow-blue-500/10`}
                    >
                        {/* Header */}
                        <div className="p-6 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white text-base font-bold tracking-tight leading-none mb-1.5">Woravut AI</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </div>
                                        <span className="text-[10px] text-blue-100 font-bold uppercase tracking-wider">{t.online}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2.5 transition-all hover:bg-white/10 rounded-full text-white/60 hover:text-white hover:rotate-90"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className={`flex-1 overflow-y-auto p-6 space-y-6 ${isDark ? 'bg-slate-950/20' : 'bg-slate-50/50'}`}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex items-end gap-3 ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
                                >
                                    {msg.role === 'bot' && (
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 shrink-0 ${isDark ? 'bg-slate-800 text-blue-400' : 'bg-white text-blue-600 shadow-sm border border-slate-100'}`}>
                                            <Bot className="w-4 h-4" />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] p-4 rounded-[1.5rem] text-[13px] leading-relaxed shadow-sm ${msg.role === 'bot'
                                            ? isDark
                                                ? 'bg-slate-800/80 text-slate-200 rounded-bl-none border border-white/5'
                                                : 'bg-white text-slate-700 rounded-bl-none border border-slate-200'
                                            : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-none shadow-blue-600/20'
                                        }`}>
                                        {msg.text}
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 shrink-0 bg-blue-100 text-blue-600`}>
                                            <User className="w-4 h-4" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex items-end gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 shrink-0 ${isDark ? 'bg-slate-800 text-blue-400' : 'bg-white text-blue-600 border border-slate-100'}`}>
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className={`p-4 rounded-[1.5rem] rounded-bl-none flex gap-2 ${isDark ? 'bg-slate-800/50' : 'bg-white border border-slate-200'}`}>
                                        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full"></motion.span>
                                        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full"></motion.span>
                                        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full"></motion.span>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Suggested Questions */}
                        <div className={`p-4 border-t ${isDark ? 'border-white/5 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
                            <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{t.quickQuestions}</p>
                            <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
                                {t.questions.map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => sendMessage(q)}
                                        className={`px-4 py-2 border rounded-full text-[11px] font-medium whitespace-nowrap transition-all active:scale-95 ${isDark
                                                ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                                                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                                            }`}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className={`p-6 border-t flex gap-3 ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}>
                            <div className="relative flex-1">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder={t.placeholder}
                                    className={`w-full border rounded-2xl px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${isDark
                                            ? 'bg-slate-950 border-white/10 text-white placeholder-slate-600'
                                            : 'bg-slate-100 border-transparent text-slate-800 placeholder-slate-400'
                                        }`}
                                    onKeyDown={handleKeyPress}
                                />
                            </div>
                            <button
                                onClick={() => {
                                    const val = inputRef.current.value;
                                    sendMessage(val);
                                    inputRef.current.value = '';
                                }}
                                className="w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-blue-600/30 active:scale-90 shrink-0"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-[1.5rem] shadow-2xl flex items-center justify-center border transition-all duration-500 group relative ${isOpen
                    ? isDark
                        ? 'bg-slate-800 border-white/20 text-white'
                        : 'bg-white border-slate-200 text-slate-700'
                    : 'bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-600 border-white/20 text-white'
                    }`}
            >
                {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
                {!isOpen && (
                    <>
                        <span className="absolute -top-1 -right-1 flex h-5 w-5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-5 w-5 bg-pink-500 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">1</span>
                        </span>
                        <div className="absolute -left-20 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-slate-200">
                            Chat with me!
                            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-t border-r border-slate-200"></div>
                        </div>
                    </>
                )}
            </motion.button>
        </div>
    );
}
