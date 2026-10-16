import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRightIcon, TrashIcon, PencilIcon, MoreVerticalIcon } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu"



interface Props {
    meetingId: string;
    meetingName: string;
    onEdit: () => void;
    onRemove: () => void;
}

export const MeetingIdViewHeader = ({
    meetingId,
    meetingName,
    onEdit,
    onRemove
}: Props) => {
    return (
        <div className="flex items-center justify-between py-4 border-b border-white/5 mb-2">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-bold text-sm uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                            <Link href="/meetings">
                                Meetings
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-zinc-600">
                        <ChevronRightIcon className="size-3.5" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-bold text-sm text-white">
                            <Link href={`/meetings/${meetingId}`}>
                                {meetingName}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* Without modal={false}, the dialog that this dropdown opens cause the website to get unclickable */}
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 rounded-lg hover:bg-white/10 hover:text-white text-zinc-400">
                        <MoreVerticalIcon className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-zinc-950/90 border-white/10 backdrop-blur-xl">
                    <DropdownMenuItem onClick={onEdit} className="text-zinc-300 focus:text-white focus:bg-white/10 cursor-pointer">
                        <PencilIcon className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onRemove} className="text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer">
                        <TrashIcon className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}