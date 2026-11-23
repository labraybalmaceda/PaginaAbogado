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
                        Honorarios, plazos y forma de trabajo del estudio.
                    </p>
                </div>

                <div className="space-y-5">
                    <FAQItem question="1. ¿Cuánto cuesta una asesoría legal?">
                        <p className="mb-3">La primera consulta se solicita mediante el formulario de esta página.</p>
                        <p className="mb-3">En ella se revisa el caso y se informan las alternativas disponibles, los documentos necesarios y los pasos siguientes.</p>
                        <p>Si usted decide continuar, se le entrega un <strong>presupuesto por escrito</strong> según la materia y el alcance del encargo, con los honorarios y los gastos asociados.</p>
                    </FAQItem>

                    <FAQItem question="2. ¿Qué documentos se deben llevar a la primera consulta?">
                        <p className="mb-4">Conviene llevar los antecedentes disponibles. Si no se cuenta con ellos, se indica cuáles reunir.</p>
                        <div className="grid sm:grid-cols-2 gap-4 text-xs">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-bold text-brand-black mb-1 uppercase tracking-wider">Corporativo y reestructuración</p>
                                <p>Escrituras y estatutos vigentes, pactos entre socios, poderes y últimos estados financieros.</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-bold text-brand-black mb-1 uppercase tracking-wider">Asesoría mensual y laboral</p>
                                <p>Contratos de trabajo, reglamento interno, citaciones o actas de la Dirección del Trabajo y contratos por revisar.</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-bold text-brand-black mb-1 uppercase tracking-wider">Litigios civiles y comerciales</p>
                                <p>Contratos, facturas, pagarés, cheques, correos y comprobantes de pago.</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-bold text-brand-black mb-1 uppercase tracking-wider">Arriendos e inmobiliario</p>
                                <p>Contratos de arriendo o de construcción, títulos de dominio, certificados y comprobantes de pago.</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg sm:col-span-2">
                                <p className="font-bold text-brand-black mb-1 uppercase tracking-wider">Derecho concursal</p>
                                <p>Nómina de deudas y acreedores, balances, inventario de bienes y juicios o cobranzas en curso.</p>
                            </div>
                        </div>
                    </FAQItem>

                    <FAQItem question="3. ¿Cuánto tiempo puede durar un proceso judicial?">
                        <p className="mb-3 italic">Plazos referenciales, que varían según el tribunal y la tramitación:</p>
                        <ul className="space-y-2 mb-4">
                            <li><span className="text-brand-black font-bold">• Juicios de arriendo:</span> con procedimiento monitorio, por lo general entre 4 y 6 meses. Si hay oposición o incidencias, pueden superar los 8 a 12 meses.</li>
                            <li><span className="text-brand-black font-bold">• Civil (juicio ordinario):</span> el promedio nacional bordea los 14 a 18 meses hasta la sentencia definitiva.</li>
                        </ul>
                        <p className="text-xs text-brand-gold font-bold">En la primera consulta se entrega una estimación más precisa según el caso y el tribunal competente.</p>
                    </FAQItem>

                    <FAQItem question="4. ¿Atienden casos en toda la Región de Los Lagos?">
                        <p>Sí. La atención se concentra en Puerto Montt y Puerto Varas, y también se tramitan causas en otras comunas de la región, según el asunto.</p>
                    </FAQItem>

                    <FAQItem question="5. ¿Es posible comunicarse directamente con los abogados?">
                        <p>Sí. Cada cliente trata directamente con el abogado a cargo, por WhatsApp o por teléfono, y es informado de cada etapa relevante del asunto.</p>
                    </FAQItem>

                    <FAQItem question="6. ¿Qué incluye el presupuesto? ¿Hay gastos aparte?">
                        <p>Los honorarios se informan por escrito antes de iniciar el trabajo.</p>
                        <p className="mt-2">Pueden existir además <strong>gastos de terceros</strong>, según el asunto: receptor judicial, notaría, copias, publicaciones o certificados. Estos costos se detallan antes de avanzar.</p>
                    </FAQItem>
                </div>
            </div>
        </section>
    );
};

export default FAQ;