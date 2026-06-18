import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const CivilPage: React.FC = () => {
    useEffect(() => {
        document.title = "Abogado Civil en Puerto Montt y Puerto Varas | Labra & Balmaceda";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Abogados especialistas en Derecho Civil en Puerto Montt y Puerto Varas. Herencias, posesiones efectivas, precarios, juicios de arrendamiento e indemnizaciones. Consulta online.");
        }
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', 'https://www.labraybalmaceda.cl/abogado-civil-puerto-montt');

        return () => {
            const canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) canonical.setAttribute('href', 'https://www.labraybalmaceda.cl');
        };
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
      "name": "Labra & Balmaceda Abogados - Derecho Civil",
      "description": "Abogados especialistas en Derecho Civil en Puerto Montt y Puerto Varas.",
      "url": "https://www.labraybalmaceda.cl/abogado-civil-puerto-montt",
      "areaServed": ["Puerto Montt", "Puerto Varas", "Región de Los Lagos"],
      "serviceType": "Derecho Civil",
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
                            Resolución de conflictos y litigios en <span className="text-brand-gold block sm:inline mt-1 sm:mt-0">Derecho Civil</span>
                        </h1>
                        
                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 leading-relaxed text-gray-700">
                            <p>
                                Los conflictos civiles rara vez llegan solos: una herencia en disputa, o una deuda que alguien niega haber contraído. En Labra & Balmaceda representamos tanto a demandantes como a demandados.
                            </p>
                        </div>
                        
                        <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 sm:mb-6 text-center sm:text-left">Materias que cubrimos</h2>
                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 text-gray-700 leading-relaxed">
                            <p>
                                <strong>Cobro ejecutivo.</strong> Cuando alguien te debe dinero y el crédito consta en un título ejecutivo, la ley permite cobrar sin pasar por un juicio ordinario. El procedimiento ejecutivo aplica a pagarés, facturas impagas y sentencias firmes. Tramitamos el cobro desde la demanda hasta el embargo y remate de bienes si el deudor no paga voluntariamente.
                            </p>
                            <p>
                                <strong>Herencias y posesiones efectivas.</strong> La posesión efectiva es el trámite que permite a los herederos acreditar su calidad como tales y disponer de los bienes del causante. La tramitamos ante el Registro Civil cuando no hay testamento, y ante los Tribunales cuando lo hay. También asesoramos en particiones de herencia cuando los herederos no logran acuerdo.
                            </p>
                            <p>
                                <strong>Acciones reivindicatorias y precario.</strong> Cuando alguien ocupa un bien raíz sin contrato y sin permiso del dueño, la acción de precario permite recuperarlo.
                            </p>
                            <p>
                                <strong>Indemnizaciones de perjuicios.</strong> Cuando un incumplimiento contractual o un hecho ilícito te causa daño, la ley permite demandar su reparación. Evaluamos contigo si el caso justifica litigar, considerando el monto del daño, la prueba disponible y el tiempo que toma el proceso, antes de recomendar una acción judicial.
                            </p>
                            <p>
                                <strong>Otras gestiones civiles.</strong> También tramitamos cambios de nombre ante los Tribunales Civiles, declaraciones de interdicción y otras gestiones que requieren intervención judicial.
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

export default CivilPage;
