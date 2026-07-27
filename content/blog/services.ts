import type { ServiceKey } from './types';

/**
 * Mapa de áreas del estudio. Cada artículo declara su `service` y de aquí sale
 * el CTA final y el enlazado interno hacia la "money page" correspondiente.
 */
export const SERVICES: Record<ServiceKey, { label: string; path: string; cta: string }> = {
    arriendos: {
        label: 'Arriendos',
        path: '/abogado-arriendo-puerto-montt',
        cta: 'Recuperar mi propiedad o cobrar las rentas impagas',
    },
    familia: {
        label: 'Derecho de Familia',
        path: '/abogado-familia-puerto-montt',
        cta: 'Hablar con un abogado de familia',
    },
    civil: {
        label: 'Derecho Civil',
        path: '/abogado-civil-puerto-montt',
        cta: 'Evaluar mi caso civil',
    },
    insolvencia: {
        label: 'Insolvencia y Deudas',
        path: '/abogado-insolvencia-puerto-montt',
        cta: 'Ordenar mis deudas con un abogado',
    },
};
