import React from 'react';
import FadeInUp from './FadeInUp';
import { trackCTAClick } from '../services/tracking';

interface FAQItemProps {
    question: string;
    children: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, children }) => (
    <FadeInUp>
        <details className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100 group">
            <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-brand-black hover:bg-gray-50 transition font-baskerville uppercase tracking-tight">
                <span className="text-sm sm:text-base leading-tight">{question}</span>
                <span className="text-xl leading-none transition-transform transform group-open:rotate-45 text-brand-gold ml-4">+</span>
            </summary>
            <div className="px-6 pb-6 text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                {children}
            </div>
        </details>
    </FadeInUp>
);

const FAQ: React.FC = () => {
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
        <section id="faq" className="py-20 sm:py-28 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black uppercase tracking-tight font-baskerville not-italic mb-6">
                        Preguntas <span className="text-brand-gold">Frecuentes</span>
                    </h2>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                        Claridad técnica sobre la tramitación, plazos y modalidad de trabajo de nuestros abogados.
                    </p>
                </div>

                <div className="space-y-5">
                    <FAQItem question="1. ¿Cuánto cuesta una asesoría legal?">
                        <p className="mb-3">Agenda tu consulta en el formulario siguiente.</p>
                        <p className="mb-3">En esta reunión revisamos tu situación, te indicamos opciones (acuerdo o juicio), documentos necesarios y próximos pasos.</p>
                        <p>Si decides avanzar, te entregamos un <strong>presupuesto por escrito</strong> según el tipo de asunto y el alcance del servicio (honorarios y gastos asociados).</p>
                    </FAQItem>

                    <FAQItem question="2. ¿Qué documentos debo llevar a la primera consulta?">
                        <p className="mb-4">Idealmente trae lo que tengas. Si no cuentas con documentos, igualmente podemos orientarte y decirte qué reunir.</p>
                        <div className="grid sm:grid-cols-2 gap-4 text-xs">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-bold text-brand-black mb-1 uppercase tracking-wider">Familia</p>
                                <p>Certificados, acuerdos previos, resoluciones o comprobantes de gastos/ingresos.</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-bold text-brand-black mb-1 uppercase tracking-wider">Arriendo</p>
                                <p>Contrato, comprobantes de pago, comunicaciones y estado de deuda.</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-bold text-brand-black mb-1 uppercase tracking-wider">Civil / Contratos</p>
                                <p>Contrato, boletas, correos, WhatsApp y respaldos de pago.</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-bold text-brand-black mb-1 uppercase tracking-wider">Deudas</p>
                                <p>Listado de acreedores, montos, cobranzas y notificaciones existentes.</p>
                            </div>
                        </div>
                    </FAQItem>

                    <FAQItem question="3. ¿Cuánto tiempo puede durar un proceso judicial?">
                        <p className="mb-3 italic">Plazos referenciales (pueden variar según tribunal y tramitación):</p>
                        <ul className="space-y-2 mb-4">
                            <li><span className="text-brand-black font-bold">• Juicios de Arriendo:</span> Suele tomar 4 a 6 meses si procede el procedimiento monitorio. En casos con oposición o incidencias, puede extenderse sobre 8-12 meses.</li>
                            <li><span className="text-brand-black font-bold">• Familia (Alimentos/Cuidado):</span> Las causas con sentencia suelen resolverse en promedio  4-8 meses, sujeto a notificaciones y pruebas.</li>
                            <li><span className="text-brand-black font-bold">• Civil (Juicio Ordinario):</span> El promedio nacional ronda los 14-18 meses para una sentencia definitiva.</li>
                        </ul>
                        <p className="text-xs text-brand-gold font-bold">En la primera consulta te damos una estimación más precisa según tu caso y el tribunal competente.</p>
                    </FAQItem>

                    <FAQItem question="4. ¿Atienden casos en toda la Región de Los Lagos?">
                        <p>Sí. Nuestro foco es Puerto Montt y Puerto Varas, y también tramitamos en otras comunas de la región según el caso.</p>
                    </FAQItem>

                    <FAQItem question="5. ¿Puedo comunicarme directamente con los abogados?">
                        <p>Sí. Priorizamos una comunicación clara y directa.</p>
                        <p className="mt-2">Puedes contactarnos por WhatsApp y teléfono, y mantenemos seguimiento del caso con actualizaciones de cada hito procesal.</p>
                        <p className="mt-2 font-bold text-brand-black text-xs uppercase tracking-widest">Tiempo de respuesta habitual: 24–48 horas hábiles.</p>
                    </FAQItem>

                    <FAQItem question="6. ¿Trabajan con mediación (familia)?">
                        <p>En asuntos de familia, cuando la ley lo exige o cuando es conveniente, te orientamos y acompañamos en el proceso de mediación.</p>
                        <p className="mt-2">Si no se logra un acuerdo, definimos inmediatamente la estrategia judicial para la demanda correspondiente.</p>
                    </FAQItem>

                    <FAQItem question="7. ¿Qué incluye el presupuesto? ¿Hay gastos aparte?">
                        <p>Los honorarios se informan por escrito desde el inicio.</p>
                        <p className="mt-2">Además, pueden existir <strong>gastos de terceros</strong> según el caso (receptor judicial, notaría, copias, publicaciones o certificados). Te detallamos estos costos antes de avanzar.</p>
                    </FAQItem>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-500 mb-8 font-medium">¿Tu duda es más específica? Descríbela y te responderemos a la brevedad.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="#consulta" 
                            className="inline-block px-10 py-4 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold transition shadow-xl uppercase tracking-widest text-sm" 
                            onClick={(e) => { handleScrollClick(e); trackCTAClick('FAQ Form CTA'); }}
                        >
                            Agendar Consulta
                        </a>
                        <a 
                            href="https://wa.me/56977646224" 
                            className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-whatsapp-verde text-whatsapp-verde font-bold rounded-xl hover:bg-whatsapp-verde hover:text-white transition uppercase tracking-widest text-sm"
                            onClick={() => trackCTAClick('FAQ WhatsApp')}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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

export default FAQ;