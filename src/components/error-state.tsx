import { AlertCircleIcon } from "lucide-react";

interface Props {
    title: string;
    description: string;
};

export const ErrorState = ({
    title,
    description
}: Props) => {
    return (
        <div className="py-20 flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-6 text-center">
                <div className="relative">
                    <AlertCircleIcon className="size-8 text-rose-500/40" />
                </div>
                <div className="space-y-1.5 max-w-sm">
                    <h6 className="text-sm font-semibold text-white tracking-tight">{title}</h6>
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    )
}