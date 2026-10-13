import React, { useEffect, useState } from 'react';
import { indexablePosts } from '../content/blog';
import { navigateTo } from './blogUtils';
import { trackNavClick } from '../services/tracking';

// Franja negra bajo el hero: muestra un artículo del blog a la vez y cambia
// cada 10 segundos. Los artículos de Familia no se promocionan aquí.
const INTERVALO_MS = 10000;

const destacados = indexablePosts.filter((p) => p.service !== 'familia');

/** Titular corto: lo que va antes de los dos puntos, o las primeras 8 palabras. */
const tituloCorto = (title: string): string => {
    const antesDeDosPuntos = title.split(':')[0].trim();
    const palabras = antesDeDosPuntos.split(/\s+/);
    return palabras.length <= 8 ? antesDeDosPuntos : `${palabras.slice(0, 8).join(' ')}…`;
};

const BlogDestacados: React.FC = () => {
    const [actual, setActual] = useState(0);
    const [pausado, setPausado] = useState(false);

    useEffect(() => {
        if (pausado || destacados.length < 2) return;
        const id = window.setTimeout(() => {
            setActual((i) => (i + 1) % destacados.length);
        }, INTERVALO_MS);
        return () => window.clearTimeout(id);
    }, [actual, pausado]);

    if (destacados.length === 0) return null;

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
                <div className="grid">
                    {destacados.map((post, i) => {
                        const visible = i === actual;
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
                                className={`group [grid-area:1/1] flex flex-col md:flex-row md:items-center gap-6 md:gap-12 transition-opacity duration-700 motion-reduce:transition-none ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-2xl sm:text-3xl font-bold font-baskerville tracking-tight leading-snug text-white mb-3">
                                        {tituloCorto(post.title)}
                                    </p>
                                    <p className="text-sm sm:text-base text-white/70 leading-relaxed line-clamp-3 md:line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <span className="inline-flex self-start md:self-center shrink-0 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-md border border-[#DDB35F] text-[#DDB35F] group-hover:bg-[#DDB35F] group-hover:text-brand-black transition duration-300">
                                    Leer artículo
                                </span>
                            </a>
                        );
                    })}
                </div>

                {destacados.length > 1 && (
                    <div className="flex gap-2 mt-8">
                        {destacados.map((post, i) => (
                            <button
                                key={post.slug}
                                type="button"
                                onClick={() => setActual(i)}
                                aria-label={`Ver artículo ${i + 1} de ${destacados.length}`}
                                aria-current={i === actual}
                                className="py-2 cursor-pointer"
                            >
                                <span className={`block h-0.5 w-8 transition-colors duration-300 ${i === actual ? 'bg-[#DDB35F]' : 'bg-white/25 hover:bg-white/50'}`}></span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogDestacados;