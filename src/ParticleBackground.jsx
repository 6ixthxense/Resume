import React, { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground({ isDark = true }) {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const options = useMemo(
        () => ({
            fullScreen: false,
            background: { color: "transparent" },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                },
                modes: {
                    grab: {
                        distance: 150,
                        links: { opacity: 0.4 },
                    },
                    push: { quantity: 3 },
                },
            },
            particles: {
                color: {
                    value: isDark
                        ? ["#3B82F6", "#8B5CF6", "#06B6D4", "#EC4899"]
                        : ["#2563EB", "#7C3AED", "#0891B2", "#DB2777"],
                },
                links: {
                    color: isDark ? "#334155" : "#94a3b8",
                    distance: 130,
                    enable: true,
                    opacity: isDark ? 0.15 : 0.12,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: "none",
                    outModes: { default: "bounce" },
                },
                number: {
                    density: { enable: true, area: 900 },
                    value: 60,
                },
                opacity: {
                    value: { min: 0.2, max: 0.6 },
                    animation: {
                        enable: true,
                        speed: 0.5,
                        minimumValue: 0.1,
                    },
                },
                shape: { type: "circle" },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        }),
        [isDark]
    );

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={options}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ position: "fixed", inset: 0, zIndex: 0 }}
        />
    );
}
