import Link from "next/link";
import { MeetSyncLogo } from "@/modules/website/ui/components/meetsync-logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="mb-8">
        <Link href="/">
          <MeetSyncLogo size="lg" />
        </Link>
      </div>

      <div className="relative mb-6">
        <div className="text-8xl md:text-9xl font-black text-zinc-900 tracking-tighter select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Page Not Found
          </span>
        </div>
      </div>

      <p className="text-zinc-400 max-w-md text-sm md:text-base mb-8">
        The meeting, agent, or page you are looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex items-center gap-4">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center rounded-md bg-[#00C896] hover:bg-[#00b084] text-black font-semibold px-6 py-2.5 text-sm transition-colors"
        >
          Back to Home
        </Link>
        <Link 
          href="/dashboard" 
          className="inline-flex items-center justify-center rounded-md border border-white/10 hover:bg-white/5 text-white font-medium px-6 py-2.5 text-sm transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
