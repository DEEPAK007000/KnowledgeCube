import { Button } from "@/components/ui/button";

const Buttons = () => {
    return (
        <div className="flex flex-col gap-2">
            <Button>
                Default
            </Button>
            <Button variant={"primary"} size={"lg"}>
                Primary
            </Button>
            <Button variant={"secondary"} size={"lg"}>
                Secondary
            </Button>
            <Button variant={"danger"} size={"lg"}>
                Danger
            </Button>
            <Button variant={"ghost"} size={"lg"}>
                Ghost
            </Button>
        </div>
    )
}

export default Buttons;