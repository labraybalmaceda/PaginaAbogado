import type { Post, ServiceKey } from './types';

// Registro automático: cualquier archivo .ts dentro de content/blog/posts/ que
// exporte un Post por defecto queda publicado sin tocar ningún componente.
// `eager: true` incluye los artículos en el bundle, no los carga por red: es lo
// que permite que el prerender capture el HTML completo del artículo.
const modules = import.meta.glob<{ default: Post }>('./posts/*.ts', { eager: true });

const ALL: Post[] = Object.values(modules)
    .map((m) => m.default)
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

/** Artículos publicados: excluye borradores. Ordenados del más nuevo al más antiguo. */
export const posts: Post[] = ALL.filter((p) => !p.draft);

/** Artículos que van al sitemap y al índice: publicados y indexables. */
export const indexablePosts: Post[] = posts.filter((p) => !p.noindex);

export const getPost = (slug: string): Post | undefined =>
    posts.find((p) => p.slug === slug);

/** Artículos de un área, para enlazar desde las páginas de servicio. */
export const getPostsByService = (service: ServiceKey, limit = 3): Post[] =>
    indexablePosts.filter((p) => p.service === service).slice(0, limit);

/** Otros artículos de la misma área, para enlazar entre artículos. */
export const getRelatedPosts = (post: Post, limit = 2): Post[] =>
    indexablePosts.filter((p) => p.service === post.service && p.slug !== post.slug).slice(0, limit);

export type { Post, Block, Faq, ServiceKey } from './types';
