import React, { useState, useEffect } from 'react';

export default function Terminal({ lines, onFinish }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    // จบทุก entry แล้วสลับไปหน้า Portfolio
    if (lineIndex >= lines.length) {
      const finish = setTimeout(onFinish, 500);
      return () => clearTimeout(finish);
    }

    const entry = lines[lineIndex];

    // 1) ไล่ชื่อโมดูลทีละบรรทัด
    if (entry?.type === 'modules') {
      const { modules, speed = 30 } = entry;
      let idx = 0;
      const iv = setInterval(() => {
        setDisplayedLines(prev => [...prev, modules[idx]]);
        idx++;
        if (idx >= modules.length) {
          clearInterval(iv);
          setLineIndex(li => li + 1);
        }
      }, speed);
      return () => clearInterval(iv);
    }

    // 2) โปรเกรสบาร์ ไล่ 0→100% ทีละ 1%
    if (entry?.type === 'progress') {
      const { label, duration = 2000, length = 40 } = entry;
      let pct = 0;
      const stepTime = duration / 100; // 100 ขั้น
      setCurrentLine('');
      const iv = setInterval(() => {
        pct++;
        const filled = Math.round((pct / 100) * length);
        const bar = '='.repeat(filled) + ' '.repeat(length - filled);
        setCurrentLine(`${label} [${bar}] ${pct}%`);
        if (pct >= 100) {
          clearInterval(iv);
          setDisplayedLines(prev => [
            ...prev,
            `${label} [${'='.repeat(length)}] 100%`
          ]);
          setCurrentLine('');
          setLineIndex(li => li + 1);
        }
      }, stepTime);
      return () => clearInterval(iv);
    }

    // 3) ข้อความปกติ พิมพ์ทีละตัวอักษร
    if (typeof entry === 'string') {
      if (charIndex < entry.length) {
        const t = setTimeout(() => {
          setCurrentLine(prev => prev + entry[charIndex]);
          setCharIndex(ci => ci + 1);
        }, 20);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setDisplayedLines(prev => [...prev, entry]);
          setCurrentLine('');
          setLineIndex(li => li + 1);
          setCharIndex(0);
        }, 50);
        return () => clearTimeout(t);
      }
    }
    // 4) ASCII art block
    if (entry?.type === 'ascii-block') {
      setDisplayedLines(prev => [...prev, ...entry.art]);
      // ไม่ต้องรออะไร พุชบล็อกแล้วไปบรรทัดถัดไปเลย
      setLineIndex(li => li + 1);
      return;
    }
    // ถ้าเจอ entry รูปแบบไม่รู้จัก ให้ข้ามไป
    setLineIndex(li => li + 1);
  }, [charIndex, lineIndex, lines, onFinish]);

  return (
    <div className="h-screen bg-black text-green-400 font-mono p-6 whitespace-pre-wrap overflow-hidden">
      {displayedLines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <div>
        {currentLine}
        <span className="inline-block w-1 h-5 bg-green-400 animate-pulse ml-1" />
      </div>
    </div>
  );
}
