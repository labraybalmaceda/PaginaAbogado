import React, { useRef } from 'react';
import FadeInUp from './FadeInUp';
import { trackServiceClick, trackCTAClick } from '../services/tracking';
import { navigateTo } from './blogUtils';
import DepthCard, { depthLayerStyle } from './DepthCard';

interface PracticeAreaCardProps {
    title: string;
    promise: string;
    services: string[];
    ctaText: string;
    microcopy: string;
    trackingId: string;
    isHighlighted?: boolean;
    path: string;
}

// Brillo en el borde: sigue al cursor y se intensifica al acercarse a un costado.
// Hecho a mano, sin librerías. En pantallas táctiles queda solo el borde dorado fijo.
const GLOW_CORE = '#E8B321';
const GLOW_MAIN = '#BF8F0A';
const GLOW_EDGE_PX = 90;

const GLOW_GRADIENT =
    `radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), ${GLOW_CORE}, ${GLOW_MAIN} 38%, transparent 72%), ` +
    `radial-gradient(170px circle at var(--rx, 50%) var(--ry, 50%), rgba(191, 143, 10, 0.55), transparent 70%)`;

const GlowFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const frame = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'mouse' || !frame.current) return;
        const box = frame.current.getBoundingClientRect();
        const x = e.clientX - box.left;
        const y = e.clientY - box.top;
        const edge = Math.min(x, box.width - x, y, box.height - y);
        const nearness = 1 - Math.min(Math.max(edge, 0), GLOW_EDGE_PX) / GLOW_EDGE_PX;
        const el = frame.current;
        el.style.setProperty('--x', `${x}px`);
        el.style.setProperty('--y', `${y}px`);
        el.style.setProperty('--rx', `${box.width - x}px`);
        el.style.setProperty('--ry', `${box.height - y}px`);
        el.style.setProperty('--o', String(0.3 + 0.7 * nearness));
    };

    const handleLeave = () => frame.current?.style.setProperty('--o', '0');

    return (
        <div
            ref={frame}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            className="relative isolate rounded-2xl h-full -translate-y-2"
            style={{ '--o': 0 } as React.CSSProperties}
        >
            {children}
            {/* Línea de borde brillante (solo el contorno de 2 px) */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl p-0.5 transition-opacity duration-300"
                style={{
                    background: GLOW_GRADIENT,
                    opacity: 'var(--o)',
                    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
                }}
            />
        </div>
    );
};

const PracticeAreaCard: React.FC<PracticeAreaCardProps> = ({ title, promise, services, ctaText, microcopy, trackingId, isHighlighted, path }) => {

    return (
        <FadeInUp>
            <DepthCard>
            <GlowFrame>
            <div className="relative bg-white p-8 rounded-2xl border transition-all duration-500 flex flex-col h-full group border-brand-gold/40 ring-1 ring-brand-gold/40 shadow-xl">
                <div className="flex flex-col h-full" style={depthLayerStyle}>
                
                <h3 className="text-xl font-bold mb-2 text-brand-black text-center font-baskerville not-italic">
                    <a href={path} onClick={(e) => { e.preventDefault(); navigateTo(path); }} className="hover:text-brand-gold transition">{title}</a>
                </h3>
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
                        href={path} 
                        className={`inline-block w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 shadow-md ${isHighlighted ? 'bg-brand-black text-white hover:bg-brand-gold' : 'bg-gray-50 text-brand-black hover:bg-brand-black hover:text-white'}`}
                        onClick={(e) => { e.preventDefault(); trackServiceClick(trackingId); navigateTo(path); }}
                    >
                        {ctaText}
                    </a>
                    <p className="mt-3 text-[10px] font-medium text-gray-400 italic">
                        {microcopy}
                    </p>
                </div>
                </div>
            </div>
            </GlowFrame>
            </DepthCard>
        </FadeInUp>
    );
};

const PracticeAreas: React.FC = () => {
    const areas = [
        {
            title: 'Civil',
            path: '/abogado-civil-puerto-montt',
            promise: 'Contratos, deudas y conflictos patrimoniales: ordenamos tu caso y lo ejecutamos.',
            services: [
                'Incumplimiento de Contrato / Cobros',
                'Juicios Ejecutivos y Embargos',
                'Posesión Efectiva / Herencias',
                'Indemnizaciones / Accidentes',
                'Responsabilidad Civil Patrimonial'
            ],
            ctaText: 'Evaluar mi situación',
            microcopy: 'Te indicamos riesgos, plazos y alternativa más eficiente.',
            trackingId: 'Derecho Civil'
        },
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
            ctaText: 'Estructurar mi empresa',
            microcopy: 'Te decimos qué sociedad conviene y qué debe quedar por escrito.',
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
            ctaText: 'Conversar un plan mensual',
            microcopy: 'Revisemos el convenio que mejor se ajusta a su empresa.',
            trackingId: 'Asesoria Mensual'
        },
        {
            title: 'Arrendamientos',
            path: '/abogado-arriendo-puerto-montt',
            promise: 'Término, cobro y restitución: tramitación completa y diligencias.',
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
            title: 'Derecho Concursal',
            path: '/abogado-insolvencia-puerto-montt',
            promise: 'Reorganización, liquidación y representación de acreedores.',
            services: [
                'Liquidación de la Empresa Deudora',
                'Reorganización Judicial',
                'Defensa en Juicios Ejecutivos y Remates',
                'Representación de Acreedores y Verificación de Créditos'
            ],
            ctaText: 'Revisar mi situación de deudas',
            microcopy: 'Diagnóstico inicial y plan de acción inmediato.',
            trackingId: 'Derecho Concursal'
        },
        {
            title: 'Familia',
            path: '/abogado-familia-puerto-montt',
            promise: 'Divorcios, alimentos y cuidado personal con enfoque estratégico.',
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
