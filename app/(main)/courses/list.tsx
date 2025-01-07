"use client"

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { courses } from "@/db/schema";
import { upsertUserProgress } from "@/actions/user-progress";

import { Card } from "./card";
import { getUnits } from "@/db/queries";

type CoursesListProps = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: number | undefined;
}

export const List = ({ courses, activeCourseId }: CoursesListProps) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
        // add userProgress 
        if(pending) return;

        if(id === activeCourseId) {
            return router.push("/learn");
        }

        startTransition(() => {
            upsertUserProgress(id).catch((error) => console.log("Something went wrong in list.", error));
        });
    };

    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {courses && courses.map((course) => {
                return (
                    <Card
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        imageSrc={course.imageSrc}
                        onClick={onClick}
                        disabled={pending}
                        active={course.id === activeCourseId}
                    />
                )
            })}
        </div>
    )
}