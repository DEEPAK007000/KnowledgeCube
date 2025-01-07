import { redirect } from "next/navigation";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";

import { 
    getCourseProgress, 
    getLessonPercentage, 
    getUnits, 
    getUserProgress 
} from "@/db/queries";

import { Header } from "./header";
import { Unit } from "./unit";

const units: any[] = [
    { 
        id: 1,
        order: 2,
        description: "Unit 1",
        title: "Unit 1",
        lessons: [
            {
                id: 1, 
                completed: false
            }
        ],
        activeLesson: {},
        activeLessonPercentage: 20,
    }, 
    { 
        id: 2,
        order: 2,
        description: "Unit 2",
        title: "Unit 2",
        lessons: [
            {
                id: 1, 
                completed: true
            }
        ],
        activeLesson: {},
        activeLessonPercentage: 20,
    }, 
    { 
        id: 3,
        order: 2,
        description: "Unit 3",
        title: "Unit 3",
        lessons: [
            {
                id: 1, 
                completed: false
            }
        ],
        activeLesson: {},
        activeLessonPercentage: 20,
    }
]

const LearnPage = async () => {

    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const unitsData = getUnits();

    const [
        userProgress,
        units,
        courseProgress,
        lessonPercentage
    ] = await Promise.all([
        userProgressData,
        unitsData,
        courseProgressData,
        lessonPercentageData
    ]);

    if(!userProgress || !userProgress.activeCourse) {
        redirect('/courses');
    }

    if(!courseProgress) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            {/* StickWrapper Starts */}
            <StickyWrapper>
                <UserProgress />
            </StickyWrapper>
            {/* StickWrapper Ends */}
            {/* FeedWrapper Starts */}
            <FeedWrapper>
                <Header title="Hindi" />
                {units && units.map((unit: any) => {
                    return (
                        <div key={unit.id} className="mb-10">
                            <Unit
                                id={unit.id}
                                order={unit.order}
                                description={unit.description}
                                title={unit.title}
                                lessons={unit.lessons}
                                activeLesson={courseProgress.activeLesson}
                                activeLessonPercentage={lessonPercentage}
                            />
                        </div>
                    )
                })}
            </FeedWrapper>
            {/* FeedWrapper Ends */}
        </div>
    )
}

export default LearnPage