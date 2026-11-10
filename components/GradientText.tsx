import React, { useEffect, useRef } from 'react';

interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    /** Colores del degradado. El primero se repite al final para que el recorrido sea continuo. */
    colors?: string[];
    /** Segundos que tarda en ir de un extremo al otro. */
    duration?: number;
}

/**
 * Texto con degradado animado que se desplaza de lado a lado.
 * Hecho a mano, sin librerías (inspirado en el "Gradient Text" de React Bits).
 * El texto sigue siendo texto normal (se indexa y se lee igual); si la persona
 * pidió menos movimiento, queda quieto con el degradado fijo.
 */
const GradientText: React.FC<GradientTextProps> = ({
    children,
    className = '',
    // Dorado con un destello blanco puro al centro, que recorre la palabra.
    colors = ['#BF8F0A', '#BF8F0A', '#E8B321', '#FFFFFF', '#E8B321', '#BF8F0A', '#BF8F0A'],
    duration = 5,
}) => {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof el.animate !== 'function') return;
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
        const animacion = el.animate(
            [{ backgroundPosition: '0% 50%' }, { backgroundPosition: '100% 50%' }],
            { duration: duration * 1000, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }
        );
        return () => animacion.cancel();
    }, [duration]);

    return (
        <span
            ref={ref}
            className={className}
            style={{
                backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
                backgroundSize: '300% 100%',
                backgroundPosition: '0% 50%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
            }}
        >
            {children}
        </span>
    );
};

export default GradientText;
