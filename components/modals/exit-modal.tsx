"use client"

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useExitModal } from "@/store/use-exit-modal"; //global exit modal state

export const ExitModal = () => {
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const {isOpen, close} = useExitModal();

    useEffect(() => {
        setIsClient(true);
    }, []);


    // Hydration fix Next js
    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image 
                            src="/sad-mascot.svg"
                            alt="Mascot"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle>
                        Wait, don&apos;t go!
                    </DialogTitle>
                    <DialogDescription>
                        You&apos;re about to leave the lesson. Are you sure?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" className="w-full" size="lg" onClick={close}>
                            Keep learning
                        </Button>
                        <Button variant="danger" className="w-full" size="lg" onClick={() => {
                            close();
                        }}>
                            End session
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}