import React, { useMemo } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import Seo from './Seo';
import { indexablePosts } from '../content/blog';
import { SERVICES } from '../content/blog/services';
import { navigateTo, BASE_URL, formatDate } from './blogUtils';

const BlogIndex: React.FC = () => {
    const posts = indexablePosts;

    const jsonLd = useMemo(
        () => [
            {
                '@context': 'https://schema.org',
                '@type': 'Blog',
                name: 'Blog legal | Labra & Balmaceda Abogados',
                description:
                    'Artículos sobre arriendos, familia, herencias y deudas, explicados por abogados de Puerto Varas y Puerto Montt.',
                url: `${BASE_URL}/blog`,
                inLanguage: 'es-CL',
                publisher: {
                    '@type': 'Organization',
                    name: 'Labra & Balmaceda Abogados',
                    url: `${BASE_URL}/`,
                },
                blogPost: posts.map((p) => ({
                    '@type': 'BlogPosting',
                    headline: p.title,
                    url: `${BASE_URL}/blog/${p.slug}`,
                    datePublished: p.date,
                })),
            },
            {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${BASE_URL}/` },
                    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
                ],
            },
        ],
        [posts]
    );

    return (
        <div className="bg-white min-h-screen text-brand-black">
            <Seo
                title="Blog legal | Labra & Balmaceda Abogados"
                description="Artículos sobre arriendos, divorcio, herencias, pensión de alimentos y deudas, explicados en simple por abogados de Puerto Varas y Puerto Montt."
                path="/blog"
                jsonLd={jsonLd}
            />
            <Header />

            <main className="py-12 sm:py-20 overflow-hidden mt-6 sm:mt-0">
                <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
                    <header className="mb-10 sm:mb-14">
                        <h1 className="text-2xl sm:text-4xl font-bold mb-4 font-baskerville uppercase tracking-tight not-italic leading-tight">
                            Artículos <span className="text-brand-gold"></span>
                        </h1>
                        <p className="text-[15px] sm:text-lg text-gray-700 leading-relaxed">
                            Explicamos los problemas que más nos consultan y tramitamos en la Región de Los Lagos: Incumplimientos contractuales e indemnizaciones, arriendos que no se pagan, divorcios, herencias que nadie logra repartir.
                        </p>
                    </header>

                    {posts.length === 0 ? (
                        <p className="text-gray-600 text-[15px] leading-relaxed">
                            Estamos preparando los primeros artículos. Vuelve pronto.
                        </p>
                    ) : (
                        <div className="space-y-5">
                            {posts.map((post) => (
                                <article
                                    key={post.slug}
                                    className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-gold/40 transition-all duration-300"
                                >
                                    <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-2">
                                        {SERVICES[post.service].label}
                                    </p>
                                    <h2 className="text-lg sm:text-2xl font-bold font-baskerville tracking-tight mb-2 leading-snug">
                                        <a
                                            href={`/blog/${post.slug}`}
                                            onClick={(e) => { e.preventDefault(); navigateTo(`/blog/${post.slug}`); }}
                                            className="text-brand-black hover:text-brand-gold transition"
                                        >
                                            {post.title}
                                        </a>
                                    </h2>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
                                    <div className="flex items-center justify-between gap-4">
                                        <time dateTime={post.date} className="text-xs text-gray-400">
                                            {formatDate(post.date)}
                                        </time>
                                        <a
                                            href={`/blog/${post.slug}`}
                                            onClick={(e) => { e.preventDefault(); navigateTo(`/blog/${post.slug}`); }}
                                            className="text-xs font-bold uppercase tracking-widest text-brand-black hover:text-brand-gold transition"
                                        >
                                            Leer artículo →
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default BlogIndex;
