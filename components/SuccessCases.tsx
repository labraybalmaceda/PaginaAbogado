import React from 'react';
import FadeInUp from './FadeInUp';

interface SuccessCaseCardProps {
    icon: string;
    title: string;
    description: React.ReactNode;
    resultValue: string;
    resultLabel: string;
    gradient: string;
    ariaLabel: string;
}

const SuccessCaseCard: React.FC<SuccessCaseCardProps> = ({ icon, title, description, resultValue, resultLabel, gradient, ariaLabel }) => (
    <FadeInUp>
        <div className={`bg-gradient-to-br ${gradient} p-6 sm:p-8 rounded-xl shadow-lg border-t-4 border-brand-gold hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 text-center h-full flex flex-col`}>
            <span role="img" aria-label={ariaLabel} className="text-4xl sm:text-5xl block mb-4 text-brand-black">{icon}</span>
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-brand-black">{title}</h3>
            <div className="text-sm sm:text-base text-left mb-4 text-gray-700 flex-grow">{description}</div>
            <div className="bg-brand-black/5 p-4 rounded-lg mt-auto">
                <p className="text-xl sm:text-2xl font-extrabold text-brand-gold">{resultValue}</p>
                <p className="text-xs text-gray-500 mt-1">{resultLabel}</p>
            </div>
        </div>
    </FadeInUp>
);


const SuccessCases: React.FC = () => {
    const cases = [
        {
            icon: '🏠',
            ariaLabel: 'Casa recuperada por juicio de arriendo',
            title: 'Juicio de Arriendo - Puerto Montt',
            description: <>Recuperación de propiedad y <strong>pago de rentas adeudadas</strong> para arrendador. Lanzamiento ejecutado en 6 meses.</>,
            resultValue: '$4.5M CLP',
            resultLabel: 'en rentas recuperadas',
            gradient: 'from-gray-50 to-white'
        },
        {
            icon: '👨‍👧‍👦',
            ariaLabel: 'Familia protegida por caso de familia',
            title: 'Caso Familia - Puerto Varas',
            description: <>Acuerdo de <strong>cuidado personal y relación directa</strong> protegiendo el interés superior del niño. Evitamos litigio prolongado.</>,
            resultValue: 'Solución en 4 meses',
            resultLabel: 'vía negociación exitosa',
            gradient: 'from-gray-50 to-white'
        },
        {
            icon: '📜',
            ariaLabel: 'Documento legal por caso civil resuelto',
            title: 'Caso Civil - Frutillar',
            description: <>Resolución de <strong>conflicto sucesorio complejo</strong> con 5 herederos. Distribución equitativa evitando disputas familiares.</>,
            resultValue: 'Litigio Evitado',
            resultLabel: 'acuerdo extrajudicial',
            gradient: 'from-gray-50 to-white'
        },
    ];

    return (
        <section id="casos" className="py-12 sm:py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-brand-black">Nuestros Casos de Éxito</h2>
                <p className="text-base sm:text-lg mb-8 sm:mb-12 max-w-3xl mx-auto">Protegiendo los derechos de nuestros clientes en Puerto Montt, Puerto Varas y toda la Región de Los Lagos.</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {cases.map((c, i) => <SuccessCaseCard key={i} {...c} />)}
                </div>
            </div>
        </section>
    );
};

export default SuccessCases;