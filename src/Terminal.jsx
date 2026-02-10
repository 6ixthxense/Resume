import React, { useState, useEffect } from 'react';

export default function Terminal({ lines, onFinish }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onFinish]);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      const finish = setTimeout(onFinish, 500);
      return () => clearTimeout(finish);
    }

    const entry = lines[lineIndex];

    if (entry?.type === 'modules') {
      const { modules, speed = 15 } = entry;
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

    if (entry?.type === 'progress') {
      const { label, duration = 1000, length = 40 } = entry;
      let pct = 0;
      const stepTime = duration / 100;
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

    if (typeof entry === 'string') {
      if (charIndex < entry.length) {
        const t = setTimeout(() => {
          setCurrentLine(prev => prev + entry[charIndex]);
          setCharIndex(ci => ci + 1);
        }, 15);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setDisplayedLines(prev => [...prev, entry]);
          setCurrentLine('');
          setLineIndex(li => li + 1);
          setCharIndex(0);
        }, 30);
        return () => clearTimeout(t);
      }
    }

    if (entry?.type === 'ascii-block') {
      setDisplayedLines(prev => [...prev, ...entry.art]);
      setLineIndex(li => li + 1);
      return;
    }

    setLineIndex(li => li + 1);
  }, [charIndex, lineIndex, lines, onFinish]);

  return (
    <div className="h-screen bg-black text-green-400 font-mono p-6 whitespace-pre-wrap overflow-hidden relative">
      <div className="absolute top-4 right-6 text-xs text-green-800 animate-pulse">
        Press ESC to skip
      </div>
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
