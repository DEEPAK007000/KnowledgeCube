import "dotenv/config";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding my database.");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.challengesOptions);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: 'Spanish',
                imageSrc: '/es.svg',
            },
            {
                id: 2,
                title: 'Finnish',
                imageSrc: '/fi.svg',
            },
            {
                id: 3,
                title: 'Japanese',
                imageSrc: '/jp.svg',
            },
            {
                id: 4,
                title: 'Russian',
                imageSrc: '/ru.svg',
            },
            {
                id: 5,
                title: 'Hindi',
                imageSrc: '/in.svg',
            }
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                title: 'Hindi Unit 1',
                description: 'Learn the basics of Vyakraan',
                courseId: 5,
                order: 1,
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                title: 'Nouns',
                order: 1,
                unitId: 1
            },
            {
                id: 2,
                title: 'Verbs',
                order: 2,
                unitId: 1
            },
            {
                id: 3,
                title: 'Adjectives',
                order: 3,
                unitId: 1
            },
            {
                id: 4,
                title: 'Adverbs',
                order: 4,
                unitId: 1
            },
            {
                id: 5,
                title: 'Articles',
                order: 5,
                unitId: 1
            },
            
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: 'SELECT',
                order: 1,
                question: 'Ram park mein khel rha hai, Isme Noun bata kon sa hai?'
            },
            {
                id: 2,
                lessonId: 2,
                type: 'SELECT',
                order: 2,
                question: 'Ram park mein khel rha hai, Isme Verb bata kon sa hai?'
            }
        ]);

        await db.insert(schema.challengesOptions).values([
            {
                id: 1,
                type: 'SELECT',
                challengeId: 1,
                text: 'Ram , Park',
                correct: true,
                audioSrc: '/hindi_answer1.mp3',
                imageSrc: '/sad-mascot.svg'
            },
            {
                id: 2,
                type: 'SELECT',
                challengeId: 1,
                text: 'Ram, Khel',
                correct: false,
                audioSrc: '/hindi_answer2.mp3',
                imageSrc: '/sad-mascot.svg'
            },
            {
                id: 3,
                type: 'SELECT',
                challengeId: 1,
                text: 'rha, Khel',
                correct: false,
                audioSrc: '/hindi_answer3.mp3',
                imageSrc: '/sad-mascot.svg'
            },
            {
                id: 4,
                type: 'SELECT',
                challengeId: 1,
                text: 'park, Khel',
                correct: false,
                audioSrc: '/hindi_answer4.mp3',
                imageSrc: '/sad-mascot.svg'
            },
            {
                id: 5,
                type: 'SELECT',
                challengeId: 2,
                text: 'Ram , Park',
                correct: true,
                audioSrc: '/hindi_answer1.mp3',
                imageSrc: '/sad-mascot.svg'
            },
            {
                id: 6,
                type: 'SELECT',
                challengeId: 2,
                text: 'Ram, Khel',
                correct: false,
                audioSrc: '/hindi_answer2.mp3',
                imageSrc: '/sad-mascot.svg'
            },
            {
                id: 7,
                type: 'SELECT',
                challengeId: 2,
                text: 'rha, Khel',
                correct: false,
                audioSrc: '/hindi_answer3.mp3',
                imageSrc: '/sad-mascot.svg'
            },
            {
                id: 8,
                type: 'SELECT',
                challengeId: 2,
                text: 'park, Khel',
                correct: false,
                audioSrc: '/hindi_answer4.mp3',
                imageSrc: '/sad-mascot.svg'
            }
        ]);


        console.log("DB seeding finished!");


    } catch (error) {
        console.log("Code Path Gya -- seed.ts");
    }
}

main();