// Modelo de contenido del blog.
// Un artículo = un archivo en content/blog/posts/. No hay que tocar ningún
// componente para publicar: el registro se arma solo (ver content/blog/index.ts).

export type ServiceKey = 'arriendos' | 'familia' | 'civil' | 'insolvencia';

/**
 * Bloques de contenido. El orden del arreglo es el orden en que se renderiza.
 * El <h1> NO se escribe aquí: se genera desde `title`, para garantizar que
 * exista uno solo por página.
 */
export type Block =
    | { type: 'p'; text: string }
    | { type: 'h2'; text: string }
    | { type: 'h3'; text: string }
    | { type: 'list'; items: string[] }
    /** Cita legal destacada. `cite` es la norma: "Art. 1977 del Código Civil". */
    | { type: 'quote'; text: string; cite?: string };

export interface Faq {
    question: string;
    answer: string;
}

export interface Post {
    /** Parte final de la URL: /blog/<slug>. Sin fecha ni ID, en español. */
    slug: string;
    /** Titular del artículo. Se usa como <h1> y como og:title. */
    title: string;
    /** <title> del navegador, si conviene uno distinto (más corto o con marca). */
    metaTitle?: string;
    /** <meta name="description">. Entre 120 y 160 caracteres. */
    description: string;
    /** Bajada que se muestra en el índice /blog. */
    excerpt: string;
    /** Fecha de publicación, formato YYYY-MM-DD. */
    date: string;
    /** Fecha de última edición, formato YYYY-MM-DD. Si falta, se usa `date`. */
    updated?: string;
    /** Página de servicio a la que apunta el CTA final y el enlazado interno. */
    service: ServiceKey;
    /** Cuerpo del artículo. */
    blocks: Block[];
    /** Preguntas frecuentes. Generan schema FAQPage, que rankea muy bien. */
    faq?: Faq[];
    /** Imagen para redes sociales (og:image). Si falta, se usa el logo. */
    image?: string;
    /** true = no publicado: no aparece en /blog, ni en el sitemap, ni por URL. */
    draft?: boolean;
    /** true = visible por URL pero con robots noindex y fuera del sitemap. */
    noindex?: boolean;
}
