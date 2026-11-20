import React from 'react';
import { getPostsByService, getPost } from '../content/blog';
import type { ServiceKey } from '../content/blog/types';
import { navigateTo } from './blogUtils';
import DepthCard, { depthLayerStyle } from './DepthCard';

/**
 * Enlaces desde una página de servicio hacia los artículos de esa misma área.
 * Refuerza la autoridad temática de la "money page".
 * Si todavía no hay artículos publicados de esa área, no renderiza nada.
 */
const RelatedPosts: React.FC<{ service: ServiceKey; extraSlugs?: string[] }> = ({ service, extraSlugs = [] }) => {
    // extraSlugs: artículos de otra área que también sirven aquí (ej. promesa de compraventa
    // en Inmobiliario). Los que no existan o sean borrador o noindex se omiten solos.
    const extra = extraSlugs
        .map((slug) => getPost(slug))
        .filter((p): p is NonNullable<typeof p> => !!p && !p.noindex);
    const posts = [...getPostsByService(service), ...extra.filter((p) => p.service !== service)];
    if (posts.length === 0) return null;

    return (
        <section className="mt-16 sm:mt-20">
            <h2 className="relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mb-6 pt-6 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold">
                Artículos sobre este tema
            </h2>
            <div className="space-y-3">
                {posts.map((post) => (
                    <DepthCard key={post.slug} rounded="rounded-xl">
                        <a
                            href={`/blog/${post.slug}`}
                            onClick={(e) => { e.preventDefault(); navigateTo(`/blog/${post.slug}`); }}
                            className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                            <div style={depthLayerStyle}>
                                <h3 className="font-bold font-baskerville text-brand-black text-base mb-1">{post.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{post.excerpt}</p>
                            </div>
                        </a>
                    </DepthCard>
                ))}
            </div>
        </section>
    );
};

export default RelatedPosts;
