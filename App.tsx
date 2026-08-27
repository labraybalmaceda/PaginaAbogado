import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
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
import BlogIndex from './components/BlogIndex';
import BlogPost from './components/BlogPost';
import { getPost } from './content/blog';

type Route =
    | { name: 'main' }
    | { name: 'privacy' }
    | { name: 'thanks' }
    | { name: 'civil' }
    | { name: 'familia' }
    | { name: 'arriendos' }
    | { name: 'insolvencia' }
    | { name: 'blog' }
    | { name: 'post'; slug: string };

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
        case '/blog': return { name: 'blog' };
    }

    if (path.startsWith(BLOG_PREFIX)) {
        const slug = path.slice(BLOG_PREFIX.length);
        // Slug inexistente o borrador: se corrige la URL al índice del blog en
        // lugar de dejar una dirección que responde con contenido equivocado.
        return getPost(slug) ? { name: 'post', slug } : { name: 'blog' };
    }

    return { name: 'main' };
};

const App: React.FC = () => {
    const [route, setRoute] = useState<Route>(() => resolveRoute(window.location.pathname));

    useEffect(() => {
        const handleLocationChange = () => {
            const next = resolveRoute(window.location.pathname);
            setRoute(next);

            if (next.name === 'blog' && window.location.pathname.startsWith(BLOG_PREFIX)) {
                window.history.replaceState({}, '', '/blog');
            }

            if (next.name === 'main' && window.location.hash) {
                setTimeout(() => {
                    const el = document.getElementById(window.location.hash.substring(1));
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        };

        window.addEventListener('popstate', handleLocationChange);
        handleLocationChange(); // Initial check

        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

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
        />
        <Thanks /><CookieBanner />
    </>;
    if (route.name === 'civil') return <><CivilPage /><CookieBanner /></>;
    if (route.name === 'familia') return <><FamiliaPage /><CookieBanner /></>;
    if (route.name === 'arriendos') return <><ArriendosPage /><CookieBanner /></>;
    if (route.name === 'insolvencia') return <><InsolvenciaPage /><CookieBanner /></>;
    if (route.name === 'blog') return <><BlogIndex /><CookieBanner /></>;
    if (route.name === 'post') {
        const post = getPost(route.slug);
        if (post) return <><BlogPost post={post} /><CookieBanner /></>;
    }

    return (
        <>
            <Seo
                title="Abogados en Puerto Varas y Puerto Montt | LABRA & BALMACEDA ABOGADOS"
                description="¿Buscas abogados en Puerto Montt o Puerto Varas? LABRA & BALMACEDA: Especialistas en Derecho Civil, Arriendos, Insolvencia y Familia en la Región de Los Lagos."
                path="/"
            />
            <Header />
            <main>
                <Hero />
                <StatsBar />
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
