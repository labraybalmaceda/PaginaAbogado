import React from 'react';
import ServiceShell from './ServiceShell';
import FaqAccordion from './FaqAccordion';
import Seo from './Seo';
import ContactCTA from './ContactCTA';
import RelatedPosts from './RelatedPosts';

const CorporativoPage: React.FC = () => {
    const handleCTA = () => {
        window.history.pushState({}, '', '/#consulta');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const faqs = [
        {
            question: '¿Hasta dónde responde un socio por las deudas de la empresa?',
            answer: 'Hasta el monto de su aporte. En la sociedad por acciones lo dice el artículo 429 del Código de Comercio, e igualmente en la sociedad de responsabilidad limitada. La excepción es cuando el socio o el representante legal firmó un aval o una fianza personal, o cuando hubo administración dolosa o culpable de los negocios sociales. Antes de firmar cualquier documento a nombre de la empresa conviene revisar qué riesgo personal se está asumiendo.'
        },
        {
            question: '¿Puedo demandar a mi socio en el juzgado civil?',
            answer: 'Por regla general no. En la sociedad por acciones, el artículo 441 del Código de Comercio manda que las diferencias entre accionistas, entre estos y la sociedad, o con sus administradores o liquidadores, se resuelvan por arbitraje.'
        },
        {
            question: '¿Necesito un abogado para constituir una sociedad?',
            answer: 'No, la ley no lo exige. El formulario del régimen simplificado de la Ley N° 20.659 lo suscribe el propio constituyente, sin que intervenga un abogado. Quien constituye solo, con un giro simple y sin socios, probablemente no necesite asesoría. Si hay dos o más socios, aportes de distinto tipo, o la expectativa de que ingrese un inversionista, conviene asesoramiento, para definir por escrito la administración, la venta de acciones y la salida de un socio antes de firmar.'
        }
    ];

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://labraybalmaceda.cl/abogado-corporativo-puerto-montt#webpage",
          "url": "https://labraybalmaceda.cl/abogado-corporativo-puerto-montt",
          "inLanguage": "es-CL",
          "isPartOf": { "@id": "https://labraybalmaceda.cl/#website" },
          "about": { "@id": "https://labraybalmaceda.cl/abogado-corporativo-puerto-montt#service" },
          "breadcrumb": { "@id": "https://labraybalmaceda.cl/abogado-corporativo-puerto-montt#breadcrumb" },
          "mainEntity": { "@id": "https://labraybalmaceda.cl/abogado-corporativo-puerto-montt#faq" }
        },
        {
          "@type": "Service",
          "@id": "https://labraybalmaceda.cl/abogado-corporativo-puerto-montt#service",
          "name": "Derecho Corporativo",
          "serviceType": "Derecho Corporativo",
          "description": "Abogados de derecho corporativo en Puerto Varas y Puerto Montt: constitución de sociedades, pactos de accionistas, contratos comerciales y compraventa de empresas.",
          "url": "https://labraybalmaceda.cl/abogado-corporativo-puerto-montt",
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
          "@id": "https://labraybalmaceda.cl/abogado-corporativo-puerto-montt#breadcrumb",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://labraybalmaceda.cl/" },
            { "@type": "ListItem", "position": 2, "name": "Derecho Corporativo", "item": "https://labraybalmaceda.cl/abogado-corporativo-puerto-montt" }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://labraybalmaceda.cl/abogado-corporativo-puerto-montt#faq",
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
                title="Abogado Corporativo en Puerto Varas | Labra & Balmaceda"
                description="Abogados de derecho corporativo en Puerto Varas y Puerto Montt: constitución de sociedades, pactos de accionistas, contratos y conflictos entre socios."
                path="/abogado-corporativo-puerto-montt"
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            
            <ServiceShell title={<>Abogado de <span className="font-bold text-brand-gold">Derecho Corporativo</span> en Puerto Varas y Puerto Montt</>}>

                        <ContactCTA source="Landing Corporativo" />

                        <div className="space-y-6 text-[15px] sm:text-base leading-[1.8] text-gray-700 mt-12">
                            <p>Una estructura societaria inadecuada genera costos significativos en etapas posteriores. La figura legal que se opta para constituir una sociedad, lo que dice el estatuto y lo que quedó sin escribir en el pacto de socios definen qué pasa cuando entra un inversionista, cuando un socio quiere salir o cuando el negocio se paraliza. Asesoramos a empresas y emprendedores de Puerto Varas, Puerto Montt y el resto de la Región de Los Lagos desde la constitución hasta la venta.</p>
                            <p>Para las empresas que necesitan un abogado de forma permanente, y no solo para un trámite, ofrecemos una <a href="/asesoria-legal-empresas-puerto-montt" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/asesoria-legal-empresas-puerto-montt'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="text-brand-gold font-semibold underline underline-offset-2 hover:text-brand-black transition">asesoría legal mensual para empresas</a>.</p>
                        </div>
                        
                        <h2 className="relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mt-16 sm:mt-20 mb-6 pt-6 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold">Materias que cubrimos</h2>
                        <div className="border-t border-gray-200 divide-y divide-gray-200 text-[15px] sm:text-base leading-[1.8] text-gray-700 [&>p]:py-6 [&>p>strong:first-child]:block [&>p>strong:first-child]:font-baskerville [&>p>strong:first-child]:text-brand-black [&>p>strong:first-child]:text-[17px] [&>p>strong:first-child]:mb-2">
                            <p>
                                <strong>Constitución y modificación de sociedades.</strong> Elegir entre una sociedad por acciones, una de responsabilidad limitada, una anónima cerrada o una empresa individual no es un trámite: define quién manda, cómo entra y sale capital y hasta dónde responde cada socio. Constituimos por el régimen general con escritura pública, o por el régimen simplificado de la Ley N° 20.659. También redactamos aumentos de capital, transformaciones, fusiones y disoluciones, y saneamos vicios formales conforme a la Ley N° 19.499.
                            </p>
                            <p>
                                <strong>Pactos de accionistas y conflictos entre socios.</strong> El pacto sirve para el día en que los socios dejan de estar de acuerdo. Redactamos cláusulas de preferencia, de arrastre y acompañamiento, de bloqueo y de salida. Asimismo, ante un conflicto entre los socios, actuamos en el arbitraje que la ley impone para las diferencias entre accionistas, la sociedad y sus administradores, y evaluamos la disolución judicial cuando la empresa quedó paralizada.
                            </p>
                            <p>
                                <strong>Contratos comerciales.</strong> Prestación de servicios, distribución, proveedores, confidencialidad, arriendo de local comercial, términos y condiciones. Redactamos y revisamos el contrato antes de firmarlo, con atención a lo que casi nunca se negocia y siempre se reclama: plazos, causales de término, multas, garantías y tribunal competente.
                            </p>
                            <p>
                                <strong>Compraventa de empresas y due diligence.</strong> Antes de comprar una sociedad hay que saber qué se está comprando: juicios en curso, deudas laborales y previsionales, contratos con cláusulas de cambio de control, bienes con prohibiciones. Hacemos la revisión legal previa y redactamos el contrato de compraventa de acciones o de derechos sociales, con las declaraciones y garantías del vendedor.
                            </p>
                        </div>

                        <h2 className="relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mt-16 sm:mt-20 mb-6 pt-6 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold">Preguntas frecuentes</h2>
                        <FaqAccordion items={faqs} />

                        <RelatedPosts service="corporativo" />

                        <div className="mt-16 sm:mt-20 pt-10 border-t border-gray-200 text-center">
                            <button onClick={handleCTA} className="w-full sm:w-auto px-10 py-4 text-[13px] sm:text-sm font-bold uppercase tracking-[0.2em] rounded-md bg-brand-black text-white hover:bg-brand-gold transition-colors duration-300 mx-auto block">
                                Solicitar consulta
                            </button>
                        </div>
            </ServiceShell>
        </>
    );
};

export default CorporativoPage;
