import React, { useEffect } from 'react';

const Thanks: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', 'conversion', {
                'send_to': 'AW-18229137722/gRs4CNjg3sUcELqiqvRD',
                'value': 1.0,
                'currency': 'CLP'
            });
        }
    }, []);

    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans pb-20 flex flex-col">
            {/* Header simple similar a Privacidad */}
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

            <main className="flex-grow container mx-auto px-4 max-w-2xl mt-20 sm:mt-32 text-center">
                <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-100">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-6 font-baskerville not-italic">
                    ¡Consulta recibida con éxito!
                </h1>
                
                <div className="space-y-6 text-gray-600 leading-relaxed text-base sm:text-lg">
                    <p className="font-medium">
                        Un abogado de LABRA & BALMACEDA ABOGADOS revisará sus antecedentes y le contactará en el plazo indicado (24-48 horas hábiles).
                    </p>
                    <p className="text-sm text-gray-400 italic">
                        Hemos recibido su información de manera segura y confidencial.
                    </p>
                </div>

                <div className="mt-12">
                    <button onClick={handleBack} className="inline-block px-12 py-4 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold transition shadow-xl uppercase tracking-widest text-sm transform hover:-translate-y-1">
                        Volver al inicio
                    </button>
                </div>
            </main>

            <footer className="py-10 text-center border-t border-gray-50">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    LABRA & BALMACEDA ABOGADOS · 2026
                </p>
            </footer>
        </div>
    );
};

export default Thanks;