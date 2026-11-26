import React from 'react';
import ServiceShell from './ServiceShell';
import FaqAccordion from './FaqAccordion';
import Seo from './Seo';
import ContactCTA from './ContactCTA';
import RelatedPosts from './RelatedPosts';

const LEY_18101 = 'https://www.bcn.cl/leychile/navegar?idNorma=29526';
const LEY_21461 = 'https://www.bcn.cl/leychile/navegar?idNorma=1178004';

const ArriendosPage: React.FC = () => {
    const handleCTA = () => {
        window.history.pushState({}, '', '/#consulta');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const faqs = [
        {
            question: '¿Es rápido recuperar mi propiedad cuando el arrendatario no paga?',
            answer: 'Sí, cuando el problema es solo el no pago de las rentas. La Ley N° 21.461, conocida como «Devuélveme mi casa», modificó la Ley N° 18.101 y estableció un procedimiento monitorio pensado para resolver estos casos con rapidez. Cuando el conflicto es por otras materias, como vicios del contrato o daños al inmueble, el procedimiento es distinto y suele tomar más tiempo. Para saber por qué vía va cada caso, conviene consultarnos.'
        },
        {
            question: '¿Puedo demandar si el contrato de arriendo es solo verbal?',
            answer: 'Sí. La dificultad no es demandar, sino probar los términos que acordaron: el monto de la renta, la fecha de pago y la duración. Las transferencias, los mensajes y los testigos sirven para acreditar la existencia y las condiciones del arriendo.'
        },
        {
            question: '¿Qué pasa si el arrendatario se niega a irse, aunque haya sentencia?',
            answer: 'El tribunal puede ordenar el lanzamiento con auxilio de la fuerza pública (Carabineros). El propietario no debe sacar al arrendatario por su cuenta: cambiar la chapa o cortar los servicios lo expone a acciones civiles y penales. La restitución la ordena el tribunal y la ejecuta la fuerza pública.'
        }
    ];

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://labraybalmaceda.cl/abogado-arriendo-puerto-montt#webpage",
          "url": "https://labraybalmaceda.cl/abogado-arriendo-puerto-montt",
          "inLanguage": "es-CL",
          "isPartOf": { "@id": "https://labraybalmaceda.cl/#website" },
          "about": { "@id": "https://labraybalmaceda.cl/abogado-arriendo-puerto-montt#service" },
          "breadcrumb": { "@id": "https://labraybalmaceda.cl/abogado-arriendo-puerto-montt#breadcrumb" },
          "mainEntity": { "@id": "https://labraybalmaceda.cl/abogado-arriendo-puerto-montt#faq" }
        },
        {
          "@type": "Service",
          "@id": "https://labraybalmaceda.cl/abogado-arriendo-puerto-montt#service",
          "name": "Derecho de Arriendos",
          "serviceType": "Derecho de Arriendos",
          "description": "Abogados de arriendos en Puerto Varas y Puerto Montt.",
          "url": "https://labraybalmaceda.cl/abogado-arriendo-puerto-montt",
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
          "@id": "https://labraybalmaceda.cl/abogado-arriendo-puerto-montt#breadcrumb",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://labraybalmaceda.cl/" },
            { "@type": "ListItem", "position": 2, "name": "Derecho de Arriendos", "item": "https://labraybalmaceda.cl/abogado-arriendo-puerto-montt" }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://labraybalmaceda.cl/abogado-arriendo-puerto-montt#faq",
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

    const linkClass = "underline decoration-brand-gold underline-offset-2 hover:text-brand-gold transition";

    return (
        <>
            <Seo
                title="Abogado de Arriendos en Puerto Varas | Labra & Balmaceda"
                description="Abogados de arriendos en Puerto Varas y Puerto Montt: cobro de rentas impagas, juicios de término de contrato y lanzamiento."
                path="/abogado-arriendo-puerto-montt"
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            
            <ServiceShell title={<>Abogado de <span className="font-bold text-brand-gold">Arriendos</span> en Puerto Varas y Puerto Montt</>}>

                        <ContactCTA source="Landing Arriendos" />

                        <div className="space-y-6 text-[15px] sm:text-base leading-[1.8] text-gray-700 mt-12">
                            <p>Asesoramos a propietarios con varias propiedades, a dueños de locales comerciales y bodegas, y a inmobiliarias. Un arrendatario que deja de pagar o que no restituye el inmueble deja un activo ocupado y sin rentas mientras el proceso judicial avanza. En Labra & Balmaceda llevamos estos casos desde la demanda hasta el lanzamiento.</p>
                            <p>El plazo depende del tipo de conflicto. Un caso de no pago bajo la <a href={LEY_21461} target="_blank" rel="noopener noreferrer" className={linkClass}>Ley Devuélveme mi Casa</a> puede resolverse en meses. Un juicio con más complejidad como daños al inmueble, vicios del contrato, ocupación sin título, toma más tiempo. Lo primero es saber exactamente de qué tipo de caso se trata.</p>
                        </div>
                        
                        <h2 className="relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mt-16 sm:mt-20 mb-6 pt-6 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold">Materias que cubrimos</h2>
                        <div className="border-t border-gray-200 divide-y divide-gray-200 text-[15px] sm:text-base leading-[1.8] text-gray-700 [&>p]:py-6 [&>p>strong:first-child]:block [&>p>strong:first-child]:font-baskerville [&>p>strong:first-child]:text-brand-black [&>p>strong:first-child]:text-[17px] [&>p>strong:first-child]:mb-2">
                            <p>
                                <strong>Terminación de contrato y lanzamiento.</strong> La <a href={LEY_18101} target="_blank" rel="noopener noreferrer" className={linkClass}>Ley N° 18.101</a> regula el arrendamiento de inmuebles urbanos y establece un procedimiento especial, más rápido que el juicio ordinario. Demandamos la terminación del contrato por no pago, con cobro de rentas impagas y restitución del inmueble. El tribunal puede dictar una sentencia de lanzamiento que permite recuperar la propiedad con el auxilio de la fuerza pública.
                            </p>
                            <p>
                                <strong>Demanda de precario.</strong> Cuando alguien ocupa un inmueble sin contrato, ya sea un ex conviviente, un familiar o un tercero, la acción de precario es el mecanismo para recuperarlo.
                            </p>
                            <p>
                                <strong>Cobro de rentas y perjuicios.</strong> Además de la restitución del inmueble, es posible demandar el cobro de las rentas impagas y los daños causados al inmueble durante la ocupación. Evaluamos en cada caso qué pretensiones conviene ejercer y cuáles tienen mayor probabilidad de cobrarse.
                            </p>
                            <p>
                                <strong>Defensa del arrendatario.</strong> También representamos arrendatarios cuando el contrato de arriendo tiene vicios, cuando el arrendador no cumple sus obligaciones de mantenimiento, o cuando el procedimiento de notificación fue defectuoso. Un error en la notificación puede invalidar todo el proceso.
                            </p>
                            <p>
                                <strong>Revisión y redacción de contratos.</strong> Un contrato de arriendo bien redactado previene la mayoría de los conflictos. Revisamos contratos antes de firmar y redactamos contratos a medida, con las cláusulas de garantía, reajuste de renta y causales de término que correspondan a cada situación.
                            </p>
                        </div>

                        <h2 className="relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mt-16 sm:mt-20 mb-6 pt-6 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold">Preguntas frecuentes</h2>
                        <FaqAccordion items={faqs} />

                        <RelatedPosts service="arriendos" />

                        <div className="mt-16 sm:mt-20 pt-10 border-t border-gray-200 text-center">
                            <button onClick={handleCTA} className="w-full sm:w-auto px-10 py-4 text-[13px] sm:text-sm font-bold uppercase tracking-[0.2em] rounded-md bg-brand-black text-white hover:bg-brand-gold transition-colors duration-300 mx-auto block">
                                Solicitar consulta
                            </button>
                        </div>
            </ServiceShell>
        </>
    );
};

export default ArriendosPage;
