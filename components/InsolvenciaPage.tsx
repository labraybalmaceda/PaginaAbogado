import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const InsolvenciaPage: React.FC = () => {
    useEffect(() => {
        document.title = "Ley de Insolvencia y Defensa de Deudores en Puerto Montt | Labra & Balmaceda";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Abogados especialistas en insolvencia y deudas en Puerto Montt. Renegociación, liquidación voluntaria y defensa ante cobranzas judiciales. Consulta online.");
        }
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
      "name": "Labra & Balmaceda Abogados - Derecho de Insolvencia",
      "description": "Abogados especialistas en insolvencia y deudas en Puerto Montt.",
      "url": "https://www.labraybalmaceda.cl/abogado-insolvencia-puerto-montt",
      "areaServed": ["Puerto Montt", "Puerto Varas", "Región de Los Lagos"],
      "serviceType": "Derecho de Insolvencia",
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
                            Protección legal frente a cobranzas e <span className="text-brand-gold block sm:inline mt-1 sm:mt-0">insolvencia</span>
                        </h1>
                        
                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 leading-relaxed text-gray-700">
                            <p>
                                Cuando las deudas superan la capacidad de pago, la Ley N° 20.720 de Insolvencia y Reemprendimiento ofrece procedimientos concretos para personas y empresas. No para evadir las deudas, sino para ordenar la situación y, cuando es posible, continuar funcionando.
                            </p>
                        </div>
                        
                        <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 sm:mb-6 text-center sm:text-left">Materias que cubrimos</h2>
                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 text-gray-700 leading-relaxed">
                            <p>
                                <strong>Renegociación de deudas (Procedimiento Concursal de Renegociación).</strong> El Procedimiento Concursal de Renegociación de la Persona Deudora permite a las personas naturales renegociar sus deudas ante la Superintendencia de Insolvencia y Reemprendimiento. Acompañamos al cliente en la preparación de la propuesta y durante la negociación con sus acreedores.
                            </p>
                            <p>
                                <strong>Liquidación voluntaria.</strong> La liquidación voluntaria permite al deudor, poner en orden su situación patrimonial cuando el pago de todas las deudas es imposible. Un liquidador designado administra y realiza los bienes, paga a los acreedores en el orden de preferencia que establece la ley, y el saldo insoluto se extingue.
                            </p>
                            <p>
                                <strong>Defensa ante cobranzas judiciales.</strong> Cuando ya hay demandas ejecutivas, embargos o retención de remuneraciones en curso, actuar rápido importa. Evaluamos si procede oponer excepciones al título ejecutivo, interponer tercerías de dominio sobre bienes embargados, o iniciar un procedimiento concursal que suspenda las ejecuciones individuales.
                            </p>
                            <p>
                                <strong>Negociación extrajudicial.</strong> No todos los problemas de deuda requieren ir al tribunal. En muchos casos, una negociación directa con el acreedor, con una propuesta seria y bien fundamentada, permite llegar a un acuerdo de pago. Llevamos esa negociación y dejamos el acuerdo por escrito.
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

export default InsolvenciaPage;
