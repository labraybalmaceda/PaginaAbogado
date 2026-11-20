import React, { useId, useState } from 'react';
import FadeInUp from './FadeInUp';

interface FAQItemProps {
    question: string;
    children: React.ReactNode;
}

// La respuesta baja en 0,5 s al abrir (y sube en 0,5 s al cerrar): la fila de la grilla
// pasa de 0fr a 1fr. Con "reducir movimiento" se abre sin animación.
// La respuesta queda siempre en el HTML (Google la lee aunque esté cerrada).
const FAQItem: React.FC<FAQItemProps> = ({ question, children }) => {
    const [open, setOpen] = useState(false);
    const panelId = useId();

    return (
        <FadeInUp>
            <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpen((o) => !o)}
                    className="w-full flex justify-between items-center p-6 text-left cursor-pointer font-bold text-brand-black hover:bg-gray-50 transition font-baskerville uppercase tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-gold/50"
                >
                    <span className="text-sm sm:text-base leading-tight">{question}</span>
                    <span aria-hidden="true" className={`text-xl leading-none transition-transform duration-500 text-brand-gold ml-4 ${open ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div
                    id={panelId}
                    inert={!open}
                    className={`grid transition-[grid-template-rows] duration-500 ease-in-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                    <div className="overflow-hidden">
                        <div className={`px-6 pb-6 text-sm sm:text-base text-gray-600 leading-relaxed font-medium transition-opacity duration-500 motion-reduce:transition-none ${open ? 'opacity-100' : 'opacity-0'}`}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </FadeInUp>
    );
};

const FAQ: React.FC = () => {

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
                        <p className="mb-3">Puede agendar su consulta en el formulario siguiente.</p>
                        <p className="mb-3">En esa reunión revisamos su situación y le indicamos las opciones (acuerdo o juicio), los documentos necesarios y los próximos pasos.</p>
                        <p>Si decide avanzar, le entregamos un <strong>presupuesto por escrito</strong> según el tipo de asunto y el alcance del servicio (honorarios y gastos asociados).</p>
                    </FAQItem>

                    <FAQItem question="2. ¿Qué documentos se deben llevar a la primera consulta?">
                        <p className="mb-4">Idealmente, todo lo que tenga a mano. Si no cuenta con documentos, igualmente podemos orientarlo e indicarle qué reunir.</p>
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
                        <p className="text-xs text-brand-gold font-bold">En la primera consulta le damos una estimación más precisa según su caso y el tribunal competente.</p>
                    </FAQItem>

                    <FAQItem question="4. ¿Atienden casos en toda la Región de Los Lagos?">
                        <p>Sí. Nuestro foco es Puerto Montt y Puerto Varas, y también tramitamos en otras comunas de la región según el caso.</p>
                    </FAQItem>

                    <FAQItem question="5. ¿Es posible comunicarse directamente con los abogados?">
                        <p>Sí. Priorizamos una comunicación clara y directa.</p>
                        <p className="mt-2">Puede contactarnos por WhatsApp y teléfono, y mantenemos seguimiento del caso con actualizaciones de cada hito procesal.</p>
                        <p className="mt-2 font-bold text-brand-black text-xs uppercase tracking-widest">Tiempo de respuesta habitual: 24 horas.</p>
                    </FAQItem>

                    <FAQItem question="6. ¿Trabajan con mediación (familia)?">
                        <p>En asuntos de familia, cuando la ley lo exige o cuando es conveniente, lo orientamos y acompañamos en el proceso de mediación.</p>
                        <p className="mt-2">Si no se logra un acuerdo, definimos inmediatamente la estrategia judicial para la demanda correspondiente.</p>
                    </FAQItem>

                    <FAQItem question="7. ¿Qué incluye el presupuesto? ¿Hay gastos aparte?">
                        <p>Los honorarios se informan por escrito desde el inicio.</p>
                        <p className="mt-2">Además, pueden existir <strong>gastos de terceros</strong> según el caso (receptor judicial, notaría, copias, publicaciones o certificados). Le detallamos estos costos antes de avanzar.</p>
                    </FAQItem>
                </div>
            </div>
        </section>
    );
};

export default FAQ;