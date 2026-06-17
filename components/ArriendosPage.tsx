import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const ArriendosPage: React.FC = () => {
    useEffect(() => {
        document.title = "Abogado de Arriendos en Puerto Montt y Puerto Varas | Labra & Balmaceda";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Abogados especialistas en arriendos en Puerto Montt y Puerto Varas. Cobramos arriendos impagos, tramitamos lanzamientos y defendemos a arrendatarios. Consulta online.");
        }
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', 'https://www.labraybalmaceda.cl/abogado-arriendo-puerto-montt');
    }, []);

    const handleCTA = () => {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
        setTimeout(() => {
            document.getElementById('consulta')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "Labra & Balmaceda Abogados - Derecho de Arriendos",
      "description": "Abogados especialistas en arriendos en Puerto Montt y Puerto Varas.",
      "url": "https://www.labraybalmaceda.cl/abogado-arriendo-puerto-montt",
      "areaServed": ["Puerto Montt", "Puerto Varas", "Región de Los Lagos"],
      "serviceType": "Derecho de Arriendos",
      "telephone": "+56977646224",
      "email": "labraybalmaceda@gmail.com"
    };

    return (
        <div className="bg-white min-h-screen text-brand-black">
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            
            <main className="py-12 sm:py-24 overflow-hidden mt-6 sm:mt-0">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 relative">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold rounded-t-2xl sm:rounded-t-3xl"></div>
                        
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 font-baskerville uppercase tracking-tight not-italic leading-tight text-center sm:text-left">
                            Asesoría en contratos de <span className="text-brand-gold block sm:inline mt-1 sm:mt-0">arrendamiento</span> y juicios de término
                        </h1>
                        
                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 leading-relaxed text-gray-700">
                            <p>
                                Un arrendatario que deja de pagar o que simplemente no se va es uno de los problemas más frustrantes para un propietario: el inmueble está ocupado, las rentas no llegan, y el proceso judicial tarda. En Labra & Balmaceda llevamos estos casos desde la demanda hasta el lanzamiento.
                            </p>
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
