import React, { useState, useEffect, useRef } from 'react';
import { trackCTAClick, trackNavClick, trackWhatsAppClick } from '../services/tracking';
import { indexablePosts } from '../content/blog';

// Barra superior con menú de tarjetas desplegables.
// Hecho a mano, sin librerías (inspirado en el "Card Nav" de React Bits, con una
// tarjeta de acento en el dorado del estudio). La barra es la de siempre (ancho
// completo, recta, integrada al hero): logo a la izquierda, menú a la derecha.
// Los enlaces quedan siempre en el HTML (también cerrado), así Google los sigue viendo.

const AREAS = [
    { path: '/abogado-civil-puerto-montt', label: 'Derecho Civil', track: 'Civil' },
    { path: '/abogado-arriendo-puerto-montt', label: 'Arriendos', track: 'Arriendos' },
    { path: '/abogado-familia-puerto-montt', label: 'Derecho de Familia', track: 'Familia' },
    { path: '/abogado-insolvencia-puerto-montt', label: 'Derecho Concursal', track: 'Insolvencia' },
    { path: '/abogado-corporativo-puerto-montt', label: 'Derecho Corporativo', track: 'Corporativo' },
    { path: '/asesoria-legal-empresas-puerto-montt', label: 'Asesoría Mensual para Empresas', track: 'Asesoria Mensual' },
];

// Los 3 artículos más recientes, sin Familia (misma regla que la franja de la portada).
const ARTICULOS = indexablePosts.filter((p) => p.service !== 'familia').slice(0, 3);
const tituloCorto = (title: string) => title.split(':')[0].trim();

const esMovil = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const cabecera = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cerrar con Escape o con un clic fuera del menú.
    useEffect(() => {
        if (!isMenuOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false); };
        const onDown = (e: PointerEvent) => {
            if (cabecera.current && !cabecera.current.contains(e.target as Node)) setIsMenuOpen(false);
        };
        window.addEventListener('keydown', onKey);
        document.addEventListener('pointerdown', onDown);
        return () => {
            window.removeEventListener('keydown', onKey);
            document.removeEventListener('pointerdown', onDown);
        };
    }, [isMenuOpen]);

    // Mismos nombres de seguimiento que antes ("Civil", "Civil Mobile", "Blog"...).
    const navigateTo = (path: string, label: string) => {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
        trackNavClick(esMovil() ? `${label} Mobile` : label);
        setIsMenuOpen(false);
    };

    const irAConsulta = (origen: string) => {
        window.history.pushState({}, '', '/#consulta');
        window.dispatchEvent(new PopStateEvent('popstate'));
        trackCTAClick(origen);
        setIsMenuOpen(false);
    };

    const clicWhatsApp = () => {
        if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', 'conversion', {
                'send_to': 'AW-18229137722/JKXKCOXx5MkcELqiqvRD',
                'value': 1.0,
                'currency': 'CLP'
            });
        }
        trackWhatsAppClick('Header Menu');
    };

    // Tarjetas: borde fino y suave, sombra leve y entrada escalonada al abrir.
    const tarjeta = `rounded-xl p-5 sm:p-6 flex flex-col border shadow-sm transition-all duration-500 ease-[cubic-bezier(0.22,0.8,0.2,1)] motion-reduce:transition-none ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`;
    const retraso = (i: number) => ({ transitionDelay: isMenuOpen ? `${80 + i * 70}ms` : '0ms' });

    return (
        <header
            ref={cabecera}
            className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'} ${isScrolled || isMenuOpen ? 'shadow-md' : ''}`}
        >
            <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center gap-3">
                {/* Logo a la izquierda, como siempre */}
                <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/', 'Home'); }} className="flex items-center gap-3 hover:opacity-80 transition cursor-pointer min-w-0">
                    <img
                        src="https://res.cloudinary.com/dt36zhzde/image/upload/f_auto,q_auto,h_96/lb_monogram_ev2svh"
                        alt="Logo LABRA & BALMACEDA"
                        className="h-10 w-auto sm:h-12 shrink-0"
                        width={87}
                        height={96}
                    />
                    <div className="flex flex-col leading-tight min-w-0">
                        <span className="text-lg sm:text-2xl font-baskerville font-bold text-brand-black tracking-tight uppercase not-italic whitespace-nowrap">
                            LABRA & BALMACEDA
                        </span>
                        <span className="text-[9px] sm:text-xs font-semibold text-brand-gold tracking-[0.25em] uppercase not-italic">
                            ABOGADOS
                        </span>
                    </div>
                </a>

                {/* A la derecha: botón de consulta (PC) y el menú desplegable */}
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <button
                        type="button"
                        onClick={() => irAConsulta('Header CTA')}
                        className="hidden md:inline-flex text-white bg-brand-black hover:bg-brand-gold px-5 py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg uppercase tracking-wider text-xs font-semibold cursor-pointer"
                    >
                        Agendar Consulta
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((v) => !v)}
                        aria-expanded={isMenuOpen}
                        aria-controls="menu-tarjetas"
                        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        className="group flex items-center gap-3 h-11 px-3 rounded-lg text-brand-black hover:bg-gray-50 transition cursor-pointer"
                    >
                        <span className="hidden sm:inline text-xs font-bold uppercase tracking-[0.2em]">{isMenuOpen ? 'Cerrar' : 'Menú'}</span>
                        <span className="relative block w-6 h-4" aria-hidden="true">
                            <span className={`absolute right-0 h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0.5'}`} />
                            <span className={`absolute right-0 h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'w-6 top-1/2 -translate-y-1/2 -rotate-45' : 'w-4 bottom-0.5 group-hover:w-6'}`} />
                        </span>
                    </button>
                </div>
            </div>

            {/* Panel desplegable: se abre por encima del contenido, bajo la barra */}
            <div
                id="menu-tarjetas"
                className={`absolute inset-x-0 top-full grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,0.8,0.2,1)] motion-reduce:transition-none ${
                    isMenuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
                inert={!isMenuOpen}
            >
                <div className="overflow-hidden">
                    <div className={`bg-white/95 backdrop-blur-sm border-t border-gray-100 ${isMenuOpen ? 'shadow-xl' : ''}`}>
                        <nav aria-label="Menú principal" className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 grid md:grid-cols-3 gap-3 sm:gap-4 max-h-[calc(100dvh-5rem)] overflow-y-auto md:max-h-none md:overflow-visible">
                            {/* Izquierda: Áreas de práctica */}
                            <div className={`${tarjeta} bg-brand-black text-white border-white/10`} style={retraso(0)}>
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">Áreas de práctica</p>
                                <ul className="space-y-1">
                                    {AREAS.map((a) => (
                                        <li key={a.path}>
                                            <a
                                                href={a.path}
                                                onClick={(e) => { e.preventDefault(); navigateTo(a.path, a.track); }}
                                                className="group/l flex items-center justify-between gap-3 py-1.5 text-[15px] font-semibold text-white/90 hover:text-brand-gold transition-colors"
                                            >
                                                {a.label}
                                                <svg className="w-4 h-4 shrink-0 opacity-50 transition-transform group-hover/l:translate-x-1 group-hover/l:opacity-100" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Medio: Artículos destacados */}
                            <div className={`${tarjeta} bg-gray-50 text-brand-black border-gray-200`} style={retraso(1)}>
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">Artículos destacados</p>
                                <ul className="space-y-3 mb-4">
                                    {ARTICULOS.map((p) => (
                                        <li key={p.slug}>
                                            <a
                                                href={`/blog/${p.slug}`}
                                                onClick={(e) => { e.preventDefault(); navigateTo(`/blog/${p.slug}`, `Menu Articulo: ${p.slug}`); window.scrollTo(0, 0); }}
                                                className="block text-[15px] font-semibold font-baskerville leading-snug hover:text-brand-gold transition-colors"
                                            >
                                                {tituloCorto(p.title)}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="/blog"
                                    onClick={(e) => { e.preventDefault(); navigateTo('/blog', 'Blog'); window.scrollTo(0, 0); }}
                                    className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-black hover:text-brand-gold transition-colors"
                                >
                                    Ver todos los artículos
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </a>
                            </div>

                            {/* Derecha: Contacto (tarjeta de acento) */}
                            <div className={`${tarjeta} bg-brand-gold text-brand-black border-black/10`} style={retraso(2)}>
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-black/70 mb-4">Contacto</p>
                                <button
                                    type="button"
                                    onClick={() => irAConsulta(esMovil() ? 'Mobile Menu CTA' : 'Header Menu CTA')}
                                    className="w-full text-center bg-brand-black text-white px-4 py-3 rounded-lg font-bold hover:bg-white hover:text-brand-black transition uppercase tracking-widest text-xs cursor-pointer mb-3"
                                >
                                    Agendar consulta
                                </button>
                                <a
                                    href="https://wa.me/56977646224"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={clicWhatsApp}
                                    className="w-full flex items-center justify-center gap-2 bg-white/90 text-brand-black px-4 py-3 rounded-lg font-bold hover:bg-white transition uppercase tracking-widest text-xs mb-4"
                                >
                                    WhatsApp +56 9 7764 6224
                                </a>
                                <div className="mt-auto space-y-1 text-sm">
                                    <a href="mailto:contacto@labraybalmaceda.cl" className="block font-semibold underline-offset-2 hover:underline break-all">contacto@labraybalmaceda.cl</a>
                                    <p className="text-brand-black/75">Lunes a viernes, 09:00 a 19:00</p>
                                    <p className="text-brand-black/75">Puerto Varas · Puerto Montt · Online</p>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
