import React, { useState, useEffect, useRef } from 'react';
import { trackCTAClick, trackNavClick, trackWhatsAppClick } from '../services/tracking';
import { indexablePosts } from '../content/blog';
import { currentLang, homeOf, switchTarget, conIdioma, normalizePath, type Lang } from './i18n';

// Barra superior con menú de tarjetas desplegables. Hecha a mano, sin librerías.
// Sigue recta, de ancho completo y con el logo a la izquierda (decisión del 10-11).
// Fondo del vidrio: negro al 88 %, para que el texto chico y el dorado tengan contraste
// también cuando la barra pasa por encima de secciones blancas (revisión del 19-11).
const VIDRIO_OPACO: React.CSSProperties = { backgroundColor: 'rgb(17 17 17 / 0.88)' };

// Va fija encima del contenido:
// - variant "overlay" (páginas con foto arriba): transparente con letras blancas
//   y, al bajar unos 40 px, pasa a vidrio oscuro.
// - variant "solid" (páginas sin foto arriba, como privacidad o 404): vidrio desde el inicio.
// El vidrio de la barra va en una capa hermana (no en el <header>): si el <header>
// tuviera backdrop-filter, el vidrio del menú desplegable, que es su hijo, no
// difuminaría la página de atrás.
// Los enlaces quedan siempre en el HTML (también cerrado), así Google los sigue viendo.

// `track` = nombre de seguimiento de siempre; no cambiar.
const AREAS_ES = [
    { path: '/abogado-corporativo-puerto-montt', label: 'Derecho Corporativo', track: 'Corporativo' },
    { path: '/asesoria-legal-empresas-puerto-montt', label: 'Asesoría Mensual para Empresas', track: 'Asesoria Mensual' },
    { path: '/abogado-civil-puerto-montt', label: 'Litigios Civiles y Comerciales', track: 'Civil' },
    { path: '/abogado-insolvencia-puerto-montt', label: 'Derecho Concursal', track: 'Insolvencia' },
    { path: '/abogado-inmobiliario-puerto-montt', label: 'Inmobiliario y Construcción', track: 'Inmobiliario' },
    { path: '/abogado-arriendo-puerto-montt', label: 'Arriendos', track: 'Arriendos' },
    { path: '/abogado-familia-puerto-montt', label: 'Derecho de Familia', track: 'Familia' },
];

const AREAS_EN = [
    { path: '/en/corporate-law', label: 'Corporate Law', track: 'Corporativo EN' },
    { path: '/en/monthly-legal-counsel', label: 'Monthly Legal Counsel', track: 'Asesoria Mensual EN' },
    { path: '/en/litigation', label: 'Civil and Commercial Litigation', track: 'Civil EN' },
    { path: '/en/insolvency', label: 'Insolvency Law', track: 'Insolvencia EN' },
    { path: '/en/real-estate-and-construction', label: 'Real Estate and Construction', track: 'Inmobiliario EN' },
];

const TEXTOS = {
    es: {
        cta: 'Agendar Consulta',
        menu: 'Menú',
        cerrar: 'Cerrar',
        abrir: 'Abrir menú',
        cerrarMenu: 'Cerrar menú',
        areas: 'Áreas de práctica',
        articulos: 'Artículos destacados',
        verTodos: 'Ver todas las publicaciones',
        contacto: 'Contacto',
        agendar: 'Agendar consulta',
        horario: 'Lunes a viernes, 09:00 a 19:00',
        menuPrincipal: 'Menú principal',
        idioma: 'Idioma',
    },
    en: {
        cta: 'Book a Consultation',
        menu: 'Menu',
        cerrar: 'Close',
        abrir: 'Open menu',
        cerrarMenu: 'Close menu',
        areas: 'Practice areas',
        articulos: 'Publications (in Spanish)',
        verTodos: 'See all publications',
        contacto: 'Contact',
        agendar: 'Book a consultation',
        horario: 'Monday to Friday, 09:00 to 19:00',
        menuPrincipal: 'Main menu',
        idioma: 'Language',
    },
} as const;

// Los 3 artículos más recientes, sin Familia (misma regla que la franja de la portada).
const ARTICULOS = indexablePosts.filter((p) => p.service !== 'familia').slice(0, 3);
const tituloCorto = (title: string) => title.split(':')[0].trim();

const esMovil = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

const UMBRAL_SCROLL = 40;

interface HeaderProps {
    /** "overlay": transparente sobre la foto del hero. "solid": vidrio desde el inicio. */
    variant?: 'overlay' | 'solid';
}

const Header: React.FC<HeaderProps> = ({ variant = 'overlay' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > UMBRAL_SCROLL);
    const cabecera = useRef<HTMLElement>(null);
    const lang: Lang = currentLang();
    const t = TEXTOS[lang];
    const areas = lang === 'en' ? AREAS_EN : AREAS_ES;
    // En la portada (/ y /en) la barra no lleva "Agendar Consulta": ya están el botón del hero
    // y el formulario (decisión del 20-11). En el menú desplegable sí se mantiene.
    const esPortada = typeof window !== 'undefined' && ['/', '/en'].includes(normalizePath(window.location.pathname));

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > UMBRAL_SCROLL);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
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
        window.history.pushState({}, '', `${homeOf(lang)}#consulta`);
        window.dispatchEvent(new PopStateEvent('popstate'));
        trackCTAClick(conIdioma(origen, lang));
        setIsMenuOpen(false);
    };

    const cambiarIdioma = (to: Lang) => {
        const destino = switchTarget(window.location.pathname, to);
        window.history.pushState({}, '', destino);
        window.dispatchEvent(new PopStateEvent('popstate'));
        trackNavClick(to === 'en' ? 'Idioma EN' : 'Idioma ES');
        setIsMenuOpen(false);
        window.scrollTo(0, 0);
    };

    const clicWhatsApp = () => {
        if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', 'conversion', {
                'send_to': 'AW-18229137722/JKXKCOXx5MkcELqiqvRD',
                'value': 1.0,
                'currency': 'CLP'
            });
        }
        trackWhatsAppClick(conIdioma('Header Menu', lang));
    };

    // Vidrio: siempre en "solid"; en "overlay", al bajar o con el menú abierto.
    const conVidrio = variant === 'solid' || isScrolled || isMenuOpen;

    // Tarjetas: borde fino, entrada escalonada al abrir.
    const tarjeta = `rounded-xl p-5 sm:p-6 flex flex-col border transition-all duration-500 ease-[cubic-bezier(0.22,0.8,0.2,1)] motion-reduce:transition-none ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`;
    const retraso = (i: number) => ({ transitionDelay: isMenuOpen ? `${80 + i * 70}ms` : '0ms' });

    const enlaceIdioma = (to: Lang) => {
        const activo = lang === to;
        return (
            <a
                href={switchTarget(typeof window !== 'undefined' ? window.location.pathname : '/', to)}
                hrefLang={to}
                lang={to}
                aria-label={to === 'en' ? 'English' : 'Español'}
                aria-current={activo ? 'true' : undefined}
                onClick={(e) => { e.preventDefault(); if (!activo) cambiarIdioma(to); }}
                className={`px-1 py-2 transition-colors ${activo ? 'text-white' : 'text-white/70 hover:text-brand-gold'}`}
            >
                {to.toUpperCase()}
            </a>
        );
    };

    return (
        <header
            ref={cabecera}
            className={`fixed inset-x-0 top-0 z-40 text-white transition-[padding] duration-300 ${conVidrio ? 'py-2.5 sm:py-3' : 'py-4 sm:py-5'}`}
        >
            {/* Capa de vidrio de la barra (hermana del contenido, ver nota arriba) */}
            <div
                aria-hidden="true"
                className={`absolute inset-0 -z-10 glass-dark border-b border-white/10 transition-opacity duration-300 ${conVidrio ? 'opacity-100' : 'opacity-0'}`}
                style={VIDRIO_OPACO}
            />

            <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center gap-2 sm:gap-3">
                {/* Logo a la izquierda, como siempre (versión blanca: la barra siempre va sobre fondo oscuro) */}
                <a
                    href={homeOf(lang)}
                    onClick={(e) => { e.preventDefault(); navigateTo(homeOf(lang), conIdioma('Home', lang)); }}
                    className="flex items-center gap-2.5 sm:gap-3 hover:opacity-80 transition cursor-pointer min-w-0"
                >
                    <img
                        src="https://res.cloudinary.com/dt36zhzde/image/upload/f_auto,q_auto,h_96/lb_monogram_white2_omlw6a"
                        alt="Logo LABRA & BALMACEDA"
                        className="h-9 w-auto sm:h-12 shrink-0"
                        width={87}
                        height={96}
                    />
                    <div className="flex flex-col leading-tight min-w-0">
                        <span className="text-[15px] sm:text-2xl font-baskerville font-bold text-white tracking-tight uppercase not-italic whitespace-nowrap">
                            LABRA & BALMACEDA
                        </span>
                        <span className="text-[9px] sm:text-xs font-semibold text-brand-gold tracking-[0.25em] uppercase not-italic">
                            ABOGADOS
                        </span>
                    </div>
                </a>

                {/* A la derecha: idioma, botón de consulta (PC) y el menú desplegable */}
                <div className="flex items-center gap-1 sm:gap-4 shrink-0">
                    <nav aria-label={t.idioma} className="flex items-center text-[11px] sm:text-xs font-bold tracking-[0.2em]">
                        {enlaceIdioma('es')}
                        <span aria-hidden="true" className="text-white/40 px-0.5">·</span>
                        {enlaceIdioma('en')}
                    </nav>
                    {!esPortada && <button
                        type="button"
                        onClick={() => irAConsulta('Header CTA')}
                        className="hidden md:inline-flex text-white bg-brand-gold hover:bg-white hover:text-brand-black px-5 py-2.5 rounded-lg transition duration-300 uppercase tracking-wider text-xs font-semibold cursor-pointer"
                    >
                        {t.cta}
                    </button>}
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((v) => !v)}
                        aria-expanded={isMenuOpen}
                        aria-controls="menu-tarjetas"
                        aria-label={isMenuOpen ? t.cerrarMenu : t.abrir}
                        className="group flex items-center gap-3 h-11 px-2.5 sm:px-3 rounded-lg text-white hover:bg-white/10 transition cursor-pointer"
                    >
                        <span className="hidden sm:inline text-xs font-bold uppercase tracking-[0.2em]">{isMenuOpen ? t.cerrar : t.menu}</span>
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
                    <div className={`glass-dark border-b border-white/10 ${isMenuOpen ? 'shadow-2xl' : ''}`} style={VIDRIO_OPACO}>
                        <nav aria-label={t.menuPrincipal} className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 grid md:grid-cols-3 gap-3 sm:gap-4 max-h-[calc(100dvh-5rem)] overflow-y-auto md:max-h-none md:overflow-visible">
                            {/* Izquierda: Áreas de práctica */}
                            <div className={`${tarjeta} bg-white/5 text-white border-white/10`} style={retraso(0)}>
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">{t.areas}</p>
                                <ul className="space-y-1">
                                    {areas.map((a) => (
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

                            {/* Medio: Artículos destacados (el blog está solo en español) */}
                            <div className={`${tarjeta} bg-white/5 text-white border-white/10`} style={retraso(1)}>
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">{t.articulos}</p>
                                <ul className="space-y-3 mb-4">
                                    {ARTICULOS.map((p) => (
                                        <li key={p.slug}>
                                            <a
                                                href={`/blog/${p.slug}`}
                                                lang="es"
                                                onClick={(e) => { e.preventDefault(); navigateTo(`/blog/${p.slug}`, conIdioma(`Menu Articulo: ${p.slug}`, lang)); window.scrollTo(0, 0); }}
                                                className="block text-[15px] font-semibold font-baskerville leading-snug text-white/90 hover:text-brand-gold transition-colors"
                                            >
                                                {tituloCorto(p.title)}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="/blog"
                                    onClick={(e) => { e.preventDefault(); navigateTo('/blog', conIdioma('Blog', lang)); window.scrollTo(0, 0); }}
                                    className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-brand-gold transition-colors"
                                >
                                    {t.verTodos}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </a>
                            </div>

                            {/* Derecha: Contacto (tarjeta de acento) */}
                            <div className={`${tarjeta} bg-brand-gold text-brand-black border-black/10`} style={retraso(2)}>
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-black/70 mb-4">{t.contacto}</p>
                                <button
                                    type="button"
                                    onClick={() => irAConsulta(esMovil() ? 'Mobile Menu CTA' : 'Header Menu CTA')}
                                    className="w-full text-center bg-brand-black text-white px-4 py-3 rounded-lg font-bold hover:bg-white hover:text-brand-black transition uppercase tracking-widest text-xs cursor-pointer mb-3"
                                >
                                    {t.agendar}
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
                                    <p className="text-brand-black/75">{t.horario}</p>
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
