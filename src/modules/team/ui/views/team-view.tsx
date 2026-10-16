"use client"

import { Users, Plus, Star, Shield, Search, MoreHorizontal, Mail, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export const TeamView = () => {
    const members = [
        { name: "John Doe", email: "john@example.com", role: "Owner", status: "Active" },
        { name: "Sarah Chen", email: "sarah@example.com", role: "Admin", status: "Active" },
        { name: "Marcus Thorne", email: "marcus@example.com", role: "Member", status: "Invited" },
    ];

    return (
        <div className="space-y-8 flex flex-col min-h-full">
            {/* Professional Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Team Management</h1>
                    <p className="text-sm text-zinc-500 mt-1">Manage workspace members, permissions, and roles.</p>
                </div>
                <Button className="h-9 px-4 rounded-md bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold">
                    <Plus className="size-3.5 mr-1.5" />
                    Invite Member
                </Button>
            </div>

            {/* Metric Overview - Serious Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-white/5 bg-zinc-900/40 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Members</p>
                        <p className="text-xl font-bold text-white mt-1">14</p>
                    </div>
                    <Users className="size-5 text-zinc-700" />
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-zinc-900/40 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Roles</p>
                        <p className="text-xl font-bold text-white mt-1">3</p>
                    </div>
                    <Shield className="size-5 text-zinc-700" />
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-zinc-900/40 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Space Utilization</p>
                        <p className="text-xl font-bold text-emerald-500 mt-1">Normal</p>
                    </div>
                    <CheckCircle2 className="size-5 text-emerald-500/20" />
                </div>
            </div>

            <div className="flex-1 rounded-xl border border-white/5 bg-zinc-900/40 overflow-hidden min-h-[400px]">
                <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
                    <div className="relative w-64">
                        <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                        <Input 
                            placeholder="Find member..." 
                            className="h-8 pl-9 bg-transparent border-none text-xs focus-visible:ring-0" 
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Member</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Role</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-3 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {members.map((member, i) => (
                                <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-md bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-bold text-zinc-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                {member.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white tracking-tight">{member.name}</p>
                                                <p className="text-[10px] text-zinc-600 font-medium">{member.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="secondary" className="h-5 px-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-500 border border-white/5">
                                            {member.role}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`size-1.5 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                            <span className="text-xs font-medium text-zinc-400">{member.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-700 hover:text-white">
                                            <MoreHorizontal className="size-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="flex items-center justify-between py-6">
                 <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Plan Seat Limit: 14/20</p>
                 <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 border-white/5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Previous</Button>
                    <Button variant="outline" size="sm" className="h-8 border-white/5 text-[10px] font-bold uppercase tracking-widest text-white">Next</Button>
                 </div>
            </div>
        </div>
    )
}
