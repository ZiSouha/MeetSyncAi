
import { Suspense } from "react";
import { SettingsView } from "@/modules/settings/ui/views/settings-view";
import { LoadingState } from "@/components/loading-state";

const Page = () => {
    return (
        <Suspense fallback={<LoadingState title="Loading Settings" description="Accessing neural parameters..." />}>
            <SettingsView />
        </Suspense>
    );
};

export default Page;
