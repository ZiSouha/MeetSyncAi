import { Loader2Icon } from "lucide-react";

interface Props {
    title: string;
    description: string;
};

export const LoadingState = ({
    title,
    description
}: Props) => {
    return (
        <div className="py-20 flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-6 text-center">
                <div className="relative">
                    <Loader2Icon className="size-8 animate-spin text-zinc-700" />
                </div>
                <div className="space-y-1.5">
                    <h6 className="text-sm font-semibold text-white tracking-tight">{title}</h6>
                    <p className="text-xs text-zinc-500 font-medium">{description}</p>
                </div>
            </div>
        </div>
    )
}