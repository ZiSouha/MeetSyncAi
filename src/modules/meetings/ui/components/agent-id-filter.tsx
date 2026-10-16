import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { CommandSelect } from "@/components/ui/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";

import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

export const AgentIdFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();

    const trpc = useTRPC();

    const [agentSearch, setAgentSearch] = useState("");
    const { data } = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100,
            search: agentSearch,
        }),
    );

    return (
        <CommandSelect
            className="h-10 rounded-xl bg-zinc-950/50 border-white/10 hover:bg-white/5 hover:border-white/20 text-zinc-400 font-medium"
            placeholder="Filter by Agent"
            options={(data?.items ?? []).map((agent) => ({
                id: agent.id,
                value: agent.id,
                children: (
                    <div className="flex items-center gap-x-2">
                        <GeneratedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="size-4"
                        />
                        {agent.name}
                    </div>
                )
            }))}
            onSelect={(value) => setFilters({ agentId: value })}
            onSearch={setAgentSearch}
            value={filters.agentId ?? ""}
        />
    )
}