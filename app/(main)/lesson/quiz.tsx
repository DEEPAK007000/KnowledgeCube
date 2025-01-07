"use client"

import { useState } from "react";

import { challenges, challengesOptions } from "@/db/schema";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengesOptions: typeof challengesOptions.$inferSelect[];
    })[];
    userSubscription: any; //ToDo: Resplace this with subscription DB type
}

const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription
}: Props) => {

    const [hearts, setHearts] = useState(20 || initialHearts);
    const [percentage, setPercentage] = useState(50 || initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const incompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return incompletedIndex === -1 ? 0 : incompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.challengesOptions || [];

    const onSelect = (id: number) => {
        if (status !== "none") return;

        setSelectedOption(id);        
    }

    const title = challenge.type === "ASSIST" ? "Select the correct meaning" : challenge.question;



    return (
        <>
            <Header 
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700 mt-5">
                            {title}
                        </h1>
                        <div>
                            {challenge.type === "SELECT" && (
                                <QuestionBubble question={challenge.question} />
                            )}
                            <Challenge 
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={false}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Quiz;