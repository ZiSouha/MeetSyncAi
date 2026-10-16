import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex-1 p-4 md:p-8 space-y-6">
            <div className="flex items-center gap-x-4">
                <Skeleton className="size-16 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-[200px]" />
                    <Skeleton className="h-4 w-[100px]" />
                </div>
            </div>
            <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-40 w-full" />
            </div>
        </div>
    );
}
