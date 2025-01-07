"use client"

import Link from "next/link"

import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LessonButtonProps = {
    id: number;
    index: number;
    totalCount: number;
    current: boolean;
    locked: boolean;
    percentage: number;
}

export const LessonButton = ({
    id,
    index,
    totalCount,
    current,
    locked,
    percentage,
}: LessonButtonProps) => {

    const cycleLength = 8;
    const cycleIndex = index % cycleLength;
    let indentationLevel;

    if( cycleIndex <= 2) {
        indentationLevel = cycleIndex;
    } else if(cycleIndex <= 4) {
        indentationLevel = 4 - cycleIndex;
    } else if(cycleIndex <= 6) {
        indentationLevel = 4 - cycleIndex;
    } else {
        indentationLevel = cycleIndex - 8;
    }

    const rightPosition = indentationLevel * 40;
    const isFirst = index === 0;
    const isLast = index === totalCount;
    const isCompleted = !current && !locked;
    const Icon = isCompleted ? Check : isLast ? Crown : Star;
    const href = isCompleted ? `/lesson/${id}` : "/lesson";

    return (
        <Link href={href}>
            <div className="relative"
                style={{
                    right: `${rightPosition}px`,
                    marginTop: isFirst && !isCompleted ? 60 : 24,
                }}
            >
                {current ? (
                    <div className="h-[102px] w-[102px] relative">
                        <div className="absolute left-2.5 px-3 py-3 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
                            Start
                            <div
                                className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-x-8 border-t-8 border-x-transparent"
                            />
                        </div>
                        <CircularProgressbarWithChildren
                            value={Number.isNaN(percentage) ? 0 : percentage}
                            styles={{
                                path: {
                                    stroke: "#22c55e"
                                },
                                trail: {
                                    stroke: "#e5e7e5"
                                }
                            }}
                        >
                            <Button
                                size="rounded"
                                variant={locked ? "locked" : "secondary"}
                                className="h-[70px] w-[70px] border-b-8"
                            >
                                <Icon 
                                    className={cn("h-10 w-10", 
                                            locked 
                                            ? "fill-neutral-400 stroke-neutral-400 text-neutral-400" 
                                            : "fill-primary-foreground text-primary-foreground",
                                            isCompleted && "fill-none storke-[4]"
                                        )}
                                />
                            </Button>
                        </CircularProgressbarWithChildren>
                    </div>
                ) : (
                    <Button
                        size="rounded"
                        variant={locked ? "locked" : "secondary"}
                        className="h-[70px] w-[70px] border-b-8"
                    >
                        <Icon 
                            className={cn("h-10 w-10", 
                                    locked 
                                    ? "fill-neutral-400 stroke-neutral-400 text-neutral-400" 
                                    : "fill-primary-foreground text-primary-foreground",
                                    isCompleted && "fill-none storke-[4]"
                                )}
                        />
                    </Button>
                )}
            </div>
        </Link>
    )
}