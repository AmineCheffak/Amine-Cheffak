"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Header from "@/Ui/Header";
import Hero from "@/page/Hero";
import Skills from "@/page/Skills";
import Service from "@/page/Service";
import About from "@/page/About";
import Projects from "@/page/Projects";

// Chaque page peut recevoir goTo(n) pour naviguer (ex. les boutons du Hero)
type PageProps = { goTo?: (page: number) => void };

const pages: ComponentType<PageProps>[] = [Hero, About, Skills, Projects, Service];

export default function Pages() {
    const [count, setCount] = useState(1);

    const CurrentPage = pages[count - 1];

    const goTo = (n: number) => {
        setCount(n);
        window.scrollTo({ top: 0 });
    };

    const nextPage = () => goTo((count % pages.length) + 1);
    const previousPage = () => goTo(((count - 2 + pages.length) % pages.length) + 1);

    return (
        <div className="min-h-screen w-full bg-[#0B0D10] text-grid">
            <Header value={count} total={pages.length} />

            <main className="w-full">
                <CurrentPage key={count} goTo={goTo} />
            </main>
        <div className="pointer-events-none fixed right-10 bottom-10 z-[99] flex items-center gap-2 rounded-full border border-white/10 bg-[#111720]/80 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:px-3 md:bottom-10 md:px-4">
            
            <button
                onClick={previousPage}
                aria-label="Page précédente"
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1A222D] text-[#EDEEF0] transition-all duration-300 hover:border-[#C8FF3D] hover:bg-[#C8FF3D] hover:text-[#0B0D10] hover:shadow-[0_0_20px_rgba(200,255,61,0.2)]"
            >
                <ArrowLeft size={21} />
            </button>

            <button
                onClick={nextPage}
                aria-label="Page suivante"
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1A222D] text-[#EDEEF0] transition-all duration-300 hover:border-[#C8FF3D] hover:bg-[#C8FF3D] hover:text-[#0B0D10] hover:shadow-[0_0_20px_rgba(200,255,61,0.2)]"
            >
                <ArrowRight size={21} />
            </button>

        </div>
        </div>
    );
}