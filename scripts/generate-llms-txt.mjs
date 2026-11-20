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
    ['Litigios Civiles y Comerciales', '/abogado-civil-puerto-montt', 'Contratos, cobros, herencias, posesión efectiva, partición, precario e indemnización de perjuicios.'],
    ['Derecho Inmobiliario y Construcción', '/abogado-inmobiliario-puerto-montt', 'Compraventas y promesas, estudio de títulos, arriendos comerciales, contratos de construcción, normativa urbanística y permisos, y litigios por incumplimiento o por defectos de construcción.'],
    ['Arrendamientos', '/abogado-arriendo-puerto-montt', 'Terminación de contrato por no pago, lanzamiento, cobro de rentas y defensa del arrendatario.'],
    ['Derecho de Familia', '/abogado-familia-puerto-montt', 'Divorcio, pensión de alimentos y su cobro, cuidado personal y compensación económica.'],
    ['Derecho Concursal', '/abogado-insolvencia-puerto-montt', 'Reorganización y liquidación de empresas (Ley N° 20.720), procedimientos simplificados para micro y pequeñas empresas, representación de acreedores y defensa en juicios ejecutivos.'],
    ['Derecho Corporativo', '/abogado-corporativo-puerto-montt', 'Constitución y modificación de sociedades, pactos de accionistas, contratos comerciales, compraventa de empresas y conflictos entre socios.'],
    ['Asesoría legal mensual para empresas', '/asesoria-legal-empresas-puerto-montt', 'Abogado externo para empresas y sus socios con un convenio mensual que incluye consultas permanentes, contratos, negociaciones, riesgos laborales y tributarios, gestión societaria, cobro de créditos y juicios. Atención online en todo Chile.'],
];

// Versión en inglés (portada y 4 páginas de empresa). El blog está solo en español.
// shortcut: lista copiada a mano de PAGE_PAIRS (components/i18n.ts) y de content/en/services.ts; si cambia una página en inglés, actualizar aquí también.
const SERVICES_EN = [
    ['Home (English)', '/en', 'Legal counsel for companies and individuals in southern Chile.'],
    ['Corporate Law', '/en/corporate-law', 'Incorporation and amendment of companies, shareholder agreements, commercial contracts and purchase and sale of companies.'],
    ['Monthly Legal Counsel', '/en/monthly-legal-counsel', 'Outside lawyer for companies and their partners under a monthly agreement covering ongoing advice, contracts, labor and tax risks, collections and lawsuits.'],
    ['Civil and Commercial Litigation', '/en/litigation', 'Enforcement proceedings, inheritances and probate, precario actions and damages claims.'],
    ['Real Estate and Construction', '/en/real-estate-and-construction', 'Sales and promissory agreements, title review, commercial leases, building contracts, urban planning permits and construction litigation.'],
    ['Insolvency Law', '/en/insolvency', 'Reorganization and liquidation of companies under Ley N° 20.720, simplified procedures for micro and small companies and representation of creditors.'],
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

const serviceLinesEn = SERVICES_EN
    .map(([name, path, description]) => `- [${name}](${BASE_URL}${path}): ${description}`)
    .join('\n');

const postLines = posts
    .map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.description}`)
    .join('\n');

const content = `# Labra & Balmaceda Abogados

> Estudio jurídico chileno con base en Puerto Varas. Atiende con cita previa en Puerto Varas y Puerto Montt, y de forma online en todo Chile. Áreas: Derecho Corporativo, asesoría legal mensual para empresas, Litigios Civiles y Comerciales, Derecho Concursal, Derecho Inmobiliario y Construcción, Arrendamientos y Derecho de Familia. Fundado por el abogado Renato Labra.

Contacto: +56 9 7764 6224 (teléfono y WhatsApp) | contacto@labraybalmaceda.cl
Horario: lunes a viernes, de 09:00 a 19:00 (hora de Chile).
Cobertura: Puerto Varas, Puerto Montt, Llanquihue y el resto de la Región de Los Lagos. Atención online en todo el país.

## Áreas de práctica

${serviceLines}

## English version

${serviceLinesEn}

## Artículos del blog

${postLines}

## Notas

- El contenido está en español, salvo la portada y 5 páginas de servicio en inglés (sección "English version"), y se refiere a la legislación chilena vigente, con enlaces a su texto oficial en bcn.cl.
- Los artículos son informativos y no constituyen asesoría legal para un caso particular.
- [Índice del blog](${BASE_URL}/blog)
- [Política de privacidad](${BASE_URL}/privacidad)
`;

writeFileSync(OUTPUT, content, 'utf8');

console.log(`[llms] llms.txt escrito con ${posts.length} artículos.`);
