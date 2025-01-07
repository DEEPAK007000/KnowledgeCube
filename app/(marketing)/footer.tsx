import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size={"lg"} variant={"ghost"} className="w-full">
                    <Image 
                        src={"/in.svg"}
                        alt=""
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Hindi
                </Button>
                <Button size={"lg"} variant={"ghost"} className="w-full">
                    <Image 
                        src={"/es.svg"}
                        alt=""
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Spanish
                </Button>
                <Button size={"lg"} variant={"ghost"} className="w-full">
                    <Image 
                        src={"/fi.svg"}
                        alt=""
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Finnish
                </Button>
                <Button size={"lg"} variant={"ghost"} className="w-full">
                    <Image 
                        src={"/jp.svg"}
                        alt=""
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Japanese
                </Button>
                <Button size={"lg"} variant={"ghost"} className="w-full">
                    <Image 
                        src={"/ru.svg"}
                        alt=""
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Russian
                </Button>
            </div>
        </footer>
    )
}