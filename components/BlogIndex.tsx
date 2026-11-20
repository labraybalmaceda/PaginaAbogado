import React, { useMemo, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import Seo from './Seo';
import { indexablePosts } from '../content/blog';
import { SERVICES } from '../content/blog/services';
import type { ServiceKey } from '../content/blog/types';
import { navigateTo, BASE_URL, formatDate } from './blogUtils';
import DepthCard, { depthLayerStyle } from './DepthCard';
import PageHero from './PageHero';

// Nombre corto de cada área para los botones de filtro.
const ETIQUETA_CORTA: Record<ServiceKey, string> = {
    arriendos: 'Arriendos',
    familia: 'Familia',
    civil: 'Civil',
    insolvencia: 'Concursal',
    corporativo: 'Corporativo',
};

/** Minúsculas y sin tildes, para que "particion" encuentre "partición". */
const normalizar = (texto: string): string =>
    texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

/** Clic normal: navegación interna. Ctrl, Cmd, Shift o clic central: el navegador abre otra pestaña. */
const abrirArticulo = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigateTo(`/blog/${slug}`);
};

const BlogIndex: React.FC = () => {
    const posts = indexablePosts;

    const jsonLd = useMemo(
        () => [
            {
                '@context': 'https://schema.org',
                '@type': 'Blog',
                '@id': `${BASE_URL}/blog#blog`,
                name: 'Blog legal | Labra & Balmaceda Abogados',
                description:
                    'Artículos sobre arriendos, familia, herencias y deudas, explicados por abogados de Puerto Varas y Puerto Montt.',
                url: `${BASE_URL}/blog`,
                inLanguage: 'es-CL',
                isPartOf: { '@id': 'https://labraybalmaceda.cl/#website' },
                publisher: { '@id': 'https://labraybalmaceda.cl/#estudio' },
                blogPost: posts.map((p) => ({
                    '@type': 'BlogPosting',
                    '@id': `${BASE_URL}/blog/${p.slug}#blogposting`,
                    headline: p.title,
                    url: `${BASE_URL}/blog/${p.slug}`,
                    datePublished: p.date,
                    dateModified: p.updated || p.date,
                    author: { '@id': 'https://labraybalmaceda.cl/#renato-labra' },
                })),
            },
            {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                '@id': `${BASE_URL}/blog#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${BASE_URL}/` },
                    { '@type': 'ListItem', position: 2, name: 'Publicaciones', item: `${BASE_URL}/blog` },
                ],
            },
        ],
        [posts]
    );

    const [area, setArea] = useState<ServiceKey | 'todas'>('todas');
    const [query, setQuery] = useState('');

    // Solo se ofrecen como filtro las áreas que tienen artículos publicados.
    const areas = useMemo(
        () => (Object.keys(SERVICES) as ServiceKey[]).filter((key) => posts.some((p) => p.service === key)),
        [posts]
    );

    const visibles = useMemo(() => {
        const q = normalizar(query.trim());
        return posts.filter((p) => {
            if (area !== 'todas' && p.service !== area) return false;
            if (!q) return true;
            return normalizar(`${p.title} ${p.excerpt} ${SERVICES[p.service].label}`).includes(q);
        });
    }, [posts, area, query]);

    const limpiarFiltros = () => {
        setArea('todas');
        setQuery('');
    };

    const pillClass = (activa: boolean) =>
        `px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest border transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 ${
            activa
                ? 'bg-brand-black border-brand-black text-white'
                : 'bg-white border-gray-300 text-gray-600 hover:border-brand-black hover:text-brand-black'
        }`;

    return (
        <div className="min-h-screen bg-hueso text-brand-black">
            <Seo
                title="Blog legal | Labra & Balmaceda Abogados"
                description="Artículos sobre arriendos, divorcio, herencias, pensión de alimentos y deudas, explicados en simple por abogados de Puerto Varas y Puerto Montt."
                path="/blog"
                jsonLd={jsonLd}
            />
            <Header />

            <main className="overflow-hidden">
                <PageHero
                    eyebrow="Publicaciones"
                    title="Blog legal: Arriendos, Sociedades, herencias, incumplimientos contractuales."
                    image="/fondo-articulo-blog.jpg"
                    imageClass="bg-position-[30%_center] md:bg-center"
                >
                    <p className="mt-5 text-[15px] sm:text-lg text-white/85 leading-relaxed">
                        Explicamos los problemas que más nos consultan y tramitamos en la Región de Los Lagos: Incumplimientos contractuales e indemnizaciones, arriendos que no se pagan, divorcios, herencias que nadie logra repartir.
                    </p>
                </PageHero>

                <div className="container mx-auto px-4 sm:px-6 max-w-5xl py-12 sm:py-16">

                    {posts.length === 0 ? (
                        <p className="text-gray-600 text-[15px] leading-relaxed">
                            Estamos preparando los primeros artículos. Vuelva pronto.
                        </p>
                    ) : (
                        <>
                            {/* Filtros por área */}
                            <div role="group" aria-label="Filtrar artículos por área" className="flex flex-wrap gap-2 mb-4">
                                <button type="button" aria-pressed={area === 'todas'} onClick={() => setArea('todas')} className={pillClass(area === 'todas')}>
                                    Todos
                                </button>
                                {areas.map((key) => (
                                    <button key={key} type="button" aria-pressed={area === key} onClick={() => setArea(key)} className={pillClass(area === key)}>
                                        {ETIQUETA_CORTA[key]}
                                    </button>
                                ))}
                            </div>

                            {/* Buscador */}
                            <div className="relative mb-8">
                                <svg aria-hidden="true" className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="7" />
                                    <path strokeLinecap="round" d="m20 20-3.5-3.5" />
                                </svg>
                                <input
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    maxLength={80}
                                    placeholder="Buscar: arriendo, herencia, divorcio…"
                                    aria-label="Buscar artículos"
                                    className="w-full rounded-full bg-white border border-gray-300 pl-12 pr-5 py-3.5 text-[15px] text-brand-black placeholder:text-gray-400 focus:outline-none focus:border-brand-gold transition-colors"
                                />
                            </div>

                            {visibles.length === 0 ? (
                                <div className="text-center py-16 px-4 rounded-2xl border border-gray-200 bg-white">
                                    <p className="text-gray-600 mb-5">No hay artículos que coincidan con la búsqueda.</p>
                                    <button type="button" onClick={limpiarFiltros} className={pillClass(true)}>
                                        Ver todos los artículos
                                    </button>
                                </div>
                            ) : (
                                <div className="grid gap-5 md:grid-cols-2">
                                    {visibles.map((post) => (
                                        <DepthCard key={post.slug} rounded="rounded-2xl">
                                                <article className="relative h-full bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors">
                                                    <div className="flex flex-col h-full p-6 sm:p-7" style={depthLayerStyle}>
                                                        <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-3">
                                                            {SERVICES[post.service].label}
                                                        </p>
                                                        <h2 className="text-lg sm:text-xl font-bold font-baskerville tracking-tight mb-3 leading-snug">
                                                            <a
                                                                href={`/blog/${post.slug}`}
                                                                onClick={(e) => abrirArticulo(e, post.slug)}
                                                                className="text-brand-black hover:text-brand-gold transition after:absolute after:inset-0 after:rounded-2xl focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand-gold"
                                                            >
                                                                {post.title}
                                                            </a>
                                                        </h2>
                                                        <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                                                        <div className="mt-auto flex items-center justify-between gap-4 text-xs">
                                                            <time dateTime={post.date} className="text-gray-400">{formatDate(post.date)}</time>
                                                            <span aria-hidden="true" className="font-bold uppercase tracking-widest text-brand-black whitespace-nowrap">
                                                                Leer →
                                                            </span>
                                                        </div>
                                                    </div>
                                                </article>
                                        </DepthCard>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default BlogIndex;
