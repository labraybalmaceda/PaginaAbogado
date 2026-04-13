import React, { useRef } from 'react';
import FadeInUp from './FadeInUp';
import { trackCTAClick } from '../services/tracking';

interface CaseTypeCardProps {
    title: string;
    situation: string;
    approach: string;
    delivery: string;
    tag: string;
    icon: React.ReactNode;
}

const CaseTypeCard: React.FC<CaseTypeCardProps> = ({ title, situation, approach, delivery, tag, icon }) => (
    <div className="flex-none w-[280px] sm:w-[350px] scroll-snap-align-start group">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col border-t-4 border-t-transparent hover:border-t-brand-gold">
            <div className="text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h4 className="text-lg font-bold text-brand-black mb-4 font-baskerville uppercase tracking-tight">{title}</h4>
            
            <div className="space-y-5 mb-8 flex-grow">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-1">Situación habitual</span>
                    <p className="text-sm text-gray-600 leading-relaxed">{situation}</p>
                </div>
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-1">Cómo lo abordamos</span>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium italic">{approach}</p>
                </div>
                <div className="bg-brand-gold/5 p-4 rounded-xl border-l-2 border-brand-gold">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold block mb-1">Lo que obtienes (Entrega)</span>
                    <p className="text-sm text-brand-black font-semibold leading-relaxed">{delivery}</p>
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="px-2 py-1 bg-gray-100 text-[9px] font-bold text-gray-500 uppercase tracking-widest rounded">
                    {tag}
                </span>
            </div>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const cases = [
        {
            title: 'Divorcio y Alimentos',
            situation: 'Ruptura con desacuerdos en pensión y régimen comunicacional.',
            approach: 'Orden de antecedentes + estrategia de negociación o juicio según riesgo.',
            delivery: 'Plan de acción, checklist de documentos y próximos pasos (mediación/audiencia).',
            tag: 'Familia',
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
        },
        {
            title: 'No Pago de Rentas',
            situation: 'Mora acumulada + negativa del arrendatario a restituir el inmueble.',
            approach: 'Revisión exhaustiva de contrato, cálculo de deuda y ruta procesal efectiva.',
            delivery: 'Carpeta de demanda lista y cronograma detallado de diligencias.',
            tag: 'Arriendo',
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        },
        {
            title: 'Incumplimiento Contractual',
            situation: 'Servicios no ejecutados o incumplimiento de pactos comerciales.',
            approach: 'Análisis de respaldo probatorio, gestión prejudicial y acción si procede.',
            delivery: 'Estrategia con escenarios posibles, costos y plazos estimados.',
            tag: 'Civil',
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        },
        {
            title: 'Deudas y Acreedores',
            situation: 'Sobreendeudamiento crítico y presión de cobranza judicial.',
            approach: 'Diagnóstico jurídico-financiero y evaluación de alternativas legales.',
            delivery: 'Hoja de ruta con opciones de defensa o insolvencia y requisitos.',
            tag: 'Insolvencia',
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
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
        <section id="testimonios" className="py-20 sm:py-28 bg-gray-50/50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-brand-black uppercase tracking-tight font-baskerville not-italic">
                        Casos tipo y <span className="text-brand-gold">enfoque de trabajo</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-medium">
                        Ejemplos de situaciones frecuentes y nuestra forma de resolverlas. <br className="hidden sm:block" />
                        <span className="text-brand-black">Te orientamos según tus antecedentes específicos.</span>
                    </p>
                </div>
                
                {/* Carousel Container */}
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-12 scroll-smooth no-scrollbar scroll-snap-x-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {cases.map((c, index) => (
                        <CaseTypeCard key={index} {...c} />
                    ))}
                </div>

                <div className="flex justify-center gap-2 mb-10">
                    {cases.map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-gold/30"></div>
                    ))}
                </div>

                <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mb-16 italic">
                    "Casos referenciales. No constituyen garantía de resultado."
                </p>

                {/* Se ha ocultado temporalmente la sección de reputación y reseñas de Google */}
                <div className="text-center mt-12">
                     <a 
                        href="#consulta" 
                        className="inline-block px-10 py-5 bg-brand-black text-white hover:bg-brand-gold rounded-xl font-bold transition-all duration-300 shadow-xl uppercase tracking-widest text-sm"
                        onClick={(e) => { handleScrollClick(e); trackCTAClick('Testimonials Consultation CTA Central'); }}
                    >
                        Agendar consulta
                    </a>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .scroll-snap-x-mandatory { scroll-snap-type: x mandatory; }
                .scroll-snap-align-start { scroll-snap-align: start; }
            `}} />
        </section>
    );
};

export default Testimonials;