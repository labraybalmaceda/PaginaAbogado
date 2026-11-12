import React, { useEffect, useRef, useState } from 'react';
import { trackFormSubmission, trackFormSubmissionError } from '../services/tracking';

// Formulario de consulta en 3 pasos con barras de progreso.
// Hecho a mano, sin librerías (inspirado en el "Stepper" de React Bits, modo lineal:
// no se avanza sin completar el paso). Los nombres de los campos, el envío a
// Netlify Forms ("consulta") y el paso a /gracias son los mismos de antes.

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

type FormData = {
    nombre: string;
    email: string;
    telefono: string;
    ciudad: string;
    area: string;
    descripcion: string;
    consentimiento: boolean;
};

// Helper function to encode form data for Netlify
const encode = (data: { [key: string]: any }) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

const STEPS = [
    { label: 'Tu consulta', fields: ['area', 'ciudad'] },
    { label: 'El caso', fields: ['descripcion'] },
    { label: 'Tus datos', fields: ['nombre', 'email', 'telefono', 'consentimiento'] },
] as const;

const areaOptions = [
    { value: "Familia", label: "Familia" },
    { value: "Arriendo", label: "Arriendo" },
    { value: "Civil", label: "Civil" },
    { value: "Insolvencia", label: "Derecho Concursal" },
    { value: "Corporativo", label: "Corporativo" },
    { value: "Otro", label: "Otro" },
];

// Nombre visible de cada cuadro, para el aviso "Revise el cuadro…".
const NOMBRES_CAMPOS: { [key: string]: string } = {
    area: 'Tipo de consulta',
    ciudad: 'Ciudad',
    descripcion: 'Descripción del caso',
    nombre: 'Nombre completo',
    email: 'Email',
    telefono: 'Teléfono / WhatsApp',
    consentimiento: 'Política de Privacidad',
};

// ---- Medidas básicas de seguridad ----
// Topes de largo (también van como maxLength en cada campo).
const LIMITES = { nombre: 80, email: 120, telefono: 20, ciudad: 60, descripcion: 2000 } as const;
const MAX_PALABRAS = 300;
const contarPalabras = (texto: string) => (texto.trim() ? texto.trim().split(/\s+/).length : 0);

// Signos que no tienen uso en una consulta y sirven para inyectar código o plantillas.
const SIGNOS_PROHIBIDOS = /[<>{}[\]`\\]/;
// Enlaces y esquemas peligrosos: es lo típico del spam y de los intentos de inyección.
const ENLACES = /(https?:\/\/|www\.|javascript:|data:|vbscript:)/i;
// Solo letras (con tildes y ñ), espacios, apóstrofo, punto y guion.
const SOLO_LETRAS = /^[\p{L}\p{M}' .-]+$/u;
const EMAIL = /^[^\s@<>()[\]\\,;:"']+@[^\s@<>()[\]\\,;:"']+\.[A-Za-z]{2,}$/;
const TELEFONO = /^[+\d\s()-]+$/;

/** Limpia un texto antes de enviarlo: caracteres de control y signos que una planilla
 *  (Excel) interpretaría como fórmula al exportar las consultas. */
const limpiar = (texto: string, multilinea = false) => {
    const sinControl = texto.replace(multilinea ? /[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, ' ');
    return sinControl.trim().replace(/^[=+\-@]+/, '').trim();
};

const validateField = (name: string, data: FormData): string | null => {
    switch (name) {
        case 'nombre':
            if (!data.nombre.trim()) return 'El nombre es requerido.';
            if (data.nombre.length > LIMITES.nombre) return `Máximo ${LIMITES.nombre} caracteres.`;
            return SOLO_LETRAS.test(data.nombre.trim()) ? null : 'Use solo letras en el nombre.';
        case 'email':
            if (!data.email.trim() || data.email.length > LIMITES.email) return 'Email inválido o requerido.';
            return EMAIL.test(data.email.trim()) ? null : 'Email inválido o requerido.';
        case 'telefono': {
            if (!data.telefono.trim()) return 'Teléfono es requerido.';
            const digitos = data.telefono.replace(/\D/g, '').length;
            return TELEFONO.test(data.telefono) && digitos >= 8 && digitos <= 15 ? null : 'Use solo números (8 a 15 dígitos).';
        }
        case 'ciudad':
            if (!data.ciudad.trim()) return 'La ciudad es requerida.';
            if (data.ciudad.length > LIMITES.ciudad) return `Máximo ${LIMITES.ciudad} caracteres.`;
            return /^[\p{L}\p{M}' .,-]+$/u.test(data.ciudad.trim()) ? null : 'Use solo letras en la ciudad.';
        case 'area':
            return areaOptions.some(o => o.value === data.area) ? null : 'El tipo de consulta es requerido.';
        case 'descripcion': {
            if (!data.descripcion.trim()) return 'La descripción es requerida.';
            if (SIGNOS_PROHIBIDOS.test(data.descripcion)) return 'No se permiten los signos < > { } [ ] ` \\';
            if (ENLACES.test(data.descripcion)) return 'Por seguridad, no incluya enlaces.';
            const palabras = contarPalabras(data.descripcion);
            if (palabras > MAX_PALABRAS) return `Máximo ${MAX_PALABRAS} palabras (lleva ${palabras}).`;
            return data.descripcion.length > LIMITES.descripcion ? `Máximo ${LIMITES.descripcion} caracteres.` : null;
        }
        case 'consentimiento': return data.consentimiento ? null : 'Debe aceptar los términos.';
        default: return null;
    }
};

const inputClass = "w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:border-brand-gold focus:ring-0 transition bg-gray-50 text-brand-black font-semibold";
const labelClass = "block text-[11px] font-bold text-brand-black uppercase tracking-[0.2em]";
const ErrorText: React.FC<{ msg?: string }> = ({ msg }) =>
    msg ? <p className="text-red-500 text-[10px] font-bold uppercase mt-1" role="alert">{msg}</p> : null;

const ConsultationForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
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
    const [step, setStep] = useState(0);
    const direction = useRef(1);
    const stepRef = useRef<HTMLDivElement>(null);
    const firstRender = useRef(true);
    const last = STEPS.length - 1;
    // Anti-bots: campo trampa invisible y tiempo mínimo desde que cargó la página.
    const honeypotRef = useRef<HTMLInputElement>(null);
    const cargadoEn = useRef(Date.now());
    const palabras = contarPalabras(formData.descripcion);

    // Al cambiar de paso: entrada suave y foco en el primer campo (no al cargar la página).
    useEffect(() => {
        if (firstRender.current) { firstRender.current = false; return; }
        const el = stepRef.current;
        if (!el) return;
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        if (!reduce && typeof el.animate === 'function') {
            el.animate(
                [{ opacity: 0, transform: `translateX(${direction.current * 24}px)` }, { opacity: 1, transform: 'translateX(0)' }],
                { duration: 350, easing: 'cubic-bezier(0.22, 0.8, 0.2, 1)' }
            );
        }
        el.querySelector<HTMLElement>('input:not([type="hidden"]), textarea')?.focus({ preventScroll: true });
    }, [step]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) setErrors(prev => { const next = { ...prev }; delete next[name]; return next; });
    };

    const validateStep = (index: number): boolean => {
        const stepErrors: { [key: string]: string } = {};
        for (const field of STEPS[index].fields) {
            const msg = validateField(field, formData);
            if (msg) stepErrors[field] = msg;
        }
        setErrors(stepErrors);
        const primero = Object.keys(stepErrors)[0];
        if (primero) {
            // Lleva el cursor al primer cuadro con problema.
            window.setTimeout(() => {
                const el = primero === 'area'
                    ? document.querySelector<HTMLElement>('#consulta input[name="area"]')
                    : document.getElementById(primero);
                el?.focus();
            }, 0);
        }
        return Object.keys(stepErrors).length === 0;
    };

    const goTo = (index: number) => {
        direction.current = index > step ? 1 : -1;
        setStep(index);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep(step)) return;

        // Pasos intermedios: "Continuar" (o Enter) avanza en vez de enviar.
        if (step < last) {
            goTo(step + 1);
            return;
        }

        // Un bot llena el campo trampa o envía en segundos: se descarta en silencio
        // (sin ir a /gracias, para no registrar una conversión falsa en Google Ads).
        if (honeypotRef.current?.value || Date.now() - cargadoEn.current < 4000) return;

        // Revalida todo antes de enviar (por si alguien manipuló un paso anterior).
        for (let i = 0; i <= last; i++) {
            if (!validateStep(i)) { goTo(i); return; }
        }

        const limpio = {
            nombre: limpiar(formData.nombre),
            email: limpiar(formData.email),
            telefono: formData.telefono.replace(/[^+\d\s()-]/g, '').trim(),
            ciudad: limpiar(formData.ciudad),
            area: formData.area,
            descripcion: limpiar(formData.descripcion, true),
            consentimiento: formData.consentimiento,
        };

        setStatus('loading');
        try {
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode({ "form-name": "consulta", ...limpio })
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

    return (
        <section id="consulta" className="py-20 sm:py-28 bg-cover bg-center overflow-hidden" style={{ backgroundImage: "linear-gradient(to bottom, rgb(249, 250, 251) 0%, rgba(17, 17, 17, 0.75) 12%, rgba(17, 17, 17, 0.8) 100%), url('/foto2.jpg')" }}>
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
                <div className="bg-white p-6 sm:p-12 rounded-3xl shadow-2xl border border-gray-100 relative">

                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-brand-black font-baskerville uppercase tracking-tight not-italic">
                            Consulta <span className="text-brand-gold">inicial</span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-500 font-medium italic">
                            Respuesta en 24 horas. Atención reservada.
                        </p>
                    </div>

                    {/* Progreso: una barra por paso. Se puede volver a un paso ya hecho, no saltar adelante. */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                                Paso {step + 1} de {STEPS.length}
                            </p>
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-black">
                                {STEPS[step].label}
                            </p>
                        </div>
                        <ol className="grid grid-cols-3 gap-2" aria-label="Pasos del formulario">
                            {STEPS.map((s, i) => {
                                const done = i < step;
                                const current = i === step;
                                return (
                                    <li key={s.label}>
                                        <button
                                            type="button"
                                            onClick={() => done && goTo(i)}
                                            disabled={!done}
                                            aria-current={current ? 'step' : undefined}
                                            aria-label={`Paso ${i + 1}: ${s.label}${done ? ' (completado, volver)' : ''}`}
                                            className={`block w-full py-2 ${done ? 'cursor-pointer' : 'cursor-default'}`}
                                        >
                                            <span className="block h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                                <span
                                                    className="block h-full rounded-full bg-brand-gold transition-[width] duration-500 ease-out"
                                                    style={{ width: done || current ? '100%' : '0%' }}
                                                />
                                            </span>
                                            <span className={`hidden sm:block mt-2 text-left text-[10px] font-bold uppercase tracking-[0.15em] ${current ? 'text-brand-black' : done ? 'text-brand-gold' : 'text-gray-300'}`}>
                                                {s.label}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>

                    <form name="consulta" onSubmit={handleSubmit} noValidate data-netlify="true" netlify-honeypot="bot-field">
                        <input type="hidden" name="form-name" value="consulta" />
                        {/* Campo trampa: invisible para las personas; si un bot lo llena, la consulta se descarta. */}
                        <p className="hidden" aria-hidden="true">
                            <label>No llenar: <input ref={honeypotRef} name="bot-field" tabIndex={-1} autoComplete="off" /></label>
                        </p>

                        <div ref={stepRef} className="space-y-6 min-h-[18rem]">
                            {step === 0 && (
                                <>
                                    <fieldset className="space-y-3">
                                        <legend className={`${labelClass} mb-3`}>¿Sobre qué es tu consulta? <span className="text-brand-gold">*</span></legend>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {areaOptions.map(option => {
                                                const selected = formData.area === option.value;
                                                return (
                                                    <label
                                                        key={option.value}
                                                        className={`flex items-center justify-center text-center px-3 py-4 rounded-xl border-2 text-sm font-bold cursor-pointer transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-gold/40 ${
                                                            selected ? 'border-brand-gold bg-brand-gold/10 text-brand-black' : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-brand-gold/40'
                                                        }`}
                                                    >
                                                        <input type="radio" name="area" value={option.value} checked={selected} onChange={handleChange} className="sr-only" />
                                                        {option.label}
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        <ErrorText msg={errors.area} />
                                    </fieldset>

                                    <div className="space-y-2">
                                        <label htmlFor="ciudad" className={labelClass}>Ciudad <span className="text-brand-gold">*</span></label>
                                        <input type="text" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required maxLength={LIMITES.ciudad} autoComplete="address-level2" placeholder="Ej: Puerto Varas, Puerto Montt, Osorno..." className={inputClass} />
                                        <ErrorText msg={errors.ciudad} />
                                    </div>
                                </>
                            )}

                            {step === 1 && (
                                <div className="space-y-2">
                                    <label htmlFor="descripcion" className={labelClass}>Descripción breve del caso <span className="text-brand-gold">*</span></label>
                                    <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required rows={7} maxLength={LIMITES.descripcion} placeholder="Cuéntanos en 4 puntos: (1) qué pasó, (2) cuándo, (3) con quién, (4) qué objetivo buscas. Si tienes documentos (contrato, sentencia, mensajes), indícalo." className={`${inputClass} resize-none`}></textarea>
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <ErrorText msg={errors.descripcion} />
                                            <p className="text-[11px] text-gray-400 font-medium">No hace falta que sea largo: con lo esencial te indicamos los próximos pasos.</p>
                                        </div>
                                        <p className={`shrink-0 text-[11px] font-bold tabular-nums ${palabras > MAX_PALABRAS ? 'text-red-500' : 'text-gray-400'}`} aria-live="polite">
                                            {palabras} / {MAX_PALABRAS} palabras
                                        </p>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <>
                                    <div className="space-y-2">
                                        <label htmlFor="nombre" className={labelClass}>Nombre completo <span className="text-brand-gold">*</span></label>
                                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required maxLength={LIMITES.nombre} autoComplete="name" placeholder="Nombre y Apellido" className={inputClass} />
                                        <ErrorText msg={errors.nombre} />
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="email" className={labelClass}>Email <span className="text-brand-gold">*</span></label>
                                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required maxLength={LIMITES.email} autoComplete="email" placeholder="ejemplo@correo.com" className={inputClass} />
                                            <ErrorText msg={errors.email} />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="telefono" className={labelClass}>Teléfono / WhatsApp <span className="text-brand-gold">*</span></label>
                                            <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required maxLength={LIMITES.telefono} inputMode="tel" autoComplete="tel" placeholder="+56 9 8765 4321" className={inputClass} />
                                            <ErrorText msg={errors.telefono} />
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <input type="checkbox" id="consentimiento" name="consentimiento" checked={formData.consentimiento} onChange={handleChange} required className="mt-1 w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-0 cursor-pointer" />
                                        <div className="space-y-1">
                                            <label htmlFor="consentimiento" className="text-xs sm:text-sm text-gray-600 font-medium cursor-pointer">
                                                He leído la <a href="/privacidad" role="button" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/privacidad'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="text-brand-gold underline hover:text-brand-black transition-colors">Política de Privacidad</a> y acepto ser contactado para responder esta consulta. <span className="text-brand-gold">*</span>
                                            </label>
                                            <p className="text-[10px] text-gray-400 font-medium">Tus datos se usan solo para responder esta solicitud. No enviamos spam.</p>
                                            {errors.consentimiento && <span className="block text-red-500 text-[10px] font-bold uppercase" role="alert">{errors.consentimiento}</span>}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {Object.keys(errors).length > 0 && (
                          <div className="mt-6 bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-sm" role="alert">
                            <strong className="font-bold">Revise {Object.keys(errors).length === 1 ? 'el cuadro' : 'los cuadros'}: </strong>
                            {Object.keys(errors).map(k => NOMBRES_CAMPOS[k] || k).join(', ')}.
                          </div>
                        )}

                        {status === 'error' && (
                          <div className="mt-6 bg-gray-50 border border-gray-200 text-brand-black p-4 rounded-xl text-center text-sm" role="alert">
                            No pudimos enviar su consulta. Revise su conexión e intente de nuevo, o{' '}
                            <a
                                href="https://wa.me/56977646224"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-brand-gold underline hover:text-brand-black transition-colors"
                                onClick={() => {
                                    if (typeof (window as any).gtag === 'function') {
                                        (window as any).gtag('event', 'conversion', {
                                            'send_to': 'AW-18229137722/JKXKCOXx5MkcELqiqvRD',
                                            'value': 1.0,
                                            'currency': 'CLP'
                                        });
                                    }
                                }}
                            >
                                escríbanos por WhatsApp
                            </a>.
                          </div>
                        )}

                        {/* Navegación entre pasos */}
                        <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
                            {step > 0 ? (
                                <button
                                    type="button"
                                    onClick={() => goTo(step - 1)}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-black transition-colors cursor-pointer"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                                    Atrás
                                </button>
                            ) : <span className="hidden sm:block" />}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 text-base sm:text-lg font-bold uppercase tracking-widest rounded-xl bg-brand-black text-white hover:bg-brand-gold transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {step < last ? (
                                    <>
                                        Continuar
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                    </>
                                ) : status === 'loading' ? 'Procesando...' : 'Enviar consulta'}
                            </button>
                        </div>

                        <p className="mt-6 text-center text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                            Te respondemos en 24 horas. <br className="sm:hidden" />
                            <span className="text-brand-gold/60">Te indicamos próximos pasos, documentos y opciones.</span>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ConsultationForm;
