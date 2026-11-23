import React from 'react';
import ServiceShell from './ServiceShell';
import FaqAccordion from './FaqAccordion';
import Seo from './Seo';
import ContactCTA from './ContactCTA';
import RelatedPosts from './RelatedPosts';
import { navigateTo } from './blogUtils';

// Página de servicio: Derecho Inmobiliario y Construcción (creada el 20-11-2026).
// Encargos confirmados por Renato: compraventa, estudio de títulos, arriendos
// comerciales y construcción inmobiliaria. Lo que se dice de la ley se verificó en el
// texto literal vigente (mentat-local: codigo-civil.md y lguc.md). Decisión de Renato
// (20-11-2026): no se citan artículos en la página; el enlace a bcn.cl va en la palabra.

const PATH = '/abogado-inmobiliario-puerto-montt';
const URL = `https://labraybalmaceda.cl${PATH}`;
const TITLE = 'Abogado Inmobiliario y de Construcción en Puerto Montt';
const DESCRIPTION = 'Derecho inmobiliario y construcción en Puerto Montt y Puerto Varas: compraventas, promesas, estudio de títulos, arriendos comerciales y contratos de obra.';

const CODIGO_CIVIL = 'https://www.bcn.cl/leychile/navegar?idNorma=172986';
const LGUC = 'https://www.bcn.cl/leychile/navegar?idNorma=13560';

// Artículos de otras áreas que también sirven aquí (se omiten si no están publicados).
const ARTICULOS_EXTRA = [
    'promesa-de-compraventa-incumplimiento',
    'servidumbre-de-transito',
    'arrendatario-no-se-quiere-ir-que-hacer',
    'como-terminar-un-contrato-de-arriendo-en-chile',
];

const InmobiliarioPage: React.FC = () => {
    const handleCTA = () => {
        window.history.pushState({}, '', '/#consulta');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const faqs = [
        {
            question: '¿Cuándo queda perfecta la compraventa de una propiedad?',
            answer: 'Cuando se otorga la escritura pública. La ley no considera perfecta la venta de un bien raíz mientras no se haya otorgado esa escritura, de modo que un acuerdo de palabra o un documento privado sobre la propiedad y el precio no basta.'
        },
        {
            question: '¿Qué requisitos debe cumplir una promesa de compraventa?',
            answer: 'Para que obligue a las partes, la promesa debe constar por escrito, referirse a un contrato que la ley no declare ineficaz, fijar mediante un plazo o una condición la época en que se celebrará la compraventa y especificarla de tal manera que solo falten la tradición de la propiedad o las solemnidades legales.'
        },
        {
            question: '¿Qué plazo hay para reclamar por defectos de construcción?',
            answer: 'La Ley General de Urbanismo y Construcciones fija plazos distintos según el tipo de defecto: las acciones prescriben en diez años si las fallas o defectos afectan la estructura soportante del inmueble, en cinco años si afectan los elementos constructivos o las instalaciones, y en tres años si afectan las terminaciones o el acabado. Los defectos que no sean asimilables a esos casos prescriben en cinco años. Los plazos se cuentan desde la recepción definitiva de la obra por la Dirección de Obras Municipales, salvo el de tres años, que se cuenta desde la inscripción del inmueble a nombre del comprador en el Conservador de Bienes Raíces.'
        }
    ];

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${URL}#webpage`,
          "url": URL,
          "name": TITLE,
          "inLanguage": "es-CL",
          "isPartOf": { "@id": "https://labraybalmaceda.cl/#website" },
          "about": { "@id": `${URL}#service` },
          "breadcrumb": { "@id": `${URL}#breadcrumb` },
          "mainEntity": { "@id": `${URL}#service` }
        },
        {
          "@type": "Service",
          "@id": `${URL}#service`,
          "name": "Derecho Inmobiliario y Construcción",
          "serviceType": "Derecho Inmobiliario y Construcción",
          "description": DESCRIPTION,
          "url": URL,
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
          "@id": `${URL}#breadcrumb`,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://labraybalmaceda.cl/" },
            { "@type": "ListItem", "position": 2, "name": "Derecho Inmobiliario y Construcción", "item": URL }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": `${URL}#faq`,
          "isPartOf": { "@id": `${URL}#webpage` },
          "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
          }))
        }
      ]
    };

    const linkClass = 'text-brand-gold font-semibold underline underline-offset-2 hover:text-brand-black transition';
    const h2 = 'relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mt-16 sm:mt-20 mb-6 pt-6 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold';
    const lista = 'border-t border-gray-200 divide-y divide-gray-200 text-[15px] sm:text-base leading-[1.8] text-gray-700 [&>p]:py-6 [&>p>strong:first-child]:block [&>p>strong:first-child]:font-baskerville [&>p>strong:first-child]:text-brand-black [&>p>strong:first-child]:text-[17px] [&>p>strong:first-child]:mb-2';

    return (
        <>
            <Seo title={TITLE} description={DESCRIPTION} path={PATH} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

            <ServiceShell title={<>Abogado de Derecho <span className="font-bold text-brand-gold">Inmobiliario y Construcción</span> en Puerto Varas y Puerto Montt</>}>
                <ContactCTA source="Landing Inmobiliario" />

                <div className="space-y-6 text-[15px] sm:text-base leading-[1.8] text-gray-700 mt-12">
                    <p>Asesoramos a empresas, inmobiliarias, constructoras y propietarios en las distintas etapas del negocio inmobiliario: la evaluación de un terreno y el estudio de sus títulos, la compraventa, el arriendo comercial y la construcción de un proyecto.</p>
                    <p>Una operación inmobiliaria no se agota en la firma de la escritura. La revisión de los títulos, la negociación de la promesa y la contratación de la obra suponen decisiones con efectos jurídicos y económicos de largo plazo. Por eso conviene que el abogado participe desde la planificación, cuando todavía se pueden ajustar las condiciones, y no recién cuando el contrato ya está redactado. Atendemos operaciones en Puerto Varas, Puerto Montt y el resto de la Región de Los Lagos.</p>
                </div>

                <h2 className={h2}>Materias que cubrimos</h2>
                <div className={lista}>
                    <p>
                        <strong>Compraventa y promesa de compraventa.</strong> Acompañamos la negociación y el cierre de promesas y compraventas de inmuebles hasta la <a href={CODIGO_CIVIL} target="_blank" rel="noopener noreferrer" className={linkClass}>escritura pública</a>: precio y forma de pago, garantías, plazos y consecuencias del incumplimiento. El objetivo es que el contrato sea sólido en lo jurídico y, a la vez, funcione en la práctica para quienes lo firman.
                    </p>
                    <p>
                        <strong>Estudio de títulos.</strong> Antes de comprar, prometer o recibir un inmueble en garantía, revisamos sus títulos y antecedentes para detectar gravámenes, prohibiciones, juicios u otras limitaciones que afecten la operación, y proponemos cómo sanearlos antes de la firma.
                    </p>
                    <p>
                        <strong>Arriendos comerciales.</strong> Contratos de arriendo de locales, oficinas y bodegas, redactados según el uso que tendrá el inmueble: plazo, renta y reajuste, garantías, mejoras y causales de término. Los conflictos de arriendo en general, como el no pago o la restitución del inmueble, se tratan en nuestra área de <a href="/abogado-arriendo-puerto-montt" onClick={(e) => { e.preventDefault(); navigateTo('/abogado-arriendo-puerto-montt'); }} className={linkClass}>Arriendos</a>.
                    </p>
                    <p>
                        <strong>Contratos de construcción.</strong> Asesoramos a mandantes, inmobiliarias y constructoras en la negociación, redacción y ejecución de contratos de obra: precio y forma de pago, plazos, multas, garantías, recepción de la obra y responsabilidad por defectos, con atención a las exigencias operativas de cada proyecto.
                    </p>
                    <p>
                        <strong>Regulación urbanística y uso de suelo.</strong> Asesoramos en materias de <a href={LGUC} target="_blank" rel="noopener noreferrer" className={linkClass}>regulación urbanística</a> y uso de suelo: la lectura del plano regulador aplicable, las condiciones de edificación y los permisos de la Dirección de Obras Municipales que inciden en la viabilidad de un proyecto.
                    </p>
                    <p>
                        <strong>Litigios inmobiliarios y de construcción.</strong> Representamos a demandantes y demandados en conflictos del sector: incumplimiento de promesas, compraventas y contratos de obra, controversias entre promitente comprador y promitente vendedor, reclamos por fallas o defectos de la construcción y problemas en los títulos de dominio.
                    </p>
                </div>

                <h2 className={h2}>Cómo trabajamos</h2>
                <div className="space-y-6 text-[15px] sm:text-base leading-[1.8] text-gray-700">
                    <p>El momento más útil para intervenir es antes de firmar: al evaluar el terreno, al negociar la promesa o al redactar el contrato de construcción. En esa etapa todavía se pueden sanear los títulos, ajustar las condiciones y dejar por escrito qué pasa si la otra parte no cumple.</p>
                    <p>Si el conflicto ya existe, partimos por revisar los documentos firmados, la prueba disponible y los plazos que están corriendo.</p>
                </div>

                <h2 className={h2}>Preguntas frecuentes</h2>
                <FaqAccordion items={faqs} />

                <RelatedPosts service="inmobiliario" extraSlugs={ARTICULOS_EXTRA} />

                <div className="mt-16 sm:mt-20 pt-10 border-t border-gray-200 text-center">
                    <button onClick={handleCTA} className="w-full sm:w-auto px-10 py-4 text-[13px] sm:text-sm font-bold uppercase tracking-[0.2em] rounded-md bg-brand-black text-white hover:bg-brand-gold transition-colors duration-300 mx-auto block">
                        Solicitar consulta
                    </button>
                </div>
            </ServiceShell>
        </>
    );
};

export default InmobiliarioPage;
