import React, { useEffect, useRef } from 'react';

export default function HexRain({
  fontSize = 14,
  speed = 50,
  columns = null,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const w      = (canvas.width  = window.innerWidth);
    const h      = (canvas.height = window.innerHeight);
    const cols   = columns || Math.floor(w / fontSize);
    const drops  = Array(cols).fill(0);
    const hexChars = '0123456789';

    function draw() {
      // สร้างเงาดำโปร่งให้ดูลากเบลอ
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#0F0';
      ctx.font      = `${fontSize}px monospace`;

      for (let x = 0; x < cols; x++) {
        const char = hexChars[Math.floor(Math.random() * hexChars.length)];
        const y     = drops[x] * fontSize;
        ctx.fillText(char, x * fontSize, y);

        // ถ้าละเมอเกินจอ ให้รีเซ็ต
        if (y > h && Math.random() > 0.975) {
          drops[x] = 0;
        } else {
          drops[x]++;
        }
      }
    }

    const tid = setInterval(draw, speed);
    return () => clearInterval(tid);
  }, [fontSize, speed, columns]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
