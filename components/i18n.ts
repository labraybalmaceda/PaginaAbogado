// Idioma por ruta, sin librerías de i18n.
// El sitio está en español; solo la portada y 4 páginas de empresa tienen versión
// en inglés. Este archivo es la única lista de esas páginas: la usan App.tsx (rutas),
// Seo.tsx (hreflang y lang), Header (selector ES · EN) y Footer.

export type Lang = 'es' | 'en';

export type EnServiceKey = 'corporate' | 'counsel' | 'litigation' | 'insolvency' | 'realestate';

/** Pares español ↔ inglés. Si una página no está aquí, no tiene traducción. */
export const PAGE_PAIRS: { es: string; en: string }[] = [
    { es: '/', en: '/en' },
    { es: '/abogado-corporativo-puerto-montt', en: '/en/corporate-law' },
    { es: '/asesoria-legal-empresas-puerto-montt', en: '/en/monthly-legal-counsel' },
    { es: '/abogado-civil-puerto-montt', en: '/en/litigation' },
    { es: '/abogado-insolvencia-puerto-montt', en: '/en/insolvency' },
    { es: '/abogado-inmobiliario-puerto-montt', en: '/en/real-estate-and-construction' },
];

/** Rutas en inglés de las páginas de servicio, con su clave. */
export const EN_SERVICE_ROUTES: Record<string, EnServiceKey> = {
    '/en/corporate-law': 'corporate',
    '/en/monthly-legal-counsel': 'counsel',
    '/en/litigation': 'litigation',
    '/en/insolvency': 'insolvency',
    '/en/real-estate-and-construction': 'realestate',
};

const EN_PATHS = new Set(PAGE_PAIRS.map((p) => p.en));

/** Quita la barra final: /en/ y /en son la misma página. */
export const normalizePath = (pathname: string): string => pathname.replace(/\/+$/, '') || '/';

/** Idioma de una ruta. Solo las rutas en inglés conocidas cuentan como inglés. */
export const langOf = (pathname: string): Lang => (EN_PATHS.has(normalizePath(pathname)) ? 'en' : 'es');

/** Idioma de la página actual (se lee en cada render: el sitio navega con pushState). */
export const currentLang = (): Lang =>
    typeof window === 'undefined' ? 'es' : langOf(window.location.pathname);

/** El par de una ruta, si tiene traducción. */
export const pairOf = (pathname: string): { es: string; en: string } | undefined => {
    const path = normalizePath(pathname);
    return PAGE_PAIRS.find((p) => p.es === path || p.en === path);
};

/** Destino del selector de idioma: la página equivalente, o la portada del otro idioma. */
export const switchTarget = (pathname: string, to: Lang): string => {
    const pair = pairOf(pathname);
    if (pair) return pair[to];
    return to === 'en' ? '/en' : '/';
};

/**
 * Etiqueta de seguimiento según el idioma: en inglés se agrega « EN» a la etiqueta
 * en español (ej. "Corporativo EN"); en español queda intacta.
 */
export const conIdioma = (label: string, lang: Lang): string => (lang === 'en' ? `${label} EN` : label);

/** Portada del idioma (para "/#consulta" y el logo). */
export const homeOf = (lang: Lang): string => (lang === 'en' ? '/en' : '/');
