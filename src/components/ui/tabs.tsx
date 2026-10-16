"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-white/[0.03] text-zinc-500 inline-flex h-12 w-fit items-center justify-center rounded-2xl p-1.5 border border-white/[0.05] backdrop-blur-md",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-500 data-[state=active]:border-emerald-500/20 focus-visible:ring-emerald-500/20 text-zinc-500 inline-flex h-full flex-1 items-center justify-center gap-2.5 rounded-xl border border-transparent px-6 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-[0_0_20px_rgba(16,185,129,0.1)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
