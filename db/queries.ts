import { cache } from "react";

import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs";
import { asc, eq } from "drizzle-orm";

import { challengeProgress, challenges, courses, lessons, units, userProgress } from "./schema";

export const getUserProgress = cache(async () => {
    const {userId} = auth();

    if(!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    });

    return data;

});

export const getUnits = cache(async () => {
    const { userId } = await auth();

    const userProgress = await getUserProgress();

    if(!userId || !userProgress?.activeCourseId) {
        return [];
    }

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    challenges: {
                        orderBy: (challenges, { asc }) => [asc(challenges.order)],
                        with: {
                            challengeProgress: {
                                where: eq(
                                    challengeProgress.userId,
                                    userId
                                )
                            }
                        }
                    }
                }
            }
        }
    });

    //normalize the data
    const normalizeData = data.map((unit) => {
        const lessonWithCompletedStatus = unit.lessons.map((lesson) => {
            if(lesson.challenges.length === 0) {
                return {...lesson, completed: false};
            }

            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return (
                    challenge.challengeProgress && 
                    challenge.challengeProgress.length > 0 &&
                    challenge.challengeProgress.every((progress) => progress.completed)
                )
            });

            return { ...lesson, completed: allCompletedChallenges }
        });

        return { ...unit, lessons: lessonWithCompletedStatus };
    });

    return normalizeData;

});

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();
    return data;
});

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        with: {
            units: {
                orderBy: (units) => [asc(units.order)],
                with: {
                    lessons: {
                        orderBy: (lessons) => [asc(lessons.order)]
                    }
                }
            }
        }
    });

    return data;
});

export const getCourseProgress = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if(!userId || !userProgress?.activeCourseId) {
        return null;
    }

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons:{
                orderBy: (lessons, {asc}) => [asc(lessons.order)],
                with: {
                    units: true,
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId),
                            }
                        }
                    }
                }
            }
        }
    });

    const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
        // agar kuch bhi galat hua to last condition check karo
        return lesson.challenges.some((challenge) => {
            return !challenge.challengeProgress 
            || challenge.challengeProgress.length === 0 
            || challenge.challengeProgress.some((progress) => progress.completed === false);
        })
    });

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id
    }

});

export const getLesson = cache(async (id?: number) => {
    const { userId } = await auth();

    if(!userId) {
        return null;
    }

    const courseProgress = await getCourseProgress();

    const lessonId = id || courseProgress?.activeLessonId;

    if(!lessonId) {
        return null;
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengesOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId),
                    },
                },
            },
        },
    });

    if(!data || !data.challenges) {
        return null;
    }

    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed = challenge.challengeProgress 
            && challenge.challengeProgress.length > 0
            && challenge.challengeProgress.every((progress) => progress.completed)

        return { ...challenge, completed };
    });

    return { ...data, challenges: normalizedChallenges}

});

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();

    if(!courseProgress?.activeLessonId) {
        return 0;
    }

    const lesson = await getLesson(courseProgress.activeLessonId);

    if(!lesson) {
        return 0;
    }


    const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed);
    const percentage = Math.round((completedChallenges.length / lesson.challenges.length) * 100);

    return percentage;
});