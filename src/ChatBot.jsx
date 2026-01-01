import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { resumeData, skills } from './data/resumeData';

const translations = {
    en: {
        welcome: "Hi! I'm Woravut's AI assistant. How can I help you today?",
        placeholder: "Ask me about Woravut...",
        online: "Online & Ready",
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
        online: "ออนไลน์ & พร้อมช่วยเหลือ",
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

export default function ChatBot({ lang = 'en' }) {
    const [isOpen, setIsOpen] = useState(false);
    const t = translations[lang] || translations.en;
    const data = resumeData[lang] || resumeData.en;

    const [messages, setMessages] = useState([
        { role: 'bot', text: t.welcome }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // Reset welcome message when language changes
    useEffect(() => {
        setMessages([{ role: 'bot', text: t.welcome }]);
    }, [lang]);

    const handleBotResponse = (userText) => {
        setIsTyping(true);
        let response = "";
        const text = userText.toLowerCase();

        if (lang === 'th') {
            if (text.includes("ทักษะ") || text.includes("เก่ง")) {
                response = `วรวุฒิเชี่ยวชาญด้าน Data Science และการพัฒนาซอฟต์แวร์ ทักษะเด่นคือ Python (${skills.find(s => s.name === "Python")?.level}%), Power BI และ JavaScript ครับ`;
            } else if (text.includes("ประสบการณ์") || text.includes("ทำงาน")) {
                response = `เขามีประสบการณ์ด้านความเป็นผู้นำ (ประธานสโมสรนักศึกษา) และงานด้านเทคนิค ปัจจุบันวรวุฒิทำงานที่ Bigmall Plus ในตำแหน่ง Fullstack Developer & IT Support & Data Analyst ครับ`;
            } else if (text.includes("โปรเจกต์") || text.includes("ผลงาน")) {
                response = `โปรเจกต์ที่น่าสนใจ ได้แก่ โมเดลทำนายโรคมะเร็งปอด, การทำนายผลฟุตบอล (DL) และระบบ WMS ให้กับบริษัท Bigmall Plus ครับ`;
            } else if (text.includes("ติดต่อ") || text.includes("เบอร์") || text.includes("อีเมล")) {
                response = `คุณสามารถส่งอีเมลหาเขาได้ที่ ${data.personalInfo.email} หรือโทร ${data.personalInfo.phone} ครับ`;
            } else if (text.includes("ตำแหน่ง") || text.includes("ปัจจุบัน")) {
                response = `ปัจจุบันดำรงตำแหน่ง Fullstack Developer & IT Support & Data Analyst ที่บริษัท Bigmall Plus ตั้งแต่เดือนมิถุนายน 2568 ครับ`;
            } else if (text.includes("เรียน") || text.includes("การศึกษา")) {
                const edu = data.education[0];
                response = `เขาจบการศึกษา ${edu.degree} จาก ${edu.institution} (${edu.period}) ครับ`;
            } else {
                response = `เป็นคำถามที่น่าสนใจครับ! วรวุฒิชอบการเรียนรู้สิ่งใหม่อยู่เสมอ อยากทราบเกี่ยวกับทักษะเทคนิคหรือโปรเจกต์ล่าสุดของเขาไหมครับ?`;
            }
        } else {
            // English Logic
            if (text.includes("skill")) {
                response = `Woravut is an expert in Data Science and Development. His strongest skills are Python (${skills.find(s => s.name === "Python")?.level}%), Power BI, and JavaScript.`;
            } else if (text.includes("experience") || text.includes("work")) {
                response = `He has extensive experience in leadership (Student Union President) and technical roles. Currently, he is a Fullstack Developer & IT Support & Data Analyst at Bigmall Plus.`;
            } else if (text.includes("project")) {
                response = `Notable projects: Lung cancer prediction model, Football outcome predictor (DL), and a custom WMS for Bigmall Plus using React and Node.js.`;
            } else if (text.includes("contact") || text.includes("phone") || text.includes("email")) {
                response = `You can email him at ${data.personalInfo.email} or call ${data.personalInfo.phone}.`;
            } else if (text.includes("role") || text.includes("current")) {
                response = `He's currently a Fullstack Developer & IT Support & Data Analyst at Bigmall Plus (since June 2025).`;
            } else if (text.includes("study") || text.includes("education")) {
                const edu = data.education[0];
                response = `He graduated with a ${edu.degree} from ${edu.institution} (${edu.period}).`;
            } else {
                response = `That's interesting! Woravut is always learning. Would you like to know about his technical skills or latest projects?`;
            }
        }

        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'bot', text: response }]);
            setIsTyping(false);
        }, 800);
    };

    const sendMessage = (text) => {
        if (!text) return;
        setMessages(prev => [...prev, { role: 'user', text }]);
        handleBotResponse(text);
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[calc(100vw-32px)] sm:w-[380px] h-[550px] bg-slate-900/98 backdrop-blur-lg border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden transform-gpu"
                    >
                        {/* Header */}
                        <div className="p-5 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-white text-lg">W</div>
                                <div>
                                    <h3 className="text-white text-sm font-bold tracking-tight">Woravut AI Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        <span className="text-[10px] text-blue-100 font-medium">{t.online}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 transition-colors hover:bg-white/10 rounded-full text-white/60 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide bg-slate-950/30">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === 'bot' ? -10 : 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${msg.role === 'bot'
                                            ? 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'
                                            : 'bg-blue-600 text-white rounded-tr-none shadow-blue-900/20'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1.5 border border-white/5">
                                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75"></span>
                                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Quick Questions Grid */}
                        <div className="px-4 py-3 grid grid-cols-2 gap-2 bg-slate-900/50 border-t border-white/10">
                            {t.questions.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => sendMessage(q)}
                                    className="px-3 py-2.5 bg-white/5 hover:bg-blue-600/20 border border-white/5 rounded-xl text-[11px] text-slate-400 hover:text-blue-200 transition-all text-left font-medium leading-tight group"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-slate-900 border-t border-white/10 flex gap-2">
                            <input
                                type="text"
                                placeholder={t.placeholder}
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        sendMessage(e.target.value);
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <button
                                className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white border transition-all duration-300 ${isOpen
                        ? 'bg-slate-800 border-white/20'
                        : 'bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 border-white/30'
                    }`}
            >
                {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">1</span>
                )}
            </motion.button>
        </div>
    );
}
