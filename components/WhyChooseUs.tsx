import React from 'react';
import FadeInUp from './FadeInUp';

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

    return (
        <section id="beneficios" className="py-20 sm:py-28 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-brand-black uppercase tracking-tight font-baskerville not-italic">
                        Cómo <span className="text-brand-gold">trabajamos</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-medium">
                        Nuestro estándar profesional se basa en la claridad procesal <br className="hidden sm:block" />
                        y la comunicación directa con el abogado a cargo.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    <BenefitCard 
                        title="Conocimiento local" 
                        icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
                    >
                        Conocemos la tramitación real en los tribunales de la zona. Preparamos cada caso con foco en plazos, prueba y estrategia regional.
                    </BenefitCard>
                    
                    <BenefitCard 
                        title="Comunicación directa" 
                        icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>}
                    >
                        El cliente habla directamente con el abogado. Seguimiento claro y respuestas o actualizaciones dentro de 24 h hábiles sobre cada etapa del proceso.
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
            </div>
        </section>
    );
};

export default WhyChooseUs;