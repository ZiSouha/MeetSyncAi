"use client"

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const IntegrationCallbackPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const trpc = useTRPC();
    const code = searchParams.get("code");

    const connect = useMutation({
        ...trpc.integrations.connect.mutationOptions(),
        onSuccess: () => {
            toast.success("Calendar connected successfully!");
            router.push("/settings?tab=integrations");
        },
        onError: (err) => {
            toast.error("Failed to connect calendar: " + err.message);
            router.push("/settings?tab=integrations");
        }
    });

    useEffect(() => {
        if (code) {
            connect.mutate({ code });
        } else {
            router.push("/settings?tab=integrations");
        }
    }, [code]);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="size-10 animate-spin text-primary mb-4" />
            <p className="text-zinc-400">Connecting your calendar...</p>
        </div>
    );
}

export default IntegrationCallbackPage;
