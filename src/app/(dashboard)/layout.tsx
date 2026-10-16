import { SidebarProvider } from "@/components/ui/sidebar";
import { CommandMenu } from "@/components/command-menu";
import DashboardNavbar from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

interface Props {
    children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    return (
        <SidebarProvider>
            <CommandMenu />
            <div className="flex min-h-screen w-full bg-zinc-950 font-sans antialiased selection:bg-primary/20">
                <DashboardSidebar />
                <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden bg-zinc-950">
                    <DashboardNavbar />
                    <main className="flex-1 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                        <div className="p-8 max-w-[1400px] mx-auto w-full">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default Layout;