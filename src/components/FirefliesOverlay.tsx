import React from "react";

const FIREFLY_COUNT = 40;

const getRandom = (min: number, max: number) =>
    Math.random() * (max - min) + min;

const FirefliesOverlay: React.FC = () => {
    // Generujeme keyframes pre každú svetlušku
    const styles: string[] = [];

    const fireflies = Array.from({ length: FIREFLY_COUNT }).map((_, i) => {
        // Random starting positions (20% - 80% of screen)
        const startX = getRandom(20, 80);
        const startY = getRandom(20, 80);
        
        // Random movement (target)
        const tx = getRandom(-45, 45);
        const ty = getRandom(-40, 40);
        const scale = getRandom(0.7, 1.6);
        const duration = getRandom(8, 22);
        const delay = getRandom(0, 15);

        // Unikátne keyframes pre každú musku
        const kf = `
        @keyframes firefly-move-${i} {
            from {
                transform: translate(0,0) scale(1);
            }
            to {
                transform: translate(${tx}vw, ${ty}vh) scale(${scale});
            }
        }`;

        styles.push(kf);

        return (
            <div
                key={i}
                className="firefly absolute w-2 h-2 rounded-full pointer-events-none"
                style={{
                    left: `${startX}%`,
                    top: `${startY}%`,
                    animation: `firefly-move-${i} ${duration}s ease-in-out ${delay * -1}s infinite alternate`,
                    boxShadow:
                        "0 0 6px 2px #fffca1, 0 0 16px 4px #ffe53b, 0 0 60px 14px #fffa8a",
                    background:
                        "radial-gradient(circle, #ffffd3 60%, #fffbb3 80%, #fff 100%)",
                    opacity: getRandom(0.55, 1),
                    zIndex: 30,
                }}
            />
        );
    });

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
            <style>{styles.join("\n")}</style>
            {fireflies}
        </div>
    );
};

export default FirefliesOverlay;
