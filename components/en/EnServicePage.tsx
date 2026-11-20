import React, { useMemo } from 'react';
import ServiceShell from '../ServiceShell';
import Seo from '../Seo';
import ContactCTA from '../ContactCTA';
import FaqAccordion from '../FaqAccordion';
import { navigateTo } from '../blogUtils';
import type { EnServiceKey } from '../i18n';
import { EN_SERVICES } from '../../content/en/services';

// Página de servicio en inglés (/en/...). El contenido está en content/en/services.ts.
// Mismo marco que las páginas en español (ServiceShell). Sin artículos relacionados:
// el blog está solo en español.

const BASE = 'https://labraybalmaceda.cl';
const linkClass = 'text-brand-gold font-semibold underline underline-offset-2 hover:text-brand-black transition';

/** Enlaces dentro del texto: [texto](url). Internos con navegación de la SPA; externos en otra pestaña. */
const renderLinks = (text: string): React.ReactNode => {
    const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
    const parts: React.ReactNode[] = [];
    let last = 0;
    let k = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
        if (m.index > last) parts.push(text.slice(last, m.index));
        const href = m[2];
        parts.push(
            href.startsWith('/') ? (
                <a key={k++} href={href} onClick={(e) => { e.preventDefault(); navigateTo(href); }} className={linkClass}>{m[1]}</a>
            ) : (
                <a key={k++} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{m[1]}</a>
            )
        );
        last = m.index + m[0].length;
    }
    if (last === 0) return text;
    if (last < text.length) parts.push(text.slice(last));
    return parts;
};

/** Quita la marca de enlace para el JSON-LD (texto plano). */
const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1');

const EnServicePage: React.FC<{ serviceKey: EnServiceKey }> = ({ serviceKey }) => {
    const d = EN_SERVICES[serviceKey];
    const url = `${BASE}${d.path}`;

    const jsonLd = useMemo(() => {
        const graph: object[] = [
            {
                '@type': 'WebPage',
                '@id': `${url}#webpage`,
                url,
                name: d.seoTitle,
                inLanguage: 'en',
                isPartOf: { '@id': `${BASE}/#website` },
                about: { '@id': `${url}#service` },
                breadcrumb: { '@id': `${url}#breadcrumb` },
                mainEntity: { '@id': `${url}#service` },
            },
            {
                '@type': 'Service',
                '@id': `${url}#service`,
                name: d.serviceName,
                serviceType: d.serviceName,
                description: d.serviceDescription,
                url,
                inLanguage: 'en',
                provider: { '@id': `${BASE}/#estudio` },
                areaServed: d.areaServed,
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${url}#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/en` },
                    { '@type': 'ListItem', position: 2, name: d.breadcrumbName, item: url },
                ],
            },
        ];
        if (d.faqs) {
            graph.push({
                '@type': 'FAQPage',
                '@id': `${url}#faq`,
                inLanguage: 'en',
                mainEntity: d.faqs.map((f) => ({
                    '@type': 'Question',
                    name: f.question,
                    acceptedAnswer: { '@type': 'Answer', text: plain(f.answer) },
                })),
            });
        }
        return { '@context': 'https://schema.org', '@graph': graph };
    }, [d, url]);

    const handleCTA = () => {
        window.history.pushState({}, '', '/en#consulta');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    // Mismas clases que las páginas de servicio en español (ronda 3: líneas finas y aire).
    const h2 = 'relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mt-16 sm:mt-20 mb-6 pt-6 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold';
    const intro = 'space-y-6 text-[15px] sm:text-base leading-[1.8] text-gray-700 mt-12';
    const bloque = 'border-t border-gray-200 divide-y divide-gray-200 text-[15px] sm:text-base leading-[1.8] text-gray-700 [&>p]:py-6 [&>p>strong:first-child]:block [&>p>strong:first-child]:font-baskerville [&>p>strong:first-child]:text-brand-black [&>p>strong:first-child]:text-[17px] [&>p>strong:first-child]:mb-2';

    return (
        <>
            <Seo title={d.seoTitle} description={d.seoDescription} path={d.path} jsonLd={jsonLd} />
            <ServiceShell title={<>{d.h1Before}<span className="font-bold text-brand-gold">{d.h1Gold}</span>{d.h1After}</>}>
                <ContactCTA source={d.contactSource} />

                <div className={intro}>
                    {d.intro.map((p, i) => <p key={i}>{renderLinks(p)}</p>)}
                </div>

                <h2 className={h2}>{d.sectionsTitle}</h2>
                <div className={bloque}>
                    {d.sections.map((s) => (
                        <p key={s.heading}><strong>{s.heading}</strong> {renderLinks(s.body)}</p>
                    ))}
                </div>

                {d.extra && d.extraTitle && (
                    <>
                        <h2 className={h2}>{d.extraTitle}</h2>
                        <div className={bloque}>
                            {d.extra.map((s) => (
                                <p key={s.heading}><strong>{s.heading}</strong> {renderLinks(s.body)}</p>
                            ))}
                        </div>
                    </>
                )}

                {d.faqs && (
                    <>
                        <h2 className={h2}>Frequently asked questions</h2>
                        <FaqAccordion items={d.faqs.map((faq) => ({ question: faq.question, answer: renderLinks(faq.answer) }))} />
                    </>
                )}

                <p className="text-xs text-gray-500 italic mt-12 text-center sm:text-left">
                    Our publications are available in Spanish only.{' '}
                    <a href={d.esPath} hrefLang="es" lang="es" onClick={(e) => { e.preventDefault(); navigateTo(d.esPath); }} className="underline hover:text-brand-gold transition">Ver esta página en español</a>
                </p>

                <div className="mt-10 pt-10 border-t border-gray-200 text-center">
                    <button onClick={handleCTA} className="w-full sm:w-auto px-10 py-4 text-[13px] sm:text-sm font-bold uppercase tracking-[0.2em] rounded-md bg-brand-black text-white hover:bg-brand-gold transition-colors duration-300 mx-auto block">
                        Request a consultation
                    </button>
                </div>
            </ServiceShell>
        </>
    );
};

export default EnServicePage;
