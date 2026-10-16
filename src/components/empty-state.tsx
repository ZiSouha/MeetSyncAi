import { Inbox } from "lucide-react";

interface Props {
    title: string;
    description: string;
};

export const EmptyState = ({
    title,
    description,
}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
            <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-700">
                <Inbox className="size-6" />
            </div>
            <div className="space-y-1.5 max-w-[280px]">
                <h6 className="text-sm font-semibold text-white tracking-tight">{title}</h6>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">{description}</p>
            </div>
        </div>
    )
}