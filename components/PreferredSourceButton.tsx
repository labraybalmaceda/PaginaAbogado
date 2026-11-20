import React, { useEffect } from 'react';

// Botón oficial de Google "Agregar como fuente preferida" (implementación estándar
// recomendada por Google: https://developers.google.com/search/docs/appearance/preferred-sources).
// Quien lo usa elige labraybalmaceda.cl como fuente preferida: sus resultados aparecen
// más y con la marca "preferido" en Noticias principales, AI Overviews y el Modo IA.
//
// El script de Google se carga solo cuando se muestra un artículo (no en la portada ni en
// las páginas de servicio) y una sola vez por visita. A los bots y al prerender no se les
// carga: el botón no les sirve y así el HTML guardado queda limpio.
//
// El sitio no recarga la página al pasar de un artículo a otro, y el script de Google
// busca los botones una sola vez. Por eso, cada vez que aparece un botón nuevo se llama a
// init(), que vuelve a buscarlos (vía la cola PREFERRED_SOURCE que define Google).
const SCRIPT_SRC = 'https://news.google.com/swg/js/v1/publisher.js';

type PreferredSourceApi = { init: (opts: { theme?: 'light' | 'dark'; lang?: string }) => void };
type PreferredSourceQueue = { push: (cb: (api: PreferredSourceApi) => void) => void };

const esBot = (): boolean =>
    typeof navigator === 'undefined' ||
    navigator.webdriver === true ||
    /bot|crawler|spider|prerender|headless/i.test(navigator.userAgent);

const PreferredSourceButton: React.FC<{ className?: string }> = ({ className = '' }) => {
    useEffect(() => {
        if (esBot()) return;
        if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
            const script = document.createElement('script');
            script.async = true;
            script.src = SCRIPT_SRC;
            document.head.appendChild(script);
        }
        const w = window as unknown as { PREFERRED_SOURCE?: PreferredSourceQueue | unknown[] };
        const queue = (w.PREFERRED_SOURCE = w.PREFERRED_SOURCE || []) as PreferredSourceQueue;
        queue.push((api) => api.init({ theme: 'light' }));
    }, []);

    return (
        <div className={className}>
            <p className="text-xs sm:text-sm text-gray-500 mb-3">
                Para seguir informándose, guarde nuestra página entre sus fuentes preferidas:
            </p>
            <div className="flex justify-center min-h-10">
                <div google-add-preferred-source-btn="" data-theme="light" />
            </div>
        </div>
    );
};

export default PreferredSourceButton;
