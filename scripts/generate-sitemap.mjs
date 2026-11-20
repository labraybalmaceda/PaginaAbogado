// Genera public/sitemap.xml antes de cada build.
// Se ejecuta solo: npm corre el script "prebuild" antes de "build", y Netlify
// usa "npm run build". Publicar un artículo nuevo = agregar un archivo en
// content/blog/posts/; el sitemap se actualiza en el siguiente deploy.
//
// Uso manual: node scripts/generate-sitemap.mjs

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = join(ROOT, 'content', 'blog', 'posts');
const OUTPUT = join(ROOT, 'public', 'sitemap.xml');

const BASE_URL = 'https://labraybalmaceda.cl';

// Páginas fijas del sitio. `lastmod` se actualiza a mano cuando cambia la página.
const STATIC_ROUTES = [
    { path: '/', lastmod: '2026-11-20', changefreq: 'monthly', priority: '1.0' },
    { path: '/blog', lastmod: '2026-07-20', changefreq: 'weekly', priority: '0.9' },
    { path: '/abogado-civil-puerto-montt', lastmod: '2026-11-20', changefreq: 'monthly', priority: '0.8' },
    { path: '/abogado-familia-puerto-montt', lastmod: '2026-11-20', changefreq: 'monthly', priority: '0.8' },
    { path: '/abogado-arriendo-puerto-montt', lastmod: '2026-11-20', changefreq: 'monthly', priority: '0.8' },
    { path: '/abogado-insolvencia-puerto-montt', lastmod: '2026-11-20', changefreq: 'monthly', priority: '0.8' },
    { path: '/abogado-corporativo-puerto-montt', lastmod: '2026-11-20', changefreq: 'monthly', priority: '0.8' },
    { path: '/abogado-inmobiliario-puerto-montt', lastmod: '2026-11-20', changefreq: 'monthly', priority: '0.8' },
    { path: '/asesoria-legal-empresas-puerto-montt', lastmod: '2026-11-20', changefreq: 'monthly', priority: '0.8' },
    { path: '/privacidad', lastmod: '2026-10-01', changefreq: 'yearly', priority: '0.3' },
    // Versión en inglés (portada y 4 páginas de empresa).
    { path: '/en', lastmod: '2026-11-20', changefreq: 'monthly', priority: '0.7' },
    { path: '/en/corporate-law', lastmod: '2026-11-20', changefreq: 'monthly', priority: '0.6' },
    { path: '/en/monthly-legal-counsel', lastmod: '2026-11-20', changefreq: 'monthly', priority: '0.6' },
    { path: '/en/litigation', lastmod: '2026-11-20', changefreq: 'monthly', priority: '0.6' },
    { path: '/en/insolvency', lastmod: '2026-11-20', changefreq: 'monthly', priority: '0.6' },
    { path: '/en/real-estate-and-construction', lastmod: '2026-11-20', changefreq: 'monthly', priority: '0.6' },
];

// Pares español - inglés para hreflang (es, en y x-default al español), en las dos versiones.
// shortcut: copia de PAGE_PAIRS de components/i18n.ts (este script es .mjs y no importa TypeScript); si se agrega una página en inglés, actualizar las dos listas.
const PAGE_PAIRS = [
    { es: '/', en: '/en' },
    { es: '/abogado-corporativo-puerto-montt', en: '/en/corporate-law' },
    { es: '/asesoria-legal-empresas-puerto-montt', en: '/en/monthly-legal-counsel' },
    { es: '/abogado-civil-puerto-montt', en: '/en/litigation' },
    { es: '/abogado-insolvencia-puerto-montt', en: '/en/insolvency' },
    { es: '/abogado-inmobiliario-puerto-montt', en: '/en/real-estate-and-construction' },
];

const absoluteUrl = (path) => `${BASE_URL}${path === '/' ? '/' : path}`;

const alternatesFor = (path) => {
    const pair = PAGE_PAIRS.find((p) => p.es === path || p.en === path);
    if (!pair) return '';
    return [
        ['es', pair.es],
        ['en', pair.en],
        ['x-default', pair.es],
    ]
        .map(([lang, href]) => `\n    <xhtml:link rel="alternate" hreflang="${lang}" href="${absoluteUrl(href)}"/>`)
        .join('');
};

const match = (source, pattern) => {
    const result = source.match(pattern);
    return result ? result[1] : null;
};

const readPosts = () => {
    let files;
    try {
        files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.ts'));
    } catch {
        console.warn(`[sitemap] No existe ${POSTS_DIR}; se genera solo con páginas fijas.`);
        return [];
    }

    const posts = [];

    for (const file of files) {
        const source = readFileSync(join(POSTS_DIR, file), 'utf8');

        const slug = match(source, /slug:\s*'([^']+)'/);
        if (!slug) {
            // Falla ruidosa a propósito: un artículo mal formado no debe
            // desaparecer del sitemap en silencio.
            throw new Error(`[sitemap] ${file} no declara "slug". Revisa el archivo.`);
        }

        if (/\bdraft:\s*true/.test(source)) continue;
        if (/\bnoindex:\s*true/.test(source)) continue;

        const date = match(source, /\bdate:\s*'([^']+)'/);
        const updated = match(source, /\bupdated:\s*'([^']+)'/);

        if (!date) {
            throw new Error(`[sitemap] ${file} no declara "date". Revisa el archivo.`);
        }

        posts.push({
            path: `/blog/${slug}`,
            lastmod: updated || date,
            changefreq: 'monthly',
            priority: '0.7',
        });
    }

    return posts.sort((a, b) => (a.lastmod < b.lastmod ? 1 : -1));
};

const toXml = (routes) => {
    const urls = routes
        .map(
            (r) => `  <url>
    <loc>${absoluteUrl(r.path)}</loc>${alternatesFor(r.path)}
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
        )
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
};

const posts = readPosts();

const blogRoute = STATIC_ROUTES.find((r) => r.path === '/blog');
if (blogRoute && posts.length > 0) {
    blogRoute.lastmod = posts[0].lastmod;
}

const routes = [...STATIC_ROUTES, ...posts];
writeFileSync(OUTPUT, toXml(routes), 'utf8');

console.log(`[sitemap] ${routes.length} URLs escritas (${posts.length} artículos del blog).`);
