import React, { useState } from 'react';
import FadeInUp from './FadeInUp';
import { trackCalculatorCTA, trackCalculatorUse } from '../services/tracking';

const FeeCalculator: React.FC = () => {
    const [caseType, setCaseType] = useState('');
    const [scope, setScope] = useState('');
    const [result, setResult] = useState<{ min: string, max: string } | null>(null);
    const [showScopeInfo, setShowScopeInfo] = useState(false);

    const handleCalculate = () => {
        if (!caseType || !scope) {
            alert('Por favor, selecciona el tipo de asunto y el alcance del servicio.');
            return;
        }

        // Middle values provided by the user
        const middleValues: { [key: string]: { [key: string]: number } } = {
            'alimentos': { 'basico': 400000, 'estandar': 600000, 'completo': 800000 },
            'divorcio': { 'basico': 400000, 'estandar': 700000, 'completo': 900000 },
            'herencias': { 'basico': 500000, 'estandar': 800000, 'completo': 1000000 },
            'insolvencia': { 'basico': 700000, 'estandar': 1000000, 'completo': 1500000 },
            'arriendo': { 'basico': 600000, 'estandar': 800000, 'completo': 1000000 },
            'otro': { 'basico': 400000, 'estandar': 700000, 'completo': 900000 },
        };

        const midValue = middleValues[caseType][scope];
        // Calculate range with 200k difference (mid +/- 100k)
        const minValue = midValue - 100000;
        const maxValue = midValue + 100000;

        const format = (val: number) => new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0
        }).format(val);

        setResult({
            min: format(minValue),
            max: format(maxValue)
        });
        
        trackCalculatorUse(caseType, scope, midValue);
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

    return (
        <section id="calculadora" className="py-20 sm:py-28 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-brand-black font-baskerville uppercase tracking-tight not-italic">
                        Calculadora de <span className="text-brand-gold">honorarios</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                        Transparencia desde el inicio. Obtén un rango estimado según el tipo de asunto y el alcance del servicio solicitado.
                    </p>
                </div>

                <FadeInUp>
                    <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-gray-100 relative group">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold"></div>
                        
                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="space-y-2">
                                <label htmlFor="tipo-caso" className="block text-[11px] font-bold text-brand-black uppercase tracking-[0.2em] mb-2">Tipo de asunto </label>
                                <select 
                                    id="tipo-caso" 
                                    value={caseType} 
                                    onChange={e => setCaseType(e.target.value)} 
                                    className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:border-brand-gold focus:ring-0 transition bg-gray-50 text-brand-black font-semibold appearance-none cursor-pointer"
                                >
                                    <option value="">Selecciona tu consulta...</option>
                                    <option value="alimentos">Pensión de Alimentos</option>
                                    <option value="divorcio">Divorcio</option>
                                    <option value="insolvencia">Insolvencia / Deudas</option>
                                    <option value="arriendo">Juicio de Arriendo</option>
                                    <option value="herencias">Herencias</option>
                                    <option value="otro">Otro asunto</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="alcance" className="block text-[11px] font-bold text-brand-black uppercase tracking-[0.2em]">Alcance del servicio</label>
                                    <button 
                                        onClick={() => setShowScopeInfo(!showScopeInfo)}
                                        className="text-[10px] font-bold text-brand-gold hover:underline uppercase tracking-widest"
                                    >
                                        ¿Cómo se define?
                                    </button>
                                </div>
                                <select 
                                    id="alcance" 
                                    value={scope} 
                                    onChange={e => setScope(e.target.value)} 
                                    className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:border-brand-gold focus:ring-0 transition bg-gray-50 text-brand-black font-semibold appearance-none cursor-pointer"
                                >
                                    <option value="">Selecciona el alcance...</option>
                                    <option value="basico">Básico</option>
                                    <option value="estandar">Estándar</option>
                                    <option value="completo">Completo</option>
                                </select>

                                {showScopeInfo && (
                                    <div className="mt-4 p-5 bg-gray-50 rounded-xl border border-gray-100 text-[11px] text-gray-500 space-y-3 animate-fadeIn">
                                        <p><strong>Básico:</strong> Casos simples, antecedentes completos, pocas gestiones y sin urgencias relevantes.</p>
                                        <p><strong>Estándar:</strong> Casos de complejidad media, preparación de escritos y seguimiento procesal regular.</p>
                                        <p><strong>Completo:</strong> Casos de alta conflictividad, prueba extensa, incidentes, múltiples audiencias o actuaciones adicionales.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button 
                            onClick={handleCalculate} 
                            className="w-full px-8 py-5 bg-brand-black text-white text-lg font-bold rounded-xl hover:bg-brand-gold transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group"
                        >
                            <svg className="w-5 h-5 text-brand-gold group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                            </svg>
                            Calcular Estimación de Rango
                        </button>

                        {result && (
                            <div className="mt-12 p-8 sm:p-10 bg-gray-50 rounded-2xl border-2 border-brand-gold/20 animate-fadeIn text-center">
                                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] mb-4 block">Estimación referencial de honorarios</span>
                                <p className="text-3xl sm:text-5xl font-extrabold text-brand-black mb-4 font-baskerville tracking-tight">
                                    {result.min} <span className="text-brand-gold opacity-50 px-2">—</span> {result.max}
                                </p>
                                
                                <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-6 text-left mb-10">
                                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                        <h4 className="text-[11px] font-bold text-brand-black uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                                            Incluye
                                        </h4>
                                        <ul className="text-[11px] text-gray-500 space-y-2 font-medium">
                                            <li>• Diagnóstico y diseño de estrategia</li>
                                            <li>• Redacción y presentación de escritos</li>
                                            <li>• Seguimiento del proceso según alcance</li>
                                            <li>• Reportes de estado de causa</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                        <h4 className="text-[11px] font-bold text-brand-black uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                                            No incluye
                                        </h4>
                                        <ul className="text-[11px] text-gray-500 space-y-2 font-medium">
                                            <li>• Gastos de terceros (Receptor judicial)</li>
                                            <li>• Aranceles de Notaría y Archivos</li>
                                            <li>• Publicaciones, certificados y copias</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a href="#consulta" className="px-8 py-4 bg-brand-black text-white rounded-xl font-bold transition shadow-lg hover:bg-brand-gold flex items-center justify-center gap-2 text-sm uppercase tracking-widest" onClick={(e) => { handleScrollClick(e); trackCalculatorCTA(); }}>
                                        📅 Agendar Consulta
                                    </a>
                                    <a href="https://wa.me/56977646224" className="px-8 py-4 border-2 border-whatsapp-verde text-whatsapp-verde rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm hover:bg-whatsapp-verde hover:text-white uppercase tracking-widest" onClick={() => trackCalculatorCTA()}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                        </svg>
                                        WhatsApp Directo
                                    </a>
                                </div>
                                <p className="mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-wider">Te confirmamos el presupuesto exacto con tus antecedentes.</p>
                            </div>
                        )}

                        <div className="mt-10 pt-8 border-t border-gray-100">
                            <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed font-medium italic text-center max-w-2xl mx-auto">
                                <strong>Nota:</strong> Esta herramienta entrega una estimación referencial basada en rangos habituales. El valor final se confirma tras revisar antecedentes específicos y definir el camino procesal. No incluye desembolsos de terceros.
                            </p>
                        </div>
                    </div>
                </FadeInUp>
            </div>
        </section>
    );
};

export default FeeCalculator;