"use client";

import { MarketingBackground } from "@/modules/website/ui/components/marketing-background";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <div className='h-screen w-full relative overflow-hidden bg-zinc-950 selection:bg-primary/30'>
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('/noise.svg')]" />
      </div>

      <main className="h-full w-full">
         {children}
      </main>
    </div>
  )
}

export default Layout;
