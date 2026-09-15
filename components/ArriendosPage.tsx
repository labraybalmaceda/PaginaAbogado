import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import Seo from './Seo';
import ContactCTA from './ContactCTA';
import RelatedPosts from './RelatedPosts';

const ArriendosPage: React.FC = () => {
    const handleCTA = () => {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
        setTimeout(() => {
            document.getElementById('consulta')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

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
          "breadcrumb": { "@id": "https://labraybalmaceda.cl/abogado-arriendo-puerto-montt#breadcrumb" }
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
        }
      ]
    };

    return (
        <div className="bg-white min-h-screen text-brand-black">
            <Seo
                title="Abogado de Arriendos en Puerto Varas | Labra & Balmaceda"
                description="Abogados de arriendos en Puerto Varas y Puerto Montt: cobro de rentas impagas, juicios de término de contrato y lanzamiento."
                path="/abogado-arriendo-puerto-montt"
            />
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            
            <main className="py-12 sm:py-24 overflow-hidden mt-6 sm:mt-0">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 relative">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold rounded-t-2xl sm:rounded-t-3xl"></div>
                        
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 font-baskerville uppercase tracking-tight not-italic leading-tight text-center sm:text-left">
                            Abogado de arriendos en Puerto Varas y Puerto Montt
                        </h1>

                        <ContactCTA source="Landing Arriendos" />

                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 leading-relaxed text-gray-700">
                            <p>Un arrendatario que deja de pagar o que simplemente no se va es uno de los problemas más frustrantes para un propietario: el inmueble está ocupado, las rentas no llegan, y el proceso judicial tarda. En Labra & Balmaceda llevamos estos casos desde la demanda hasta el lanzamiento.</p>
                            <p>El plazo depende del tipo de conflicto. Un caso de no pago bajo la Ley Devuélveme mi Casa puede resolverse en meses. Un juicio con más complejidad — daños al inmueble, vicios del contrato, ocupación sin título — toma más tiempo. Lo primero es saber exactamente en qué tipo de caso estás.</p>
                        </div>
                        
                        <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 sm:mb-6 text-center sm:text-left">Materias que cubrimos</h2>
                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 text-gray-700 leading-relaxed">
                            <p>
                                <strong>Terminación de contrato y lanzamiento.</strong> La Ley N° 18.101 regula el arrendamiento de inmuebles urbanos y establece un procedimiento especial, más rápido que el juicio ordinario. Demandamos la terminación del contrato por no pago, con cobro de rentas impagas y restitución del inmueble. El tribunal puede dictar una sentencia de lanzamiento que permite recuperar la propiedad con el auxilio de la fuerza pública.
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

                        <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 sm:mb-6 text-center sm:text-left">Preguntas frecuentes</h2>
                        <div className="space-y-6 mb-10 sm:mb-12 text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                            <div>
                                <h3 className="font-bold text-brand-black mb-1 font-baskerville tracking-tight text-base sm:text-lg">¿Es rápido recuperar mi propiedad cuando el arrendatario no paga?</h3>
                                <p>Sí, cuando el problema es solo el no pago de las rentas. La Ley N° 21.461, conocida como «Devuélveme mi casa», modificó la Ley N° 18.101 y estableció un procedimiento monitorio pensado para resolver estos casos con rapidez. Cuando el conflicto es por otras materias, como vicios del contrato o daños al inmueble, el procedimiento es distinto y suele tomar más tiempo. Para saber por qué vía va tu caso, contáctanos</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-brand-black mb-1 font-baskerville tracking-tight text-base sm:text-lg">¿Puedo demandar si el contrato de arriendo es solo verbal?</h3>
                                <p>Sí. La dificultad no es demandar, sino probar los términos que acordaron: el monto de la renta, la fecha de pago y la duración. Las transferencias, los mensajes y los testigos sirven para acreditar la existencia y las condiciones del arriendo.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-brand-black mb-1 font-baskerville tracking-tight text-base sm:text-lg">¿Qué pasa si el arrendatario se niega a irse, aunque haya sentencia?</h3>
                                <p>El tribunal puede ordenar el lanzamiento con auxilio de la fuerza pública (Carabineros). El propietario no debe sacar al arrendatario por su cuenta: cambiar la chapa o cortar los servicios lo expone a acciones civiles y penales. La restitución la ordena el tribunal y la ejecuta la fuerza pública.</p>
                            </div>
                        </div>

                        <RelatedPosts service="arriendos" />

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

export default ArriendosPage;
