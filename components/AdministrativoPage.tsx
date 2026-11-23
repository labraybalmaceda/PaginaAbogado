import React from 'react';
import ServiceShell from './ServiceShell';
import Seo from './Seo';
import ContactCTA from './ContactCTA';

// Página de servicio: Derecho Administrativo y Regulatorio (creada el 23-11-2026).
// Materias que pidió Renato: denuncias por la Ley de Pesca y Acuicultura, denuncias de la
// Dirección General de Aguas, contencioso administrativo y agentes de mercados regulados.
// Verificado en mentat-local (texto BCN): Código de Aguas (multas de la DGA y autodenuncia)
// y Ley 19.880 (recursos de reposición y jerárquico). La Ley de Pesca y la normativa de la
// CMF NO están en la base local: por eso el texto sobre ellas no afirma plazos, sanciones
// ni procedimientos concretos. No se afirma experiencia ni resultados.
// Decisión de Renato (20-11-2026): no se citan artículos en las páginas de servicio.

const PATH = '/abogado-administrativo-puerto-montt';
const URL = `https://labraybalmaceda.cl${PATH}`;
const TITLE = 'Abogado Administrativo y Regulatorio en Puerto Montt';
const DESCRIPTION = 'Derecho administrativo y regulatorio en Puerto Montt y Puerto Varas: denuncias por la Ley de Pesca y Acuicultura, procedimientos de la Dirección General de Aguas, contencioso administrativo y mercados regulados.';

const AdministrativoPage: React.FC = () => {
    const handleCTA = () => {
        window.history.pushState({}, '', '/#consulta');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

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
          "name": "Derecho Administrativo y Regulatorio",
          "serviceType": "Derecho Administrativo y Regulatorio",
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
            { "@type": "ListItem", "position": 2, "name": "Derecho Administrativo y Regulatorio", "item": URL }
          ]
        }
      ]
    };

    const h2 = 'relative text-xl sm:text-[22px] font-bold font-baskerville text-brand-black mt-16 sm:mt-20 mb-6 pt-6 before:absolute before:top-0 before:left-0 before:w-10 before:h-px before:bg-brand-gold';
    const lista = 'border-t border-gray-200 divide-y divide-gray-200 text-[15px] sm:text-base leading-[1.8] text-gray-700 [&>p]:py-6 [&>p>strong:first-child]:block [&>p>strong:first-child]:font-baskerville [&>p>strong:first-child]:text-brand-black [&>p>strong:first-child]:text-[17px] [&>p>strong:first-child]:mb-2';

    return (
        <>
            <Seo title={TITLE} description={DESCRIPTION} path={PATH} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

            <ServiceShell title={<>Abogado de Derecho <span className="font-bold text-brand-gold">Administrativo y Regulatorio</span> en Puerto Varas y Puerto Montt</>}>
                <ContactCTA source="Landing Administrativo" />

                <div className="space-y-6 text-[15px] sm:text-base leading-[1.8] text-gray-700 mt-12">
                    <p>Representamos a empresas y personas ante los organismos que fiscalizan y sancionan actividades reguladas, y en los procedimientos y reclamaciones judiciales que siguen a sus decisiones. En la Región de Los Lagos, esto alcanza en particular a la acuicultura, la pesca y el uso de las aguas.</p>
                    <p>Un procedimiento administrativo se define en buena parte en sus primeras etapas: el descargo, la prueba que se acompaña y los plazos de impugnación, que suelen ser breves. Por eso conviene que el abogado intervenga desde que se recibe la denuncia o la notificación, y no una vez que la resolución está firme.</p>
                </div>

                <h2 className={h2}>Materias que cubrimos</h2>
                <div className={lista}>
                    <p>
                        <strong>Pesca y acuicultura.</strong> Representamos y defendemos a empresas del sector ante denuncias y procedimientos sancionatorios por infracciones a la Ley General de Pesca y Acuicultura: análisis de los cargos, descargos, prueba y reclamaciones posteriores.
                    </p>
                    <p>
                        <strong>Aguas.</strong> Representamos y defendemos a titulares de derechos de agua, empresas y particulares ante denuncias y procedimientos de la Dirección General de Aguas, por ejemplo por obras ejecutadas sin autorización o por incumplimiento de obligaciones de información, y en la impugnación de las multas y medidas que se apliquen.
                    </p>
                    <p>
                        <strong>Contencioso administrativo.</strong> Impugnamos actos de la Administración ante la propia autoridad y ante los tribunales: recursos administrativos y las reclamaciones judiciales que la ley contempla en cada caso, para dejar sin efecto resoluciones que afecten a la empresa.
                    </p>
                    <p>
                        <strong>Mercados regulados.</strong> Representamos y defendemos a agentes de mercados regulados, como los de valores, seguros y banca, ante los organismos fiscalizadores: requerimientos de información, fiscalizaciones y procedimientos sancionatorios.
                    </p>
                </div>

                <h2 className={h2}>Cómo trabajamos</h2>
                <div className="space-y-6 text-[15px] sm:text-base leading-[1.8] text-gray-700">
                    <p>Se parte por el acto o la notificación recibida, los plazos que están corriendo y la prueba disponible. Con eso se define la defensa: descargos, solicitud de medidas, recursos administrativos y, cuando corresponde, reclamación judicial.</p>
                </div>

                <div className="mt-16 sm:mt-20 pt-10 border-t border-gray-200 text-center">
                    <button onClick={handleCTA} className="w-full sm:w-auto px-10 py-4 text-[13px] sm:text-sm font-bold uppercase tracking-[0.2em] rounded-md bg-brand-black text-white hover:bg-brand-gold transition-colors duration-300 mx-auto block">
                        Solicitar consulta
                    </button>
                </div>
            </ServiceShell>
        </>
    );
};

export default AdministrativoPage;
