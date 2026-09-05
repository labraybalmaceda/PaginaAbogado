import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { navigateTo } from './blogUtils';

// Página para URLs que no existen. Se muestra con robots noindex (ver App.tsx),
// que es lo que Google recomienda para evitar soft 404 en aplicaciones de
// página única, donde no se puede devolver un status 404 real.
const LINKS = [
    { label: 'Ir al inicio', path: '/' },
    { label: 'Ver el blog', path: '/blog' },
    { label: 'Arriendos', path: '/abogado-arriendo-puerto-montt' },
    { label: 'Familia', path: '/abogado-familia-puerto-montt' },
    { label: 'Civil', path: '/abogado-civil-puerto-montt' },
    { label: 'Insolvencia', path: '/abogado-insolvencia-puerto-montt' },
];

const NotFound: React.FC = () => (
    <div className="bg-white min-h-screen text-brand-black flex flex-col">
        <Header />

        <main className="flex-grow container mx-auto px-4 sm:px-6 max-w-2xl py-20 sm:py-28 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-4">
                Página no encontrada
            </p>

            <h1 className="text-2xl sm:text-4xl font-bold mb-6 font-baskerville uppercase tracking-tight not-italic leading-tight">
                Esta página no existe o cambió de dirección
            </h1>

            <p className="text-[15px] sm:text-lg text-gray-600 leading-relaxed mb-10">
                Puede que el enlace esté mal escrito o que hayamos movido el contenido. Desde aquí puedes seguir a donde ibas.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
                {LINKS.map((l) => (
                    <a
                        key={l.path}
                        href={l.path}
                        onClick={(e) => { e.preventDefault(); navigateTo(l.path); }}
                        className="px-5 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold uppercase tracking-widest hover:border-brand-gold hover:text-brand-gold transition-colors"
                    >
                        {l.label}
                    </a>
                ))}
            </div>

            <p className="mt-12 text-sm text-gray-500 leading-relaxed">
                ¿Buscabas algo puntual? Escríbenos por WhatsApp al{' '}
                <a
                    href="https://wa.me/56977646224"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gold font-bold hover:underline"
                >
                    +56 9 7764 6224
                </a>.
            </p>
        </main>

        <Footer />
        <WhatsAppButton />
    </div>
);

export default NotFound;
