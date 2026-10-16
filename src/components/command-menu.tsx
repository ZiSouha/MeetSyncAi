"use client"

import * as React from "react"
import {
    CalendarIcon,
    CreditCardIcon,
    LayoutDashboardIcon,
    BotIcon,
    Settings2Icon,
    PlusIcon,
    MicIcon,
    LogOutIcon,
    VideoIcon
} from "lucide-react"
import { useRouter } from "next/navigation"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"

import { useDebounce } from "@/hooks/use-debounce"

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")
    const debouncedSearch = useDebounce(search, 300)

    const router = useRouter()
    const trpc = useTRPC();

    const { data: recentMeetings } = useQuery({
        ...trpc.meetings.getMany.queryOptions({
            pageSize: 10,
            search: debouncedSearch,
            status: undefined // fetch all status when searching
        }),
        enabled: open
    });

    const { data: agents } = useQuery({
        ...trpc.agents.getMany.queryOptions({
            pageSize: 5,
            search: debouncedSearch
        }),
        enabled: open
    });

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
                setSearch("") // Reset search when opening
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Type a command or search..."
                value={search}
                onValueChange={setSearch}
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                {!search && (
                    <>
                        <CommandGroup heading="Suggestions">
                            <CommandItem onSelect={() => runCommand(() => router.push("/meetings/new"))}>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                <span>Create New Meeting</span>
                                <CommandShortcut>⌘N</CommandShortcut>
                            </CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push("/agents/new"))}>
                                <BotIcon className="mr-2 h-4 w-4" />
                                <span>Create New Agent</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                    </>
                )}

                <CommandGroup heading="Navigation">
                    <CommandItem value="Dashboard" onSelect={() => runCommand(() => router.push("/"))}>
                        <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                    </CommandItem>
                    <CommandItem value="Meetings" onSelect={() => runCommand(() => router.push("/meetings"))}>
                        <VideoIcon className="mr-2 h-4 w-4" />
                        <span>Meetings</span>
                    </CommandItem>
                    <CommandItem value="Agents" onSelect={() => runCommand(() => router.push("/agents"))}>
                        <BotIcon className="mr-2 h-4 w-4" />
                        <span>Agents</span>
                    </CommandItem>
                    <CommandItem value="Settings" onSelect={() => runCommand(() => router.push("/settings"))}>
                        <Settings2Icon className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </CommandItem>
                    <CommandItem value="Billing" onSelect={() => runCommand(() => router.push("/settings?tab=billing"))}>
                        <CreditCardIcon className="mr-2 h-4 w-4" />
                        <span>Billing & Credits</span>
                    </CommandItem>

                </CommandGroup>

                <CommandSeparator />

                {recentMeetings?.items && recentMeetings.items.length > 0 && (
                    <CommandGroup heading="Meetings">
                        {recentMeetings.items.map((meeting: any) => (
                            <CommandItem
                                key={meeting.id}
                                onSelect={() => runCommand(() => router.push(`/meetings/${meeting.id}`))}
                                value={`meeting ${meeting.name}`}
                            >
                                <MicIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{meeting.name || "Untitled Meeting"}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}

                {agents?.items && agents.items.length > 0 && (
                    <CommandGroup heading="Agents">
                        {agents.items.map((agent: any) => (
                            <CommandItem
                                key={agent.id}
                                onSelect={() => runCommand(() => router.push(`/agents/${agent.id}`))}
                                value={`agent ${agent.name}`}
                            >
                                <BotIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{agent.name}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}

            </CommandList>
        </CommandDialog>
    )
}
