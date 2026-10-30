"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Header from "@/Ui/Header";
import Hero from "@/page/Hero";
import Skills from "@/page/Skills";
import Service from "@/page/Service";
import About from "@/page/About";
import Projects from "@/page/Projects";

const pages = [Hero, About, Skills, Projects, Service];

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

            {/* Chaque page gère déjà son propre min-h-screen + centrage */}
            <main className="w-full">
                <CurrentPage key={count} />
            </main>

            <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[99] flex justify-between px-5 sm:px-8 md:bottom-10 md:px-12">
                <button
                    onClick={previousPage}
                    aria-label="Page précédente"
                    className="pointer-events-auto rounded-full border border-white/20 bg-black p-3 text-white transition hover:border-fluo hover:bg-black/80"
                >
                    <ArrowLeft size={22} />
                </button>

                <button
                    onClick={nextPage}
                    aria-label="Page suivante"
                    className="pointer-events-auto rounded-full border border-white/20 bg-black p-3 text-white transition hover:border-fluo hover:bg-black/80"
                >
                    <ArrowRight size={22} />
                </button>
            </div>
        </div>
    );
}