import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex-1 p-4 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-[300px]" />
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-32 w-full col-span-2" />
                <Skeleton className="h-32 w-full" />
            </div>
            <Skeleton className="h-[400px] w-full" />
        </div>
    );
}
