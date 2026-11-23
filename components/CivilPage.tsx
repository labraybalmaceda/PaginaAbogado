import React from 'react';
import ServiceShell from './ServiceShell';
import FaqAccordion from './FaqAccordion';
import Seo from './Seo';
import ContactCTA from './ContactCTA';
import RelatedPosts from './RelatedPosts';

const CivilPage: React.FC = () => {
    const handleCTA = () => {
        window.history.pushState({}, '', '/#consulta');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const faqs = [
        {
            question: '¿Conviene asesorarse antes de firmar un contrato?',
            answer: 'Sí. Revisamos y redactamos contratos para que digan lo que las partes realmente necesitan. Eso incluye dejar claras las formas de término, incorporar las cláusulas esenciales y asegurarnos de que el contrato esté dentro de lo que permite la ley. Un contrato bien hecho evita la mayoría de los problemas, por eso siempre es mejor asesorarse antes de firmar.'
        },
        {
            question: '¿Puedo demandar si no tengo contrato escrito?',
            answer: 'Sí. La falta de contrato escrito no impide demandar, pero sí afecta la prueba disponible. En ese caso hay que acreditar la existencia de la obligación con otros medios: correos electrónicos, mensajes, testigos o transferencias bancarias.'
        },
        {
            question: '¿Qué necesito para iniciar un cobro ejecutivo?',
            answer: 'Se necesita un título ejecutivo: un pagaré, una factura con mérito ejecutivo o una sentencia firme. Con el documento a la vista, evaluamos si el caso es viable y cómo proceder.'
        },
        {
            question: '¿Qué pasa si los herederos no se ponen de acuerdo para dividir una herencia?',
            answer: 'La ley no obliga a nadie a quedarse para siempre como dueño compartido de una herencia. Cualquier heredero puede pedir que se divida, y cuando no hay acuerdo, esa división la resuelve un juez partidor. Lo mismo ocurre tras un divorcio, cuando los ex cónyuges no logran ponerse de acuerdo sobre cómo repartir los bienes y quién se queda con qué. Ambos casos los tramitamos.'
        }
    ];

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://labraybalmaceda.cl/abogado-civil-puerto-montt#webpage",
          "url": "https://labraybalmaceda.cl/abogado-civil-puerto-montt",
          "inLanguage": "es-CL",
          "isPartOf": { "@id": "https://labraybalmaceda.cl/#website" },
          "about": { "@id": "https://labraybalmaceda.cl/abogado-civil-puerto-montt#service" },
          "breadcrumb": { "@id": "https://labraybalmaceda.cl/abogado-civil-puerto-montt#breadcrumb" },
          "mainEntity": { "@id": "https://labraybalmaceda.cl/abogado-civil-puerto-montt#faq" }
        },
        {
          "@type": "Service",
          "@id": "https://labraybalmaceda.cl/abogado-civil-puerto-montt#service",
          "name": "Litigios Civiles y Comerciales",
          "serviceType": "Derecho Civil",
          "description": "Abogados civiles en Puerto Varas y Puerto Montt.",
          "url": "https://labraybalmaceda.cl/abogado-civil-puerto-montt",
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
          "@id": "https://labraybalmaceda.cl/abogado-civil-puerto-montt#breadcrumb",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://labraybalmaceda.cl/" },
            { "@type": "ListItem", "position": 2, "name": "Derecho Civil", "item": "https://labraybalmaceda.cl/abogado-civil-puerto-montt" }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://labraybalmaceda.cl/abogado-civil-puerto-montt#faq",
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
                title="Abogado Civil en Puerto Varas | Labra & Balmaceda"
                description="Abogados civiles en Puerto Varas y Puerto Montt: herencias, posesión efectiva, juicio de partición, precarios e indemnización de perjuicios."
                path="/abogado-civil-puerto-montt"
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            
            <ServiceShell title={<>Abogado de <span className="font-bold text-brand-gold">Litigios Civiles y Comerciales</span> en Puerto Varas y Puerto Montt</>}>

                        <ContactCTA source="Landing Civil" />

                        <div className="space-y-6 text-[15px] sm:text-base leading-[1.8] text-gray-700 mt-12">
                            <p>Representamos a empresas y personas en litigios civiles, comerciales y constitucionales, y en arbitrajes domésticos e internacionales: cobro de créditos y juicios ejecutivos, responsabilidad contractual y extracontractual, indemnización de perjuicios, herencias y particiones, y recuperación de inmuebles ocupados sin título. Actuamos tanto por la parte demandante como por la demandada.</p>
                            <p>Cada litigio parte por una evaluación de su conveniencia: la prueba disponible, el tiempo que puede tomar el proceso y la existencia de bienes que permitan hacer efectiva la sentencia. Una sentencia favorable que no se puede cobrar no resuelve el problema del cliente.</p>
                        </div>
                        
                        <h2 className="relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mt-16 sm:mt-20 mb-6 pt-6 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold">Materias que cubrimos</h2>
                        <div className="border-t border-gray-200 divide-y divide-gray-200 text-[15px] sm:text-base leading-[1.8] text-gray-700 [&>p]:py-6 [&>p>strong:first-child]:block [&>p>strong:first-child]:font-baskerville [&>p>strong:first-child]:text-brand-black [&>p>strong:first-child]:text-[17px] [&>p>strong:first-child]:mb-2">
                            <p>
                                <strong>Cobro ejecutivo.</strong> Cuando alguien adeuda dinero y el crédito consta en un título ejecutivo, la ley permite cobrar sin pasar por un juicio ordinario. El procedimiento ejecutivo aplica a pagarés, facturas impagas y sentencias firmes. Tramitamos el cobro desde la demanda hasta el embargo y remate de bienes si el deudor no paga voluntariamente.
                            </p>
                            <p>
                                <strong>Herencias y posesiones efectivas.</strong> La posesión efectiva es el trámite que permite a los herederos acreditar su calidad como tales y disponer de los bienes del causante. La tramitamos ante el Registro Civil cuando no hay testamento, y ante los Tribunales cuando lo hay. También asesoramos en particiones de herencia cuando los herederos no logran acuerdo.
                            </p>
                            <p>
                                <strong>Acciones reivindicatorias y precario.</strong> Cuando alguien ocupa un bien raíz sin contrato y sin permiso del dueño, la acción de precario permite recuperarlo.
                            </p>
                            <p>
                                <strong>Indemnizaciones de perjuicios.</strong> Cuando un incumplimiento contractual o un hecho ilícito causa un daño, la ley permite demandar su reparación. Evaluamos con el cliente si el caso justifica litigar, considerando el monto del daño, la prueba disponible y el tiempo que toma el proceso, antes de recomendar una acción judicial.
                            </p>
                            <p>
                                <strong>Arbitrajes.</strong> Representamos a empresas y personas en arbitrajes domésticos e internacionales, desde la designación del árbitro y el procedimiento hasta el cumplimiento del laudo.
                            </p>
                            <p>
                                <strong>Acciones constitucionales.</strong> Cuando un acto arbitrario o ilegal afecta derechos que la Constitución garantiza, corresponde recurrir a las acciones constitucionales, como el recurso de protección. Preparamos y tramitamos esas acciones ante las Cortes.
                            </p>
                        </div>

                        <h2 className="relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mt-16 sm:mt-20 mb-6 pt-6 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold">Preguntas frecuentes</h2>
                        <FaqAccordion items={faqs} />

                        <RelatedPosts service="civil" />

                        <div className="mt-16 sm:mt-20 pt-10 border-t border-gray-200 text-center">
                            <button onClick={handleCTA} className="w-full sm:w-auto px-10 py-4 text-[13px] sm:text-sm font-bold uppercase tracking-[0.2em] rounded-md bg-brand-black text-white hover:bg-brand-gold transition-colors duration-300 mx-auto block">
                                Solicitar consulta
                            </button>
                        </div>
            </ServiceShell>
        </>
    );
};

export default CivilPage;
