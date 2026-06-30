import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import PracticeAreas from './components/PracticeAreas';
import Testimonials from './components/Testimonials';
import WhyChooseUs from './components/WhyChooseUs';
import FeeCalculator from './components/FeeCalculator';
import FAQ from './components/FAQ';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import PrivacyPolicy from './components/PrivacyPolicy';
import Thanks from './components/Thanks';
import CookieBanner from './components/CookieBanner';
import CivilPage from './components/CivilPage';
import FamiliaPage from './components/FamiliaPage';
import ArriendosPage from './components/ArriendosPage';
import InsolvenciaPage from './components/InsolvenciaPage';

const App: React.FC = () => {
    const [view, setView] = useState<'main' | 'privacy' | 'thanks' | 'civil' | 'familia' | 'arriendos' | 'insolvencia'>('main');

    useEffect(() => {
        const handleLocationChange = () => {
            const path = window.location.pathname;
            if (path === '/privacidad') {
                setView('privacy');
            } else if (path === '/gracias') {
                setView('thanks');
            } else if (path === '/abogado-civil-puerto-montt') {
                setView('civil');
            } else if (path === '/abogado-familia-puerto-montt') {
                setView('familia');
            } else if (path === '/abogado-arriendo-puerto-montt') {
                setView('arriendos');
            } else if (path === '/abogado-insolvencia-puerto-montt') {
                setView('insolvencia');
            } else {
                setView('main');
            }
        };

        window.addEventListener('popstate', handleLocationChange);
        handleLocationChange(); // Initial check

        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    if (view === 'privacy') return <><PrivacyPolicy /><CookieBanner /></>;
    if (view === 'thanks') return <><Thanks /><CookieBanner /></>;
    if (view === 'civil') return <><CivilPage /><CookieBanner /></>;
    if (view === 'familia') return <><FamiliaPage /><CookieBanner /></>;
    if (view === 'arriendos') return <><ArriendosPage /><CookieBanner /></>;
    if (view === 'insolvencia') return <><InsolvenciaPage /><CookieBanner /></>;

    return (
        <>
            <Header />
            <main>
                <Hero />
                <StatsBar />
                <PracticeAreas />
                <Testimonials />
                <WhyChooseUs />
                <FeeCalculator />
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