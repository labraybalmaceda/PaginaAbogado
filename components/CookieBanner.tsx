
import React, { useState, useEffect } from 'react';

interface ConsentSettings {
    marketing: boolean;
    analytics: boolean;
}

const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [settings, setSettings] = useState<ConsentSettings>({
        marketing: false,
        analytics: false
    });

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent_v2');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        } else {
            const saved = JSON.parse(consent);
            applyConsent(saved);
        }
    }, []);

    const applyConsent = (consent: ConsentSettings) => {
        const anyWindow = window as any;
        if (typeof anyWindow.gtag === 'function') {
            anyWindow.gtag('consent', 'update', {
                'ad_storage': consent.marketing ? 'granted' : 'denied',
                'ad_user_data': consent.marketing ? 'granted' : 'denied',
                'ad_personalization': consent.marketing ? 'granted' : 'denied',
                'analytics_storage': consent.analytics ? 'granted' : 'denied'
            });
        }
    };

    const handleAcceptAll = () => {
        const allOn = { marketing: true, analytics: true };
        localStorage.setItem('cookie_consent_v2', JSON.stringify(allOn));
        applyConsent(allOn);
        setIsVisible(false);
    };

    const handleRejectAll = () => {
        const allOff = { marketing: false, analytics: false };
        localStorage.setItem('cookie_consent_v2', JSON.stringify(allOff));
        applyConsent(allOff);
        setIsVisible(false);
    };

    const handleNavigateToPrivacy = () => {
        window.history.pushState({}, '', '/privacidad');
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo(0, 0);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6 bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] animate-fadeIn">
            <div className="container mx-auto max-w-5xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-brand-black font-bold text-sm uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
                            🍪 Privacidad y Cookies
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            Utilizamos cookies para mejorar su experiencia y medir el éxito de nuestros servicios legales. 
                            Las cookies de marketing permiten medir conversiones mediante cifrado seguro. 
                            <button 
                                onClick={handleNavigateToPrivacy} 
                                className="text-brand-gold font-bold ml-1 hover:underline transition-all"
                            >
                                Ver política completa.
                            </button>
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 shrink-0">
                        <button 
                            onClick={handleRejectAll} 
                            className="px-6 py-2.5 text-[10px] font-bold text-brand-black border border-brand-black rounded-lg hover:bg-brand-black hover:text-white transition-all uppercase tracking-widest"
                        >
                            Solo necesarias
                        </button>
                        <button 
                            onClick={handleAcceptAll} 
                            className="px-8 py-2.5 text-[10px] font-bold text-white bg-brand-gold rounded-lg hover:bg-brand-black transition-all uppercase tracking-widest shadow-lg transform hover:-translate-y-0.5"
                        >
                            Aceptar todo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
