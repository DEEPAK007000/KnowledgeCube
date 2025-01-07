"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

type SidebarItemProps = {
    label: string;
    href: string;
    iconSrc: string;
    activeIconSrc?: string;
}

export const SidebarItem = ({ label, href, iconSrc, activeIconSrc = iconSrc }: SidebarItemProps) => {
    
    const pathName = usePathname();
    const active = pathName === href;

    return (
        <Button
            variant={active ? "sidebarOutline" : "sidebar"} // TODO: need to create it dynamic
            className="justify-start h-[52px]"
            asChild
        >
            <Link href={href}>
                <Image src={active ? activeIconSrc : iconSrc} height={32} width={32} className="mr-5" alt="" />
                {label}
            </Link>
        </Button>
    )
}