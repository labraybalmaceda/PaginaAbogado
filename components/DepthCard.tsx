import React, { useEffect, useRef } from 'react';

// Tarjeta con profundidad (hecha a mano, sin librerías).
// Al pasar el mouse: la tarjeta se inclina hacia el cursor, el contenido se desplaza
// un poco hacia él (paralaje) y la sombra se corre al lado contrario.
// El movimiento se suaviza cuadro a cuadro.
// En pantallas táctiles y con "reducir movimiento" activado, la tarjeta no se mueve.

const MAX_TILT = 3;      // inclinación máxima, en grados
const PARALLAX = 2;      // desplazamiento máximo del contenido, en px
const EASE = 0.12;       // suavizado: más bajo = más lento y pesado
const SETTLE = 0.001;    // bajo este valor la animación se detiene

interface DepthCardProps {
    children: React.ReactNode;
    className?: string;
}

// Los hijos que quieran moverse con el paralaje usan este estilo.
export const depthLayerStyle: React.CSSProperties = {
    transform: 'translate3d(var(--dc-x, 0px), var(--dc-y, 0px), 0)',
};

const DepthCard: React.FC<DepthCardProps> = ({ children, className = '' }) => {
    const root = useRef<HTMLDivElement>(null);
    const card = useRef<HTMLDivElement>(null);
    const target = useRef({ x: 0, y: 0, on: 0 });   // posición del cursor de -1 a 1
    const current = useRef({ x: 0, y: 0, on: 0 });
    const raf = useRef<number | null>(null);
    const reduced = useRef(false);

    useEffect(() => {
        reduced.current = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
        return () => { if (raf.current !== null) cancelAnimationFrame(raf.current); };
    }, []);

    const paint = () => {
        const c = current.current;
        const t = target.current;
        c.x += (t.x - c.x) * EASE;
        c.y += (t.y - c.y) * EASE;
        c.on += (t.on - c.on) * EASE;

        const rotateX = -c.y * MAX_TILT;
        const rotateY = c.x * MAX_TILT;
        const el = card.current;
        if (el) {
            el.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
            el.style.boxShadow =
                `${(-c.x * 8).toFixed(1)}px ${(14 - c.y * 6).toFixed(1)}px ${(28 + c.on * 12).toFixed(0)}px ` +
                `rgba(0, 0, 0, ${(0.08 + c.on * 0.06).toFixed(3)})`;
        }
        root.current?.style.setProperty('--dc-x', `${(c.x * PARALLAX).toFixed(2)}px`);
        root.current?.style.setProperty('--dc-y', `${(c.y * PARALLAX).toFixed(2)}px`);

        const moving =
            Math.abs(t.x - c.x) > SETTLE || Math.abs(t.y - c.y) > SETTLE || Math.abs(t.on - c.on) > SETTLE;
        raf.current = moving ? requestAnimationFrame(paint) : null;
    };

    const start = () => {
        if (raf.current === null) raf.current = requestAnimationFrame(paint);
    };

    const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'mouse' || reduced.current || !root.current) return;
        const box = root.current.getBoundingClientRect();
        const px = e.clientX - box.left;
        const py = e.clientY - box.top;
        target.current = {
            x: Math.max(-1, Math.min(1, (px / box.width) * 2 - 1)),
            y: Math.max(-1, Math.min(1, (py / box.height) * 2 - 1)),
            on: 1,
        };
        start();
    };

    const handleLeave = () => {
        target.current = { x: 0, y: 0, on: 0 };
        start();
    };

    return (
        <div
            ref={root}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            className={`h-full ${className}`}
            style={{ perspective: '1000px' }}
        >
            <div
                ref={card}
                className="relative h-full rounded-2xl"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {children}
            </div>
        </div>
    );
};

export default DepthCard;
