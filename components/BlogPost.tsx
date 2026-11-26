import React, { useMemo } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import Seo from './Seo';
import type { Post, Block } from '../content/blog/types';
import { SERVICES } from '../content/blog/services';
import { getRelatedPosts } from '../content/blog';
import PreferredSourceButton from './PreferredSourceButton';
import ArticleSidebar, { type SidebarItem } from './ArticleSidebar';
import { navigateTo, BASE_URL, LOGO_URL, formatDate } from './blogUtils';
import PageHero from './PageHero';
import FaqAccordion from './FaqAccordion';
import DepthCard, { depthLayerStyle } from './DepthCard';

// Enlaces dentro del texto: [texto visible](/ruta-interna). Solo rutas internas (empiezan con /).
const renderInline = (text: string): React.ReactNode => {
    const re = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
    const parts: React.ReactNode[] = [];
    let last = 0;
    let match: RegExpExecArray | null;
    let k = 0;
    while ((match = re.exec(text)) !== null) {
        if (match.index > last) parts.push(text.slice(last, match.index));
        const href = match[2];
        parts.push(
            <a
                key={k++}
                href={href}
                onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                    e.preventDefault();
                    navigateTo(href);
                }}
                className="text-brand-gold font-semibold underline hover:text-brand-black transition"
            >
                {match[1]}
            </a>
        );
        last = match.index + match[0].length;
    }
    if (last === 0) return text;
    if (last < text.length) parts.push(text.slice(last));
    return parts;
};

// Cuerpo del artículo (ronda 3, 20-11): sobrio, con aire y líneas finas en vez de cajas.
// Tamaños de letra del 16-11 (16 px en PC, 15 px en el teléfono, H2 de 22 px) y texto justificado.
const CUERPO = 'text-[15px] sm:text-base text-gray-700 leading-[1.8] text-justify hyphens-auto';

const renderBlock = (block: Block, i: number) => {
    switch (block.type) {
        case 'h2':
            return (
                <h2 key={i} id={`seccion-${i}`} className="relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mt-14 mb-5 pt-5 scroll-mt-28 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold">
                    {block.text}
                </h2>
            );
        case 'h3':
            return (
                <h3 key={i} className="text-lg font-bold font-baskerville text-brand-black mt-10 mb-3">
                    {block.text}
                </h3>
            );
        case 'list':
            return (
                <ul key={i} className={`list-disc pl-5 space-y-2.5 mb-7 marker:text-brand-gold ${CUERPO}`}>
                    {block.items.map((item, j) => (
                        <li key={j}>{renderInline(item)}</li>
                    ))}
                </ul>
            );
        case 'quote':
            return (
                <blockquote key={i} className="border-l border-brand-gold pl-5 sm:pl-6 my-9">
                    <p className={`font-baskerville italic ${CUERPO}`}>{block.text}</p>
                    {block.cite && (
                        <cite className="block mt-3 text-[11px] uppercase tracking-[0.2em] text-brand-gold not-italic font-bold">
                            {block.citeUrl ? (
                                <a href={block.citeUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {block.cite}
                                </a>
                            ) : (
                                block.cite
                            )}
                        </cite>
                    )}
                </blockquote>
            );
        case 'summary':
            return (
                <div key={i} className="border-l-2 border-brand-gold pl-5 sm:pl-6 my-9">
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-gold mb-2">En resumen</p>
                    <p className={CUERPO}>{block.text}</p>
                </div>
            );
        case 'p':
        default:
            return (
                <p key={i} className={`${CUERPO} mb-6`}>
                    {renderInline(block.text)}
                </p>
            );
    }
};

// Banda de contacto sobria (negra, sin sombras ni bordes dorados). Van dos por artículo,
// arriba y al final, como siempre (decisión de Renato).
const ConsultaCta: React.FC<{ post: Post; className: string }> = ({ post, className }) => (
    <section className={`bg-brand-black text-white rounded-xl px-6 py-7 sm:px-8 sm:py-8 ${className}`}>
        <h2 className="text-lg sm:text-xl font-bold font-baskerville text-white mb-2">
            ¿Enfrenta una situación como esta?
        </h2>
        <p className="text-sm sm:text-[15px] text-white/75 leading-relaxed mb-6">
            Revisamos su caso y le indicamos con claridad qué alternativas tiene.
            {SERVICES[post.service] && (
                <> Conozca nuestra área de <a href={SERVICES[post.service].path} onClick={(e) => { e.preventDefault(); navigateTo(SERVICES[post.service].path); }} className="text-brand-gold font-semibold underline hover:text-white transition">{SERVICES[post.service].label} en Puerto Varas y Puerto Montt</a>.</>
            )}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
            <a
                href="/#consulta"
                onClick={(e) => { e.preventDefault(); navigateTo('/#consulta'); }}
                className="flex-1 sm:flex-none text-center px-6 py-3.5 sm:px-8 text-[13px] font-bold uppercase tracking-widest rounded-md bg-brand-gold text-brand-black hover:bg-white transition-colors duration-300"
            >
                Agendar con un abogado
            </a>
            <a
                href="https://wa.me/56977646224"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-6 py-3.5 sm:px-8 text-[13px] font-bold uppercase tracking-widest rounded-md border border-white/30 text-white hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2"
                onClick={() => {
                    if (typeof (window as any).gtag === 'function') {
                        (window as any).gtag('event', 'conversion', {
                            'send_to': 'AW-18229137722/JKXKCOXx5MkcELqiqvRD',
                            'value': 1.0,
                            'currency': 'CLP'
                        });
                    }
                }}
            >
                <svg className="w-5 h-5 text-whatsapp-verde" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
            </a>
        </div>
    </section>
);

const BlogPost: React.FC<{ post: Post }> = ({ post }) => {
    const service = SERVICES[post.service];
    const url = `${BASE_URL}/blog/${post.slug}`;
    const related = getRelatedPosts(post);

    // Índice lateral: los H2 del cuerpo (ids `seccion-<posición>`) y las preguntas frecuentes.
    const sidebarItems: SidebarItem[] = [
        ...post.blocks.flatMap((b, i) => (b.type === 'h2' ? [{ id: `seccion-${i}`, label: b.text }] : [])),
        ...(post.faq && post.faq.length > 0 ? [{ id: 'preguntas-frecuentes', label: 'Preguntas frecuentes' }] : []),
    ];

    // Memoizado: sin esto, el objeto se recrea en cada render y el efecto de Seo
    // reinyectaría el JSON-LD una y otra vez.
    const jsonLd = useMemo(() => {
        const SERVICE = SERVICES[post.service];
        const article: any = {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': `${url}#blogposting`,
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated || post.date,
            inLanguage: 'es-CL',
            image: post.image || LOGO_URL,
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            author: { '@id': 'https://labraybalmaceda.cl/#renato-labra' },
            publisher: { '@id': 'https://labraybalmaceda.cl/#estudio' },
            isPartOf: { '@id': 'https://labraybalmaceda.cl/#website' },
            breadcrumb: { '@id': `${url}#breadcrumb` },
        };

        if (SERVICE) {
            article.about = { '@id': `${BASE_URL}${SERVICE.path}#service` };
        }

        const breadcrumbs = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumb`,
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${BASE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Publicaciones', item: `${BASE_URL}/blog` },
                { '@type': 'ListItem', position: 3, name: post.title, item: url },
            ],
        };

        const blocks: object[] = [article, breadcrumbs];

        if (post.faq && post.faq.length > 0) {
            blocks.push({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: post.faq.map((f) => ({
                    '@type': 'Question',
                    name: f.question,
                    acceptedAnswer: { '@type': 'Answer', text: f.answer },
                })),
            });
        }

        return blocks;
    }, [post, url]);

    return (
        <div className="min-h-screen bg-hueso text-brand-black">
            <Seo
                title={post.metaTitle || `${post.title} | Labra & Balmaceda`}
                description={post.description}
                path={`/blog/${post.slug}`}
                type="article"
                image={post.image}
                noindex={post.noindex}
                publishedTime={post.date}
                modifiedTime={post.updated || post.date}
                jsonLd={jsonLd}
            />
            <Header />

            {/* overflow-x-clip (no hidden): así el índice lateral sigue siendo sticky. */}
            <main className="overflow-x-clip">
                <PageHero
                    eyebrow={service.label}
                    title={post.title}
                    image="/fondo-articulo-blog.jpg"
                    imageClass="bg-position-[30%_center] md:bg-center"
                    containerClass="max-w-3xl lg:max-w-6xl"
                    above={
                        <nav aria-label="Migas de pan" className="mb-6 text-xs sm:text-sm text-white font-bold">
                            <a
                                href="/"
                                onClick={(e) => { e.preventDefault(); navigateTo('/'); }}
                                className="hover:text-brand-gold transition"
                            >
                                Inicio
                            </a>
                            <span className="mx-2">/</span>
                            <a
                                href="/blog"
                                onClick={(e) => { e.preventDefault(); navigateTo('/blog'); }}
                                className="hover:text-brand-gold transition"
                            >
                                Publicaciones
                            </a>
                        </nav>
                    }
                >
                    <p className="mt-5 text-xs sm:text-sm text-white/65">
                        Publicado el <time dateTime={post.date}>{formatDate(post.date)}</time>
                        {post.updated && post.updated !== post.date && (
                            <> · Actualizado el <time dateTime={post.updated}>{formatDate(post.updated)}</time></>
                        )}
                    </p>
                </PageHero>

                <div className="container mx-auto px-4 sm:px-6 max-w-3xl lg:max-w-6xl py-12 sm:py-16">
                    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16 lg:items-start">
                    <div className="min-w-0">
                    <ArticleSidebar items={sidebarItems} articleId="articulo" variant="mobile" />
                    <article id="articulo" className="max-w-[40rem] mx-auto lg:mx-0">
                        <ConsultaCta post={post} className="mb-12" />

                        <div>{post.blocks.map(renderBlock)}</div>

                        {post.faq && post.faq.length > 0 && (
                            <section className="mt-14">
                                <h2 id="preguntas-frecuentes" className="relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mb-6 pt-5 scroll-mt-28 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold">Preguntas frecuentes</h2>
                                <FaqAccordion items={post.faq} />
                            </section>
                        )}

                        <ConsultaCta post={post} className="mt-14" />

                        <PreferredSourceButton key={post.slug} className="mt-10 pt-8 border-t border-gray-200 text-center" />

                        <p className="mt-8 text-[11px] text-gray-500 italic leading-relaxed text-center">
                            Este artículo es informativo y no constituye asesoría legal para un caso particular.
                        </p>
                    </article>

                    {related.length > 0 && (
                        <section className="mt-16 max-w-[40rem] mx-auto lg:mx-0">
                            <h2 className="relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mb-6 pt-5 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold">Seguir leyendo</h2>
                            <div className="space-y-3">
                                {related.map((r) => (
                                    <DepthCard key={r.slug} rounded="rounded-xl">
                                        <a
                                            href={`/blog/${r.slug}`}
                                            onClick={(e) => { e.preventDefault(); navigateTo(`/blog/${r.slug}`); }}
                                            className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                                        >
                                            <div style={depthLayerStyle}>
                                                <h3 className="font-bold font-baskerville text-brand-black text-base mb-1">{r.title}</h3>
                                                <p className="text-sm text-gray-600 leading-relaxed">{r.excerpt}</p>
                                            </div>
                                        </a>
                                    </DepthCard>
                                ))}
                            </div>
                        </section>
                    )}
                    </div>
                    <ArticleSidebar items={sidebarItems} articleId="articulo" variant="desktop" />
                    </div>
                </div>
            </main>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default BlogPost;
