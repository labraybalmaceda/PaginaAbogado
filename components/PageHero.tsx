import React from 'react';

// Cabecera de las páginas internas (servicios, /blog y artículos): foto con capa
// oscura y, encima, un panel de vidrio con el rótulo del área en mayúsculas
// espaciadas, el H1 en Libre Baskerville y lo que venga debajo (fecha, bajada).
// Modelo: las páginas internas de bye.cl (mucho aire, sin cajas pesadas).

interface PageHeroProps {
    eyebrow: string;
    title: React.ReactNode;
    /** Lo que va bajo el H1 (fecha de publicación, bajada…). */
    children?: React.ReactNode;
    /** Lo que va sobre el panel (migas de pan). */
    above?: React.ReactNode;
    image?: string;
    /** Clases de posición de la foto. */
    imageClass?: string;
    /** Ancho máximo del contenedor (alinea la cabecera con el cuerpo de la página). */
    containerClass?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
    eyebrow,
    title,
    children,
    above,
    image = '/fotohero.webp',
    imageClass = 'bg-center md:bg-fixed',
    containerClass = 'max-w-5xl',
}) => (
    <section
        className={`relative bg-cover bg-scroll ${imageClass} pt-28 pb-12 sm:pt-40 sm:pb-20`}
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(17, 17, 17, 0.62), rgba(17, 17, 17, 0.74)), url('${image}')` }}
    >
        <div className={`container mx-auto px-4 sm:px-6 ${containerClass}`}>
            {above}
            <header className="glass-light border border-white/15 rounded-2xl px-6 py-8 sm:px-12 sm:py-12 max-w-4xl">
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-4 sm:mb-5">
                    {eyebrow}
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-baskerville tracking-tight not-italic leading-tight text-white">
                    {title}
                </h1>
                {children}
            </header>
        </div>
    </section>
);

export default PageHero;
