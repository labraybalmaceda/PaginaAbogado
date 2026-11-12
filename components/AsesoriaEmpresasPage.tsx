import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import Seo from './Seo';
import ContactCTA from './ContactCTA';
import RelatedPosts from './RelatedPosts';
import { navigateTo } from './blogUtils';

// Página de servicio: asesoría legal mensual (iguala) para empresas.
// Se diferencia de Derecho Corporativo: esa página trata la MATERIA (sociedades,
// pactos, compraventa de empresas); esta trata la FORMA DE CONTRATAR al estudio
// (cuota mensual más gestiones puntuales cobradas aparte). Decisiones de Renato
// (2026-11-12): no se muestra precio ni se mencionan horas o topes, y no lleva FAQ.

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
          "description": "Abogado externo para empresas, pymes y personas con negocios por una cuota mensual: consultas permanentes, contratos, negociaciones, riesgos laborales y tributarios, gestión societaria y cobranza de facturas. Las gestiones puntuales se cotizan aparte.",
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
        <div className="bg-white min-h-screen text-brand-black">
            <Seo
                title="Asesoría Legal Mensual para Empresas en Puerto Montt | Labra & Balmaceda"
                description="Abogado externo para empresas y pymes por una cuota mensual: contratos, temas laborales, riesgos tributarios y cobranza. Puerto Montt, Puerto Varas y todo Chile."
                path={PATH}
            />
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

            <main
                className="py-12 sm:py-24 overflow-hidden mt-6 sm:mt-0 bg-cover bg-center bg-scroll md:bg-fixed"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(17, 17, 17, 0.6), rgba(17, 17, 17, 0.7)), url('/fotohero.webp')` }}
            >
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden border-t-0">
                        <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-gold"></div>

                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 font-baskerville tracking-tight not-italic leading-tight text-center sm:text-left">
                            <span className="font-bold text-brand-gold">Asesoría Legal Permanente</span> para empresas en Puerto Montt y Puerto Varas
                        </h1>

                        <ContactCTA source="Landing Asesoría Mensual" />

                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 leading-relaxed text-gray-700">
                            <p>Una empresa toma decisiones con consecuencias legales casi todas las semanas: firma con un proveedor, contrata o despide a un trabajador, recibe una carta de cobro o una notificación del Servicio de Impuestos Internos. Con una asesoría legal mensual, la empresa cuenta con un abogado externo que conoce el negocio y revisa esas decisiones antes de que se conviertan en un juicio.</p>
                            <p>Trabajamos con pymes, emprendedores y personas con negocios propios de Puerto Montt, Puerto Varas y la Región de Los Lagos. La cuota mensual cubre el trabajo legal del día a día; los juicios y las gestiones de mayor tamaño se acuerdan aparte, cuando aparecen.</p>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 sm:mb-6 text-center sm:text-left">Qué incluye la asesoría mensual</h2>
                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 text-gray-700 leading-relaxed">
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
                                <strong>Cobranza de facturas.</strong> Cartas de cobro y negociación con los clientes que no pagan, antes de llegar a juicio. Si con eso no pagan, cobramos las facturas impagas en tribunales, por medio de un <a href="/blog/juicio-ejecutivo-cobro-de-deudas" onClick={goTo('/blog/juicio-ejecutivo-cobro-de-deudas')} className={linkClass}>juicio ejecutivo</a>.
                            </p>
                            <p>
                                <strong>Demandas y fiscalizaciones a tiempo.</strong> Cuando llega una demanda, una notificación judicial o una citación de la Inspección del Trabajo o del Servicio de Impuestos Internos, la revisamos apenas llega, para que los plazos no corran sin respuesta.
                            </p>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 sm:mb-6 text-center sm:text-left">Gestiones adicionales</h2>
                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 text-gray-700 leading-relaxed">
                            <p>Algunas materias exigen un trabajo propio y se cotizan aparte, antes de empezar: juicios civiles, laborales o de cobranza, procedimientos de <a href="/abogado-insolvencia-puerto-montt" onClick={goTo('/abogado-insolvencia-puerto-montt')} className={linkClass}>reorganización o liquidación</a>, y la compraventa de una empresa con su revisión legal previa. Como el estudio ya conoce la empresa, el trabajo parte con los antecedentes a mano y sin pagar por ponerse al día.</p>
                        </div>

                        <RelatedPosts service="corporativo" />

                        <div className="text-center pt-8 sm:pt-10 border-t border-gray-100">
                            <button onClick={handleCTA} className="w-full sm:w-auto px-6 py-4 sm:px-10 sm:py-5 text-[13px] sm:text-lg font-bold uppercase tracking-widest rounded-xl bg-brand-black text-white hover:bg-brand-gold transition-all duration-300 shadow-xl hover:shadow-2xl mx-auto block">
                                Solicitar consulta
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default AsesoriaEmpresasPage;
