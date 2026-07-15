import React, { useEffect } from 'react';

// Dominio primario en Netlify (www redirige 301 hacia aquí): los canonicals
// deben usar siempre esta forma, nunca www.
const BASE_URL = 'https://labraybalmaceda.cl';

interface SeoProps {
    title: string;
    description: string;
    /** Ruta de la página, ej. "/abogado-arriendo-puerto-montt". Usar "/" para la home. */
    path: string;
}

const setAttr = (selector: string, attr: string, value: string) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
};

const Seo: React.FC<SeoProps> = ({ title, description, path }) => {
    useEffect(() => {
        const url = path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`;
        document.title = title;
        setAttr('meta[name="description"]', 'content', description);
        setAttr('link[rel="canonical"]', 'href', url);
        setAttr('meta[property="og:title"]', 'content', title);
        setAttr('meta[property="og:description"]', 'content', description);
        setAttr('meta[property="og:url"]', 'content', url);
    }, [title, description, path]);

    return null;
};

export default Seo;
