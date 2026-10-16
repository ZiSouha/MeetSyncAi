"use client"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { BellIcon, CheckIcon, InfoIcon, VideoIcon, FileTextIcon, Loader2 } from "lucide-react"
import { useTRPC } from "@/trpc/client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"

export const NotificationsDropdown = () => {
    const trpc = useTRPC()
    const router = useRouter()
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)

    // Poll for unread count every 30 seconds
    const { data: unreadCount } = useQuery({
        ...trpc.notifications.getUnreadCount.queryOptions(),
        refetchInterval: 30000
    })

    const { data: notifications, isLoading } = useQuery({
        ...trpc.notifications.getMany.queryOptions({ limit: 20 }),
        enabled: open,
    })

    const markAsRead = useMutation({
        ...trpc.notifications.markAsRead.mutationOptions(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: trpc.notifications.getUnreadCount.queryKey() })
            queryClient.invalidateQueries({ queryKey: trpc.notifications.getMany.queryKey() })
        }
    })

    const markAllAsRead = useMutation({
        ...trpc.notifications.markAllAsRead.mutationOptions(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: trpc.notifications.getUnreadCount.queryKey() })
            queryClient.invalidateQueries({ queryKey: trpc.notifications.getMany.queryKey() })
        }
    })

    const handleNotificationClick = (notification: any) => {
        if (!notification.read) {
            markAsRead.mutate({ id: notification.id })
        }

        // Navigate based on type/resourceId
        if (notification.resourceId) {
            if (notification.type === "meeting_ready" || notification.type === "transcript_available") {
                router.push(`/meetings/${notification.resourceId}`)
            }
            setOpen(false)
        }
    }

    const getIcon = (type: string) => {
        switch (type) {
            case "meeting_ready":
                return <VideoIcon className="size-4 text-emerald-500" />
            case "transcript_available":
                return <FileTextIcon className="size-4 text-blue-500" />
            default:
                return <InfoIcon className="size-4 text-zinc-500" />
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                    <BellIcon className="size-5 text-zinc-400" />
                    {unreadCount ? (
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full animate-pulse ring-2 ring-[#0c0c0e]" />
                    ) : null}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0 border-white/10 bg-[#0c0c0e]/95 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                    <h4 className="font-semibold text-sm text-white">Notifications</h4>
                    {unreadCount ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-zinc-500 hover:text-white"
                            onClick={() => markAllAsRead.mutate()}
                            disabled={markAllAsRead.isPending}
                        >
                            Mark all read
                        </Button>
                    ) : null}
                </div>
                <ScrollArea className="h-[300px]">
                    {isLoading ? (
                        <div className="flex h-full items-center justify-center p-4">
                            <Loader2 className="size-5 animate-spin text-zinc-500" />
                        </div>
                    ) : notifications?.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center p-8 text-center text-zinc-500">
                            <BellIcon className="size-8 opacity-20 mb-2" />
                            <p className="text-sm">No notifications yet</p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {notifications?.map((notification) => (
                                <button
                                    key={notification.id}
                                    onClick={() => handleNotificationClick(notification)}
                                    className={cn(
                                        "flex gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5 border-b border-white/5 last:border-0",
                                        !notification.read && "bg-primary/5"
                                    )}
                                >
                                    <div className="mt-1 flex-shrink-0 bg-white/5 p-2 rounded-full border border-white/10">
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className={cn("text-sm leading-none font-medium", !notification.read ? "text-white" : "text-zinc-400")}>
                                            {notification.title}
                                        </p>
                                        <p className="text-xs text-zinc-500 line-clamp-2">
                                            {notification.message}
                                        </p>
                                        <p className="text-[10px] text-zinc-600">
                                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <div className="mt-2 size-2 rounded-full bg-primary" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}
