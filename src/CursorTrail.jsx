import React, { useEffect, useRef } from "react";

export default function CursorTrail({ isDark = true }) {
    const canvasRef = useRef(null);
    const trailRef = useRef([]);
    const mouseRef = useRef({ x: -100, y: -100 });
    const animRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            trailRef.current.push({
                x: e.clientX,
                y: e.clientY,
                alpha: 1,
                size: 8,
            });
            if (trailRef.current.length > 30) {
                trailRef.current.shift();
            }
        };
        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw glow at cursor position
            const { x, y } = mouseRef.current;
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 80);
            gradient.addColorStop(0, isDark ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.05)");
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 80, 0, Math.PI * 2);
            ctx.fill();

            // Draw trail
            for (let i = 0; i < trailRef.current.length; i++) {
                const point = trailRef.current[i];
                point.alpha -= 0.03;
                point.size *= 0.97;

                if (point.alpha <= 0) {
                    trailRef.current.splice(i, 1);
                    i--;
                    continue;
                }

                ctx.beginPath();
                ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
                ctx.fillStyle = isDark
                    ? `rgba(139,92,246,${point.alpha * 0.3})`
                    : `rgba(99,102,241,${point.alpha * 0.15})`;
                ctx.fill();
            }

            animRef.current = requestAnimationFrame(animate);
        };

        animRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[5] pointer-events-none"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
