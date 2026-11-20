import React, { useEffect } from 'react';
import { isAutomatedAgent } from './automation';

// Pantalla de intro con la marca (inspirada en la de bye.cl, sin librerías):
// fondo negro, una raya dorada que crece al centro, el monograma «L&B» y la capa
// se desvanece. Dura menos de 1 s y la animación es solo CSS (ver index.css).
//
// Reglas:
// - Solo al cargar por primera vez / o /en, sin #ancla (quien viene de otra página
//   del sitio con /#consulta no la ve). Nunca en /abogado-*, /asesoria-*, /blog*
//   ni en las páginas en inglés de servicios.
// - Una vez por sesión del navegador (sessionStorage).
// - No se muestra a bots, al prerender ni a navegadores sin pantalla, y tampoco
//   a quien pidió "reducir movimiento".

const CLAVE = 'lb_intro_vista';
const DURACION_MAX_MS = 1500; // seguro: si el evento de fin de animación no llega, se quita igual

const leerVista = (): boolean => {
    try {
        return window.sessionStorage.getItem(CLAVE) === '1';
    } catch {
        return true; // sin acceso al almacenamiento: mejor no mostrarla que repetirla en cada página
    }
};

const marcarVista = () => {
    try {
        window.sessionStorage.setItem(CLAVE, '1');
    } catch {
        // sin acceso: no pasa nada
    }
};

/** Se evalúa una sola vez, al arrancar la aplicación. No escribe nada: la marca se guarda al mostrarse. */
export const shouldShowIntro = (): boolean => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    if (path !== '/' && path !== '/en') return false;
    if (window.location.hash) return false;
    if (isAutomatedAgent()) return false;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
    return !leerVista();
};

const IntroScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
    // Se marca como vista al montarse (en un efecto, no durante el render: funciona igual con StrictMode).
    useEffect(() => {
        marcarVista();
    }, []);

    useEffect(() => {
        const id = window.setTimeout(onDone, DURACION_MAX_MS);
        return () => window.clearTimeout(id);
    }, [onDone]);

    return (
        <div
            className="intro-capa"
            aria-hidden="true"
            onAnimationEnd={(e) => { if (e.target === e.currentTarget) onDone(); }}
        >
            <span className="intro-raya" />
            <span className="intro-monograma">L&amp;B</span>
        </div>
    );
};

export default IntroScreen;
