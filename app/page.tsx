"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { ArrowLeft, ArrowRight,Terminal } from "lucide-react";

import Header from "@/Ui/Header";
import Hero from "@/page/Hero";
import Skills from "@/page/Skills";
import Service from "@/page/Service";
import About from "@/page/About";
import Projects from "@/page/Projects";
import Button from "@/Ui/Button";
import TerminalOs from "@/Ui/TerminalOs";
// Chaque page peut recevoir goTo(n) pour naviguer (ex. les boutons du Hero)
type PageProps = { goTo?: (page: number) => void };

const pages: ComponentType<PageProps>[] = [Hero, About, Skills, Projects, Service];

export default function Pages() {
    const [count, setCount] = useState(1);
    const [isShow,setIsShow] = useState(false)
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
            {isShow && <TerminalOs/>}
            <div className="flex justify-between">
                <Button
                    methode={() => setIsShow(!isShow)}
                    style="fixed bottom-10 left-10 z-[99]"
                >
                    <Terminal size={21} />
                </Button>

                <div className="pointer-events-none fixed right-10 bottom-10 z-[99] flex items-center gap-2 rounded-full border border-white/10 bg-[#110D1A]/80 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:px-3 md:bottom-10 md:px-4">
                    <Button methode={previousPage}>
                    <ArrowLeft size={21} />
                    </Button>

                    <Button methode={nextPage}>
                    <ArrowRight size={21} />
                    </Button>
                </div>
            </div>
  
        </div>
    );
}