import React, { useRef } from 'react';

// Brillo en el borde: sigue al cursor y se intensifica al acercarse a un costado.
// Hecho a mano, sin librerías. En pantallas táctiles queda solo el borde fijo.
// Se usa en las tarjetas de Áreas de Práctica y en las tarjetas de artículos
// ("Artículos sobre este tema" y "Seguir leyendo").
const GLOW_CORE = '#E8B321';
const GLOW_MAIN = '#BF8F0A';
const GLOW_EDGE_PX = 90;

const GLOW_GRADIENT =
    `radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), ${GLOW_CORE}, ${GLOW_MAIN} 38%, transparent 72%), ` +
    `radial-gradient(170px circle at var(--rx, 50%) var(--ry, 50%), rgba(191, 143, 10, 0.55), transparent 70%)`;

interface GlowFrameProps {
    children: React.ReactNode;
    /** Redondeo de la tarjeta que envuelve (debe coincidir con el de la tarjeta). */
    rounded?: string;
    /** Clases extra del contenedor. */
    className?: string;
}

const GlowFrame: React.FC<GlowFrameProps> = ({ children, rounded = 'rounded-2xl', className = 'h-full -translate-y-2' }) => {
    const frame = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'mouse' || !frame.current) return;
        const box = frame.current.getBoundingClientRect();
        const x = e.clientX - box.left;
        const y = e.clientY - box.top;
        const edge = Math.min(x, box.width - x, y, box.height - y);
        const nearness = 1 - Math.min(Math.max(edge, 0), GLOW_EDGE_PX) / GLOW_EDGE_PX;
        const el = frame.current;
        el.style.setProperty('--x', `${x}px`);
        el.style.setProperty('--y', `${y}px`);
        el.style.setProperty('--rx', `${box.width - x}px`);
        el.style.setProperty('--ry', `${box.height - y}px`);
        el.style.setProperty('--o', String(0.3 + 0.7 * nearness));
    };

    const handleLeave = () => frame.current?.style.setProperty('--o', '0');

    return (
        <div
            ref={frame}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            className={`relative isolate ${rounded} ${className}`}
            style={{ '--o': 0 } as React.CSSProperties}
        >
            {children}
            {/* Línea de borde brillante (solo el contorno de 2 px) */}
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 ${rounded} p-0.5 transition-opacity duration-300`}
                style={{
                    background: GLOW_GRADIENT,
                    opacity: 'var(--o)',
                    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
                }}
            />
        </div>
    );
};

export default GlowFrame;
