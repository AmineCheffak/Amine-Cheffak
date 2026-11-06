"use client";

import { useRef, useState } from "react";
import { Terminal } from "lucide-react";

import Header from "@/Ui/Header";
import Intro from "@/Ui/Intro/";
import Hero from "@/page/Hero";
import Skills from "@/page/Skills";
import Service from "@/page/Service";
import About from "@/page/About";
import Projects from "@/page/Projects";
import TerminalOs from "@/Ui/TerminalOs";
import Button from "@/Ui/Button";
import Footer from "@/Ui/Footer";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

const sections = [
    { name: "Hero", component: Hero },
    { name: "About", component: About },
    { name: "Skills", component: Skills },
    { name: "Projects", component: Projects },
    { name: "Service", component: Service },
];

export default function Pages() {
    const [isShow, setIsShow] = useState(false);
    const [current, setCurrent] = useState(1);
    const [ready, setReady] = useState(false);
    const [introGone, setIntroGone] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    useGSAP(
        () => {
            if (!ready) return;

            let active = true;

            sectionRefs.current.forEach((section, index) => {
                if (!section) return;

                ScrollTrigger.create({
                    trigger: section,
                    start: "top 50%",
                    end: "bottom 50%",
                    onToggle: (self) => {
                        if (!self.isActive) return;
                        setCurrent((currentIndex) =>
                            currentIndex === index + 1 ? currentIndex : index + 1
                        );
                    },
                });
            });

            void document.fonts.ready.then(() => {
                if (active) ScrollTrigger.refresh();
            });

            return () => {
                active = false;
            };
        },
        { scope: containerRef, dependencies: [ready] }
    );

    return (
        <div
            ref={containerRef}
            className={`min-h-screen w-full bg-void text-ink ${ready ? "" : "is-intro"}`}
        >
            {!introGone && (
                <Intro
                    onReveal={() => setReady(true)}
                    onDone={() => {
                        setIntroGone(true);
                        requestAnimationFrame(() => ScrollTrigger.refresh());
                    }}
                />
            )}

            <div
                aria-hidden="true"
                className="bg-grid-lines pointer-events-none fixed inset-0 z-0"
            />

            <Header value={current} total={sections.length} />

            {ready &&
                sections.map((section, index) => {
                    const Section = section.component;

                    return (
                        <section
                            key={section.name}
                            ref={(el) => {
                                sectionRefs.current[index] = el;
                            }}
                            className="relative z-10"
                            id={section.name.toLowerCase()}
                            data-number={String(index + 1).padStart(2, "0")}
                        >
                            <Section />
                        </section>
                    );
                })}

            <Button
                methode={() => setIsShow((visible) => !visible)}
                aria-label="Open terminal"
                className="fixed bottom-7 right-10 z-50"
            >
                <Terminal size={21} aria-hidden="true" />
            </Button>

            {ready && <Footer onOpenTerminal={() => setIsShow(true)} />}

            {isShow && <TerminalOs onClose={() => setIsShow(false)} />}
        </div>
    );
}