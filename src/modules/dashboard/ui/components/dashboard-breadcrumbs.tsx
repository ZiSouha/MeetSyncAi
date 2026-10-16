"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

export function DashboardBreadcrumbs() {
    const pathname = usePathname()
    const paths = pathname.split("/").filter((path) => path !== "" && !path.startsWith("("));

    return (
        <nav className="flex items-center space-x-1.5 text-xs font-medium text-zinc-500">
            {paths.map((path, index) => {
                const href = `/${paths.slice(0, index + 1).join("/")}`
                const isLast = index === paths.length - 1
                const label = path === "dashboard" ? "Dashboard" : path.replace(/-/g, " ")

                return (
                    <React.Fragment key={path}>
                        {index > 0 && <ChevronRight className="size-3.5 text-zinc-700 shrink-0" />}
                        {isLast ? (
                            <span className="text-zinc-200 capitalize">
                                {label}
                            </span>
                        ) : (
                            <Link
                                href={href}
                                className="hover:text-zinc-300 transition-colors capitalize"
                            >
                                {label}
                            </Link>
                        )}
                    </React.Fragment>
                )
            })}
        </nav>
    )
}
