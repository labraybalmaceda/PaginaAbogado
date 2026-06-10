import React from 'react';
import { trackCTAClick, trackWhatsAppClick } from '../services/tracking';

const Hero: React.FC = () => {
    const heroImageUrl = 'https://res.cloudinary.com/dt36zhzde/image/upload/f_auto,q_auto/foto2_kxfpfv';

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
        <section 
            id="hero" 
            className="bg-cover bg-center bg-scroll md:bg-fixed relative min-h-[85vh] flex items-center justify-center text-white px-4 sm:px-6 py-20"
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(17, 17, 17, 0.8), rgba(17, 17, 17, 0.9)), url('${heroImageUrl}')` }}
        >
            <div className="container mx-auto text-center z-10 max-w-5xl">
                <span className="inline-block px-5 py-2 mb-8 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-brand-gold bg-brand-gold/10 backdrop-blur-sm rounded-full border border-brand-gold/30">
                    ABOGADOS EN PUERTO VARAS Y PUERTO MONTT
                </span>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tighter uppercase text-white font-baskerville not-italic">
                    LABRA & <span className="text-brand-gold">BALMACEDA</span>
                </h1>

                <h2 className="text-xl sm:text-3xl md:text-4xl font-light mb-8 text-gray-100 max-w-4xl mx-auto leading-tight">
                    Ordenamos tu caso y tu patrimonio: <br className="hidden sm:block" />
                    <span className="font-bold text-brand-gold">contratos, arriendos, insolvencia y familia.</span>
                </h2>

                <div className="text-base sm:text-lg md:text-xl mb-12 text-gray-400 max-w-3xl mx-auto space-y-2">
                    <p className="leading-relaxed">
                        Te orientamos desde el inicio con los pasos concretos para tu caso: <br className="hidden sm:block" />
                        <span className="text-white font-medium">documentos, riesgos, plazos y alternativas legales.</span>
                    </p>
                    <p className="text-brand-gold/80 font-semibold italic text-sm sm:text-base">
                        Atención presencial y online en la Región de Los Lagos.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-6">
                    <a href="#consulta" className="inline-block w-full sm:w-auto px-10 py-5 text-sm sm:text-base font-bold uppercase tracking-widest rounded-full bg-brand-gold hover:bg-yellow-700 text-white transition duration-300 shadow-2xl transform hover:-translate-y-1" onClick={(e) => { handleScrollClick(e); trackCTAClick('Hero CTA Principal'); }}>
                        📋 Agendar Consulta
                    </a>
                    <a href="https://wa.me/56977646224" className="inline-block w-full sm:w-auto px-10 py-5 text-sm sm:text-base font-bold uppercase tracking-widest rounded-full border-2 border-whatsapp-verde text-whatsapp-verde hover:bg-whatsapp-verde hover:text-white transition duration-300 shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2" onClick={() => trackWhatsAppClick('Hero WhatsApp')}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp Directo
                    </a>
                </div>

                <p className="text-gray-400 text-xs sm:text-sm font-medium italic">
                    Te indicamos si tu caso requiere <span className="text-gray-300 font-bold">mediación, demanda o negociación.</span>
                </p>
            </div>
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-20 animate-bounce">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;