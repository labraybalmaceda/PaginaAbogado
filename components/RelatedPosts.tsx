import React from 'react';
import { getPostsByService } from '../content/blog';
import type { ServiceKey } from '../content/blog/types';
import { navigateTo } from './blogUtils';

/**
 * Enlaces desde una página de servicio hacia los artículos de esa misma área.
 * Refuerza la autoridad temática de la "money page".
 * Si todavía no hay artículos publicados de esa área, no renderiza nada.
 */
const RelatedPosts: React.FC<{ service: ServiceKey }> = ({ service }) => {
    const posts = getPostsByService(service);
    if (posts.length === 0) return null;

    return (
        <section className="mt-12 pt-8 border-t border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 text-center sm:text-left">
                Artículos sobre este tema
            </h2>
            <div className="space-y-3">
                {posts.map((post) => (
                    <a
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        onClick={(e) => { e.preventDefault(); navigateTo(`/blog/${post.slug}`); }}
                        className="block p-4 sm:p-5 rounded-xl border border-gray-100 hover:border-brand-gold/40 hover:shadow-lg transition-all"
                    >
                        <h3 className="font-bold font-baskerville text-brand-black text-base mb-1">{post.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{post.excerpt}</p>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default RelatedPosts;
