import React, { useState } from 'react';
import { trackFormSubmission, trackFormSubmissionError } from '../services/tracking';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// Helper function to encode form data for Netlify
const encode = (data: { [key: string]: any }) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

const ConsultationForm: React.FC = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        ciudad: '',
        area: '',
        descripcion: '',
        consentimiento: false,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [status, setStatus] = useState<FormStatus>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.nombre) newErrors.nombre = 'El nombre es requerido.';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido o requerido.';
        if (!formData.telefono) newErrors.telefono = 'Teléfono es requerido.';
        if (!formData.ciudad) newErrors.ciudad = 'La ciudad es requerida.';
        if (!formData.area) newErrors.area = 'El tipo de consulta es requerido.';
        if (!formData.descripcion) newErrors.descripcion = 'La descripción es requerida.';
        if (!formData.consentimiento) newErrors.consentimiento = 'Debe aceptar los términos.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        setStatus('loading');
        try {
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode({ "form-name": "consulta", ...formData })
            });
            
            trackFormSubmission(formData);
            
            // Navegación a URL limpia /gracias
            window.history.pushState({}, '', '/gracias');
            window.dispatchEvent(new PopStateEvent('popstate'));
            
        } catch (error) {
            setStatus('error');
            trackFormSubmissionError(error);
        }
    };

    const areaOptions = [
        { value: "Familia", label: "Familia" },
        { value: "Arriendo", label: "Arriendo" },
        { value: "Civil", label: "Civil" },
        { value: "Insolvencia", label: "Insolvencia" },
        { value: "Otro", label: "Otro" },
    ];

    return (
        <section id="consulta" className="py-20 sm:py-28 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                <div className="bg-white p-6 sm:p-12 rounded-3xl shadow-2xl border border-gray-100 relative group">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold"></div>
                    
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-brand-black font-baskerville uppercase tracking-tight not-italic">
                            Consulta <span className="text-brand-gold">inicial</span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-500 font-medium italic">
                            Respuesta en 24–48 horas hábiles. Atención reservada.
                        </p>
                    </div>

                    <form name="consulta" onSubmit={handleSubmit} className="space-y-6" noValidate data-netlify="true" netlify-honeypot="bot-field">
                        <input type="hidden" name="form-name" value="consulta" />
                        
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="nombre" className="block text-[11px] font-bold text-brand-black uppercase tracking-[0.2em]">Nombre completo <span className="text-brand-gold">*</span></label>
                                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Juan Pérez" className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:border-brand-gold focus:ring-0 transition bg-gray-50 text-brand-black font-semibold"/>
                                {errors.nombre && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.nombre}</p>}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-[11px] font-bold text-brand-black uppercase tracking-[0.2em]">Email <span className="text-brand-gold">*</span></label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="ejemplo@correo.com" className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:border-brand-gold focus:ring-0 transition bg-gray-50 text-brand-black font-semibold"/>
                                {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="telefono" className="block text-[11px] font-bold text-brand-black uppercase tracking-[0.2em]">Teléfono / WhatsApp <span className="text-brand-gold">*</span></label>
                                <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required placeholder="+56 9 8765 4321" className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:border-brand-gold focus:ring-0 transition bg-gray-50 text-brand-black font-semibold"/>
                                {errors.telefono && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.telefono}</p>}
                            </div>
                             <div className="space-y-2">
                                <label htmlFor="ciudad" className="block text-[11px] font-bold text-brand-black uppercase tracking-[0.2em]">Ciudad <span className="text-brand-gold">*</span></label>
                                <input type="text" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required placeholder="Ej: Puerto Varas, Puerto Montt, Osorno..." className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:border-brand-gold focus:ring-0 transition bg-gray-50 text-brand-black font-semibold"/>
                                {errors.ciudad && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.ciudad}</p>}
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="area" className="block text-[11px] font-bold text-brand-black uppercase tracking-[0.2em]">Tipo de consulta <span className="text-brand-gold">*</span></label>
                            <select id="area" name="area" value={formData.area} onChange={handleChange} required className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:border-brand-gold focus:ring-0 transition bg-gray-50 text-brand-black font-semibold appearance-none cursor-pointer">
                                <option value="">Seleccione el área...</option>
                                {areaOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                            </select>
                            {errors.area && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.area}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="descripcion" className="block text-[11px] font-bold text-brand-black uppercase tracking-[0.2em]">Descripción breve del caso <span className="text-brand-gold">*</span></label>
                            <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required rows={5} placeholder="Cuéntanos en 4 puntos: (1) qué pasó, (2) cuándo, (3) con quién, (4) qué objetivo buscas. Si tienes documentos (contrato, sentencia, mensajes), indícalo." className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:border-brand-gold focus:ring-0 transition bg-gray-50 text-brand-black font-semibold resize-none"></textarea>
                            {errors.descripcion && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.descripcion}</p>}
                        </div>

                        <div className="pt-4">
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <input type="checkbox" id="consentimiento" name="consentimiento" checked={formData.consentimiento} onChange={handleChange} required className="mt-1 w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-0 cursor-pointer"/>
                                <div className="space-y-1">
                                    <label htmlFor="consentimiento" className="text-xs sm:text-sm text-gray-600 font-medium cursor-pointer">
                                        He leído la <button type="button" onClick={() => { window.history.pushState({}, '', '/privacidad'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="text-brand-gold underline hover:text-brand-black transition-colors">Política de Privacidad</button> y acepto ser contactado para responder esta consulta. <span className="text-brand-gold">*</span>
                                    </label>
                                    <p className="text-[10px] text-gray-400 font-medium">Tus datos se usan solo para responder esta solicitud. No enviamos spam.</p>
                                    {errors.consentimiento && <span className="block text-red-500 text-[10px] font-bold uppercase">{errors.consentimiento}</span>}
                                </div>
                            </div>
                        </div>

                        {status === 'error' && (
                          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center" role="alert">
                            <strong className="font-bold text-sm uppercase">✗ Error al enviar. </strong>
                            <span className="text-sm font-medium">Por favor, intente contactarnos directamente vía WhatsApp.</span>
                          </div>
                        )}
                        
                        <div className="text-center">
                            <button type="submit" disabled={status === 'loading'} className="w-full px-10 py-5 text-lg font-bold uppercase tracking-widest rounded-xl bg-brand-black text-white hover:bg-brand-gold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed">
                                {status === 'loading' ? 'Procesando...' : 'Enviar consulta'}
                            </button>
                            <p className="mt-6 text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                                Te respondemos en 24–48h hábiles. <br className="sm:hidden" />
                                <span className="text-brand-gold/60">Te indicamos próximos pasos, documentos y opciones.</span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ConsultationForm;