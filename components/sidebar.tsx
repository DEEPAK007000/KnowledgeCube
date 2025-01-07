import Image from "next/image";
import Link from "next/link";

import { SidebarItem } from "@/components/sidebar-item";
import { cn } from "@/lib/utils";

type SidebarProps = {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    return (
        <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)}>
            <Link href="/learn">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/lingo-logo.png" height={40} width={40} alt="Lingo Mobile Logo" />
                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
                        Lingo
                    </h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem
                    label="Learn"
                    href="/learn"
                    iconSrc="/es.svg"
                />
                <SidebarItem 
                    label="Leaderboard"
                    href="/leaderboard"
                    iconSrc="/leaderboard.svg"
                    activeIconSrc="/leaderboard-active.svg"
                />
                <SidebarItem 
                    label="Quests"
                    href="/quests"
                    iconSrc="/es.svg"
                />
                <SidebarItem 
                    label="Shop"
                    href="/shop"
                    iconSrc="/es.svg"
                />
            </div>
        </div>
    )
}