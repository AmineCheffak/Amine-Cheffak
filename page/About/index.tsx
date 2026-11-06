"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import CartInfo from "@/Ui/CartInfos";
import CartStatus from "@/Ui/CartStatus";
import { INFOS, STATS } from "@/Data/index";
import { gsap, useGSAP } from "@/lib/gsap";

function About() {
    const [isShow, setIsShow] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const moveXRef = useRef<((value: number) => void) | null>(null);
    const moveYRef = useRef<((value: number) => void) | null>(null);

    const { contextSafe } = useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        const elements = gsap.utils.toArray<HTMLElement>(
            "[data-gsap-rise]",
            container
        );
        const media = gsap.matchMedia();

        media.add("(prefers-reduced-motion: reduce)", () => {
            gsap.set(elements, { autoAlpha: 1, y: 0 });
        });

        media.add("(prefers-reduced-motion: no-preference)", () => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top 75%",
                    once: true,
                },
            });
            elements.forEach((element) => {
                timeline.fromTo(
                    element,
                    { autoAlpha: 0, y: 24 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        immediateRender: false,
                    },
                    Number(element.dataset.gsapDelay ?? 0)
                );
                });
            });

            if (imageRef.current) {
            moveXRef.current = gsap.quickTo(imageRef.current, "x", {
                duration: 0.4,
                ease: "power3.out",
            });
            moveYRef.current = gsap.quickTo(imageRef.current, "y", {
                duration: 0.4,
                ease: "power3.out",
            });
        }

        return () => {
            media.revert();
            moveXRef.current = null;
            moveYRef.current = null;
        };
    }, { scope: containerRef });

    const handleMouseMove = contextSafe((event: React.MouseEvent<HTMLElement>) => {
        moveXRef.current?.(event.clientX + 20);
        moveYRef.current?.(event.clientY + 20);
    });

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative flex min-h-screen w-full items-center overflow-hidden px-5 pb-28 pt-28 font-tech text-ink sm:px-8 md:px-12"
        >
            {/* Floating Profile Image (desktop seulement : pas de souris sur mobile) */}
            <div
                ref={imageRef}
                className={`profile-image-shadow pointer-events-none fixed left-0 top-0 z-[99] hidden h-48 w-48 will-change-transform overflow-hidden rounded-full border-2 border-fluo transition-opacity duration-200 md:block ${
                    isShow ? "opacity-100" : "opacity-0"
                }`}
            >
                <Image
                    src="/amine.jpg"
                    alt="Amine Cheffak"
                    width={800}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-8 md:gap-10 lg:grid-cols-[1fr_1.1fr]">

                {/* Text */}
                <div className="flex flex-col gap-4">
                    <span data-gsap-rise className="font-cyber text-[11px] tracking-[0.14em] text-fluo md:text-xs">
                        02 — À PROPOS
                    </span>

                    <p
                        data-gsap-rise
                        data-gsap-delay=".16"
                        className="text-base leading-relaxed text-grid sm:text-lg md:text-xl md:leading-snug"
                    >
                        <span
                            onMouseEnter={() => setIsShow(true)}
                            onMouseLeave={() => setIsShow(false)}
                            className="mb-1 inline-block -rotate-2 cursor-pointer text-2xl text-fluo transition-transform duration-300 ease-in-out md:text-3xl"
                        >
                            &quot;Amine Cheffak&quot;
                        </span>{" "}
                        Étudiant en Développement Digital, option Full Stack, avec une
                        solide base en développement web, conception d&apos;API REST et
                        architecture logicielle. Je développe des applications avec Spring
                        Boot, React.js et MySQL, et j&apos;ai des connaissances en Node.js,
                        Express.js, Nest.js, TypeScript et MongoDB.
                    </p>

                    <p
                        data-gsap-rise
                        data-gsap-delay=".24"
                        className="text-base leading-relaxed text-grid sm:text-lg md:text-xl md:leading-snug"
                    >
                        Je m&apos;intéresse aux Design Patterns, au System Design, aux bases de
                        données SQL/NoSQL, à l&apos;intégration d&apos;IA générative locale (Ollama)
                        et aux bonnes pratiques de développement.
                    </p>

                    {/* Stats */}
                    <div
                        data-gsap-rise
                        data-gsap-delay=".32"
                        className="mt-2 grid grid-cols-3 gap-2 sm:gap-3"
                    >
                        {STATS.map((s, index) => (
                            <CartStatus
                                key={index}
                                value={s.value}
                                label={s.label}
                            />
                        ))}
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 content-start gap-3 sm:grid-cols-2">
                    {INFOS.map((item, i) => (
                        <CartInfo
                            key={i}
                            icon={item.icon}
                            index={i}
                            text={item.text}
                            title={item.title}
                            label={item.label}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;