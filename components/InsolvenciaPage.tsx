import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import Seo from './Seo';
import ContactCTA from './ContactCTA';
import RelatedPosts from './RelatedPosts';

const InsolvenciaPage: React.FC = () => {
    const handleCTA = () => {
        window.history.pushState({}, '', '/#consulta');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt#webpage",
          "url": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt",
          "inLanguage": "es-CL",
          "isPartOf": { "@id": "https://labraybalmaceda.cl/#website" },
          "about": { "@id": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt#service" },
          "breadcrumb": { "@id": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt#breadcrumb" }
        },
        {
          "@type": "Service",
          "@id": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt#service",
          "name": "Liquidación de Empresas",
          "serviceType": "Liquidación de Empresas",
          "description": "Abogados de liquidación de empresas en Puerto Varas y Puerto Montt.",
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
            { "@type": "ListItem", "position": 2, "name": "Insolvencia y Deudas", "item": "https://labraybalmaceda.cl/abogado-insolvencia-puerto-montt" }
          ]
        }
      ]
    };

    return (
        <div className="bg-white min-h-screen text-brand-black">
            <Seo
                title="Abogado de Liquidación de Empresas en Puerto Varas | Labra & Balmaceda"
                description="Abogados de liquidación de empresas en Puerto Varas y Puerto Montt: reorganización judicial, liquidación voluntaria y defensa ante cobranzas."
                path="/abogado-insolvencia-puerto-montt"
            />
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            
            <main 
                className="py-12 sm:py-24 overflow-hidden mt-6 sm:mt-0 bg-cover bg-center bg-scroll md:bg-fixed"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(17, 17, 17, 0.6), rgba(17, 17, 17, 0.7)), url('/fotohero.jpg')` }}
            >
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden border-t-0">
                        <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-gold"></div>
                        
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 font-baskerville uppercase tracking-tight not-italic leading-tight text-center sm:text-left">
                            Abogado de liquidación de empresas en <span className="font-bold text-brand-gold">Puerto Varas</span> y <span className="font-bold text-brand-gold">Puerto Montt</span>
                        </h1>

                        <ContactCTA source="Landing Insolvencia" />

                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 leading-relaxed text-gray-700">
                            <p>Cuando una empresa no puede seguir pagando sus deudas, la Ley N° 20.720 de Insolvencia y Reemprendimiento ofrece procedimientos concretos para ordenar su situación patrimonial. No se trata de evadir las deudas, sino de resolver el pasivo de forma ordenada y conforme a derecho, ya sea liquidando el negocio o reorganizándolo si todavía es viable.</p>
                            <p>Lo primero es evaluar qué alternativa conviene más: reorganizar la empresa para que siga funcionando, liquidarla de forma ordenada, o defender la cobranza judicial que ya está en curso. Cada empresa es distinta, y la decisión correcta depende de su nivel de endeudamiento, la relación con sus acreedores, y los bienes de la sociedad que están en riesgo.</p>
                        </div>
                        
                        <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 sm:mb-6 text-center sm:text-left">Materias que cubrimos</h2>
                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 text-gray-700 leading-relaxed">
                            <p>
                                <strong>Reorganización judicial de la empresa (Procedimiento Concursal de Reorganización).</strong> Cuando la empresa aún es viable, el Procedimiento Concursal de Reorganización permite reprogramar el pasivo con los acreedores bajo la protección de un Veedor, mientras se suspenden las ejecuciones en su contra. Preparamos la propuesta y llevamos la negociación con los acreedores para que la empresa siga operando.
                            </p>
                            <p>
                                <strong>Liquidación de la empresa deudora.</strong> Cuando la empresa ya no puede pagar sus deudas y seguir operando no es una opción, la liquidación voluntaria permite cerrar el negocio de forma ordenada y conforme a la ley. Un liquidador designado administra y realiza los bienes de la sociedad, paga a los acreedores según el orden de preferencia legal, y una vez terminado el proceso los saldos insolutos se extinguen por el solo ministerio de la ley. Representamos a la empresa durante todo el proceso, ante el tribunal y la Superintendencia de Insolvencia y Reemprendimiento.
                            </p>
                            <p>
                                <strong>Defensa en juicios ejecutivos, embargos y remates.</strong> Cuando ya hay una demanda ejecutiva en curso contra la empresa, con embargo de bienes o de cuentas bancarias, tramitamos la oposición al título ejecutivo dentro del plazo legal, tercerías de dominio o posesión sobre bienes embargados que no son de la empresa, y la sustitución del embargo cuando es posible. Si ya hay fecha de remate, evaluamos si procede pedir su nulidad por vicios de forma (falta de tasación, de avisos o de citación a acreedores preferentes) u oponernos a las bases de la subasta. También evaluamos si conviene iniciar un procedimiento concursal que suspenda las ejecuciones en curso.
                            </p>
                            <p>
                                <strong>Negociación extrajudicial con proveedores y acreedores.</strong> No todos los problemas de deuda de una empresa requieren ir al tribunal. En muchos casos, una negociación directa con bancos, proveedores u otros acreedores, con una propuesta seria y bien fundamentada, permite llegar a un acuerdo de pago. Llevamos esa negociación y dejamos el acuerdo por escrito.
                            </p>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 sm:mb-6 text-center sm:text-left">Preguntas frecuentes</h2>
                        <div className="space-y-6 mb-10 sm:mb-12 text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                            <div>
                                <h3 className="font-bold text-brand-black mb-1 font-baskerville tracking-tight text-base sm:text-lg">¿Los socios o el representante legal responden con su patrimonio personal por las deudas de la empresa?</h3>
                                <p>Por regla general, no: la sociedad responde con su propio patrimonio y los socios solo hasta el monto de sus aportes. La excepción es si el representante legal firmó avales o fianzas personales, o si hubo administración dolosa o culpable de los negocios sociales. Revisamos tu caso concreto para saber qué riesgo personal existe antes de avanzar.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-black mb-1 font-baskerville tracking-tight text-base sm:text-lg">¿Qué pasa con los trabajadores y sus indemnizaciones si la empresa entra en liquidación?</h3>
                                <p>Los créditos laborales (remuneraciones, indemnizaciones y cotizaciones) tienen preferencia de primera clase y se pagan antes que la mayoría de los demás acreedores, dentro de los límites que fija la ley. Revisamos junto a ti cómo queda esa masa de pago antes de iniciar el proceso, para que no haya sorpresas.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-brand-black mb-1 font-baskerville tracking-tight text-base sm:text-lg">¿Desde cuándo se frenan los embargos si inicio un procedimiento concursal?</h3>
                                <p>Los embargos y cobros no se detienen por el solo hecho de presentar los antecedentes. La suspensión opera una vez que el procedimiento es formalmente admitido o declarado, según el caso. Para saber si tu situación califica y desde cuándo quedarías protegido, contáctanos.</p>
                            </div>
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
