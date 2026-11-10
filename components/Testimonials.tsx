import React, { useState } from 'react';
import { trackCTAClick } from '../services/tracking';
import { useDragSwipe } from './useDragSwipe';

// "Casos tipo y enfoque de trabajo": carrusel con profundidad.
// La tarjeta activa queda al frente; las vecinas se ven detrás, más pequeñas
// e inclinadas. Hecho a mano, sin librerías (inspirado en el "Depth Carousel"
// de React Bits). Todo el contenido queda en el HTML, también para Google.

interface CaseLink {
    text: string;
    href: string;
    /** 'articulo' = artículo del blog; 'area' = página de servicio. */
    kind: 'articulo' | 'area';
}

interface CaseType {
    title: string;
    situation: string;
    approach: string;
    links: CaseLink[];
    tag: string;
    /** Foto de public/. Encuadre con `imagePosition` (object-position). */
    image: string;
    imagePosition: string;
}

// Navegación interna, mismo patrón que el resto del sitio (SPA sin router).
const navigateToArticle = (href: string) => {
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
};

const cases: CaseType[] = [
    {
        title: 'Incumplimiento Contractual',
        situation: 'Contrataste un servicio que no se ejecutó, o la otra parte no cumplió lo pactado.',
        approach: 'Revisamos qué pruebas tienes, intentamos resolverlo antes de tribunales y, si no, demandamos.',
        links: [
            { text: 'Revisa qué hacer ante un incumplimiento de contrato', href: '/blog/incumplimiento-de-contrato', kind: 'articulo' },
            { text: 'Revisa cómo cobrar una factura, un pagaré o un cheque', href: '/blog/juicio-ejecutivo-cobro-de-deudas', kind: 'articulo' },
        ],
        tag: 'Civil',
        image: '/fondo-articulo-blog.jpg',
        imagePosition: '22% center',
    },
    {
        title: 'Constitución de Sociedades',
        situation: 'Vas a formar una empresa con otra persona y no sabes qué tipo de sociedad conviene ni qué dejar por escrito entre los socios.',
        approach: 'Te decimos qué sociedad conviene, redactamos el estatuto y dejamos resuelto qué pasa si un socio quiere salir o si no se ponen de acuerdo.',
        links: [
            { text: 'Revisa cómo constituir una empresa en Chile', href: '/blog/como-constituir-una-empresa-en-chile', kind: 'articulo' },
            { text: 'Conoce nuestra área de Derecho Corporativo', href: '/abogado-corporativo-puerto-montt', kind: 'area' },
        ],
        tag: 'Corporativo',
        image: '/foto2.jpg',
        imagePosition: '30% center',
    },
    {
        title: 'No Pago de Rentas',
        situation: 'El arrendatario lleva meses sin pagar y no quiere devolverte la propiedad.',
        approach: 'Revisamos el contrato, sacamos la cuenta de lo que te deben y elegimos la vía más rápida para recuperar tu inmueble.',
        links: [
            { text: 'Revisa qué hacer si tu arrendatario no paga', href: '/blog/arrendatario-no-se-quiere-ir-que-hacer', kind: 'articulo' },
            { text: 'Conoce nuestra área de Arriendos', href: '/abogado-arriendo-puerto-montt', kind: 'area' },
        ],
        tag: 'Arriendo',
        image: '/casos-puerto-varas-aereo.webp',
        imagePosition: '55% 60%',
    },
    {
        title: 'Deudas y Acreedores',
        situation: 'Las deudas de la empresa se hicieron impagables y ya empezó la cobranza judicial.',
        approach: 'Miramos la situación completa de la empresa y le decimos qué alternativas reales tiene: defenderse, reorganizarse o liquidar de forma ordenada.',
        links: [
            { text: 'Conoce cómo enfrentar las deudas de tu empresa', href: '/abogado-insolvencia-puerto-montt', kind: 'area' },
        ],
        tag: 'Derecho Concursal',
        image: '/casos-iglesia-puerto-varas.webp',
        imagePosition: '62% 55%',
    },
];

/** Posición relativa a la tarjeta activa, con vuelta: -1 izquierda, 0 frente, 1 derecha. */
const relativeOffset = (i: number, active: number, n: number) => {
    let off = (i - active) % n;
    if (off > n / 2) off -= n;
    if (off < -n / 2) off += n;
    return off;
};

const CaseCard: React.FC<{ c: CaseType; isActive: boolean }> = ({ c, isActive }) => (
    <article className="relative bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-[1.15fr_1fr] md:min-h-[30rem] text-left">
        <div className="absolute inset-x-0 top-0 h-1 bg-brand-gold z-10" aria-hidden="true" />

        {/* Foto: arriba en el teléfono, a la derecha en PC */}
        <div className="relative h-44 sm:h-56 md:h-auto md:order-2">
            <img
                src={c.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: c.imagePosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-brand-black/25" aria-hidden="true" />
            <div className="absolute inset-3 sm:inset-4 rounded-2xl ring-1 ring-inset ring-white/40" aria-hidden="true" />
        </div>

        {/* Texto */}
        <div className="p-6 sm:p-10 flex flex-col">
            <span className="self-start px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                {c.tag}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-black font-baskerville tracking-tight leading-tight mb-6">
                {c.title}
            </h3>

            <div className="space-y-5 mb-8">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-1.5">Situación habitual</span>
                    <p className="text-[15px] text-gray-600 leading-relaxed">{c.situation}</p>
                </div>
                <div className="border-l-2 border-brand-gold pl-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-1.5">Cómo lo abordamos</span>
                    <p className="text-[15px] text-brand-black leading-relaxed font-medium">{c.approach}</p>
                </div>
            </div>

            <ul className="mt-auto space-y-2">
                {c.links.map((link, j) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            tabIndex={isActive ? 0 : -1}
                            onClick={(e) => {
                                e.preventDefault();
                                navigateToArticle(link.href);
                                trackCTAClick(j === 0 ? `Caso ${c.tag} - Articulo` : `Caso ${c.tag} - Articulo ${j + 1}`);
                            }}
                            className="group/link flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-gray-50 hover:bg-brand-black transition-colors duration-300"
                        >
                            <span>
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gold block">
                                    {link.kind === 'articulo' ? 'Artículo destacado' : 'Área de práctica'}
                                </span>
                                <span className="text-sm font-semibold text-brand-black group-hover/link:text-white transition-colors duration-300">
                                    {link.text}
                                </span>
                            </span>
                            <svg className="w-4 h-4 shrink-0 text-brand-gold transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </article>
);

const Flecha: React.FC<{ lado: 'izq' | 'der'; onClick: () => void }> = ({ lado, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        aria-label={lado === 'izq' ? 'Caso anterior' : 'Caso siguiente'}
        className="flex items-center justify-center w-12 h-12 rounded-full border border-brand-gold/60 text-brand-gold hover:bg-brand-gold hover:text-white transition duration-300 cursor-pointer"
    >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d={lado === 'izq' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
        </svg>
    </button>
);

const Testimonials: React.FC = () => {
    const [active, setActive] = useState(0);
    const n = cases.length;
    const go = (step: number) => setActive((i) => (i + step + n) % n);
    const drag = useDragSwipe((dir) => go(dir));

    const handleScrollClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const href = event.currentTarget.getAttribute('href');
        if (href?.startsWith('#')) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section id="testimonios" className="py-20 sm:py-28 bg-gray-50/50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-brand-black uppercase tracking-tight font-baskerville not-italic">
                        Casos tipo y <span className="text-brand-gold">enfoque de trabajo</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-medium">
                        Ejemplos de situaciones frecuentes y nuestra forma de resolverlas. <br className="hidden sm:block" />
                        <span className="text-brand-black">Te orientamos según tus antecedentes específicos.</span>
                    </p>
                </div>

                {/* Escenario: todas las tarjetas comparten la misma celda; la profundidad la dan las transformaciones. */}
                <div
                    role="region"
                    aria-roledescription="carrusel"
                    aria-label="Casos tipo"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
                        if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
                    }}
                    {...drag.bind}
                    className={`grid [perspective:1800px] [--shift:90%] md:[--shift:58%] touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 rounded-3xl ${
                        drag.dragging ? 'cursor-grabbing' : 'md:cursor-grab'
                    }`}
                >
                    {cases.map((c, i) => {
                        const off = relativeOffset(i, active, n);
                        const isActive = off === 0;
                        const isSide = Math.abs(off) === 1;
                        // Mientras se arrastra, todo el carrusel sigue al puntero.
                        const follow = `translateX(${drag.dx}px)`;
                        const transform = isActive
                            ? `${follow} translateX(0) scale(1) rotateY(0deg)`
                            : isSide
                                ? `${follow} translateX(calc(${off} * var(--shift))) scale(0.8) rotateY(${off * -14}deg)`
                                : `${follow} translateX(0) scale(0.6) rotateY(0deg)`;
                        return (
                            <div
                                key={c.title}
                                aria-hidden={!isActive}
                                onClick={isSide ? () => setActive(i) : undefined}
                                className={`[grid-area:1/1] w-full max-w-4xl mx-auto transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,0.8,0.2,1)] motion-reduce:transition-none ${
                                    isActive ? 'z-30' : isSide ? 'z-20 cursor-pointer' : 'z-10 pointer-events-none'
                                }`}
                                style={{
                                    transform,
                                    transition: drag.dragging ? 'none' : undefined,
                                    opacity: isActive ? 1 : isSide ? 0.55 : 0,
                                    filter: isActive ? 'none' : 'saturate(0.6)',
                                }}
                            >
                                <div className={isActive ? '' : 'pointer-events-none select-none'}>
                                    <CaseCard c={c} isActive={isActive} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Controles */}
                <div className="flex items-center justify-center gap-6 mt-10">
                    <Flecha lado="izq" onClick={() => go(-1)} />
                    <div className="flex items-center gap-2">
                        {cases.map((c, i) => (
                            <button
                                key={c.title}
                                type="button"
                                onClick={() => setActive(i)}
                                aria-label={`Ver caso ${i + 1} de ${n}: ${c.title}`}
                                aria-current={i === active}
                                className="py-2 cursor-pointer"
                            >
                                <span className={`block h-0.5 transition-all duration-300 ${i === active ? 'w-10 bg-brand-gold' : 'w-5 bg-gray-300 hover:bg-gray-400'}`} />
                            </button>
                        ))}
                    </div>
                    <Flecha lado="der" onClick={() => go(1)} />
                </div>
                <p className="text-center text-xs text-gray-400 tracking-widest mt-3 tabular-nums" aria-live="polite">
                    {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                </p>

                <div className="text-center mt-12">
                    <a
                        href="#consulta"
                        className="inline-block px-10 py-5 bg-brand-black text-white hover:bg-brand-gold rounded-xl font-bold transition-all duration-300 shadow-xl uppercase tracking-widest text-sm"
                        onClick={(e) => { handleScrollClick(e); trackCTAClick('Testimonials Consultation CTA Central'); }}
                    >
                        Agendar consulta
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
