import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

export const UserProgress = () => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/courses">
                <Button variant="ghost">
                    <Image src="/in.svg" alt="" width="32" height="32" className="rounded-md border" />
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-pink-500">
                    <Image src="/points.svg" alt="" width="28" height="28" className="mr-2 mb-1" />
                    Points
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-rose-500">
                    <Image src="/heart.svg" alt="Hearts" width="22" height="22" className="mr-2" />
                    hearts
                </Button>
            </Link>
        </div>
    )
}