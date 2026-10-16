import { CommandResponsiveDialog, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
            <div className="bg-zinc-950/80 backdrop-blur-3xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <CommandInput
                    placeholder='Search neural network...'
                    className="h-14 font-medium text-white placeholder:text-zinc-500 bg-transparent border-none focus:ring-0"
                />
                <CommandList className="max-h-[400px] overflow-y-auto scrollbar-none p-2">
                    <div className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Suggested</div>
                    <CommandItem className="rounded-lg aria-selected:bg-white/5 aria-selected:text-white">
                        <span className="font-medium">Navigate to Meetings</span>
                    </CommandItem>
                    <CommandItem className="rounded-lg aria-selected:bg-white/5 aria-selected:text-white">
                        <span className="font-medium">Create new Agent</span>
                    </CommandItem>
                </CommandList>
            </div>
        </CommandResponsiveDialog>
    )
}

export default DashboardCommand
