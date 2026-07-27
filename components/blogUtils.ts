export const BASE_URL = 'https://labraybalmaceda.cl';

export const LOGO_URL =
    'https://res.cloudinary.com/dt36zhzde/image/upload/w_1200,h_630,c_pad,b_white/v1781805477/LOGO_e4oacu.png';

/** Navegación interna, mismo patrón que el resto del sitio (SPA sin router). */
export const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
};

const MESES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

/**
 * "2026-07-20" -> "20 de julio de 2026".
 * Se parsea a mano a propósito: `new Date('2026-07-20')` se interpreta en UTC y
 * en Chile mostraría el día anterior.
 */
export const formatDate = (iso: string): string => {
    const [year, month, day] = iso.split('-').map(Number);
    if (!year || !month || !day) return iso;
    return `${day} de ${MESES[month - 1]} de ${year}`;
};
