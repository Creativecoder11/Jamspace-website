"use client";

import { useCallback, useRef, useState } from "react";
import type { PointerEvent, KeyboardEvent } from "react";
import Image from "next/image";

const DragHandle = () => (
    <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
    >
        <circle cx="21" cy="21" r="21" fill="white" />
        <g clipPath="url(#clip0_734_7080)">
            <path
                d="M21.9906 13.8L21.9906 28.2C21.9906 28.4122 21.9063 28.6157 21.7563 28.7657C21.6063 28.9157 21.4028 29 21.1906 29C20.9785 29 20.775 28.9157 20.6249 28.7657C20.4749 28.6157 20.3906 28.4122 20.3906 28.2L20.3906 13.8C20.3906 13.5878 20.4749 13.3843 20.6249 13.2343C20.775 13.0843 20.9785 13 21.1906 13C21.4028 13 21.6063 13.0843 21.7563 13.2343C21.9063 13.3843 21.9906 13.5878 21.9906 13.8Z"
                fill="#E92A7B"
            />
            <path
                d="M17.4125 28.2L17.4125 13.8C17.4125 13.5878 17.3282 13.3843 17.1782 13.2343C17.0282 13.0843 16.8247 13 16.6125 13C16.4003 13 16.1968 13.0843 16.0468 13.2343C15.8968 13.3843 15.8125 13.5878 15.8125 13.8L15.8125 28.2C15.8125 28.4122 15.8968 28.6157 16.0468 28.7657C16.1968 28.9157 16.4003 29 16.6125 29C16.8247 29 17.0282 28.9157 17.1782 28.7657C17.3282 28.6157 17.4125 28.4122 17.4125 28.2Z"
                fill="#E92A7B"
            />
            <path
                d="M26.1781 28.2L26.1781 13.8C26.1781 13.5878 26.0938 13.3843 25.9438 13.2343C25.7938 13.0843 25.5903 13 25.3781 13C25.166 13 24.9625 13.0843 24.8124 13.2343C24.6624 13.3843 24.5781 13.5878 24.5781 13.8L24.5781 28.2C24.5781 28.4122 24.6624 28.6157 24.8124 28.7657C24.9625 28.9157 25.166 29 25.3781 29C25.5903 29 25.7938 28.9157 25.9438 28.7657C26.0938 28.6157 26.1781 28.4122 26.1781 28.2Z"
                fill="#E92A7B"
            />
        </g>
        <defs>
            <clipPath id="clip0_734_7080">
                <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(13 29) rotate(-90)"
                />
            </clipPath>
        </defs>
    </svg>
);

const ProjectsBeforeAfter = () => {
    const [pos, setPos] = useState(50);

    const trackRef = useRef<HTMLDivElement | null>(null);
    const draggingRef = useRef(false);

    const updateFromX = useCallback((clientX: number) => {
        const el = trackRef.current;

        if (!el) return;

        const rect = el.getBoundingClientRect();

        const x = Math.min(
            Math.max(clientX - rect.left, 0),
            rect.width
        );

        setPos((x / rect.width) * 100);
    }, []);

    const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
        draggingRef.current = true;

        e.currentTarget.setPointerCapture(e.pointerId);

        updateFromX(e.clientX);
    };

    const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
        if (!draggingRef.current) return;

        updateFromX(e.clientX);
    };

    const stopDragging = (e: PointerEvent<HTMLDivElement>) => {
        draggingRef.current = false;

        e.currentTarget.releasePointerCapture?.(e.pointerId);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const step = e.shiftKey ? 10 : 2;

        if (e.key === "ArrowLeft") {
            e.preventDefault();
            setPos((p) => Math.max(0, p - step));
        }

        if (e.key === "ArrowRight") {
            e.preventDefault();
            setPos((p) => Math.min(100, p + step));
        }

        if (e.key === "Home") {
            e.preventDefault();
            setPos(0);
        }

        if (e.key === "End") {
            e.preventDefault();
            setPos(100);
        }
    };

    return (
        <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            className="relative w-full max-w-335 aspect-1335/590 mx-auto my-10 md:my-16 cursor-ew-resize select-none overflow-hidden"
            style={{ touchAction: "none" }}
        >
            {/* AFTER IMAGE */}
            <Image
                src="/images/after.webp"
                alt="After renovation"
                fill
                sizes="100vw"
                draggable={false}
                className="object-cover"
            />

            {/* BEFORE IMAGE */}
            <div
                className="absolute inset-0"
                style={{
                    clipPath: `inset(0 ${100 - pos}% 0 0)`,
                }}
            >
                <Image
                    src="/images/before.webp"
                    alt="Before renovation"
                    fill
                    sizes="100vw"
                    draggable={false}
                    className="object-cover"
                />
            </div>

            {/* BEFORE LABEL */}
            <span
                className="absolute left-4 top-4 md:left-12 md:top-12 rounded-xl border border-white/20 bg-[#E92A7B1A] backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-medium text-white shadow-lg">
                Before
            </span>

            {/* AFTER LABEL */}
            <span
                className="absolute right-4 top-4 md:right-12 md:top-12 rounded-xl border border-white/20 bg-[#E92A7B1A] backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-medium text-white shadow-lg">
                After
            </span>

            {/* DIVIDER */}
            <div
                className="absolute inset-y-0 z-10"
                style={{
                    left: `${pos}%`,
                }}
            >
                <div className="absolute inset-y-0 w-1 -translate-x-1/2 bg-white" />

                <div
                    role="slider"
                    tabIndex={0}
                    aria-label="Compare before and after"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(pos)}
                    onKeyDown={onKeyDown}
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                    <DragHandle />
                </div>
            </div>
        </div>
    );
};

export default ProjectsBeforeAfter;