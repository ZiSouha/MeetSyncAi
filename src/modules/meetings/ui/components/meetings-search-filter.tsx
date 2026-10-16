import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

export const MeetingSearchFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();

    return (
        <div className="relative w-full">
            <Input
                placeholder="Search meetings..."
                className="h-10 w-full bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-primary/50 focus-visible:border-primary/50 rounded-xl pl-10"
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
            />
            <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        </div>
    )
}