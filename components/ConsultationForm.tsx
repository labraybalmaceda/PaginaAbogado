import React, { useEffect, useRef, useState } from 'react';
import { trackFormSubmission, trackFormSubmissionError, trackWhatsAppConversion } from '../services/tracking';
import { conIdioma, type Lang } from './i18n';

// Formulario de consulta en 3 pasos con barras de progreso.
// Hecho a mano, sin librerías (inspirado en el "Stepper" de React Bits, modo lineal:
// no se avanza sin completar el paso). Los nombres de los campos, el envío a
// Netlify Forms ("consulta") y el paso a /gracias son los mismos de antes.
// Campo nuevo (19-11): `tipo_cliente` (Empresa / Persona). También está en el
// formulario oculto de index.html: sin eso, Netlify lo descarta.
// La versión en inglés (/en) usa los mismos nombres y valores de campo; solo
// cambian los textos visibles.

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

type FormData = {
    tipo_cliente: string;
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

const STEP_FIELDS = [
    ['tipo_cliente', 'area', 'ciudad'],
    ['descripcion'],
    ['nombre', 'email', 'telefono', 'consentimiento'],
] as const;

// Valores fijos (son los que llegan a Netlify); la etiqueta cambia según el idioma.
const tipoOptions = [
    { value: 'Empresa', es: 'Empresa', en: 'Company' },
    { value: 'Persona', es: 'Persona', en: 'Individual' },
];

const areaOptions = [
    { value: "Corporativo", es: "Corporativo", en: "Corporate" },
    { value: "Asesoria mensual", es: "Asesoría mensual", en: "Monthly counsel" },
    { value: "Civil", es: "Litigios civiles", en: "Litigation" },
    { value: "Insolvencia", es: "Derecho Concursal", en: "Insolvency" },
    { value: "Inmobiliario", es: "Inmobiliario y Construcción", en: "Real estate & construction" },
    { value: "Administrativo", es: "Administrativo y Regulatorio", en: "Administrative & regulatory" },
    { value: "Arriendo", es: "Arriendo", en: "Leases" },
    { value: "Familia", es: "Familia", en: "Family" },
    { value: "Otro", es: "Otro", en: "Other" },
];

const TEXTOS = {
    es: {
        pasos: ['La consulta', 'El caso', 'Sus datos'],
        // Nombre visible de cada cuadro, para el aviso "Revise el cuadro…".
        campos: {
            tipo_cliente: 'Empresa o persona',
            area: 'Tipo de consulta',
            ciudad: 'Ciudad',
            descripcion: 'Descripción del caso',
            nombre: 'Nombre completo',
            email: 'Email',
            telefono: 'Teléfono / WhatsApp',
            consentimiento: 'Política de Privacidad',
        } as { [key: string]: string },
        titulo: <>Consulta <span className="text-brand-gold">inicial</span></>,
        paso: (n: number, total: number) => `Paso ${n} de ${total}`,
        pasosAria: 'Pasos del formulario',
        pasoAria: (n: number, label: string, done: boolean) => `Paso ${n}: ${label}${done ? ' (completado, volver)' : ''}`,
        tipoPregunta: '¿La consulta es por una empresa o a título personal?',
        personaAntes: 'Si lo prefiere, también puede escribirnos por ',
        areaPregunta: '¿Sobre qué es su consulta?',
        ciudad: 'Ciudad',
        ciudadEj: 'Ej: Puerto Varas, Puerto Montt, Osorno...',
        descripcion: 'Descripción breve del caso',
        descripcionEj: 'Indique en 4 puntos: (1) qué pasó, (2) cuándo, (3) con quién, (4) qué objetivo busca. Si tiene documentos (contrato, sentencia, mensajes), menciónelos.',
        palabras: 'palabras',
        nombre: 'Nombre completo',
        nombreEj: 'Nombre y Apellido',
        email: 'Email',
        emailEj: 'ejemplo@correo.com',
        telefono: 'Teléfono / WhatsApp',
        consentimientoAntes: 'He leído la ',
        privacidad: 'Política de Privacidad',
        consentimientoDespues: ' y acepto ser contactado para responder esta consulta.',
        datos: 'Sus datos se utilizan únicamente para contactarlo.',
        revise: (n: number) => `Revise ${n === 1 ? 'el cuadro' : 'los cuadros'}: `,
        errorEnvio: 'No pudimos enviar su consulta. Revise su conexión e intente de nuevo, o',
        errorWhatsApp: 'escríbanos por WhatsApp',
        atras: 'Atrás',
        continuar: 'Continuar',
        procesando: 'Procesando...',
        enviar: 'Enviar consulta',
        pie1: 'Respuesta en 24 horas.',
        errores: {
            nombreRequerido: 'El nombre es requerido.',
            maximo: (n: number) => `Máximo ${n} caracteres.`,
            soloLetrasNombre: 'Use solo letras en el nombre.',
            email: 'Email inválido o requerido.',
            telefonoRequerido: 'Teléfono es requerido.',
            telefono: 'Use solo números (8 a 15 dígitos).',
            ciudadRequerida: 'La ciudad es requerida.',
            soloLetrasCiudad: 'Use solo letras en la ciudad.',
            tipo: 'Indique si consulta por una empresa o a título personal.',
            area: 'El tipo de consulta es requerido.',
            descripcionRequerida: 'La descripción es requerida.',
            signos: 'No se permiten los signos < > { } [ ] ` \\',
            enlaces: 'Por seguridad, no incluya enlaces.',
            palabras: (max: number, n: number) => `Máximo ${max} palabras (lleva ${n}).`,
            consentimiento: 'Debe aceptar los términos.',
        },
    },
    en: {
        pasos: ['Your inquiry', 'The matter', 'Your details'],
        campos: {
            tipo_cliente: 'Company or individual',
            area: 'Type of inquiry',
            ciudad: 'City',
            descripcion: 'Description of the matter',
            nombre: 'Full name',
            email: 'Email',
            telefono: 'Phone / WhatsApp',
            consentimiento: 'Privacy Policy',
        } as { [key: string]: string },
        titulo: <>Initial <span className="text-brand-gold">consultation</span></>,
        paso: (n: number, total: number) => `Step ${n} of ${total}`,
        pasosAria: 'Form steps',
        pasoAria: (n: number, label: string, done: boolean) => `Step ${n}: ${label}${done ? ' (completed, go back)' : ''}`,
        tipoPregunta: 'Is the inquiry on behalf of a company or in a personal capacity?',
        personaAntes: 'If you prefer, you can also write to us on ',
        areaPregunta: 'What is your inquiry about?',
        ciudad: 'City',
        ciudadEj: 'E.g. Puerto Varas, Puerto Montt, Santiago...',
        descripcion: 'Brief description of the matter',
        descripcionEj: 'In 4 points: (1) what happened, (2) when, (3) with whom, (4) what you want to achieve. If you have documents (contract, judgment, messages), please mention them.',
        palabras: 'words',
        nombre: 'Full name',
        nombreEj: 'First and last name',
        email: 'Email',
        emailEj: 'example@email.com',
        telefono: 'Phone / WhatsApp',
        consentimientoAntes: 'I have read the ',
        privacidad: 'Privacy Policy (in Spanish)',
        consentimientoDespues: ' and agree to be contacted in response to this inquiry.',
        datos: 'Your details are used only to contact you.',
        revise: (n: number) => `Please check ${n === 1 ? 'this field' : 'these fields'}: `,
        errorEnvio: 'We could not send your inquiry. Please check your connection and try again, or',
        errorWhatsApp: 'write to us on WhatsApp',
        atras: 'Back',
        continuar: 'Continue',
        procesando: 'Sending...',
        enviar: 'Send inquiry',
        pie1: 'Reply within 24 hours.',
        errores: {
            nombreRequerido: 'Name is required.',
            maximo: (n: number) => `Maximum ${n} characters.`,
            soloLetrasNombre: 'Please use letters only in the name.',
            email: 'Invalid or missing email.',
            telefonoRequerido: 'Phone is required.',
            telefono: 'Numbers only (8 to 15 digits).',
            ciudadRequerida: 'City is required.',
            soloLetrasCiudad: 'Please use letters only in the city.',
            tipo: 'Please indicate whether the inquiry is for a company or personal.',
            area: 'The type of inquiry is required.',
            descripcionRequerida: 'A description is required.',
            signos: 'The characters < > { } [ ] ` \\ are not allowed',
            enlaces: 'For security reasons, please do not include links.',
            palabras: (max: number, n: number) => `Maximum ${max} words (currently ${n}).`,
            consentimiento: 'You must accept the terms.',
        },
    },
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

const validateField = (name: string, data: FormData, lang: Lang): string | null => {
    const e = TEXTOS[lang].errores;
    switch (name) {
        case 'nombre':
            if (!data.nombre.trim()) return e.nombreRequerido;
            if (data.nombre.length > LIMITES.nombre) return e.maximo(LIMITES.nombre);
            return SOLO_LETRAS.test(data.nombre.trim()) ? null : e.soloLetrasNombre;
        case 'email':
            if (!data.email.trim() || data.email.length > LIMITES.email) return e.email;
            return EMAIL.test(data.email.trim()) ? null : e.email;
        case 'telefono': {
            if (!data.telefono.trim()) return e.telefonoRequerido;
            const digitos = data.telefono.replace(/\D/g, '').length;
            return TELEFONO.test(data.telefono) && digitos >= 8 && digitos <= 15 ? null : e.telefono;
        }
        case 'ciudad':
            if (!data.ciudad.trim()) return e.ciudadRequerida;
            if (data.ciudad.length > LIMITES.ciudad) return e.maximo(LIMITES.ciudad);
            return /^[\p{L}\p{M}' .,-]+$/u.test(data.ciudad.trim()) ? null : e.soloLetrasCiudad;
        case 'tipo_cliente':
            return tipoOptions.some(o => o.value === data.tipo_cliente) ? null : e.tipo;
        case 'area':
            return areaOptions.some(o => o.value === data.area) ? null : e.area;
        case 'descripcion': {
            if (!data.descripcion.trim()) return e.descripcionRequerida;
            if (SIGNOS_PROHIBIDOS.test(data.descripcion)) return e.signos;
            if (ENLACES.test(data.descripcion)) return e.enlaces;
            const palabras = contarPalabras(data.descripcion);
            if (palabras > MAX_PALABRAS) return e.palabras(MAX_PALABRAS, palabras);
            return data.descripcion.length > LIMITES.descripcion ? e.maximo(LIMITES.descripcion) : null;
        }
        case 'consentimiento': return data.consentimiento ? null : e.consentimiento;
        default: return null;
    }
};

const inputClass = "w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:border-brand-gold focus:ring-0 transition bg-gray-50 text-brand-black font-semibold";
const labelClass = "block text-[11px] font-bold text-brand-black uppercase tracking-[0.2em]";
const ErrorText: React.FC<{ msg?: string }> = ({ msg }) =>
    msg ? <p className="text-red-500 text-[10px] font-bold uppercase mt-1" role="alert">{msg}</p> : null;

const ConsultationForm: React.FC<{ lang?: Lang }> = ({ lang: langProp }) => {
    const lang: Lang = langProp ?? 'es';
    const t = TEXTOS[lang];
    const [formData, setFormData] = useState<FormData>({
        tipo_cliente: '',
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
    const last = STEP_FIELDS.length - 1;
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
        for (const field of STEP_FIELDS[index]) {
            const msg = validateField(field, formData, lang);
            if (msg) stepErrors[field] = msg;
        }
        setErrors(stepErrors);
        const primero = Object.keys(stepErrors)[0];
        if (primero) {
            // Lleva el cursor al primer cuadro con problema.
            window.setTimeout(() => {
                const el = primero === 'area' || primero === 'tipo_cliente'
                    ? document.querySelector<HTMLElement>(`#consulta input[name="${primero}"]`)
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
            tipo_cliente: formData.tipo_cliente,
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
                        <h2 className="text-3xl sm:text-4xl font-bold text-brand-black font-baskerville uppercase tracking-tight not-italic">
                            {t.titulo}
                        </h2>
                    </div>

                    {/* Progreso: una barra por paso. Se puede volver a un paso ya hecho, no saltar adelante. */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                                {t.paso(step + 1, STEP_FIELDS.length)}
                            </p>
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-black">
                                {t.pasos[step]}
                            </p>
                        </div>
                        <ol className="grid grid-cols-3 gap-2" aria-label={t.pasosAria}>
                            {t.pasos.map((label, i) => {
                                const done = i < step;
                                const current = i === step;
                                return (
                                    <li key={label}>
                                        <button
                                            type="button"
                                            onClick={() => done && goTo(i)}
                                            disabled={!done}
                                            aria-current={current ? 'step' : undefined}
                                            aria-label={t.pasoAria(i + 1, label, done)}
                                            className={`block w-full py-2 ${done ? 'cursor-pointer' : 'cursor-default'}`}
                                        >
                                            <span className="block h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                                <span
                                                    className="block h-full rounded-full bg-brand-gold transition-[width] duration-500 ease-out"
                                                    style={{ width: done || current ? '100%' : '0%' }}
                                                />
                                            </span>
                                            <span className={`hidden sm:block mt-2 text-left text-[10px] font-bold uppercase tracking-[0.15em] ${current ? 'text-brand-black' : done ? 'text-brand-gold' : 'text-gray-300'}`}>
                                                {label}
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
                                        <legend className={`${labelClass} mb-3 leading-relaxed`}>{t.tipoPregunta} <span className="text-brand-gold">*</span></legend>
                                        <div className="grid grid-cols-2 gap-3">
                                            {tipoOptions.map(option => {
                                                const selected = formData.tipo_cliente === option.value;
                                                return (
                                                    <label
                                                        key={option.value}
                                                        className={`flex items-center justify-center text-center px-3 py-4 rounded-xl border-2 text-sm font-bold cursor-pointer transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-gold/40 ${
                                                            selected ? 'border-brand-gold bg-brand-gold/10 text-brand-black' : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-brand-gold/40'
                                                        }`}
                                                    >
                                                        <input type="radio" name="tipo_cliente" value={option.value} checked={selected} onChange={handleChange} className="sr-only" />
                                                        {option[lang]}
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        <ErrorText msg={errors.tipo_cliente} />
                                        {/* A título personal: se ofrece también WhatsApp (no bloquea el envío). */}
                                        {formData.tipo_cliente === 'Persona' && (
                                            <p className="text-xs text-gray-500 font-medium">
                                                {t.personaAntes}
                                                <a
                                                    href="https://wa.me/56977646224"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => trackWhatsAppConversion(conIdioma('Formulario Persona', lang))}
                                                    className="font-bold text-brand-gold underline hover:text-brand-black transition-colors"
                                                >
                                                    WhatsApp
                                                </a>.
                                            </p>
                                        )}
                                    </fieldset>

                                    <fieldset className="space-y-3">
                                        <legend className={`${labelClass} mb-3`}>{t.areaPregunta} <span className="text-brand-gold">*</span></legend>
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
                                                        {option[lang]}
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        <ErrorText msg={errors.area} />
                                    </fieldset>

                                    <div className="space-y-2">
                                        <label htmlFor="ciudad" className={labelClass}>{t.ciudad} <span className="text-brand-gold">*</span></label>
                                        <input type="text" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required maxLength={LIMITES.ciudad} autoComplete="address-level2" placeholder={t.ciudadEj} className={inputClass} />
                                        <ErrorText msg={errors.ciudad} />
                                    </div>
                                </>
                            )}

                            {step === 1 && (
                                <div className="space-y-2">
                                    <label htmlFor="descripcion" className={labelClass}>{t.descripcion} <span className="text-brand-gold">*</span></label>
                                    <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required rows={7} maxLength={LIMITES.descripcion} placeholder={t.descripcionEj} className={`${inputClass} resize-none`}></textarea>
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <ErrorText msg={errors.descripcion} />
                                        </div>
                                        <p className={`shrink-0 text-[11px] font-bold tabular-nums ${palabras > MAX_PALABRAS ? 'text-red-500' : 'text-gray-400'}`} aria-live="polite">
                                            {palabras} / {MAX_PALABRAS} {t.palabras}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <>
                                    <div className="space-y-2">
                                        <label htmlFor="nombre" className={labelClass}>{t.nombre} <span className="text-brand-gold">*</span></label>
                                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required maxLength={LIMITES.nombre} autoComplete="name" placeholder={t.nombreEj} className={inputClass} />
                                        <ErrorText msg={errors.nombre} />
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="email" className={labelClass}>{t.email} <span className="text-brand-gold">*</span></label>
                                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required maxLength={LIMITES.email} autoComplete="email" placeholder={t.emailEj} className={inputClass} />
                                            <ErrorText msg={errors.email} />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="telefono" className={labelClass}>{t.telefono} <span className="text-brand-gold">*</span></label>
                                            <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required maxLength={LIMITES.telefono} inputMode="tel" autoComplete="tel" placeholder="+56 9 8765 4321" className={inputClass} />
                                            <ErrorText msg={errors.telefono} />
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <input type="checkbox" id="consentimiento" name="consentimiento" checked={formData.consentimiento} onChange={handleChange} required className="mt-1 w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-0 cursor-pointer" />
                                        <div className="space-y-1">
                                            <label htmlFor="consentimiento" className="text-xs sm:text-sm text-gray-600 font-medium cursor-pointer">
                                                {t.consentimientoAntes}<a href="/privacidad" role="button" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/privacidad'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="text-brand-gold underline hover:text-brand-black transition-colors">{t.privacidad}</a>{t.consentimientoDespues} <span className="text-brand-gold">*</span>
                                            </label>
                                            <p className="text-[10px] text-gray-400 font-medium">{t.datos}</p>
                                            {errors.consentimiento && <span className="block text-red-500 text-[10px] font-bold uppercase" role="alert">{errors.consentimiento}</span>}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {Object.keys(errors).length > 0 && (
                          <div className="mt-6 bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-sm" role="alert">
                            <strong className="font-bold">{t.revise(Object.keys(errors).length)}</strong>
                            {Object.keys(errors).map(k => t.campos[k] || k).join(', ')}.
                          </div>
                        )}

                        {status === 'error' && (
                          <div className="mt-6 bg-gray-50 border border-gray-200 text-brand-black p-4 rounded-xl text-center text-sm" role="alert">
                            {t.errorEnvio}{' '}
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
                                {t.errorWhatsApp}
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
                                    {t.atras}
                                </button>
                            ) : <span className="hidden sm:block" />}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 text-base sm:text-lg font-bold uppercase tracking-widest rounded-xl bg-brand-black text-white hover:bg-brand-gold transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {step < last ? (
                                    <>
                                        {t.continuar}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                    </>
                                ) : status === 'loading' ? t.procesando : t.enviar}
                            </button>
                        </div>

                        <p className="mt-6 text-center text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                            {t.pie1}
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ConsultationForm;
