import React from 'react';
import FadeInUp from './FadeInUp';

interface StatItemProps {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, icon }) => (
    <FadeInUp>
        <div className="flex flex-col items-center">
            {icon && <div className="text-brand-gold mb-3 opacity-80">{icon}</div>}
            <div className="text-lg sm:text-xl font-bold text-white mb-1 uppercase tracking-tighter">
                {value}
            </div>
            <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                {label}
            </div>
        </div>
    </FadeInUp>
);

const StatsBar: React.FC = () => {
    const stats = [
        { 
            value: 'Experiencia Regional', 
            label: 'Tribunales de la zona',
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        },
        { 
            value: 'Honorarios Claros', 
            label: 'Por Escrito',
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        },
        { 
            value: 'Respuesta Garantizada', 
            label: 'Plazo 24 Horas',
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        },
    ];

    return (
        <section className="bg-brand-black text-white py-12 sm:py-16 border-b border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent pointer-events-none"></div>
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-4 text-center items-center">
                    {stats.map((stat, index) => (
                        <StatItem key={index} value={stat.value} label={stat.label} icon={stat.icon} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsBar;