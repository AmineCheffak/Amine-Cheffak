"use client";

import CartStatus from "@/Ui/CartStatus";
import CartInfo from "@/Ui/CartInfos";
import { INFOS, STATS } from "@/Data/index";
import { useState } from "react";

function About() {
    const [isShow, setIsShow] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        setPosition({
            x: e.clientX,
            y: e.clientY,
        });
    };

    return (
        <section
            id="about"
            onMouseMove={handleMouseMove}
            className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#0B0D10] px-5 pb-28 pt-28 font-tech text-[#EDEEF0] sm:px-8 md:px-12"
        >
            {/* Floating Profile Image (desktop seulement : pas de souris sur mobile) */}
            <div
                className={`pointer-events-none fixed z-[99] hidden h-48 w-48 overflow-hidden rounded-full border-2 border-fluo shadow-[0_0_30px_rgba(182,240,156,0.25)] transition-opacity duration-200 md:block ${
                    isShow ? "opacity-100" : "opacity-0"
                }`}
                style={{
                    left: position.x,
                    top: position.y,
                    transform: "translate(20px, 20px)",
                }}
            >
                <img
                    src="https://media.licdn.com/dms/image/v2/D4D03AQHBVQE4Mrg5nw/profile-displayphoto-crop_800_800/B4DZmSdicDGgAI-/0/1759098842353?e=1795046400&v=beta&t=UXFRudA5pNVt8IDxanUTZ42hmcanvPByZmfVRUTUxA4"
                    alt="Amine Cheffak"
                    className="h-full w-full object-cover object-center"
                />
            </div>

            {/* Background Grid */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: "radial-gradient(#1B1F25 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-8 md:gap-10 lg:grid-cols-[1fr_1.1fr]">

                {/* Text */}
                <div className="flex flex-col gap-4">
                    <span className="about-rise font-cyber text-[11px] tracking-[0.14em] text-fluo md:text-xs">
                        02 — À PROPOS
                    </span>

                    <p
                        className="about-rise text-base leading-relaxed text-grid sm:text-lg md:text-xl md:leading-snug"
                        style={{ animationDelay: ".16s" }}
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
                        className="about-rise text-base leading-relaxed text-grid sm:text-lg md:text-xl md:leading-snug"
                        style={{ animationDelay: ".24s" }}
                    >
                        Je m&apos;intéresse aux Design Patterns, au System Design, aux bases de
                        données SQL/NoSQL, à l&apos;intégration d&apos;IA générative locale (Ollama)
                        et aux bonnes pratiques de développement.
                    </p>

                    {/* Stats */}
                    <div
                        className="about-rise mt-2 grid grid-cols-3 gap-2 sm:gap-3"
                        style={{ animationDelay: ".32s" }}
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
        </section>
    );
}

export default About;