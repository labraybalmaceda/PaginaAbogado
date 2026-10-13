
import React, { useRef, useEffect, useState } from 'react';

interface FadeInUpProps {
    children: React.ReactNode;
}

// Los bots y el prerender de Netlify (un navegador sin pantalla) no hacen scroll: con la animación,
// las secciones bajo el pliegue quedaban guardadas con opacity-0 en su copia de la página.
// Para ellos (y si el navegador no tiene IntersectionObserver) el contenido se muestra desde el inicio.
const shouldSkipAnimation = (): boolean => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return true;
    return navigator.webdriver === true || /bot|crawler|spider|prerender|headless/i.test(navigator.userAgent);
};

const FadeInUp: React.FC<FadeInUpProps> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(shouldSkipAnimation);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        
        const currentRef = domRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            {children}
        </div>
    );
};

export default FadeInUp;
