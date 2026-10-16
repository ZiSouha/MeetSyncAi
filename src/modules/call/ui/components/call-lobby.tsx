import Link from "next/link";
import { LogInIcon } from "lucide-react";

import {
    DefaultVideoPlaceholder,
    StreamVideoParticipant,
    ToggleAudioPreviewButton,
    ToggleVideoPreviewButton,
    useCallStateHooks,
    VideoPreview,
} from "@stream-io/video-react-sdk"

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { generateAvatarUri } from "@/lib/avatar";

import "@stream-io/video-react-sdk/dist/css/styles.css"

interface Props {
    onJoin: () => void;
    loading?: boolean;
};

const DisabledVideoPreview = () => {
    const { data } = authClient.useSession();

    return (
        <DefaultVideoPlaceholder
            participant={
                {
                    name: data?.user.name ?? "",
                    image:
                        data?.user.image ??
                        generateAvatarUri({
                            seed: data?.user.name ?? "",
                            variant: "initials",
                        }),
                } as StreamVideoParticipant
            }
        />
    )
}

const AllowBrowserPermissions = () => {
    return (
        <p className="text-sm">
            Please grant your browser a permission to access your camera and microphone.
        </p>
    )
}


export const CallLobby = ({ onJoin, loading }: Props) => {
    const { useCameraState, useMicrophoneState } = useCallStateHooks();

    const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
    const { hasBrowserPermission: hasCameraPermission } = useCameraState();

    const hasBrowserMediaPermission = hasCameraPermission && hasMicPermission;

    return (
        <div className="flex flex-col items-center justify-center h-full w-full relative overflow-hidden">
            {/* Marketing Background */}
            <div className="absolute inset-0 bg-[#0A0A0B] -z-20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

            <div className="relative z-10 py-4 px-8 flex flex-1 items-center justify-center w-full max-w-2xl">
                <div className="flex flex-col items-center justify-center gap-y-8 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-2xl w-full">
                    <div className="flex flex-col gap-y-3 text-center">
                        <h6 className="text-3xl font-black text-white font-heading">Ready to join?</h6>
                        <p className="text-zinc-400">Configure your devices before entering the session.</p>
                    </div>

                    <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-inner relative group">
                        <div className="absolute inset-0 bg-transparent z-10 custom-stream-video-wrapper"> {/* Wrapper to force styles if needed */}
                            <VideoPreview
                                DisabledVideoPreview={
                                    hasBrowserMediaPermission
                                        ? DisabledVideoPreview
                                        : AllowBrowserPermissions
                                }
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 w-full">
                        <ToggleAudioPreviewButton />
                        <ToggleVideoPreviewButton />
                    </div>

                    <div className="flex gap-4 justify-between w-full pt-4 border-t border-white/5">
                        <Button asChild variant="ghost" className="h-12 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 font-bold">
                            <Link href="/meetings">
                                Cancel
                            </Link>
                        </Button>
                        <Button
                            onClick={onJoin}
                            disabled={loading}
                            className="h-12 pl-6 pr-8 rounded-xl bg-primary text-black font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all hover:scale-105"
                        >
                            <LogInIcon className="mr-2 size-5" />
                            {loading ? "Joining..." : "Join Session"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}