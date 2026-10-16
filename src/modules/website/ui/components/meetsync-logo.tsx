import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    iconOnly?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
    showContainer?: boolean;
}

export const MeetSyncLogo = ({ 
    className, 
    iconOnly = false, 
    size = "md",
    showContainer = true 
}: LogoProps) => {
    const sizeClasses = {
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
        xl: "size-16"
    };

    const iconSizeClasses = {
        sm: "w-4.5 h-4",
        md: "w-5.5 h-4.5",
        lg: "w-6.5 h-5.5",
        xl: "w-9 h-7.5"
    };

    const textSizeClasses = {
        sm: "text-lg",
        md: "text-xl",
        lg: "text-2xl",
        xl: "text-3xl"
    };

    const rawIconSizes = {
        sm: "w-6 h-5",
        md: "w-8 h-6.5",
        lg: "w-10 h-8",
        xl: "w-14 h-11"
    };

    const iconMarkup = (
        <svg 
            viewBox="0 0 160 134" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
                showContainer ? iconSizeClasses[size] : rawIconSizes[size], 
                "text-[#00C896] relative z-10 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(0,200,150,0.35)]"
            )}
            aria-hidden="true"
        >
            <path d="M 0 0 L 44 0 L 72 34 L 57 67 L 76 99 L 44 134 L 0 134 L 27 67 Z" fill="currentColor" />
            <path d="M 116 11 L 159 11 L 131 67 L 159 123 L 118 123 L 84 93 L 103 67 L 89 40 Z" fill="currentColor" />
        </svg>
    );

    return (
        <div className={cn("flex items-center gap-3 group select-none", className)}>
            <div className="relative flex-shrink-0">
                {showContainer ? (
                    <>
                        <div className="absolute inset-0 bg-[#00C896]/25 blur-lg opacity-40 group-hover:opacity-75 transition-opacity" />
                        <div className={cn(
                            sizeClasses[size], 
                            "rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-950 border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden transition-all duration-300 group-hover:border-[#00C896]/30 group-hover:scale-[1.03]"
                        )}>
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#00C896]/10 via-transparent to-white/5 pointer-events-none" />
                            {iconMarkup}
                        </div>
                    </>
                ) : (
                    iconMarkup
                )}
            </div>
            
            {!iconOnly && (
                <span className={cn(
                    textSizeClasses[size], 
                    "font-bold tracking-tight text-white transition-colors font-outfit"
                )}>
                    Meet<span className="text-[#00C896]">Sync</span>
                </span>
            )}
        </div>
    );
};
