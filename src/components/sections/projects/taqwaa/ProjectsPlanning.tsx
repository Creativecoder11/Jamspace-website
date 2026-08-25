"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const PLANNING_ITEMS = [
    { label: "Double bed", image: "/images/planningImg1.png" },
    { label: "Table for dinner", image: "/images/planningImg1.png" },
    { label: "Storage Space", image: "/images/planningImg1.png" },
    { label: "Full Kitchen Area", image: "/images/planningImg1.png" },
    { label: "Combination of bathroom and washroom", image: "/images/planningImg1.png" },
    { label: "Kids room with study table", image: "/images/planningImg1.png" },
];

const ProjectsPlanning = () => {
    const [active, setActive] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (isHovering) return;

        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % PLANNING_ITEMS.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isHovering]);

    return (
        <section className="w-full mx-auto md:border-b border-border px-4 md:px-0">
            <div className="max-w-335 mx-auto grid grid-cols-1 md:grid-cols-2">

                {/* Left */}
                <div
                    className="py-10 md:py-16 md:border-r border-border"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <p className="text-base text-[#444444]">
                        Planning:
                    </p>


                    <ul className="mt-8 md:mt-10 space-y-5 md:space-y-7">
                        {PLANNING_ITEMS.map((item, i) => (
                            <li key={item.label}>
                                <button
                                    type="button"
                                    onMouseEnter={() => setActive(i)}
                                    onFocus={() => setActive(i)}
                                    onClick={() => setActive(i)}
                                    className={`text-xl md:text-[27px] transition-colors duration-300 text-left ${i === active ? "text-[#191919]" : "text-[#1919194D]"}`}
                                >
                                    ({String(i + 1).padStart(2, "0")}) {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>


                {/* Right */}
                <div
                    className="relative h-[350px] sm:h-[420px] md:h-auto md:min-h-[560px]">
                    {PLANNING_ITEMS.map((item, i) => (
                        <div
                            key={item.label}
                            aria-hidden={i !== active}
                            className={` absolute inset-0 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0 pointer-events-none" } `}>
                            <Image
                                src={item.image}
                                alt={`Floor plan — ${item.label}`}
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-contain p-6 md:p-16"
                                priority={i === 0}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ProjectsPlanning;