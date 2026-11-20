import React from 'react';
import FadeInUp from './FadeInUp';
import { trackServiceClick } from '../services/tracking';
import { navigateTo } from './blogUtils';
import DepthCard, { depthLayerStyle } from './DepthCard';
import type { Lang } from './i18n';

// Tarjetas de Áreas de Práctica: blancas, sin íconos, con inclinación leve (DepthCard)
// y sin brillo en los bordes. El botón lleva a la página del servicio.
// `trackingId` = nombre de seguimiento de siempre; no cambiar.

interface Area {
    title: string;
    path: string;
    promise: string;
    services: string[];
    ctaText: string;
    trackingId: string;
}

const AREAS: Record<Lang, Area[]> = {
    es: [
        {
            title: 'Corporativo',
            path: '/abogado-corporativo-puerto-montt',
            promise: 'Constituir, estructurar y proteger la empresa antes de que haya conflicto.',
            services: [
                'Constitución y Modificación de Sociedades',
                'Pactos de Accionistas y Estatutos',
                'Contratos Comerciales',
                'Compraventa de Empresas y Due Diligence'
            ],
            ctaText: 'Ver Derecho Corporativo',
            trackingId: 'Derecho Corporativo'
        },
        {
            title: 'Asesoría Mensual',
            path: '/asesoria-legal-empresas-puerto-montt',
            promise: 'Un abogado externo para el día a día de la empresa, con un tope de costo mensual.',
            services: [
                'Consultas Legales Permanentes',
                'Contratos, Acuerdos y Negociaciones',
                'Asesoría en Riesgos Laborales y Tributarios',
                'Cobro de Créditos de la Empresa: Facturas y Pagarés'
            ],
            ctaText: 'Ver Asesoría Mensual',
            trackingId: 'Asesoria Mensual'
        },
        {
            title: 'Litigios Civiles y Comerciales',
            path: '/abogado-civil-puerto-montt',
            promise: 'Contratos, cobros y conflictos patrimoniales, desde la negociación hasta la ejecución de la sentencia.',
            services: [
                'Incumplimiento de Contrato / Cobros',
                'Juicios Ejecutivos y Embargos',
                'Indemnizaciones de Perjuicios',
                'Responsabilidad Civil Patrimonial',
                'Posesión Efectiva / Herencias'
            ],
            ctaText: 'Ver Litigios',
            trackingId: 'Derecho Civil'
        },
        {
            title: 'Derecho Concursal',
            path: '/abogado-insolvencia-puerto-montt',
            promise: 'Reorganización, liquidación y representación de acreedores.',
            services: [
                'Liquidación de la Empresa Deudora',
                'Reorganización Judicial',
                'Defensa en Juicios Ejecutivos y Remates',
                'Representación de Acreedores y Verificación de Créditos'
            ],
            ctaText: 'Ver Derecho Concursal',
            trackingId: 'Derecho Concursal'
        },
        {
            title: 'Inmobiliario y Construcción',
            path: '/abogado-inmobiliario-puerto-montt',
            promise: 'Compraventas, arriendos comerciales y obras: revisar antes de firmar y defender cuando hay conflicto.',
            services: [
                'Compraventa y Promesa de Compraventa',
                'Estudio de Títulos',
                'Arriendos Comerciales',
                'Contratos de Construcción',
                'Litigios por Incumplimiento y Defectos de Construcción'
            ],
            ctaText: 'Ver Inmobiliario y Construcción',
            trackingId: 'Inmobiliario'
        },
    ],
    en: [
        {
            title: 'Corporate Law',
            path: '/en/corporate-law',
            promise: 'Setting up, structuring and protecting the company before any conflict arises.',
            services: [
                'Incorporation and Amendment of Companies',
                'Shareholder Agreements and Bylaws',
                'Commercial Contracts',
                'Purchase and Sale of Companies and Due Diligence'
            ],
            ctaText: 'Corporate Law',
            trackingId: 'Derecho Corporativo EN'
        },
        {
            title: 'Monthly Legal Counsel',
            path: '/en/monthly-legal-counsel',
            promise: 'An outside lawyer for the day-to-day of the company, with a monthly cost cap.',
            services: [
                'Ongoing Legal Advice',
                'Contracts, Agreements and Negotiations',
                'Advice on Labor and Tax Risks',
                'Collection of Company Receivables: Invoices and Promissory Notes'
            ],
            ctaText: 'Monthly Legal Counsel',
            trackingId: 'Asesoria Mensual EN'
        },
        {
            title: 'Civil and Commercial Litigation',
            path: '/en/litigation',
            promise: 'Contracts, collections and property disputes, from negotiation to enforcement of the judgment.',
            services: [
                'Breach of Contract / Collections',
                'Enforcement Proceedings and Attachments',
                'Damages Claims',
                'Civil Liability',
                'Probate / Inheritance'
            ],
            ctaText: 'Litigation',
            trackingId: 'Derecho Civil EN'
        },
        {
            title: 'Insolvency Law',
            path: '/en/insolvency',
            promise: 'Reorganization, liquidation and representation of creditors.',
            services: [
                'Liquidation of the Debtor Company',
                'Judicial Reorganization',
                'Defense in Enforcement Proceedings and Auctions',
                'Representation of Creditors and Filing of Claims'
            ],
            ctaText: 'Insolvency Law',
            trackingId: 'Derecho Concursal EN'
        },
        {
            title: 'Real Estate and Construction',
            path: '/en/real-estate-and-construction',
            promise: 'Sales, commercial leases and building works: review before signing and defense when there is a dispute.',
            services: [
                'Sale and Promissory Agreements',
                'Title Review',
                'Commercial Leases',
                'Building Contracts',
                'Litigation for Breach and Construction Defects'
            ],
            ctaText: 'Real Estate and Construction',
            trackingId: 'Inmobiliario EN'
        },
    ],
};

const TEXTOS = {
    es: {
        titulo: <>Áreas de <span className="text-brand-gold">Práctica</span></>,
        bajada: 'Asesoría legal para empresas y personas en Puerto Varas, Puerto Montt y la Región de Los Lagos.',
    },
    en: {
        titulo: <>Practice <span className="text-brand-gold">Areas</span></>,
        bajada: 'Legal counsel for companies and individuals in Puerto Varas, Puerto Montt and the Los Lagos Region of Chile.',
    },
};

const PracticeAreaCard: React.FC<Area> = ({ title, promise, services, ctaText, trackingId, path }) => (
    <FadeInUp>
        <DepthCard>
            <div className="relative bg-white p-8 rounded-2xl border border-gray-200 flex flex-col h-full">
                <div className="flex flex-col h-full" style={depthLayerStyle}>
                    <h3 className="text-xl font-bold mb-2 text-brand-black text-center font-baskerville not-italic">
                        <a href={path} onClick={(e) => { e.preventDefault(); navigateTo(path); }} className="hover:text-brand-gold transition">{title}</a>
                    </h3>
                    <div className="w-8 h-px bg-brand-gold mx-auto mb-4" aria-hidden="true" />
                    <p className="text-sm text-gray-500 mb-6 text-center leading-relaxed">{promise}</p>

                    <ul className="space-y-3 mb-8 flex-grow">
                        {services.map((service, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                <svg className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                                </svg>
                                {service}
                            </li>
                        ))}
                    </ul>

                    <a
                        href={path}
                        className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-brand-black text-white hover:bg-brand-gold transition-colors duration-300"
                        onClick={(e) => { e.preventDefault(); trackServiceClick(trackingId); navigateTo(path); }}
                    >
                        {ctaText}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </a>
                </div>
            </div>
        </DepthCard>
    </FadeInUp>
);

const PracticeAreas: React.FC<{ lang?: Lang }> = ({ lang: langProp }) => {
    const lang: Lang = langProp ?? 'es';
    const t = TEXTOS[lang];
    const areas = AREAS[lang];


    return (
        <section id="practicas" className="py-20 sm:py-28 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-brand-black uppercase tracking-tight font-baskerville not-italic">
                        {t.titulo}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                        {t.bajada}
                    </p>
                </div>

                {/* 5 tarjetas (también en inglés): 3 columnas en PC; la última fila queda centrada. */}
                <div className="flex flex-wrap justify-center gap-8">
                    {areas.map((area) => (
                        <div key={area.path} className="grid w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]">
                            <PracticeAreaCard {...area} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PracticeAreas;
