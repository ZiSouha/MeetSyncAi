import { useState } from "react";
import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";

interface Props {
    meetingName: string;
};

export const CallUI = ({ meetingName }: Props) => {
    const trpc = useTRPC();
    const call = useCall();
    const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

    const [isJoining, setIsJoining] = useState(false);

    const { mutateAsync: joinAgent } = useMutation(
        trpc.meetings.joinAgent.mutationOptions()
    );

    const handleJoin = async () => {
        if (!call || isJoining || call.state.callingState !== "idle") return;

        setIsJoining(true);
        try {
            await call.join();
            setShow("call");

            // Manually trigger agent to join
            await joinAgent({ meetingId: call.id });
        } catch (error) {
            console.error(error);
            toast.error("Failed to start AI meeting");
        } finally {
            setIsJoining(false);
        }
    };

    const handleLeave = () => {
        if (!call) return;

        call.endCall();
        setShow("ended");
    };

    return (
        <StreamTheme className="h-full">
            {show === "lobby" && <CallLobby onJoin={handleJoin} loading={isJoining} />}
            {show === "call" && <CallActive onLeave={handleLeave} meetingName={meetingName} />}
            {show === "ended" && <CallEnded/>}
        </StreamTheme>
    )
}