// ¿La página la está viendo un bot, el prerender de Netlify o un navegador sin pantalla?
// Lo usan FadeInUp (para mostrar todo desde el inicio) y la pantalla de intro
// (para no mostrarla). Así los dos deciden con el mismo criterio.
export const isAutomatedAgent = (): boolean => {
    if (typeof navigator === 'undefined') return true;
    return navigator.webdriver === true || /bot|crawler|spider|prerender|headless/i.test(navigator.userAgent);
};
