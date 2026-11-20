import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BlogDestacados from './components/BlogDestacados';
import PracticeAreas from './components/PracticeAreas';
import Testimonials from './components/Testimonials';
import WhyChooseUs from './components/WhyChooseUs';
import FAQ from './components/FAQ';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import PrivacyPolicy from './components/PrivacyPolicy';
import Thanks from './components/Thanks';
import CookieBanner from './components/CookieBanner';
import Seo from './components/Seo';
import CivilPage from './components/CivilPage';
import FamiliaPage from './components/FamiliaPage';
import ArriendosPage from './components/ArriendosPage';
import InsolvenciaPage from './components/InsolvenciaPage';
import InmobiliarioPage from './components/InmobiliarioPage';
import CorporativoPage from './components/CorporativoPage';
import AsesoriaEmpresasPage from './components/AsesoriaEmpresasPage';
import BlogIndex from './components/BlogIndex';
import BlogPost from './components/BlogPost';
import NotFound from './components/NotFound';
import IntroScreen, { shouldShowIntro } from './components/IntroScreen';
import EnServicePage from './components/en/EnServicePage';
import { EN_SERVICE_ROUTES, type EnServiceKey } from './components/i18n';
import { getPost } from './content/blog';

type Route =
    | { name: 'main' }
    | { name: 'privacy' }
    | { name: 'thanks' }
    | { name: 'civil' }
    | { name: 'familia' }
    | { name: 'arriendos' }
    | { name: 'insolvencia' }
    | { name: 'inmobiliario' }
    | { name: 'corporativo' }
    | { name: 'asesoria' }
    | { name: 'blog' }
    | { name: 'post'; slug: string }
    | { name: 'en-home' }
    | { name: 'en-service'; key: EnServiceKey }
    | { name: 'notfound' };

const BLOG_PREFIX = '/blog/';

const resolveRoute = (pathname: string): Route => {
    // Normaliza la barra final: /blog y /blog/ son la misma página.
    const path = pathname.replace(/\/+$/, '') || '/';

    switch (path) {
        case '/privacidad': return { name: 'privacy' };
        case '/gracias': return { name: 'thanks' };
        case '/abogado-civil-puerto-montt': return { name: 'civil' };
        case '/abogado-familia-puerto-montt': return { name: 'familia' };
        case '/abogado-arriendo-puerto-montt': return { name: 'arriendos' };
        case '/abogado-insolvencia-puerto-montt': return { name: 'insolvencia' };
        case '/abogado-inmobiliario-puerto-montt': return { name: 'inmobiliario' };
        case '/abogado-corporativo-puerto-montt': return { name: 'corporativo' };
        case '/asesoria-legal-empresas-puerto-montt': return { name: 'asesoria' };
        case '/blog': return { name: 'blog' };
        case '/en': return { name: 'en-home' };
    }

    // Páginas de servicio en inglés (lista en components/i18n.ts).
    const enKey = EN_SERVICE_ROUTES[path];
    if (enKey) return { name: 'en-service', key: enKey };

    if (path.startsWith(BLOG_PREFIX)) {
        const slug = path.slice(BLOG_PREFIX.length);
        // Slug inexistente o borrador: se corrige la URL al índice del blog en
        // lugar de dejar una dirección que responde con contenido equivocado.
        return getPost(slug) ? { name: 'post', slug } : { name: 'notfound' };
    }

    if (path === '/') return { name: 'main' };

    return { name: 'notfound' };
};

const App: React.FC = () => {
    const [route, setRoute] = useState<Route>(() => resolveRoute(window.location.pathname));
    // Pantalla de intro: se decide una sola vez, al cargar (ver IntroScreen.tsx).
    const [intro, setIntro] = useState(shouldShowIntro);
    const cerrarIntro = useCallback(() => setIntro(false), []);

    useEffect(() => {
        const handleLocationChange = () => {
            const next = resolveRoute(window.location.pathname);
            setRoute(next);

            if (next.name === 'blog' && window.location.pathname.startsWith(BLOG_PREFIX)) {
                window.history.replaceState({}, '', '/blog');
            }
        };

        window.addEventListener('popstate', handleLocationChange);
        handleLocationChange(); // Initial check

        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    useLayoutEffect(() => {
        if (!window.location.hash) {
            setTimeout(() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
            }, 0);
        } else if (route.name === 'main' || route.name === 'en-home') {
            const hash = window.location.hash.substring(1);
            const scrollToHash = () => {
                const el = document.getElementById(hash);
                if (el) {
                    const originalStyle = document.documentElement.style.scrollBehavior;
                    document.documentElement.style.scrollBehavior = 'auto';
                    el.scrollIntoView({ block: 'start' });
                    document.documentElement.style.scrollBehavior = originalStyle;
                }
            };
            setTimeout(scrollToHash, 150);
            setTimeout(scrollToHash, 700);
        }
    }, [route, window.location.hash]);

    if (route.name === 'privacy') return <>
        <Seo
            title="Política de Privacidad | Labra & Balmaceda Abogados"
            description="Política de privacidad y tratamiento de datos personales de Labra & Balmaceda Abogados."
            path="/privacidad"
        />
        <PrivacyPolicy /><CookieBanner />
    </>;
    if (route.name === 'thanks') return <>
        <Seo
            title="Gracias por tu consulta | Labra & Balmaceda Abogados"
            description="Recibimos tu consulta. Te contactaremos a la brevedad para agendar tu primera reunión."
            path="/gracias"
            noindex
        />
        <Thanks /><CookieBanner />
    </>;
    if (route.name === 'civil') return <><CivilPage /><CookieBanner /></>;
    if (route.name === 'familia') return <><FamiliaPage /><CookieBanner /></>;
    if (route.name === 'arriendos') return <><ArriendosPage /><CookieBanner /></>;
    if (route.name === 'insolvencia') return <><InsolvenciaPage /><CookieBanner /></>;
    if (route.name === 'inmobiliario') return <><InmobiliarioPage /><CookieBanner /></>;
    if (route.name === 'corporativo') return <><CorporativoPage /><CookieBanner /></>;
    if (route.name === 'asesoria') return <><AsesoriaEmpresasPage /><CookieBanner /></>;
    if (route.name === 'blog') return <><BlogIndex /><CookieBanner /></>;
    if (route.name === 'en-service') return <><EnServicePage key={route.key} serviceKey={route.key} /><CookieBanner /></>;
    if (route.name === 'post') {
        const post = getPost(route.slug);
        if (post) return <><BlogPost post={post} /><CookieBanner /></>;
    }

    if (route.name === 'notfound') return <>
        <Seo
            title="Página no encontrada | Labra & Balmaceda Abogados"
            description="La página que buscas no existe o cambió de dirección. Revisa aquí nuestras áreas de práctica y el blog."
            path={window.location.pathname}
            noindex
        />
        <NotFound /><CookieBanner />
    </>;

    const pantallaIntro = intro && (route.name === 'main' || route.name === 'en-home') ? <IntroScreen onDone={cerrarIntro} /> : null;

    // Portada en inglés: hero, las 4 áreas de empresa, el banner de contacto, el
    // formulario (mismo Netlify form "consulta") y el pie. Sin franja de artículos,
    // casos ni FAQ: el blog y esas secciones están solo en español.
    if (route.name === 'en-home') return (
        <>
            {pantallaIntro}
            <Seo
                title="Lawyers in Puerto Varas and Puerto Montt, Chile | Labra & Balmaceda"
                description="Labra & Balmaceda Abogados: legal counsel for companies and individuals in southern Chile. Corporate, monthly counsel, litigation, insolvency and real estate."
                path="/en"
            />
            <Header />
            <main>
                <Hero lang="en" />
                <PracticeAreas lang="en" />
                <ConsultationForm lang="en" />
            </main>
            <Footer />
            <WhatsAppButton />
            <CookieBanner />
        </>
    );

    return (
        <>
            {pantallaIntro}
            <Seo
                title="Abogados en Puerto Varas y Puerto Montt | Labra & Balmaceda"
                description="¿Buscas abogados en Puerto Varas? Labra & Balmaceda: Derecho Civil, Familia, Arriendos y Derecho Concursal. Atendemos también en Puerto Montt y Llanquihue."
                path="/"
            />
            <Header />
            <main>
                <Hero bottom={<BlogDestacados />} />
                <PracticeAreas />
                <Testimonials />
                <WhyChooseUs />
                <FAQ />
                <ConsultationForm />
            </main>
            <Footer />
            <WhatsAppButton />
            <CookieBanner />
        </>
    );
};

export default App;
