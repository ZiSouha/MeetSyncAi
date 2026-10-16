import Link from "next/link";
import Image from "next/image";
import {
    CallControls,
    SpeakerLayout,
} from "@stream-io/video-react-sdk"

interface Props {
    onLeave: () => void;
    meetingName: string;
};

export const CallActive = ({ onLeave, meetingName }: Props) => {
    return (
        <div className="flex flex-col justify-between p-6 h-full text-white bg-transparent">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-2xl md:rounded-full p-4 flex items-center justify-between gap-6 shadow-2xl relative z-20">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center justify-center p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:scale-105 transition-all">
                        <Image src="/logo.svg" width={24} height={24} alt="Logo" className="brightness-110" />
                    </Link>
                    <div className="flex flex-col">
                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] leading-none mb-1">Active Session</p>
                        <h4 className="text-base font-bold text-white tracking-tight leading-none">
                            {meetingName}
                        </h4>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Live Recording</span>
                </div>
            </div>

            <div className="flex-1 my-8 rounded-[2rem] overflow-hidden border border-white/[0.05] bg-black/40 shadow-2xl relative z-10">
                <SpeakerLayout />
            </div>

            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-[2rem] p-2 flex items-center justify-center shadow-2xl relative z-20">
                <div className="scale-110 md:scale-125 py-2">
                    <CallControls onLeave={onLeave} />
                </div>
            </div>
        </div>
    )
}