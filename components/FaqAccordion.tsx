import React, { useEffect, useId, useRef, useState } from 'react';
import { isAutomatedAgent } from './automation';

// Preguntas frecuentes como acordeón de líneas finas (páginas de servicio y artículos).
// - Bots, prerender y navegadores sin pantalla (misma detección que FadeInUp y la intro):
//   todas las respuestas se muestran abiertas, sin opacidad 0 ni atributos que las oculten.
// - Personas: cerradas. El panel cerrado lleva hidden="until-found", así Ctrl+F encuentra
//   el texto y el navegador dispara "beforematch", que abre la pregunta. Donde no se
//   soporta, el panel queda igual cerrado (alto 0) y el texto sigue en el HTML.
// Con "reducir movimiento" se abre sin animación.

export interface FaqAccordionItem {
    question: string;
    answer: React.ReactNode;
}

const FaqRow: React.FC<FaqAccordionItem> = ({ question, answer }) => {
    const [open, setOpen] = useState(isAutomatedAgent);
    const panelId = useId();
    const contenido = useRef<HTMLDivElement>(null);

    // hidden="until-found" se pone a mano: React trata "hidden" como booleano.
    useEffect(() => {
        const el = contenido.current;
        if (!el) return;
        if (open) {
            el.removeAttribute('hidden');
            return;
        }
        el.setAttribute('hidden', 'until-found');
        const abrir = () => setOpen(true);
        el.addEventListener('beforematch', abrir);
        return () => el.removeEventListener('beforematch', abrir);
    }, [open]);

    return (
        <div className="border-b border-gray-200">
            <h3>
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpen((o) => !o)}
                    className="w-full flex justify-between items-start gap-6 py-5 text-left font-baskerville font-bold text-brand-black text-base sm:text-[17px] leading-snug tracking-tight hover:text-brand-gold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50"
                >
                    <span>{question}</span>
                    <span aria-hidden="true" className="relative mt-1.5 w-3.5 h-3.5 shrink-0 text-brand-gold">
                        <span className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-current" />
                        <span className={`absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 motion-reduce:transition-none ${open ? 'scale-y-0' : 'scale-y-100'}`} />
                    </span>
                </button>
            </h3>
            <div
                id={panelId}
                className={`grid transition-[grid-template-rows] duration-500 ease-in-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div ref={contenido} className="pb-6 text-[15px] sm:text-base leading-[1.8] text-gray-600">
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FaqAccordion: React.FC<{ items: FaqAccordionItem[] }> = ({ items }) => (
    <div className="border-t border-gray-200">
        {items.map((item) => <FaqRow key={item.question} {...item} />)}
    </div>
);

export default FaqAccordion;
