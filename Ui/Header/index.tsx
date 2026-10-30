"use client";

interface HeaderProps {
    value: number;
    total?: number;
}

export default function Header({ value, total = 5 }: HeaderProps) {
    return (
        <header className="pointer-events-none fixed left-0 top-0 z-[99]  flex w-full items-center justify-between bg-[#0B0D10]/80 px-5 py-4 backdrop-blur-md sm:px-8 md:px-12 md:py-6">
            <h1 className="text-2xl font-bold tracking-tight text-fluo md:text-4xl">
                AmineCheffak<span className="text-white">.</span>
            </h1>

            <div className="flex items-center gap-2 text-grid">
                <span
                    key={value}
                    className="animate-in fade-in text-2xl font-bold duration-300"
                >
                    {value}
                </span>

                <span className="text-white/40">/</span>

                <span className="text-white/50">{total}</span>
            </div>
        </header>
    );
}