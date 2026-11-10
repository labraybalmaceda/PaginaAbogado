import React, { useEffect, useState } from 'react';
import { indexablePosts } from '../content/blog';
import { navigateTo } from './blogUtils';
import { trackNavClick } from '../services/tracking';
import { useDragSwipe } from './useDragSwipe';

// Franja negra bajo el hero: muestra un artículo del blog a la vez y cambia
// cada 10 segundos. Los artículos de Familia no se promocionan aquí.
const INTERVALO_MS = 10000;

const destacados = indexablePosts.filter((p) => p.service !== 'familia');

const Flecha: React.FC<{ lado: 'izq' | 'der'; onClick: () => void; className?: string }> = ({ lado, onClick, className = '' }) => (
    <button
        type="button"
        onClick={onClick}
        aria-label={lado === 'izq' ? 'Artículo anterior' : 'Artículo siguiente'}
        className={`shrink-0 items-center justify-center w-11 h-11 rounded-full border border-[#BF8F0A]/60 text-[#BF8F0A] hover:bg-[#BF8F0A] hover:text-brand-black transition duration-300 cursor-pointer ${className}`}
    >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d={lado === 'izq' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
        </svg>
    </button>
);

/** Titular corto: lo que va antes de los dos puntos, o las primeras 8 palabras. */
const tituloCorto = (title: string): string => {
    const antesDeDosPuntos = title.split(':')[0].trim();
    const palabras = antesDeDosPuntos.split(/\s+/);
    return palabras.length <= 8 ? antesDeDosPuntos : `${palabras.slice(0, 8).join(' ')}…`;
};

const BlogDestacados: React.FC = () => {
    const [actual, setActual] = useState(0);
    const [pausado, setPausado] = useState(false);
    // Arrastre con mouse o dedo: el artículo sigue al puntero y, al soltar, pasa al siguiente o al anterior.
    const drag = useDragSwipe((dir) => setActual((i) => (i + dir + destacados.length) % destacados.length));

    useEffect(() => {
        if (pausado || drag.dragging || destacados.length < 2) return;
        const id = window.setTimeout(() => {
            setActual((i) => (i + 1) % destacados.length);
        }, INTERVALO_MS);
        return () => window.clearTimeout(id);
    }, [actual, pausado, drag.dragging]);

    if (destacados.length === 0) return null;

    const ir = (paso: number) => setActual((i) => (i + paso + destacados.length) % destacados.length);
    const hayVarios = destacados.length > 1;

    return (
        <section
            className="bg-brand-black text-white py-12 sm:py-16 border-b border-white/5"
            aria-label="Artículos del blog"
            onMouseEnter={() => setPausado(true)}
            onMouseLeave={() => setPausado(false)}
            onFocus={() => setPausado(true)}
            onBlur={() => setPausado(false)}
        >
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                {/* Todos los artículos ocupan la misma celda: el alto no salta al cambiar. */}
                <div className="flex items-center gap-4 lg:gap-8">
                {hayVarios && <Flecha lado="izq" onClick={() => ir(-1)} className="hidden md:flex" />}
                <div
                    {...(hayVarios ? drag.bind : {})}
                    className={`grid flex-1 min-w-0 touch-pan-y select-none ${drag.dragging ? 'cursor-grabbing' : hayVarios ? 'md:cursor-grab' : ''}`}
                >
                    {destacados.map((post, i) => {
                        const visible = i === actual;
                        const arrastrando = visible && drag.dragging;
                        return (
                            <a
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    trackNavClick(`Portada Blog: ${post.slug}`);
                                    navigateTo(`/blog/${post.slug}`);
                                }}
                                aria-hidden={!visible}
                                tabIndex={visible ? 0 : -1}
                                className={`group [grid-area:1/1] flex flex-col md:flex-row md:items-center gap-6 md:gap-12 transition-[opacity,transform] duration-700 motion-reduce:transition-none ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                style={arrastrando ? {
                                    transform: `translateX(${drag.dx}px)`,
                                    opacity: Math.max(0.3, 1 - Math.abs(drag.dx) / 400),
                                    transition: 'none',
                                } : undefined}
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-2xl sm:text-3xl font-bold font-baskerville tracking-tight leading-snug text-white mb-3">
                                        {tituloCorto(post.title)}
                                    </p>
                                    <p className="text-sm sm:text-base text-white/70 leading-relaxed line-clamp-3 md:line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <span className="inline-flex self-start md:self-center shrink-0 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-md border border-[#BF8F0A] text-[#BF8F0A] group-hover:bg-[#BF8F0A] group-hover:text-brand-black transition duration-300">
                                    Leer artículo
                                </span>
                            </a>
                        );
                    })}
                </div>
                {hayVarios && <Flecha lado="der" onClick={() => ir(1)} className="hidden md:flex" />}
                </div>

                {hayVarios && (
                    <div className="flex items-center justify-between gap-4 mt-8 md:pl-[3.75rem] lg:pl-[4.75rem]">
                        <div className="flex gap-1 sm:gap-2">
                        {destacados.map((post, i) => (
                            <button
                                key={post.slug}
                                type="button"
                                onClick={() => setActual(i)}
                                aria-label={`Ver artículo ${i + 1} de ${destacados.length}`}
                                aria-current={i === actual}
                                className="py-2 cursor-pointer"
                            >
                                <span className={`block h-0.5 w-4 sm:w-8 transition-colors duration-300 ${i === actual ? 'bg-[#BF8F0A]' : 'bg-white/25 hover:bg-white/50'}`}></span>
                            </button>
                        ))}
                        </div>
                        <div className="flex gap-3 md:hidden">
                            <Flecha lado="izq" onClick={() => ir(-1)} className="flex" />
                            <Flecha lado="der" onClick={() => ir(1)} className="flex" />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogDestacados;
