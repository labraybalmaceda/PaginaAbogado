import React, { useState, useEffect } from 'react';
import { trackCTAClick, trackNavClick, trackPhoneClick } from '../services/tracking';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleScrollClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const href = event.currentTarget.getAttribute('href');
        if (href?.startsWith('#')) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const navLinks = [
        { href: '#practicas', label: 'Áreas' },
        { href: '#beneficios', label: 'Beneficios' },
        { href: '#testimonios', label: 'Casos' },
    ];

    return (
        <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm transition-all duration-300 ${isScrolled ? 'shadow-md py-2' : 'py-4'}`}>
            <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
                {/* Branding as a non-interactable div */}
                <div className="flex items-center gap-3 cursor-default">
                    <img 
                        src="https://res.cloudinary.com/dt36zhzde/image/upload/lb_monogram_ev2svh" 
                        alt="Logo LABRA & BALMACEDA" 
                        className="h-10 w-auto sm:h-12"
                    />
                    <div className="flex flex-col leading-tight">
                        <span className="text-lg sm:text-2xl font-baskerville font-bold text-brand-black tracking-tight uppercase not-italic">
                            LABRA & BALMACEDA
                        </span>
                        <span className="text-[9px] sm:text-xs font-semibold text-brand-gold tracking-[0.25em] uppercase not-italic">
                            ABOGADOS
                        </span>
                    </div>
                </div>

                <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-semibold">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="text-brand-black hover:text-brand-gold transition" onClick={(e) => { handleScrollClick(e); trackNavClick(link.label); }}>
                            {link.label}
                        </a>
                    ))}
                    <a href="#consulta" className="text-white bg-brand-black hover:bg-brand-gold px-5 py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg uppercase tracking-wider text-xs" onClick={(e) => { handleScrollClick(e); trackCTAClick('Header CTA'); }}>
                        Agendar Consulta
                    </a>
                </nav>

                <button id="mobile-menu-toggle" onClick={toggleMenu} className="md:hidden text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold rounded p-2" aria-label="Menu" aria-expanded={isMenuOpen}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                    </svg>
                </button>
            </div>

            {isMenuOpen && (
                <nav className="md:hidden bg-white border-t border-gray-200 shadow-lg">
                    <div className="flex flex-col space-y-1 p-4">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="px-4 py-3 text-brand-black font-semibold hover:bg-gray-50 rounded-lg transition" onClick={(e) => { handleScrollClick(e); trackNavClick(`${link.label} Mobile`); toggleMenu(); }}>
                                {link.label}
                            </a>
                        ))}
                        <div className="pt-2 border-t border-gray-200 mt-2 flex flex-col gap-2">
                            <a href="tel:+56977646224" className="flex items-center gap-2 px-4 py-3 text-brand-black font-semibold hover:bg-gray-50 rounded-lg transition" onClick={trackPhoneClick}>
                                📞 +56 9 7764 6224
                            </a>
                            <a href="#consulta" className="text-center bg-brand-black text-white px-4 py-3 rounded-lg font-bold hover:bg-brand-gold transition uppercase tracking-widest text-sm" onClick={(e) => { handleScrollClick(e); trackCTAClick('Mobile Menu CTA'); toggleMenu(); }}>
                                Agendar Consulta
                            </a>
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;