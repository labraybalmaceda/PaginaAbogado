import React, { useMemo } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import Seo from './Seo';
import type { Post, Block } from '../content/blog/types';
import { SERVICES } from '../content/blog/services';
import { getRelatedPosts } from '../content/blog';
import { navigateTo, BASE_URL, LOGO_URL, formatDate } from './blogUtils';

const renderBlock = (block: Block, i: number) => {
    switch (block.type) {
        case 'h2':
            return (
                <h2 key={i} className="text-xl sm:text-2xl font-bold font-baskerville text-brand-black mt-10 mb-4 scroll-mt-24">
                    {block.text}
                </h2>
            );
        case 'h3':
            return (
                <h3 key={i} className="text-lg sm:text-xl font-bold font-baskerville text-brand-black mt-8 mb-3">
                    {block.text}
                </h3>
            );
        case 'list':
            return (
                <ul key={i} className="list-disc pl-5 space-y-2 mb-6 text-[15px] sm:text-lg text-gray-700 leading-relaxed">
                    {block.items.map((item, j) => (
                        <li key={j}>{item}</li>
                    ))}
                </ul>
            );
        case 'quote':
            return (
                <blockquote key={i} className="border-l-4 border-brand-gold bg-gray-50 rounded-r-xl px-5 py-4 mb-6">
                    <p className="text-[15px] sm:text-lg text-gray-700 leading-relaxed italic">{block.text}</p>
                    {block.cite && (
                        <cite className="block mt-2 text-xs uppercase tracking-widest text-brand-gold not-italic font-bold">
                            {block.cite}
                        </cite>
                    )}
                </blockquote>
            );
        case 'p':
        default:
            return (
                <p key={i} className="text-[15px] sm:text-lg text-gray-700 leading-relaxed mb-5">
                    {block.text}
                </p>
            );
    }
};

const BlogPost: React.FC<{ post: Post }> = ({ post }) => {
    const service = SERVICES[post.service];
    const url = `${BASE_URL}/blog/${post.slug}`;
    const related = getRelatedPosts(post);

    // Memoizado: sin esto, el objeto se recrea en cada render y el efecto de Seo
    // reinyectaría el JSON-LD una y otra vez.
    const jsonLd = useMemo(() => {
        const article = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated || post.date,
            inLanguage: 'es-CL',
            image: post.image || LOGO_URL,
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            author: {
                '@type': 'Person',
                name: 'Renato Labra',
                jobTitle: 'Abogado',
                url: `${BASE_URL}/`,
            },
            publisher: {
                '@type': 'Organization',
                name: 'Labra & Balmaceda Abogados',
                url: `${BASE_URL}/`,
                logo: { '@type': 'ImageObject', url: LOGO_URL },
            },
        };

        const breadcrumbs = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${BASE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
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
        <div className="min-h-screen text-brand-black bg-cover bg-center bg-fixed" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/fondo-articulo-blog.jpg')" }}>
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

            <main className="py-12 sm:py-20 overflow-hidden mt-6 sm:mt-0">
                <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
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
                            Blog
                        </a>
                    </nav>

                    <article className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 relative">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold rounded-t-2xl sm:rounded-t-3xl"></div>

                        <p className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-gold font-bold mb-3">
                            {service.label}
                        </p>

                        <h1 className="text-2xl sm:text-4xl font-bold mb-4 font-baskerville uppercase tracking-tight not-italic leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-xs sm:text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
                            Publicado el <time dateTime={post.date}>{formatDate(post.date)}</time>
                            {post.updated && post.updated !== post.date && (
                                <> · Actualizado el <time dateTime={post.updated}>{formatDate(post.updated)}</time></>
                            )}
                        </p>

                        <div>{post.blocks.map(renderBlock)}</div>

                        {post.faq && post.faq.length > 0 && (
                            <section className="mt-12">
                                <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-6">Preguntas frecuentes</h2>
                                <div className="space-y-6">
                                    {post.faq.map((f, i) => (
                                        <div key={i}>
                                            <h3 className="font-bold text-brand-black mb-1 font-baskerville tracking-tight text-base sm:text-lg">
                                                {f.question}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{f.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className="mt-12 pt-8 border-t border-gray-100 text-center">
                            <h2 className="text-lg sm:text-xl font-bold font-baskerville mb-2">
                                ¿Estás pasando por esto?
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-xl mx-auto leading-relaxed">
                                Cada caso tiene detalles que cambian la estrategia. Revisamos el tuyo y te decimos
                                con claridad qué alternativas tienes.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="/#consulta"
                                    onClick={(e) => { e.preventDefault(); navigateTo('/#consulta'); }}
                                    className="w-full sm:w-auto px-6 py-4 sm:px-10 sm:py-5 text-[13px] sm:text-base font-bold uppercase tracking-widest rounded-xl bg-brand-black text-white hover:bg-brand-gold transition-all duration-300 shadow-xl"
                                >
                                    Agenda con un abogado
                                </a>
                                <a
                                    href="https://wa.me/56977646224"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto px-6 py-4 sm:px-10 sm:py-5 text-[13px] sm:text-base font-bold uppercase tracking-widest rounded-xl bg-whatsapp-verde text-white hover:bg-green-600 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
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
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    WhatsApp
                                </a>
                            </div>
                        </section>

                        <p className="mt-8 text-[11px] text-gray-400 italic leading-relaxed text-center">
                            Este artículo es informativo y no constituye asesoría legal para un caso particular.
                        </p>
                    </article>

                    {related.length > 0 && (
                        <section className="mt-12">
                            <h2 className="text-lg sm:text-xl font-bold font-baskerville mb-5">Seguir leyendo</h2>
                            <div className="space-y-3">
                                {related.map((r) => (
                                    <a
                                        key={r.slug}
                                        href={`/blog/${r.slug}`}
                                        onClick={(e) => { e.preventDefault(); navigateTo(`/blog/${r.slug}`); }}
                                        className="block p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-gold/40 transition-all"
                                    >
                                        <h3 className="font-bold font-baskerville text-brand-black text-base mb-1">{r.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{r.excerpt}</p>
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default BlogPost;
