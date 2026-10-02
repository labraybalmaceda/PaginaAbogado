import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import Seo from './Seo';
import ContactCTA from './ContactCTA';
import RelatedPosts from './RelatedPosts';

const LEY_20720 = 'https://www.bcn.cl/leychile/navegar?idNorma=1058072';
const LEY_21563 = 'https://www.bcn.cl/leychile/navegar?idNorma=1191960';
const LEY_20416 = 'https://www.bcn.cl/leychile/navegar?idNorma=1010668';

const InsolvenciaPage: React.FC = () => {
    const handleCTA = () => {
        window.history.pushState({}, '', '/#consulta');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const faqs = [
        {
            question: '¿Qué diferencia hay entre reorganizar y liquidar una empresa?',
            answer: 'Reorganizar busca que la empresa siga funcionando: bajo Protección Financiera Concursal, propone a sus acreedores un acuerdo para pagar en nuevas condiciones (artículos 54 a 58 de la Ley N° 20.720). Liquidar es cerrar: un liquidador vende los bienes y paga según las preferencias legales, y al terminar el procedimiento los saldos impagos se extinguen, con ciertas excepciones (artículo 255).'
        },
        {
            question: '¿Qué plazo tiene un acreedor para verificar su crédito en una liquidación?',
            answer: 'Treinta días contados desde la notificación de la Resolución de Liquidación. El crédito se verifica ante el tribunal que conoce del procedimiento, acompañando los títulos que lo justifican y alegando su preferencia (artículo 170). Después de ese plazo se puede verificar en forma extraordinaria, pero esa verificación no suspende los repartos que se hagan mientras tanto (artículo 251).'
        },
        {
            question: '¿Mi empresa puede usar un procedimiento más simple por ser pyme?',
            answer: 'Sí, si califica como micro o pequeña empresa según el artículo segundo de la Ley N° 20.416 (ventas anuales de hasta 25.000 UF). Para ellas, la Ley N° 21.563 creó una reorganización simplificada, con 40 días de Protección Financiera Concursal, y una liquidación simplificada (artículos 273 y 286 de la Ley N° 20.720).'
        },
        {
            question: '¿Los socios o el representante legal responden con su patrimonio personal por las deudas de la empresa?',
            answer: 'Por regla general, no: la sociedad responde con su propio patrimonio y los socios solo hasta el monto de sus aportes. La excepción es si el representante legal firmó avales o fianzas personales, o si hubo administración dolosa o culpable de los negocios sociales. Revisamos tu caso concreto para saber qué riesgo personal existe antes de avanzar.'
        },
        {
            question: '¿Qué pasa con los trabajadores y sus indemnizaciones si la empresa entra en liquidación?',
            answer: 'Los créditos laborales (remuneraciones, indemnizaciones y cotizaciones) tienen preferencia de primera clase y se pagan antes que la mayoría de los demás acreedores, dentro de los límites que fija la ley. Revisamos junto a ti cómo queda esa masa de pago antes de iniciar el proceso.'
        }
    ];

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt#webpage",
          "url": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt",
          "name": "Abogado de Derecho Concursal en Puerto Montt y Puerto Varas",
          "inLanguage": "es-CL",
          "isPartOf": { "@id": "https://labraybalmaceda.cl/#website" },
          "about": { "@id": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt#service" },
          "breadcrumb": { "@id": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt#breadcrumb" },
          "mainEntity": { "@id": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt#service" }
        },
        {
          "@type": "Service",
          "@id": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt#service",
          "name": "Derecho Concursal",
          "serviceType": "Derecho Concursal",
          "description": "Abogados de derecho concursal para empresas en Puerto Varas y Puerto Montt: reorganización y liquidación de empresas, procedimientos simplificados para micro y pequeñas empresas y representación de acreedores.",
          "url": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt",
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
          "@id": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt#breadcrumb",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://labraybalmaceda.cl/" },
            { "@type": "ListItem", "position": 2, "name": "Derecho Concursal", "item": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt" }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt#faq",
          "isPartOf": { "@id": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt#webpage" },
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
        <div className="bg-white min-h-screen text-brand-black">
            <Seo
                title="Abogado de Derecho Concursal en Puerto Montt y Puerto Varas"
                description="Derecho concursal para empresas en Puerto Montt y Puerto Varas: reorganización, liquidación, procedimientos para pymes y representación de acreedores."
                path="/abogado-insolvencia-puerto-montt"
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

                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 font-baskerville uppercase tracking-tight not-italic leading-tight text-center sm:text-left">
                            Abogado de derecho concursal para empresas en <span className="font-bold text-brand-gold">Puerto Varas</span> y <span className="font-bold text-brand-gold">Puerto Montt</span>
                        </h1>

                        <ContactCTA source="Landing Insolvencia" />

                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 leading-relaxed text-gray-700">
                            <p>El derecho concursal regula qué pasa cuando una empresa ya no puede pagar sus deudas. En Chile está en la <a href={LEY_20720} target="_blank" rel="noopener noreferrer" className={linkClass}>Ley N° 20.720</a>. La ley ofrece dos caminos: reorganizar la empresa si el negocio todavía es viable, o liquidarla de forma ordenada si ya no lo es.</p>
                            <p>Asesoramos a empresas deudoras y a empresas acreedoras que necesitan cobrar dentro de un procedimiento concursal. Partimos por un diagnóstico: cuánto debe la empresa y a quién, qué bienes tiene en garantía, si ya hay juicios ejecutivos en curso y si califica como micro o pequeña empresa. De eso depende qué procedimiento le sirve y qué plazos corren.</p>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 sm:mb-6 text-center sm:text-left">Qué hacemos en derecho concursal</h2>
                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 text-gray-700 leading-relaxed">
                            <p>
                                <strong>Reorganización judicial de la empresa.</strong> La empresa pide su reorganización ante el tribunal de su domicilio (artículo 54 de la Ley N° 20.720). Mientras dura, no se puede iniciar en su contra una liquidación, juicios ejecutivos ni restituciones en juicios de arrendamiento, y los que estaban en curso se suspenden, salvo ciertos juicios laborales (artículo 57). Preparamos la propuesta de acuerdo y la negociamos con los acreedores.
                            </p>
                            <p>
                                <strong>Acuerdo extrajudicial y negociación directa.</strong> No todos los problemas de deuda terminan en tribunales. Muchas veces basta una propuesta seria a bancos y proveedores, que dejamos por escrito. Si la empresa ya cuenta con el apoyo de sus principales acreedores, puede firmar un Acuerdo de Reorganización y someterlo después a aprobación judicial (artículo 102).
                            </p>
                            <p>
                                <strong>Liquidación voluntaria de la empresa.</strong> Cuando seguir operando ya no es posible, la empresa puede pedir su propia liquidación ante el juzgado de letras competente, acompañando la lista de sus bienes y los demás antecedentes que exige la ley. Un liquidador vende los bienes y paga a los acreedores según el orden de preferencia legal. Cuando la resolución de término queda firme, los saldos que no alcanzaron a pagarse se extinguen por el solo ministerio de la ley, con ciertas excepciones (artículo 255). Representamos a la empresa ante el tribunal y ante las gestiones en la Superintendencia de Insolvencia y Reemprendimiento.
                            </p>
                            <p>
                                <strong>Procedimientos simplificados para micro y pequeñas empresas.</strong> La Ley N° 21.563 creó procedimientos más cortos para las empresas que califican como micro o pequeña según el artículo segundo de la <a href={LEY_20416} target="_blank" rel="noopener noreferrer" className={linkClass}>Ley N° 20.416</a> (ventas anuales de hasta 25.000 UF).
                            </p>
                            <p>
                                <strong>Representación de acreedores.</strong> Si un cliente de tu empresa entró en un procedimiento concursal, los plazos corren desde el primer día. En una liquidación, los acreedores tienen 30 días desde la notificación de la Resolución de Liquidación para verificar sus créditos y alegar su preferencia (artículo 170). Verificamos el crédito, lo defendemos frente a objeciones e impugnaciones y representamos a tu empresa en las juntas de acreedores. Cualquier acreedor puede, además, pedir la liquidación forzosa de una empresa que dejó de pagarle una obligación propia de su giro que consta en un título ejecutivo vencido (artículo 117). Si el deudor no está en un procedimiento concursal, el camino habitual es el <a href="/blog/juicio-ejecutivo-cobro-de-deudas" className={linkClass}>juicio ejecutivo</a>.
                            </p>
                            <p>
                                <strong>Defensa en juicios ejecutivos, embargos y remates.</strong> Cuando ya hay una demanda ejecutiva en curso contra la empresa, con embargo de bienes o de cuentas bancarias, tramitamos la oposición al título ejecutivo dentro del plazo legal, tercerías de dominio o posesión sobre bienes embargados que no son de la empresa, y la sustitución del embargo cuando es posible. También evaluamos si conviene iniciar un procedimiento concursal que suspenda las ejecuciones en curso.
                            </p>
                            <p>
                                <strong>Personas con deudas.</strong> Aunque trabajamos sobre todo con empresas, también asesoramos a personas naturales, las cuales pueden solicitar la renegociación de sus deudas ante la Superintendencia de Insolvencia y Reemprendimiento, siempre que no haya sido notificado de una demanda de liquidación (artículos 260 y 261). Si renegociar no es posible, existe la liquidación simplificada (artículo 273).
                            </p>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 sm:mb-6 text-center sm:text-left">Preguntas frecuentes</h2>
                        <div className="space-y-6 mb-10 sm:mb-12 text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                            {faqs.map((faq, index) => (
                                <div key={index}>
                                    <h3 className="font-bold text-brand-black mb-1 font-baskerville tracking-tight text-base sm:text-lg">{faq.question}</h3>
                                    <p>{faq.answer}</p>
                                </div>
                            ))}
                        </div>

                        <RelatedPosts service="insolvencia" />

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

export default InsolvenciaPage;
