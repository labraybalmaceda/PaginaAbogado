import React, { useEffect } from 'react';

// Dominio primario en Netlify (www redirige 301 hacia aquí): los canonicals
// deben usar siempre esta forma, nunca www.
const BASE_URL = 'https://labraybalmaceda.cl';

const DEFAULT_IMAGE =
    'https://res.cloudinary.com/dt36zhzde/image/upload/w_1200,h_630,c_pad,b_white/v1781805477/LOGO_e4oacu.png';

const DEFAULT_ROBOTS = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

const JSONLD_ID = 'page-jsonld';

interface SeoProps {
    title: string;
    description: string;
    /** Ruta de la página, ej. "/blog/mi-articulo". Usar "/" para la home. */
    path: string;
    /** "website" para páginas normales, "article" para artículos del blog. */
    type?: 'website' | 'article';
    image?: string;
    /** true en páginas que no deben indexarse (ej. el artículo de prueba). */
    noindex?: boolean;
    /** Fecha de publicación YYYY-MM-DD (solo artículos). */
    publishedTime?: string;
    /** Fecha de última edición YYYY-MM-DD (solo artículos). */
    modifiedTime?: string;
    /** Structured data de la página. Se inyecta como <script type="application/ld+json">. */
    jsonLd?: object | object[];
}

/** Crea la etiqueta si no existe y le fija el valor. */
const upsertMeta = (key: 'name' | 'property', keyValue: string, content: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${keyValue}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(key, keyValue);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

const removeMeta = (key: 'name' | 'property', keyValue: string) => {
    document.head.querySelector(`meta[${key}="${keyValue}"]`)?.remove();
};

const Seo: React.FC<SeoProps> = ({
    title,
    description,
    path,
    type = 'website',
    image = DEFAULT_IMAGE,
    noindex = false,
    publishedTime,
    modifiedTime,
    jsonLd,
}) => {
    useEffect(() => {
        const url = path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`;

        document.title = title;
        upsertMeta('name', 'description', description);
        upsertMeta('name', 'robots', noindex ? 'noindex, follow' : DEFAULT_ROBOTS);

        let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', url);

        upsertMeta('property', 'og:title', title);
        upsertMeta('property', 'og:description', description);
        upsertMeta('property', 'og:url', url);
        upsertMeta('property', 'og:type', type);
        upsertMeta('property', 'og:image', image);

        // Las etiquetas de artículo solo aplican al blog: en el resto se quitan
        // para no arrastrarlas al navegar de un artículo a una página normal.
        if (type === 'article' && publishedTime) {
            upsertMeta('property', 'article:published_time', publishedTime);
            upsertMeta('property', 'article:modified_time', modifiedTime || publishedTime);
            upsertMeta('property', 'article:author', 'Renato Labra');
        } else {
            removeMeta('property', 'article:published_time');
            removeMeta('property', 'article:modified_time');
            removeMeta('property', 'article:author');
        }

        document.getElementById(JSONLD_ID)?.remove();
        if (jsonLd) {
            const script = document.createElement('script');
            script.id = JSONLD_ID;
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(jsonLd);
            document.head.appendChild(script);
        }
    }, [title, description, path, type, image, noindex, publishedTime, modifiedTime, jsonLd]);

    return null;
};

export default Seo;
