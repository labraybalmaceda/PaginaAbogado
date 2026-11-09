import React, { useEffect, useState } from 'react';
import { navigateTo } from './blogUtils';

export interface SidebarItem {
    id: string;
    label: string;
}

/**
 * Índice lateral de un artículo: línea vertical con marcas, la sección activa
 * en dorado y una barra de avance de lectura. Sin dependencias.
 * Inspirado en el patrón "line sidebar", con la paleta del estudio.
 */
const useScrollSpy = (items: SidebarItem[], articleId: string) => {
    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            // Sección activa: la última cuyo título ya pasó la franja superior.
            let current = 0;
            items.forEach((item, i) => {
                const el = document.getElementById(item.id);
                if (el && el.getBoundingClientRect().top <= 140) current = i;
            });
            setActive(current);

            // Avance de lectura del artículo (0 a 100).
            const article = document.getElementById(articleId);
            if (article) {
                const rect = article.getBoundingClientRect();
                const total = rect.height - window.innerHeight * 0.5;
                const done = -rect.top + window.innerHeight * 0.25;
                setProgress(Math.min(100, Math.max(0, (done / total) * 100)));
            }
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [items, articleId]);

    return { active, progress };
};

const goTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
};

const LineList: React.FC<{ items: SidebarItem[]; active: number }> = ({ items, active }) => (
    <ol className="relative border-l border-gray-200 ml-1">
        {items.map((item, i) => {
            const isActive = i === active;
            return (
                <li key={item.id} className="relative">
                    <span
                        aria-hidden="true"
                        className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 rounded-full transition-all duration-300 ${
                            isActive ? 'w-4 bg-brand-gold' : 'w-2 bg-gray-300'
                        }`}
                    />
                    <a
                        href={`#${item.id}`}
                        onClick={(e) => goTo(e, item.id)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`block py-2 pl-7 pr-2 text-[13px] leading-snug transition-colors duration-300 ${
                            isActive
                                ? 'font-bold text-brand-black'
                                : 'text-gray-500 hover:text-brand-black'
                        }`}
                    >
                        {item.label}
                    </a>
                </li>
            );
        })}
    </ol>
);

const ArticleSidebar: React.FC<{ items: SidebarItem[]; articleId: string; variant: 'mobile' | 'desktop' }> = ({ items, articleId, variant }) => {
    const { active, progress } = useScrollSpy(items, articleId);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    if (items.length < 2) return null;

    if (variant === 'mobile') {
        return (
            <div className="lg:hidden">
                {/* Teléfono: pestaña fija en el borde derecho; al tocarla se abre un panel compacto */}
                {open && (
                    <div
                        aria-hidden="true"
                        className="fixed inset-0 z-40"
                        onClick={() => setOpen(false)}
                    />
                )}
                <div
                    className={`fixed right-0 top-[38%] z-50 flex items-start transition-transform duration-300 ease-out ${
                        open ? 'translate-x-0' : 'translate-x-[calc(100%-2rem)]'
                    }`}
                >
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-label={open ? 'Cerrar índice del artículo' : 'Abrir índice del artículo'}
                        className="relative w-8 h-14 shrink-0 flex flex-col items-end justify-center gap-1.5 pr-2 rounded-l-xl bg-brand-black text-brand-gold shadow-xl border-y border-l border-brand-gold/60"
                    >
                        <span aria-hidden="true" className="h-0.5 w-4 rounded-full bg-current" />
                        <span aria-hidden="true" className="h-0.5 w-2.5 rounded-full bg-current" />
                        <span aria-hidden="true" className="h-0.5 w-3.5 rounded-full bg-current" />
                    </button>
                    <div className="w-[68vw] max-w-[250px] max-h-[46vh] overflow-y-auto bg-white shadow-2xl rounded-bl-2xl border-t-4 border-brand-gold">
                        <div className="h-0.5 bg-gray-100" role="presentation">
                            <div className="h-full bg-brand-gold" style={{ width: `${progress}%` }} />
                        </div>
                        <p className="px-4 pt-3 pb-2 text-[10px] uppercase tracking-widest font-bold text-brand-gold">
                            En este artículo
                        </p>
                        <nav
                            aria-label="Índice del artículo"
                            className="px-3 pb-3"
                            onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setOpen(false); }}
                        >
                            <LineList items={items} active={active} />
                        </nav>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Escritorio: tarjeta fija a la derecha */}
            <aside className="hidden lg:block sticky top-28">
                <div className="bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[calc(100vh-8rem)]">
                    <div className="h-1.5 bg-gray-100" role="presentation">
                        <div
                            className="h-full bg-brand-gold transition-[width] duration-150"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="p-6">
                        <p className="text-[11px] uppercase tracking-widest font-bold text-brand-gold mb-4">
                            En este artículo
                        </p>
                        <nav aria-label="Índice del artículo">
                            <LineList items={items} active={active} />
                        </nav>

                        <div className="mt-6 pt-5 border-t border-gray-100">
                            <p className="text-sm font-bold font-baskerville text-brand-black mb-1">
                                Consulte su caso
                            </p>
                            <p className="text-xs text-gray-500 leading-relaxed mb-4">
                                Revisamos los antecedentes y orientamos con claridad.
                            </p>
                            <a
                                href="/#consulta"
                                onClick={(e) => { e.preventDefault(); navigateTo('/#consulta'); }}
                                className="block text-center px-4 py-3 text-[11px] font-bold uppercase tracking-widest rounded-lg bg-brand-black text-white hover:bg-brand-gold transition-colors duration-300"
                            >
                                Agenda con un abogado
                            </a>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default ArticleSidebar;
