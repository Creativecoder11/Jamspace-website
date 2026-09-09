"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
    items: { label: string; image: string }[];
}

export default function ProjectsPlanning({ items }: Props) {
    const [active, setActive] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (isHovering) return;
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % items.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isHovering, items.length]);

    return (
        <section className="w-full mx-auto md:border-b border-border px-4 md:px-0">
            <div className="max-w-335 mx-auto grid grid-cols-1 md:grid-cols-2">
                <div className="py-10 md:py-16 md:border-r border-border" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    <p className="text-base text-[#444444]">Planning:</p>
                    <ul className="mt-8 md:mt-10 space-y-5 md:space-y-7">
                        {items.map((item, i) => (
                            <li key={item.label}>
                                <button type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                                    className={`text-xl md:text-[27px] transition-colors duration-300 text-left ${i === active ? "text-[#191919]" : "text-[#1919194D]"}`}>
                                    ({String(i + 1).padStart(2, "0")}) {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative h-[350px] sm:h-[420px] md:h-auto md:min-h-[560px]">
                    {items.map((item, i) => (
                        <div key={item.label} aria-hidden={i !== active} className={`absolute inset-0 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                            <Image src={item.image} alt={`Floor plan — ${item.label}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain p-6 md:p-16" priority={i === 0} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}