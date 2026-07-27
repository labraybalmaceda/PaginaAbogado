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
    { path: '/', lastmod: '2026-07-15', changefreq: 'monthly', priority: '1.0' },
    { path: '/blog', lastmod: '2026-07-20', changefreq: 'weekly', priority: '0.9' },
    { path: '/abogado-civil-puerto-montt', lastmod: '2026-07-15', changefreq: 'monthly', priority: '0.8' },
    { path: '/abogado-familia-puerto-montt', lastmod: '2026-07-15', changefreq: 'monthly', priority: '0.8' },
    { path: '/abogado-arriendo-puerto-montt', lastmod: '2026-07-15', changefreq: 'monthly', priority: '0.8' },
    { path: '/abogado-insolvencia-puerto-montt', lastmod: '2026-07-15', changefreq: 'monthly', priority: '0.8' },
    { path: '/gracias', lastmod: '2026-07-15', changefreq: 'yearly', priority: '0.5' },
    { path: '/privacidad', lastmod: '2026-07-15', changefreq: 'yearly', priority: '0.3' },
];

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
    <loc>${BASE_URL}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
        )
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

const posts = readPosts();
const routes = [...STATIC_ROUTES, ...posts];
writeFileSync(OUTPUT, toXml(routes), 'utf8');

console.log(`[sitemap] ${routes.length} URLs escritas (${posts.length} artículos del blog).`);
