import React from 'react';
import ServiceShell from './ServiceShell';
import Seo from './Seo';
import ContactCTA from './ContactCTA';
import RelatedPosts from './RelatedPosts';
import { navigateTo } from './blogUtils';

// Página de servicio: asesoría legal mensual (iguala) para empresas.
// Se diferencia de Derecho Corporativo: esa página trata la MATERIA (sociedades,
// pactos, compraventa de empresas); esta trata la FORMA DE CONTRATAR al estudio
// (convenio mensual que lo incluye todo). Decisiones de Renato: no se muestra precio
// ni lleva FAQ (2026-11-12); el modelo de cobro es por horas trabajadas, con tope
// mensual y facturación mensual contra liquidación detallada (2026-11-13). Desde el
// 2026-11-20 la página ya no muestra la sección «Cobro de la asesoría» (Renato) e
// inicia con un texto dirigido a empresas y sus socios.

const PATH = '/asesoria-legal-empresas-puerto-montt';
const URL = `https://labraybalmaceda.cl${PATH}`;

const AsesoriaEmpresasPage: React.FC = () => {
    const handleCTA = () => {
        window.history.pushState({}, '', '/#consulta');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const goTo = (path: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigateTo(path);
    };

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${URL}#webpage`,
          "url": URL,
          "inLanguage": "es-CL",
          "isPartOf": { "@id": "https://labraybalmaceda.cl/#website" },
          "about": { "@id": `${URL}#service` },
          "breadcrumb": { "@id": `${URL}#breadcrumb` }
        },
        {
          "@type": "Service",
          "@id": `${URL}#service`,
          "name": "Asesoría legal permanente para empresas",
          "alternateName": ["Asesoría legal mensual", "Iguala legal", "Abogado externo para empresas"],
          "serviceType": "Asesoría legal mensual para empresas",
          "description": "Abogado externo para empresas, pymes y personas con negocios con un convenio mensual: consultas permanentes, contratos, negociaciones, riesgos laborales y tributarios, gestión societaria, cobro de créditos y juicios. Honorarios por horas trabajadas, con tope mensual y liquidación detallada cada mes.",
          "url": URL,
          "provider": { "@id": "https://labraybalmaceda.cl/#estudio" },
          "areaServed": [
            { "@type": "City", "name": "Puerto Montt" },
            { "@type": "City", "name": "Puerto Varas" },
            { "@type": "AdministrativeArea", "name": "Región de Los Lagos" },
            { "@type": "Country", "name": "Chile" }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${URL}#breadcrumb`,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://labraybalmaceda.cl/" },
            { "@type": "ListItem", "position": 2, "name": "Asesoría legal para empresas", "item": URL }
          ]
        }
      ]
    };

    const linkClass = 'text-brand-gold font-semibold underline underline-offset-2 hover:text-brand-black transition';

    return (
        <>
            <Seo
                title="Asesoría Legal Mensual para Empresas en Puerto Montt | Labra & Balmaceda"
                description="Abogado externo para empresas y pymes, por horas con tope mensual: contratos, laboral, riesgos tributarios y cobranza. Puerto Montt, Puerto Varas y todo Chile."
                path={PATH}
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

            <ServiceShell title={<><span className="font-bold text-brand-gold">Asesoría Legal Permanente</span> para empresas en Puerto Montt y Puerto Varas</>}>

                        <ContactCTA source="Landing Asesoría Mensual" />

                        <div className="space-y-6 text-[15px] sm:text-base leading-[1.8] text-gray-700 mt-12">
                            <p>La asesoría legal permanente pone a disposición de la empresa un abogado externo integrado a su operación: conoce el negocio, sus contratos y su estructura societaria, y acompaña las decisiones de la administración antes de que se transformen en un riesgo o en un litigio.</p>
                            <p>Asesoramos a empresas y a sus socios en Puerto Montt, Puerto Varas y la Región de Los Lagos en la contratación con clientes y proveedores, la relación con sus trabajadores, las fiscalizaciones y los conflictos que surgen en el curso de su actividad. El convenio cubre todo el trabajo legal de la empresa: el del día a día y también los juicios y las gestiones que van apareciendo.</p>
                        </div>

                        <h2 className="relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mt-16 sm:mt-20 mb-6 pt-6 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold">Qué incluye la asesoría mensual</h2>
                        <div className="border-t border-gray-200 divide-y divide-gray-200 text-[15px] sm:text-base leading-[1.8] text-gray-700 [&>p]:py-6 [&>p>strong:first-child]:block [&>p>strong:first-child]:font-baskerville [&>p>strong:first-child]:text-brand-black [&>p>strong:first-child]:text-[17px] [&>p>strong:first-child]:mb-2">
                            <p>
                                <strong>Consultas legales del día a día.</strong> Las dudas se resuelven con los mismos abogados que ya conocen la empresa, sus contratos y su historia. No hace falta agendar una consulta nueva ni explicar todo desde cero cada vez.
                            </p>
                            <p>
                                <strong>Contratos y documentos.</strong> Contratos con clientes y proveedores, prestación de servicios, arriendo de local comercial, acuerdos de confidencialidad, términos y condiciones, poderes y cartas formales. Los redactamos o los revisamos antes de la firma, con atención a los plazos, las multas, las garantías y las causales de término.
                            </p>
                            <p>
                                <strong>Negociaciones y acuerdos.</strong> Cuando la empresa negocia con un cliente, un proveedor o un socio, revisamos la propuesta de la otra parte, preparamos la respuesta y dejamos redactado lo acordado, incluidos los acuerdos de pago y las transacciones.
                            </p>
                            <p>
                                <strong>Prevención de riesgos laborales.</strong> Contratos de trabajo y sus anexos, reglamento interno, cartas de amonestación, despidos y finiquitos.
                            </p>
                            <p>
                                <strong>Riesgos tributarios.</strong> Revisamos las consecuencias legales de las decisiones con efecto tributario, como los retiros de los socios, los contratos entre empresas relacionadas o la estructura de la sociedad, y las notificaciones del Servicio de Impuestos Internos.
                            </p>
                            <p>
                                <strong>Gestión societaria.</strong> Modificaciones de estatutos, entrada y salida de socios, poderes y actas de juntas de accionistas y de directorio. La constitución de sociedades y los pactos de accionistas: <a href="/abogado-corporativo-puerto-montt" onClick={goTo('/abogado-corporativo-puerto-montt')} className={linkClass}>Derecho Corporativo</a>.
                            </p>
                            <p>
                                <strong>Cobro de créditos de la empresa.</strong> Cartas de cobro y negociación con los clientes que no pagan facturas, pagarés u otras deudas, antes de llegar a juicio. Si con eso no pagan, cobramos en tribunales, por medio de un <a href="/blog/juicio-ejecutivo-cobro-de-deudas" onClick={goTo('/blog/juicio-ejecutivo-cobro-de-deudas')} className={linkClass}>juicio ejecutivo</a>.
                            </p>
                            <p>
                                <strong>Demandas y fiscalizaciones a tiempo.</strong> Cuando llega una demanda, una notificación judicial o una citación de la Inspección del Trabajo o del Servicio de Impuestos Internos, la revisamos apenas llega, para que los plazos no corran sin respuesta.
                            </p>
                        </div>

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

export default AsesoriaEmpresasPage;
