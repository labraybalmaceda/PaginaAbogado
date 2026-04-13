import React, { useEffect } from 'react';

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans pb-20">
            {/* Header simple para navegación de regreso */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img 
                            src="https://res.cloudinary.com/dt36zhzde/image/upload/lb_monogram_ev2svh" 
                            alt="Logo LABRA & BALMACEDA" 
                            className="h-8 w-auto"
                        />
                        <span className="font-baskerville font-bold text-brand-black tracking-tight uppercase text-sm sm:text-base">
                            LABRA & BALMACEDA
                        </span>
                    </div>
                    <button onClick={handleBack} className="text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-brand-black transition">
                        Volver al sitio
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-4 max-w-3xl mt-12 sm:mt-20">
                <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-8 font-baskerville not-italic border-b-2 border-brand-gold pb-4">
                    Política de Privacidad
                </h1>
                
                <div className="prose prose-sm sm:prose-base max-w-none text-gray-600 space-y-8 leading-relaxed">
                    <p className="font-medium italic text-brand-black/80">
                        En LABRA & BALMACEDA ABOGADOS (en adelante, los “Abogados”) valoramos la privacidad de las personas que se contactan a través de este sitio web. Esta Política describe cómo recopilamos y tratamos datos personales conforme a la normativa chilena aplicable.
                    </p>

                    <section>
                        <h2 className="text-xl font-bold text-brand-black mb-3 font-baskerville">1) Responsable del tratamiento</h2>
                        <ul className="list-none space-y-1">
                            <li><strong>Responsable:</strong> LABRA & BALMACEDA ABOGADOS</li>
                            <li><strong>Correo de contacto:</strong> <a href="mailto:labrabalmaceda.estudiojuridico@gmail.com" className="text-brand-gold hover:underline">labrabalmaceda.estudiojuridico@gmail.com</a></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-black mb-3 font-baskerville">2) Datos personales que recopilamos</h2>
                        <p className="mb-4">A través del formulario de contacto y/o comunicaciones directas (correo, teléfono o WhatsApp), LABRA & BALMACEDA ABOGADOS puede recopilar los siguientes datos:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Nombre y apellidos</li>
                            <li>Correo electrónico</li>
                            <li>Teléfono/WhatsApp</li>
                            <li>Ciudad/Comuna</li>
                            <li>Descripción del caso y antecedentes que la persona decida proporcionar</li>
                        </ul>
                        <p className="mt-4 bg-gray-50 p-4 border-l-4 border-brand-gold text-xs sm:text-sm">
                            <strong>Recomendación:</strong> Para proteger tu privacidad, evita incluir información innecesaria en el mensaje (por ejemplo, RUT completo, datos sensibles no indispensables o datos de terceros que no sean relevantes para orientar la consulta).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-black mb-3 font-baskerville">3) Finalidad del tratamiento</h2>
                        <p className="mb-3">Los datos se utilizan únicamente para:</p>
                        <ul className="list-alpha pl-5 space-y-1">
                            <li className="list-[lower-alpha]">Responder la consulta enviada por el sitio.</li>
                            <li className="list-[lower-alpha]">Coordinar una reunión (presencial o por videollamada), si corresponde.</li>
                            <li className="list-[lower-alpha]">Solicitar antecedentes mínimos para orientar el caso y, si la persona lo pide, entregar una estimación referencial de honorarios.</li>
                            <li className="list-[lower-alpha]">Mantener comunicaciones relacionadas con la consulta.</li>
                        </ul>
                        <p className="mt-3 font-semibold text-brand-black">LABRA & BALMACEDA ABOGADOS no utiliza los datos para enviar publicidad masiva ni spam.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-black mb-3 font-baskerville">4) Base de licitud / consentimiento</h2>
                        <p>Al enviar el formulario o contactar a LABRA & BALMACEDA ABOGADOS por los medios disponibles, la persona consiente el tratamiento de sus datos para los fines señalados en esta política.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-black mb-3 font-baskerville">5) Proveedor del formulario</h2>
                        <p>El formulario de este sitio es gestionado mediante Netlify, plataforma que permite recibir consultas y reenviarlas al correo de LABRA & BALMACEDA ABOGADOS. Netlify actúa como proveedor tecnológico para el funcionamiento del formulario y trata la información únicamente con ese propósito.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-black mb-3 font-baskerville">6) Destinatarios y comunicaciones</h2>
                        <p>LABRA & BALMACEDA ABOGADOS no vende, arrienda ni comparte datos personales con terceros para fines comerciales. Solo podrían intervenir proveedores tecnológicos necesarios para operar el sitio y las comunicaciones (por ejemplo, hosting y correo), en la medida indispensable para la prestación del servicio.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-black mb-3 font-baskerville">7) Plazo de conservación</h2>
                        <p>Los datos se conservarán por el tiempo necesario para responder y gestionar la consulta y, posteriormente, por un período razonable de respaldo y seguimiento hasta 12 meses, salvo que se inicie una relación profesional o que la ley exija conservarlos por más tiempo. La persona puede solicitar la eliminación de sus datos antes de ese plazo, salvo obligaciones legales.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-black mb-3 font-baskerville">8) Derechos del titular</h2>
                        <p>La persona puede solicitar acceso, rectificación o eliminación/cancelación de sus datos personales contactando a: <a href="mailto:labrabalmaceda.estudiojuridico@gmail.com" className="text-brand-gold hover:underline">labrabalmaceda.estudiojuridico@gmail.com</a>. LABRA & BALMACEDA ABOGADOS responderá dentro de un plazo razonable conforme a la normativa aplicable.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-black mb-3 font-baskerville">9) Seguridad</h2>
                        <p>LABRA & BALMACEDA ABOGADOS adopta medidas razonables para resguardar la información. Sin perjuicio de ello, ningún sistema es completamente infalible; por eso recomendamos no enviar por el formulario información altamente sensible si no es necesaria.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-black mb-3 font-baskerville">10) Cambios a esta política</h2>
                        <p>LABRA & BALMACEDA ABOGADOS puede actualizar esta Política para reflejar mejoras del sitio o cambios normativos. La versión vigente será la publicada en esta misma página.</p>
                    </section>

                    <div className="pt-10 border-t border-gray-100 text-sm font-bold text-gray-400 uppercase tracking-widest">
                        Última actualización: Enero 2026
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <button onClick={handleBack} className="inline-block px-10 py-4 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold transition shadow-lg uppercase tracking-widest text-xs">
                        Volver al Inicio
                    </button>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicy;