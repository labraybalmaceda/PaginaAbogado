import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import PageHero from './PageHero';
import { currentLang } from './i18n';

// Marco común de las páginas de servicio (español e inglés): cabecera de vidrio
// sobre la foto (PageHero) y, debajo, el cuerpo sobre fondo hueso en una columna de
// lectura angosta (unos 65-72 caracteres), con líneas finas en vez de cajas.

interface ServiceShellProps {
    /** Contenido del H1 (con el dorado en el nombre del servicio). */
    title: React.ReactNode;
    children: React.ReactNode;
}

const ServiceShell: React.FC<ServiceShellProps> = ({ title, children }) => {
    const lang = currentLang();

    return (
        <div className="bg-hueso min-h-screen text-brand-black">
            <Header />

            <main className="overflow-hidden">
                <PageHero eyebrow={lang === 'en' ? 'Practice areas' : 'Áreas de práctica'} title={title} />

                <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
                    <div className="max-w-[38rem] mx-auto">
                        {children}
                    </div>
                </div>
            </main>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default ServiceShell;
