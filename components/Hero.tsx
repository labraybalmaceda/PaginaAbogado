import React from 'react';
import { trackCTAClick, trackWhatsAppClick } from '../services/tracking';
import DepthCard, { depthLayerStyle } from './DepthCard';
import { conIdioma, type Lang } from './i18n';

// Inclinación de los botones: más que en las tarjetas (3°), porque en un botón bajo 3° casi no se ve.
const BUTTON_TILT = 8;

const TEXTOS = {
    es: {
        h1: <>Abogados en <span className="text-brand-gold font-light whitespace-nowrap">Puerto Varas</span> y <span className="text-brand-gold font-light whitespace-nowrap">Puerto Montt</span>.</>,
        frase: 'Asesoría legal para empresas y personas en el sur de Chile.',
        cta: 'Agendar Consulta',
        whatsapp: 'WhatsApp directo',
    },
    en: {
        h1: <>Lawyers in <span className="text-brand-gold font-light whitespace-nowrap">Puerto Varas</span> and <span className="text-brand-gold font-light whitespace-nowrap">Puerto Montt</span>.</>,
        frase: 'Legal counsel for companies and individuals in southern Chile.',
        cta: 'Book a Consultation',
        whatsapp: 'WhatsApp',
    },
};

interface HeroProps {
    lang?: Lang;
    /** Franja que se monta sobre el borde inferior de la foto (artículos del blog). */
    bottom?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ lang: langProp, bottom }) => {
    const lang: Lang = langProp ?? 'es';
    const heroImageUrl = '/fotohero.webp';
    const t = TEXTOS[lang];

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
            className="bg-cover bg-center md:bg-position-[center_20%] bg-scroll relative min-h-[100svh] flex flex-col text-white"
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(17, 17, 17, 0.7), rgba(17, 17, 17, 0.8)), url('${heroImageUrl}')` }}
        >
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-32 pb-16 sm:pt-40 sm:pb-24">
                <div className="container mx-auto text-center z-10 max-w-5xl">
                    <p className="text-[2.6rem] leading-[1.05] sm:text-7xl md:text-8xl font-bold mb-8 sm:mb-10 tracking-tighter uppercase text-white font-baskerville not-italic">
                        LABRA & <span className="text-brand-gold">BALMACEDA</span>
                    </p>
                    <h1 className="font-fina font-extralight text-2xl sm:text-4xl md:text-5xl mb-8 text-white max-w-4xl mx-auto leading-tight tracking-tight">
                        {t.h1}
                    </h1>

                    <div className="w-12 h-px bg-brand-gold mx-auto mb-8" aria-hidden="true"></div>
                    <p className="font-fina font-extralight text-lg sm:text-xl md:text-2xl text-gray-200 mb-12 sm:mb-14 max-w-2xl mx-auto leading-relaxed text-balance">
                        {t.frase}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
                        <DepthCard rounded="rounded-md" className="w-full sm:w-auto" maxTilt={BUTTON_TILT}>
                            <a href="#consulta" className="inline-flex w-full sm:w-auto px-10 py-5 text-sm sm:text-base font-bold uppercase tracking-widest rounded-md bg-brand-gold hover:bg-yellow-700 text-white transition duration-300 items-center justify-center" onClick={(e) => { handleScrollClick(e); trackCTAClick(conIdioma('Hero CTA Principal', lang)); }}>
                                <span style={depthLayerStyle}>{t.cta}</span>
                            </a>
                        </DepthCard>
                        <DepthCard rounded="rounded-md" className="w-full sm:w-auto" maxTilt={BUTTON_TILT}>
                            <a href="https://wa.me/56977646224" className="glass-light inline-flex w-full sm:w-auto px-10 py-5 text-sm sm:text-base font-bold uppercase tracking-widest rounded-md border border-white/25 text-white hover:bg-white/20 hover:border-white/40 transition duration-300 items-center justify-center" onClick={() => trackWhatsAppClick(conIdioma('Hero WhatsApp', lang))}>
                                <span className="inline-flex items-center gap-2" style={depthLayerStyle}>
                                    <svg className="w-5 h-5 mt-0.5 text-whatsapp-verde" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    <span>{t.whatsapp}</span>
                                </span>
                            </a>
                        </DepthCard>
                    </div>
                </div>
            </div>

            {bottom}
        </section>
    );
};

export default Hero;
