import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
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
            answer: 'No, la ley no lo exige. El formulario del régimen simplificado de la Ley N° 20.659 lo suscribe el propio constituyente, sin que intervenga un abogado. Si vas a constituir solo, con un giro simple y sin socios, probablemente no necesites asesoría. Si hay dos o más socios, aportes de distinto tipo, o la expectativa de que ingrese un inversionista, conviene asesoramiento, para definir por escrito la administración, la venta de acciones y la salida de un socio antes de firmar.'
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
        <div className="bg-white min-h-screen text-brand-black">
            <Seo
                title="Abogado Corporativo en Puerto Varas | Labra & Balmaceda"
                description="Abogados de derecho corporativo en Puerto Varas y Puerto Montt: constitución de sociedades, pactos de accionistas, contratos y conflictos entre socios."
                path="/abogado-corporativo-puerto-montt"
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
                            Abogado de derecho corporativo en <span className="font-bold text-brand-gold">Puerto Varas</span> y <span className="font-bold text-brand-gold">Puerto Montt</span>
                        </h1>

                        <ContactCTA source="Landing Corporativo" />

                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 leading-relaxed text-gray-700">
                            <p>Una estructura societaria inadecuada genera costos significativos en etapas posteriores. La figura legal que se opta para constituir una sociedad, lo que dice el estatuto y lo que quedó sin escribir en el pacto de socios definen qué pasa cuando entra un inversionista, cuando un socio quiere salir o cuando el negocio se paraliza. Asesoramos a empresas y emprendedores de Puerto Varas, Puerto Montt y el resto de la Región de Los Lagos desde la constitución hasta la venta.</p>
                            <p></p>
                        </div>
                        
                        <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 sm:mb-6 text-center sm:text-left">Materias que cubrimos</h2>
                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 text-gray-700 leading-relaxed">
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

                        <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 sm:mb-6 text-center sm:text-left">Preguntas frecuentes</h2>
                        <div className="space-y-6 mb-10 sm:mb-12 text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                            {faqs.map((faq, index) => (
                                <div key={index}>
                                    <h3 className="font-bold text-brand-black mb-1 font-baskerville tracking-tight text-base sm:text-lg">{faq.question}</h3>
                                    <p>{faq.answer}</p>
                                </div>
                            ))}
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

export default CorporativoPage;
