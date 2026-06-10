import React from 'react';
import FadeInUp from './FadeInUp';
import { trackServiceClick, trackCTAClick } from '../services/tracking';

interface PracticeAreaCardProps {
    icon: React.ReactNode;
    title: string;
    promise: string;
    services: string[];
    ctaText: string;
    microcopy: string;
    trackingId: string;
    isHighlighted?: boolean;
}

const PracticeAreaCard: React.FC<PracticeAreaCardProps> = ({ icon, title, promise, services, ctaText, microcopy, trackingId, isHighlighted }) => {
    const handleScrollClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const href = event.currentTarget.getAttribute('href');
        if (href?.startsWith('#')) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <FadeInUp>
            <div className={`relative bg-white p-8 rounded-2xl shadow-sm border transition-all duration-500 flex flex-col h-full group ${isHighlighted ? 'border-brand-gold ring-1 ring-brand-gold shadow-xl -translate-y-2' : 'border-gray-100 hover:border-brand-gold hover:shadow-md'}`}>
                {isHighlighted && (
                    <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        Más Consultada
                    </span>
                )}
                
                <div className="mb-6 text-brand-gold flex justify-center">
                    <div className={`p-4 rounded-2xl ${isHighlighted ? 'bg-brand-gold/10' : 'bg-gray-50 group-hover:bg-brand-gold/5'} transition-colors`}>
                        {icon}
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-brand-black text-center font-baskerville not-italic">{title}</h3>
                <p className="text-sm text-gray-500 mb-6 text-center leading-relaxed italic">{promise}</p>
                
                <ul className="space-y-3 mb-8 flex-grow">
                    {services.map((service, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                            </svg>
                            {service}
                        </li>
                    ))}
                </ul>

                <div className="text-center mt-auto">
                    <a 
                        href="#consulta" 
                        className={`inline-block w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 shadow-md ${isHighlighted ? 'bg-brand-black text-white hover:bg-brand-gold' : 'bg-gray-50 text-brand-black hover:bg-brand-black hover:text-white'}`}
                        onClick={(e) => { handleScrollClick(e); trackServiceClick(trackingId); }}
                    >
                        {ctaText}
                    </a>
                    <p className="mt-3 text-[10px] font-medium text-gray-400 italic">
                        {microcopy}
                    </p>
                </div>
            </div>
        </FadeInUp>
    );
};

const PracticeAreas: React.FC = () => {
    const areas = [
        {
            title: 'Civil',
            promise: 'Contratos, deudas y conflictos patrimoniales: ordenamos tu caso y lo ejecutamos.',
            icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>,
            services: [
                'Incumplimiento de Contrato / Cobros',
                'Juicios Ejecutivos y Embargos',
                'Posesión Efectiva / Herencias',
                'Indemnizaciones / Accidentes',
                'Responsabilidad Civil Patrimonial'
            ],
            ctaText: 'Consultar caso Civil →',
            microcopy: 'Te indicamos riesgos, plazos y alternativa más eficiente.',
            trackingId: 'Derecho Civil',
            isHighlighted: true
        },
        {
            title: 'Arrendamientos',
            promise: 'Término, cobro y restitución: tramitación completa y diligencias.',
            icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>,
            services: [
                'Terminación por No Pago de Rentas',
                'Juicios de Desahucio',
                'Cobro de Rentas y Garantías',
                'Restitución del Inmueble'
            ],
            ctaText: 'Resolver un arriendo',
            microcopy: 'Checklist de documentos + estrategia procesal.',
            trackingId: 'Juicios Arriendo'
        },
        {
            title: 'Familia',
            promise: 'Divorcios, alimentos y cuidado personal con enfoque estratégico y humano.',
            icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>,
            services: [
                'Divorcio (Acuerdo / Unilateral)',
                'Compensación Económica',
                'Alimentos (Fijación / Rebaja / Cese)',
                'Cuidado Personal y Relación Directa',
                'Medidas de Protección y VIF'
            ],
            ctaText: 'Evaluar mi caso de Familia',
            microcopy: 'Confidencialidad y pasos concretos desde la primera reunión.',
            trackingId: 'Derecho Familia'
        },
        {
            title: 'Insolvencia',
            promise: 'Reorganización o liquidación: claridad financiera + ruta legal.',
            icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
            services: [
                'Liquidación Voluntaria (Persona Natural)',
                'Reorganización / Renegociación',
                'Defensa frente a Acreedores',
                'Representación en Juntas / Incidentes'
            ],
            ctaText: 'Revisar mi situación de deudas',
            microcopy: 'Diagnóstico inicial y plan de acción inmediato.',
            trackingId: 'Derecho Concursal'
        }
    ];

    const handleScrollClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const href = event.currentTarget.getAttribute('href');
        if (href?.startsWith('#')) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section id="practicas" className="py-20 sm:py-28 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-brand-black uppercase tracking-tight font-baskerville not-italic">
                        Áreas de <span className="text-brand-gold">Práctica</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                        Selecciona tu situación y te indicamos el camino más eficiente: <br className="hidden sm:block" />
                        <span className="font-semibold text-brand-black">documentación, plazos estimados y estrategia (acuerdo o juicio).</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {areas.map(area => <PracticeAreaCard key={area.title} {...area} />)}
                </div>

                <div className="mt-20">
                    <FadeInUp>
                        <div className="bg-brand-black rounded-3xl p-8 sm:p-12 text-center border-t-4 border-brand-gold shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 italic font-baskerville">¿No sabes dónde encaja tu caso?</h3>
                                <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
                                    Descríbelo en 2 líneas y un abogado especialista te orientará al área correcta y los pasos a seguir.
                                </p>
                                <a 
                                    href="#consulta" 
                                    className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-brand-gold hover:bg-yellow-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 uppercase tracking-widest text-sm"
                                    onClick={(e) => { handleScrollClick(e); trackCTAClick('Orientación Rápida Banner'); }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" strokeWidth="2.5"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 8l-6 2-2 6 6-2 2-6z"/>
                                    </svg>
                                    Agendar Consulta
                                </a>
                            </div>
                        </div>
                    </FadeInUp>
                </div>
            </div>
        </section>
    );
};

export default PracticeAreas;