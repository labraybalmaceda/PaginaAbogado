import React from 'react';
import { trackNavClick, trackCTAClick } from '../services/tracking';

const Footer: React.FC = () => {
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

    const handleNavigate = (path: string) => {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo(0, 0);
    };

    return (
        <footer className="bg-brand-black text-gray-400 py-16 border-t border-brand-gold/20 font-sans">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-12">
                    {/* Columna Contacto */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-8 group cursor-default">
                            <img 
                                src="https://res.cloudinary.com/dt36zhzde/image/upload/lb_monogram_white2_omlw6a" 
                                alt="Logo LABRA & BALMACEDA Monogram" 
                                className="h-10 w-auto transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="flex flex-col leading-tight">
                                <h4 className="text-lg font-bold text-white tracking-tight uppercase font-baskerville not-italic">
                                    LABRA & BALMACEDA
                                </h4>
                                <p className="text-brand-gold text-[9px] font-bold tracking-[0.3em] uppercase font-baskerville not-italic">ABOGADOS</p>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <h5 className="text-[10px] font-bold uppercase tracking-widest text-white mb-2">Contacto</h5>
                                <p className="text-sm">
                                    <span className="block text-brand-gold font-semibold mb-1">WhatsApp / Teléfono:</span>
                                    <a href="tel:+56977646224" className="hover:text-white transition">+56 9 7764 6224</a>
                                </p>
                            </div>
                            <div>
                                <p className="text-sm">
                                    <span className="block text-brand-gold font-semibold mb-1">Email:</span>
                                    <a href="mailto:labrabalmaceda.estudiojuridico@gmail.com" className="hover:text-brand-gold transition break-all">
                                        labrabalmaceda.estudiojuridico@gmail.com
                                    </a>
                                </p>
                            </div>
                            <p className="text-xs italic opacity-80">
                                Puerto Montt, Región de Los Lagos
                            </p>
                        </div>
                    </div>

                    {/* Columna Horario y Cobertura */}
                    <div>
                        <div className="mb-8">
                            <h4 className="text-sm font-bold mb-4 text-white uppercase tracking-widest font-baskerville not-italic">Horario de atención</h4>
                            <p className="text-sm">Lunes a viernes: 09:00 – 19:00 hrs</p>
                        </div>
                        
                        <div>
                            <h4 className="text-sm font-bold mb-4 text-white uppercase tracking-widest font-baskerville not-italic">Zonas de cobertura</h4>
                            <p className="text-sm leading-relaxed">
                                Puerto Montt · Puerto Varas · Llanquihue <br />
                                <span className="text-xs opacity-70">y otras comunas de la Región de Los Lagos</span>
                            </p>
                        </div>
                    </div>

                    {/* Columna Especialidades */}
                    <div>
                        <h4 className="text-sm font-bold mb-4 text-white uppercase tracking-widest font-baskerville not-italic">Áreas de práctica</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#practicas" className="hover:text-brand-gold transition" onClick={() => trackNavClick('Footer Area Familia')}>Familia</a></li>
                            <li><a href="#practicas" className="hover:text-brand-gold transition" onClick={() => trackNavClick('Footer Area Civil')}>Civil</a></li>
                            <li><a href="#practicas" className="hover:text-brand-gold transition" onClick={() => trackNavClick('Footer Area Arrendamientos')}>Arrendamientos</a></li>
                            <li><a href="#practicas" className="hover:text-brand-gold transition" onClick={() => trackNavClick('Footer Area Insolvencia')}>Insolvencia y deudas</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-gray-800 text-center space-y-4">
                    <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto uppercase tracking-wider font-medium">
                        © 2026 <span className="font-baskerville">Labra & Balmaceda ABOGADOS</span>. Todos los derechos reservados.
                    </p>
                    <p className="text-[10px] text-gray-600 italic">
                        La información de este sitio es referencial y no constituye asesoría legal. | <button onClick={() => handleNavigate('/privacidad')} className="hover:text-brand-gold underline transition">Política de Privacidad</button>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;