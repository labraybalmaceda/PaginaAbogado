// Genera public/llms.txt antes de cada build.
// llms.txt es un índice en texto plano pensado para modelos de lenguaje: les
// dice en pocas líneas qué es el sitio, qué servicios ofrece y qué artículos
// tiene, con enlaces limpios. Se regenera solo, igual que el sitemap, así que
// publicar un artículo nuevo lo actualiza sin tocar nada.
//
// Uso manual: node scripts/generate-llms-txt.mjs

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = join(ROOT, 'content', 'blog', 'posts');
const OUTPUT = join(ROOT, 'public', 'llms.txt');

const BASE_URL = 'https://labraybalmaceda.cl';

const SERVICES = [
    ['Derecho Civil', '/abogado-civil-puerto-montt', 'Contratos, herencias, posesión efectiva, partición, precario e indemnización de perjuicios.'],
    ['Arrendamientos', '/abogado-arriendo-puerto-montt', 'Terminación de contrato por no pago, lanzamiento, cobro de rentas y defensa del arrendatario.'],
    ['Derecho de Familia', '/abogado-familia-puerto-montt', 'Divorcio, pensión de alimentos y su cobro, cuidado personal y compensación económica.'],
    ['Insolvencia y Deudas', '/abogado-insolvencia-puerto-montt', 'Renegociación, liquidación voluntaria y defensa ante cobranzas judiciales.'],
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
        console.warn(`[llms] No existe ${POSTS_DIR}; se genera solo con las páginas fijas.`);
        return [];
    }

    const posts = [];

    for (const file of files) {
        const source = readFileSync(join(POSTS_DIR, file), 'utf8');

        if (/\bdraft:\s*true/.test(source)) continue;
        if (/\bnoindex:\s*true/.test(source)) continue;

        const slug = match(source, /slug:\s*'([^']+)'/);
        const title = match(source, /\n\s+title:\s*'([^']+)'/);

        if (!slug || !title) {
            // Falla ruidosa: un artículo mal formado no debe desaparecer en silencio.
            throw new Error(`[llms] ${file} no declara "slug" o "title". Revisa el archivo.`);
        }

        posts.push({
            slug,
            title,
            description: match(source, /\n\s+description:\s*'([^']+)'/) || '',
            date: match(source, /\bdate:\s*'([^']+)'/) || '',
        });
    }

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
};

const posts = readPosts();

const serviceLines = SERVICES
    .map(([name, path, description]) => `- [${name}](${BASE_URL}${path}): ${description}`)
    .join('\n');

const postLines = posts
    .map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.description}`)
    .join('\n');

const content = `# Labra & Balmaceda Abogados

> Estudio jurídico chileno con base en Puerto Varas. Atiende con cita previa en Puerto Varas y Puerto Montt, y de forma online en todo Chile. Áreas: Derecho Civil, Derecho de Familia, Arrendamientos e Insolvencia. Fundado por el abogado Renato Labra.

Contacto: +56 9 7764 6224 (teléfono y WhatsApp) | labraybalmaceda@gmail.com
Horario: lunes a viernes, de 09:00 a 19:00 (hora de Chile).
Cobertura: Puerto Varas, Puerto Montt, Llanquihue y el resto de la Región de Los Lagos. Atención online en todo el país.

## Áreas de práctica

${serviceLines}

## Artículos del blog

${postLines}

## Notas

- Todo el contenido está en español y se refiere a la legislación chilena vigente, citando los artículos aplicables de cada norma.
- Los artículos son informativos y no constituyen asesoría legal para un caso particular.
- Índice del blog: ${BASE_URL}/blog
- Política de privacidad: ${BASE_URL}/privacidad
`;

writeFileSync(OUTPUT, content, 'utf8');

console.log(`[llms] llms.txt escrito con ${posts.length} artículos.`);
