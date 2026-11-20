import React from 'react';
import { trackNavClick, trackExternalLink, trackWhatsAppConversion } from '../services/tracking';
import { currentLang, conIdioma } from './i18n';

// Pie institucional: negro, con logo, áreas, contacto y horario.
// Sin dirección (el estudio no tiene oficina física) y con las redes todavía ocultas.
// `track` = nombre de seguimiento de siempre; no cambiar.
const AREAS_ES = [
    { path: '/abogado-corporativo-puerto-montt', label: 'Derecho Corporativo', track: 'Footer Area Corporativo' },
    { path: '/asesoria-legal-empresas-puerto-montt', label: 'Asesoría Mensual para Empresas', track: 'Footer Area Asesoria Mensual' },
    { path: '/abogado-civil-puerto-montt', label: 'Litigios Civiles y Comerciales', track: 'Footer Area Civil' },
    { path: '/abogado-insolvencia-puerto-montt', label: 'Derecho Concursal', track: 'Footer Area Insolvencia' },
    { path: '/abogado-inmobiliario-puerto-montt', label: 'Inmobiliario y Construcción', track: 'Footer Area Inmobiliario' },
    { path: '/abogado-arriendo-puerto-montt', label: 'Arriendos', track: 'Footer Area Arrendamientos' },
    { path: '/abogado-familia-puerto-montt', label: 'Derecho de Familia', track: 'Footer Area Familia' },
];

const AREAS_EN = [
    { path: '/en/corporate-law', label: 'Corporate Law', track: 'Footer Area Corporativo EN' },
    { path: '/en/monthly-legal-counsel', label: 'Monthly Legal Counsel', track: 'Footer Area Asesoria Mensual EN' },
    { path: '/en/litigation', label: 'Civil and Commercial Litigation', track: 'Footer Area Civil EN' },
    { path: '/en/insolvency', label: 'Insolvency Law', track: 'Footer Area Insolvencia EN' },
    { path: '/en/real-estate-and-construction', label: 'Real Estate and Construction', track: 'Footer Area Inmobiliario EN' },
];

const TEXTOS = {
    es: {
        contacto: 'Contacto',
        email: 'Email',
        lugar: 'Puerto Varas y Puerto Montt, Región de Los Lagos',
        horario: 'Horario de atención',
        horas: 'Lunes a viernes: 09:00 a 19:00 hrs',
        cobertura: 'Zonas de cobertura',
        otras: 'y otras comunas de la Región de Los Lagos',
        areas: 'Áreas de práctica',
        publicaciones: 'Publicaciones',
        derechos: 'Todos los derechos reservados.',
        aviso: 'La información de este sitio es referencial y no constituye asesoría legal.',
        privacidad: 'Política de Privacidad',
    },
    en: {
        contacto: 'Contact',
        email: 'Email',
        lugar: 'Puerto Varas and Puerto Montt, Los Lagos Region, Chile',
        horario: 'Office hours',
        horas: 'Monday to Friday: 09:00 to 19:00 (Chile time)',
        cobertura: 'Coverage',
        otras: 'and other towns in the Los Lagos Region',
        areas: 'Practice areas',
        publicaciones: 'Publications (in Spanish)',
        derechos: 'All rights reserved.',
        aviso: 'The information on this site is for reference only and does not constitute legal advice.',
        privacidad: 'Privacy Policy (in Spanish)',
    },
} as const;

const Footer: React.FC = () => {
    const lang = currentLang();
    const t = TEXTOS[lang];
    const areas = lang === 'en' ? AREAS_EN : AREAS_ES;

    const handleNavigate = (path: string) => {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo(0, 0);
    };

    const tituloColumna = 'text-[11px] font-bold mb-5 text-white uppercase tracking-[0.25em]';

    return (
        <footer className="bg-brand-black text-gray-400 pt-16 sm:pt-20 pb-12 border-t border-white/10 font-sans">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
                    {/* Logo */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src="https://res.cloudinary.com/dt36zhzde/image/upload/f_auto,q_auto,h_96/lb_monogram_white2_omlw6a"
                                alt="Logo LABRA & BALMACEDA Monogram"
                                className="h-12 w-auto"
                                width={87}
                                height={96}
                                loading="lazy"
                            />
                            <div className="flex flex-col leading-tight">
                                <p className="text-lg font-bold text-white tracking-tight uppercase font-baskerville not-italic">
                                    LABRA & BALMACEDA
                                </p>
                                <p className="text-brand-gold text-[9px] font-bold tracking-[0.3em] uppercase font-baskerville not-italic">ABOGADOS</p>
                            </div>
                        </div>
                        <div className="w-10 h-px bg-brand-gold mb-6" aria-hidden="true" />
                        <p className="text-xs leading-relaxed opacity-80">{t.lugar}</p>

                        {/* Redes Sociales */}
                        <div className="pt-2 hidden">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white mb-3">Síganos</p>
                            <div className="flex items-center gap-4">
                                <a href="https://www.instagram.com/labraybalmaceda" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors" aria-label="Instagram" onClick={() => trackExternalLink('Instagram')}>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=61575447067555" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors" aria-label="Facebook" onClick={() => trackExternalLink('Facebook')}>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Áreas */}
                    <div>
                        <p className={tituloColumna}>{t.areas}</p>
                        <ul className="space-y-3 text-sm">
                            {areas.map((a) => (
                                <li key={a.path}>
                                    <a href={a.path} className="hover:text-brand-gold transition" onClick={(e) => { e.preventDefault(); handleNavigate(a.path); trackNavClick(a.track); }}>{a.label}</a>
                                </li>
                            ))}
                            <li className="pt-3 mt-3 border-t border-white/10">
                                <a href="/blog" className="hover:text-brand-gold transition" onClick={(e) => { e.preventDefault(); handleNavigate('/blog'); trackNavClick(conIdioma('Footer Blog', lang)); }}>{t.publicaciones}</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contacto (sin tel: el contacto es por WhatsApp o correo) */}
                    <div>
                        <p className={tituloColumna}>{t.contacto}</p>
                        <div className="space-y-4 text-sm">
                            <p>
                                <span className="block text-brand-gold font-semibold mb-1">WhatsApp</span>
                                <a href="https://wa.me/56977646224" target="_blank" rel="noopener noreferrer" className="hover:text-white transition" onClick={() => trackWhatsAppConversion(conIdioma('Footer WhatsApp', lang))}>+56 9 7764 6224</a>
                            </p>
                            <p>
                                <span className="block text-brand-gold font-semibold mb-1">{t.email}</span>
                                <a href="mailto:contacto@labraybalmaceda.cl" className="hover:text-white transition break-all">
                                    contacto@labraybalmaceda.cl
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Horario y cobertura */}
                    <div>
                        <p className={tituloColumna}>{t.horario}</p>
                        <p className="text-sm mb-8">{t.horas}</p>
                        <p className={tituloColumna}>{t.cobertura}</p>
                        <p className="text-sm leading-relaxed">
                            Puerto Varas · Puerto Montt · Llanquihue <br />
                            <span className="text-xs opacity-70">{t.otras}</span>
                        </p>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/10 text-center space-y-4">
                    <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto uppercase tracking-wider font-medium">
                        © 2026 <span className="font-baskerville">Labra & Balmaceda ABOGADOS</span>. {t.derechos}
                    </p>
                    <p className="text-[10px] text-gray-500 italic">
                        {t.aviso} | <a href="/privacidad" onClick={(e) => { e.preventDefault(); handleNavigate('/privacidad'); }} className="hover:text-brand-gold underline transition">{t.privacidad}</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
