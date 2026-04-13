import React from 'react';
import FadeInUp from './FadeInUp';
import { trackCTAClick, trackWhatsAppClick } from '../services/tracking';

interface BenefitCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, children }) => (
    <FadeInUp>
        <div className="p-8 border-t-2 border-brand-gold/20 bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-xl h-full group flex flex-col items-center text-center">
            <div className="mb-6 text-brand-gold group-hover:scale-110 transition-transform duration-300 p-4 bg-gray-50 rounded-full">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-brand-black font-baskerville uppercase tracking-tight">{title}</h3>
            <div className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">{children}</div>
        </div>
    </FadeInUp>
);


const WhyChooseUs: React.FC = () => {
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
        <section id="beneficios" className="py-20 sm:py-28 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-brand-black uppercase tracking-tight font-baskerville not-italic">
                        Cómo trabajamos <span className="text-brand-gold">contigo</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-medium">
                        Nuestro estándar profesional se basa en la claridad procesal <br className="hidden sm:block" />
                        y la comunicación directa con tu abogado.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
                    <BenefitCard 
                        title="Conocimiento local" 
                        icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
                    >
                        Conocemos la tramitación real en los tribunales de la zona. Preparamos tu caso con foco en plazos, prueba y estrategia regional.
                    </BenefitCard>
                    
                    <BenefitCard 
                        title="Comunicación directa" 
                        icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>}
                    >
                        Tú hablas con el abogado. Seguimiento claro y respuestas o actualizaciones dentro de 24h hábiles sobre cada etapa de tu proceso.
                    </BenefitCard>

                    <BenefitCard 
                        title="Estrategia y ejecución" 
                        icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>}
                    >
                        Definimos un plan de acción desde el inicio: documentos, riesgos, costos y alternativas según el objetivo jurídico planteado.
                    </BenefitCard>

                    <BenefitCard 
                        title="Transparencia" 
                        icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>}
                    >
                        Presupuesto claro y honorarios por escrito desde el inicio. Sin sorpresas: alcance, plazos y costos de litigación definidos.
                    </BenefitCard>
                </div>

                <div className="text-center">
                    <p className="text-gray-500 mb-8 font-medium italic">¿No sabes por dónde partir? Cuéntanos tu caso y te orientamos con el siguiente paso.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#consulta" className="px-10 py-4 bg-brand-black text-white rounded-xl font-bold hover:bg-brand-gold transition shadow-lg" onClick={(e) => { handleScrollClick(e); trackCTAClick('WCU Consultation'); }}>
                            Agendar Consulta
                        </a>
                        <a href="https://wa.me/56977646224" className="px-10 py-4 border-2 border-whatsapp-verde text-whatsapp-verde rounded-xl font-bold hover:bg-whatsapp-verde hover:text-white transition shadow-lg flex items-center justify-center gap-2" onClick={() => trackWhatsAppClick('WCU WhatsApp')}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            WhatsApp Directo
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;