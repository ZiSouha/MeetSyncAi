"use client";

import { authClient } from '@/lib/auth-client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { ChevronRight, LogOut, Settings, CreditCard, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardUserButton = () => {
    const router = useRouter();
    const isMobile = useIsMobile();
    const { data, isPending } = authClient.useSession();

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/sign-in")
            }
        })
    }

    if (isPending || !data?.user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full flex items-center gap-3 p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center rounded-md hover:bg-white/5 transition-colors group outline-none">
                <div className="flex items-center gap-3 flex-1 min-w-0 group-data-[collapsible=icon]:flex-initial group-data-[collapsible=icon]:justify-center">
                    {data.user.image ? (
                        <Avatar className="size-8 rounded-md border border-white/10 shrink-0">
                            <AvatarImage src={data.user.image} />
                        </Avatar>
                    ) : (
                        <GeneratedAvatar
                            seed={data.user.name}
                            variant="initials"
                            className="size-8 rounded-md border border-white/10 shadow-sm shrink-0"
                        />
                    )}
                    <div className="flex flex-col text-left overflow-hidden group-data-[collapsible=icon]:hidden">
                        <span className="text-xs font-semibold text-zinc-200 truncate">{data.user.name}</span>
                        <span className="text-[10px] text-zinc-500 truncate font-medium">{data.user.email}</span>
                    </div>
                </div>
                {!isMobile && <ChevronRight className="size-3 text-zinc-600 group-hover:text-zinc-400 transition-colors group-data-[collapsible=icon]:hidden shrink-0" />}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                side={isMobile ? "bottom" : "right"}
                className="w-56 bg-zinc-900 border-white/10 p-1.5 rounded-lg shadow-2xl z-50"
                sideOffset={12}
            >
                <div className="p-2 border-b border-white/5 mb-1.5">
                    <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Account</p>
                    <p className="text-xs text-white mt-0.5 truncate">{data.user.email}</p>
                </div>

                <DropdownMenuItem onClick={() => router.push('/')} className="flex items-center gap-2 p-2 rounded-md focus:bg-white/10 text-xs font-medium text-zinc-300 cursor-pointer">
                    <Globe className="size-3.5 text-[#00C896]" />
                    Public Website
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => router.push('/settings')} className="flex items-center gap-2 p-2 rounded-md focus:bg-white/10 text-xs font-medium text-zinc-300 cursor-pointer">
                    <Settings className="size-3.5" />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings?tab=billing')} className="flex items-center gap-2 p-2 rounded-md focus:bg-white/10 text-xs font-medium text-zinc-300 cursor-pointer">
                    <CreditCard className="size-3.5" />
                    Billing
                </DropdownMenuItem>
                
                <div className="h-px bg-white/5 my-1" />
                
                <DropdownMenuItem onClick={onLogout} className="flex items-center gap-2 p-2 rounded-md focus:bg-rose-500/10 focus:text-rose-400 text-xs font-medium text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer">
                    <LogOut className="size-3.5" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DashboardUserButton;
