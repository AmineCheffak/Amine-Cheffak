import ThemeToggle from "@/Ui/ThemeToggle";

interface HeaderProps {
    value: number;
    total?: number;
}

export default function Header({ value, total = 5 }: HeaderProps) {
    return (
        <header className="pointer-events-none fixed left-0 top-0 z-[99] flex w-full items-center justify-between border-b border-line bg-void/95 px-5 py-4 sm:px-8 md:px-12 md:py-6">
            <h1 className="text-2xl font-bold tracking-tight text-fluo md:text-4xl">
                AmineCheffak<span className="text-ink">.</span>
            </h1>

            <div className="pointer-events-auto flex items-center gap-3 sm:gap-5">
                <div className="flex items-center gap-2 text-grid">
                    <span
                        key={value}
                        className="animate-in fade-in text-2xl font-bold text-ink duration-300"
                    >
                        {String(value).padStart(2, "0")}
                    </span>

                    <span className="text-ink/30">/</span>

                    <span className="text-ink/50">
                        {String(total).padStart(2, "0")}
                    </span>
                </div>

                <ThemeToggle />
            </div>
        </header>
    );
}