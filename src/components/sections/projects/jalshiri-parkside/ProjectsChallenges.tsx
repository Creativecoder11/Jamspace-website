"use client";

import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Image from "next/image";

const ROWS = [
    { challenge: "Limited Natural Light", solution: "Introduced layered lighting and light reflective materials." },
    { challenge: "Compact Layout", solution: "Optimized space planning with multifunctional furniture." },
    { challenge: "Storage Requirements", solution: "Integrated smart storage throughout the apartment." },
    { challenge: "Warm & Modern Look", solution: "Used natural textures and a soft, neutral palette." },
];

const ArrowRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_734_7039)">
            <g clip-path="url(#clip1_734_7039)">
                <path d="M23.4471 11.5108L0.554813 11.5108C0.282505 11.5108 0.0625054 11.7308 0.0625053 12.0031C0.0625053 12.2754 0.282505 12.4954 0.554813 12.4954L22.2579 12.4954L19.2702 15.4831C19.0779 15.6754 19.0779 15.9877 19.2702 16.18C19.4625 16.3723 19.7748 16.3723 19.9671 16.18L23.7964 12.3508C23.9379 12.2092 23.9794 11.9985 23.9025 11.8138C23.8256 11.6308 23.6456 11.5108 23.4471 11.5108Z" fill="#E92A7B" />
                <path d="M19.6169 7.67648C19.4908 7.67648 19.3646 7.72417 19.2692 7.82109C19.0769 8.0134 19.0769 8.32571 19.2692 8.51802L23.1031 12.3519C23.2954 12.5442 23.6077 12.5442 23.8 12.3519C23.9923 12.1596 23.9923 11.8472 23.8 11.6549L19.9662 7.82109C19.8692 7.72417 19.7431 7.67648 19.6169 7.67648Z" fill="#E92A7B" />
            </g>
        </g>
        <defs>
            <clipPath id="clip0_734_7039">
                <rect width="24" height="24" fill="white" />
            </clipPath>
            <clipPath id="clip1_734_7039">
                <rect width="24" height="24" fill="white" transform="matrix(1 2.62268e-07 2.62268e-07 -1 4.19629e-06 24)" />
            </clipPath>
        </defs>
    </svg>

);


const ProjectsChallenges = () => {
    return (
        <section className="w-full px-4 md:px-0 pb-12 md:pb-20">
            <div className="mx-auto w-full max-w-335">
                <div className="flex flex-col md:flex-row gap-10 md:gap-12">
                    {/* Left image — 430 × 545 */}
                    <div className="relative w-full aspect-430/545 md:aspect-auto md:w-[430px] md:h-[545px] shrink-0 overflow-hidden">
                        <Image
                            src="/images/challenges-main.png"
                            alt="Poolside terrace interior"
                            fill
                            sizes="(min-width: 768px) 430px, 100vw"
                            className="object-cover"
                        />
                    </div>

                    {/* Right column */}
                    <div className="flex-1 flex flex-col">
                        <h3 className="text-xl md:text-3xl text-accent font-medium">
                            Challenges & Solutions
                        </h3>

                        <ul className="mt-4 md:mt-5">
                            {ROWS.map((row) => (
                                <li
                                    key={row.challenge}
                                    className="
        border-b
        border-border
        py-3
        md:py-4
    "
                                >
                                    {/* Mobile */}
                                    <div className="flex flex-col gap-3 md:hidden">
                                        <div className="flex items-center gap-3">
                                            <p className="text-muted text-base">
                                                {row.challenge}
                                            </p>
                                            <ArrowRight />
                                        </div>

                                        <p className="text-muted text-base">
                                            {row.solution}
                                        </p>
                                    </div>


                                    {/* Desktop */}
                                    <div className="
        hidden
        md:flex
        md:items-center
        md:justify-between
    ">
                                        <p className="w-[210px] text-muted text-base md:text-lg">
                                            {row.challenge}
                                        </p>

                                        <ArrowRight />

                                        <p className="w-[460px] text-muted text-base md:text-lg">
                                            {row.solution}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Bottom row */}
                        <div className="mt-8 md:mt-auto md:pt-8 flex flex-col md:flex-row items-end gap-6 md:gap-10">
                            <div className="relative w-[150px] h-[150px] md:w-[210px] md:h-[210px] shrink-0 overflow-hidden">
                                <Image
                                    src="/images/challenges-small.png"
                                    alt="Bathroom interior"
                                    fill
                                    sizes="210px"
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <div className="w-full flex justify-between items-start gap-6 border-b border-border pb-1.5 md:pb-3">
                                    <p className="text-black text-sm md:text-base font-medium leading-snug">
                                        Ready to Create
                                        <br />
                                        Your Dream Space?
                                    </p>

                                    <MagneticButton>
                                        <Button href="/about">Start a Project</Button>
                                    </MagneticButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsChallenges;