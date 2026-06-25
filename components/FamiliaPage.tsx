import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const FamiliaPage: React.FC = () => {
    useEffect(() => {
        document.title = "Abogado de Familia en Puerto Montt y Puerto Varas | Labra & Balmaceda";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Abogados de familia en Puerto Montt y Puerto Varas. Pensiones de alimentos, divorcio, cuidado personal, relación directa y regular. Atención online. Consulta hoy.");
        }
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', 'https://www.labraybalmaceda.cl/abogado-familia-puerto-montt');

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
      "name": "Labra & Balmaceda Abogados - Derecho de Familia",
      "description": "Abogados de familia en Puerto Montt y Puerto Varas.",
      "url": "https://www.labraybalmaceda.cl/abogado-familia-puerto-montt",
      "areaServed": ["Puerto Montt", "Puerto Varas", "Región de Los Lagos"],
      "serviceType": "Derecho de Familia",
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
                            Defensa y orientación estratégica en <span className="text-brand-gold block sm:inline mt-1 sm:mt-0">Derecho de Familia</span>
                        </h1>
                        
                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 leading-relaxed text-gray-700">
                            <p>
                                Los juicios de familia son distintos a cualquier otro: las decisiones del tribunal afectan directamente la vida cotidiana de personas que van a seguir relacionándose entre sí, especialmente cuando hay hijos.
                            </p>
                        </div>
                        
                        <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 sm:mb-6 text-center sm:text-left">Materias que cubrimos</h2>
                        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-lg mb-10 sm:mb-12 text-gray-700 leading-relaxed">
                            <p>
                                <strong>Pensiones de alimentos.</strong> La pensión de alimentos puede demandarse, aumentarse o rebajarse según cambien las necesidades del alimentario o la capacidad económica del alimentante. El procedimiento parte con una mediación previa obligatoria.
                            </p>
                            <p>
                                <strong>Cuidado personal y relación directa y regular.</strong> El cuidado personal determina con quién vive el hijo. La relación directa y regular regula los tiempos del padre o madre que no tiene el cuidado. Ambas materias pueden resolverse por acuerdo homologado ante el tribunal o mediante juicio si no hay consenso. El interés superior del niño es el criterio que el tribunal aplica en todos los casos.
                            </p>
                            <p>
                                <strong>Divorcio.</strong> El divorcio de común acuerdo requiere al menos un año de cese de convivencia y un acuerdo completo y suficiente sobre los efectos del matrimonio. El divorcio unilateral exige tres años de cese de convivencia. En ambos casos gestionamos el trámite completo, incluyendo la liquidación de la sociedad conyugal si corresponde.
                            </p>
                            <p>
                                <strong>Compensación económica.</strong> Cuando uno de los cónyuges postergó su desarrollo profesional o laboral para dedicarse al hogar o al cuidado de los hijos, tiene derecho a una compensación económica al momento del divorcio. El tribunal la fija caso a caso, ponderando la duración del matrimonio, la edad y el estado de salud del cónyuge, y sus posibilidades reales de acceder al mercado laboral.
                            </p>
                            <p>
                                <strong>Violencia intrafamiliar y medidas cautelares.</strong> Cuando existe riesgo inminente, el tribunal puede decretar medidas cautelares de protección con urgencia: prohibición de acercamiento, salida del hogar común, entre otras. Asesoramos tanto en la denuncia como en la defensa cuando la imputación es injusta o desproporcionada.
                            </p>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold font-baskerville mb-5 sm:mb-6 text-center sm:text-left">Preguntas frecuentes</h2>
                        <div className="space-y-6 mb-10 sm:mb-12 text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                            <div>
                                <h3 className="font-bold text-brand-black mb-1 font-baskerville tracking-tight text-base sm:text-lg">¿Qué pasa si el papá o la mamá no paga la pensión de alimentos?</h3>
                                <p>La ley tiene herramientas concretas para cobrar. El tribunal puede ordenar que se retenga el dinero directamente desde las cuentas bancarias del deudor y, si ahí no hay fondos, incluso desde sus ahorros en la AFP. A eso se suman medidas de presión como el arresto nocturno, la suspensión de la licencia de conducir y el arraigo nacional, que le impide salir del país. Si tienes una pensión que no te están pagando, contáctanos y vemos qué medida conviene activar primero.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-brand-black mb-1 font-baskerville tracking-tight text-base sm:text-lg">¿Necesito la autorización del otro padre para salir del país con mi hijo?</h3>
                                <p>Sí. Para que un niño salga de Chile se requiere el permiso del padre o madre que no viaja. Si esa persona no lo da de forma voluntaria, se puede pedir la autorización directamente al tribunal de familia. Este trámite toma tiempo, así que conviene iniciarlo con buena antelación a la fecha del vuelo. Si tienes un viaje programado, escríbenos con tiempo para gestionarlo.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-brand-black mb-1 font-baskerville tracking-tight text-base sm:text-lg">¿Siempre hay que ir a mediación antes del juicio de alimentos?</h3>
                                <p>Sí, en materia de alimentos, cuidado personal y relación directa y regular, la mediación previa es obligatoria.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-brand-black mb-1 font-baskerville tracking-tight text-base sm:text-lg">¿Cada cuánto puedo pedir un aumento de la pensión de alimentos?</h3>
                                <p>No hay un plazo fijo de espera. Lo que importa es que las circunstancias hayan cambiado: si tu hijo tiene nuevas necesidades, si tu situación económica se ha deteriorado, o si la del otro padre ha mejorado, vale la pena revisar el monto. Para evaluar si en tu caso corresponde pedir un aumento, agenda una consulta con nosotros.</p>
                            </div>
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

export default FamiliaPage;
