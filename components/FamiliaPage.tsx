import React from 'react';
import ServiceShell from './ServiceShell';
import FaqAccordion from './FaqAccordion';
import Seo from './Seo';
import ContactCTA from './ContactCTA';
import RelatedPosts from './RelatedPosts';

const FamiliaPage: React.FC = () => {
    const handleCTA = () => {
        window.history.pushState({}, '', '/#consulta');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const faqs = [
        {
            question: '¿Qué pasa si el padre o madre no paga la pensión de alimentos?',
            answer: 'La ley tiene herramientas concretas para cobrar. El tribunal puede ordenar que se retenga el dinero directamente desde las cuentas bancarias del deudor y, si ahí no hay fondos, incluso desde sus ahorros en la AFP. A eso se suman medidas de presión como el arresto nocturno, la suspensión de la licencia de conducir y el arraigo nacional, que le impide salir del país. Si una pensión no se está pagando, conviene consultarnos para definir qué medida activar primero.'
        },
        {
            question: '¿Necesito la autorización del otro padre para salir del país con mi hijo?',
            answer: 'Sí. Para que un niño salga de Chile se requiere el permiso del padre o madre que no viaja. Si esa persona no lo da de forma voluntaria, se puede pedir la autorización directamente al tribunal de familia. Este trámite toma tiempo, así que conviene iniciarlo con buena antelación a la fecha del vuelo. Si hay un viaje programado, conviene escribirnos con tiempo para gestionarlo.'
        },
        {
            question: '¿Siempre hay que ir a mediación antes del juicio de alimentos?',
            answer: 'Sí, en materia de alimentos, cuidado personal y relación directa y regular, la mediación previa es obligatoria.'
        },
        {
            question: '¿Cada cuánto puedo pedir un aumento de la pensión de alimentos?',
            answer: 'No hay un plazo fijo de espera. Lo que importa es que las circunstancias hayan cambiado: si el hijo tiene nuevas necesidades, si la situación económica de quien pide el aumento se ha deteriorado, o si la del otro padre ha mejorado, vale la pena revisar el monto. Para evaluar si corresponde pedir un aumento, puede agendar una consulta con nosotros.'
        }
    ];

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://labraybalmaceda.cl/abogado-familia-puerto-montt#webpage",
          "url": "https://labraybalmaceda.cl/abogado-familia-puerto-montt",
          "inLanguage": "es-CL",
          "isPartOf": { "@id": "https://labraybalmaceda.cl/#website" },
          "about": { "@id": "https://labraybalmaceda.cl/abogado-familia-puerto-montt#service" },
          "breadcrumb": { "@id": "https://labraybalmaceda.cl/abogado-familia-puerto-montt#breadcrumb" },
          "mainEntity": { "@id": "https://labraybalmaceda.cl/abogado-familia-puerto-montt#faq" }
        },
        {
          "@type": "Service",
          "@id": "https://labraybalmaceda.cl/abogado-familia-puerto-montt#service",
          "name": "Derecho de Familia",
          "serviceType": "Derecho de Familia",
          "description": "Abogados de familia en Puerto Varas y Puerto Montt.",
          "url": "https://labraybalmaceda.cl/abogado-familia-puerto-montt",
          "provider": { "@id": "https://labraybalmaceda.cl/#estudio" },
          "areaServed": [
            { "@type": "City", "name": "Puerto Varas" },
            { "@type": "City", "name": "Puerto Montt" },
            { "@type": "City", "name": "Llanquihue" },
            { "@type": "AdministrativeArea", "name": "Región de Los Lagos" }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://labraybalmaceda.cl/abogado-familia-puerto-montt#breadcrumb",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://labraybalmaceda.cl/" },
            { "@type": "ListItem", "position": 2, "name": "Derecho de Familia", "item": "https://labraybalmaceda.cl/abogado-familia-puerto-montt" }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://labraybalmaceda.cl/abogado-familia-puerto-montt#faq",
          "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }
      ]
    };

    return (
        <>
            <Seo
                title="Abogado de Familia en Puerto Varas | Labra & Balmaceda"
                description="Abogados de familia en Puerto Varas y Puerto Montt: pensión de alimentos, divorcio, cuidado personal y relación directa y regular."
                path="/abogado-familia-puerto-montt"
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            
            <ServiceShell title={<>Abogado de <span className="font-bold text-brand-gold">Familia</span> en Puerto Varas y Puerto Montt</>}>

                        <ContactCTA source="Landing Familia" />

                        <div className="space-y-6 text-[15px] sm:text-base leading-[1.8] text-gray-700 mt-12">
                            <p>
                                Los juicios de familia son distintos a cualquier otro: las decisiones del tribunal afectan directamente la vida cotidiana de personas que van a seguir relacionándose entre sí, especialmente cuando hay hijos.
                            </p>
                        </div>
                        
                        <h2 className="relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mt-16 sm:mt-20 mb-6 pt-6 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold">Materias que cubrimos</h2>
                        <div className="border-t border-gray-200 divide-y divide-gray-200 text-[15px] sm:text-base leading-[1.8] text-gray-700 [&>p]:py-6 [&>p>strong:first-child]:block [&>p>strong:first-child]:font-baskerville [&>p>strong:first-child]:text-brand-black [&>p>strong:first-child]:text-[17px] [&>p>strong:first-child]:mb-2">
                            <p>
                                <strong>Pensiones de alimentos.</strong> La pensión de alimentos puede demandarse, aumentarse o rebajarse según cambien las necesidades del alimentario o la capacidad económica del alimentante. El procedimiento parte con una mediación previa obligatoria.
                            </p>
                            <p>
                                <strong>Cuidado personal y relación directa y regular.</strong> El cuidado personal determina con quién vive el hijo. La relación directa y regular regula los tiempos del padre o madre que no tiene el cuidado. Ambas materias pueden resolverse por acuerdo homologado ante el tribunal o mediante juicio si no hay consenso. El interés superior del niño es el criterio que el tribunal aplica en todos los casos.
                            </p>
                            <p>
                                <strong>Divorcio.</strong> El divorcio de común acuerdo requiere más de un año de cese de convivencia y un acuerdo completo y suficiente sobre los efectos del matrimonio. El divorcio unilateral exige tres años de cese de convivencia. En ambos casos gestionamos el trámite completo, incluyendo la liquidación de la sociedad conyugal si corresponde.
                            </p>
                            <p>
                                <strong>Compensación económica.</strong> Cuando uno de los cónyuges postergó su desarrollo profesional o laboral para dedicarse al hogar o al cuidado de los hijos, tiene derecho a una compensación económica al momento del divorcio. El tribunal la fija caso a caso, ponderando la duración del matrimonio, la edad y el estado de salud del cónyuge, y sus posibilidades reales de acceder al mercado laboral.
                            </p>
                            <p>
                                <strong>Violencia intrafamiliar y medidas cautelares.</strong> Cuando existe riesgo inminente, el tribunal puede decretar medidas cautelares de protección con urgencia: prohibición de acercamiento, salida del hogar común, entre otras. Asesoramos tanto en la denuncia como en la defensa cuando la imputación es injusta o desproporcionada.
                            </p>
                        </div>

                        <h2 className="relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mt-16 sm:mt-20 mb-6 pt-6 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold">Preguntas frecuentes</h2>
                        <FaqAccordion items={faqs} />

                        <RelatedPosts service="familia" />

                        <div className="mt-16 sm:mt-20 pt-10 border-t border-gray-200 text-center">
                            <button onClick={handleCTA} className="w-full sm:w-auto px-10 py-4 text-[13px] sm:text-sm font-bold uppercase tracking-[0.2em] rounded-md bg-brand-black text-white hover:bg-brand-gold transition-colors duration-300 mx-auto block">
                                Solicitar consulta
                            </button>
                        </div>
            </ServiceShell>
        </>
    );
};

export default FamiliaPage;
