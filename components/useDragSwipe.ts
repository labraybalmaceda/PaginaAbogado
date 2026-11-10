import React, { useRef, useState } from 'react';

/**
 * Arrastre horizontal con mouse o dedo para carruseles. Sin librerías.
 * - Mientras se arrastra, `dx` dice cuántos píxeles se movió (para que el contenido siga al puntero).
 * - Al soltar, si pasó el umbral, llama a `onSwipe(1)` (siguiente) u `onSwipe(-1)` (anterior).
 * - Si el gesto es vertical, no hace nada y deja que la página se desplace.
 * - Después de un arrastre, anula el clic que dispara el navegador al soltar,
 *   para no abrir un enlace por accidente.
 */
export const useDragSwipe = (onSwipe: (dir: 1 | -1) => void, threshold = 60) => {
    const start = useRef<{ x: number; y: number } | null>(null);
    const moved = useRef(false);
    const [dx, setDx] = useState(0);
    const [dragging, setDragging] = useState(false);

    const finish = (e: React.PointerEvent<HTMLElement>, cancelled: boolean) => {
        if (!start.current) return;
        const delta = e.clientX - start.current.x;
        start.current = null;
        if (moved.current && !cancelled && Math.abs(delta) > threshold) onSwipe(delta < 0 ? 1 : -1);
        setDx(0);
        setDragging(false);
    };

    const bind = {
        onPointerDown: (e: React.PointerEvent<HTMLElement>) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            start.current = { x: e.clientX, y: e.clientY };
            moved.current = false;
        },
        onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
            if (!start.current) return;
            const deltaX = e.clientX - start.current.x;
            const deltaY = e.clientY - start.current.y;
            if (!moved.current) {
                if (Math.abs(deltaX) < 6) return;
                if (Math.abs(deltaY) > Math.abs(deltaX)) { start.current = null; return; }
                moved.current = true;
                setDragging(true);
                e.currentTarget.setPointerCapture(e.pointerId);
            }
            setDx(deltaX);
        },
        onPointerUp: (e: React.PointerEvent<HTMLElement>) => finish(e, false),
        onPointerCancel: (e: React.PointerEvent<HTMLElement>) => finish(e, true),
        onClickCapture: (e: React.MouseEvent<HTMLElement>) => {
            if (moved.current) {
                e.preventDefault();
                e.stopPropagation();
                moved.current = false;
            }
        },
        // Evita que el navegador "arrastre" el enlace o la imagen como archivo.
        onDragStart: (e: React.DragEvent<HTMLElement>) => e.preventDefault(),
    };

    return { dx, dragging, bind };
};
