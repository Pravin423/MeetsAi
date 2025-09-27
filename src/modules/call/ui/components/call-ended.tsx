import {  LogInIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";





export const CallEnded = () => {

    return (
        <div className="flex flex-col justify-center h-full bg-radial from-sidebar-accent to-sidebar ">
            <div className="py-4 px-8 flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center gap-y-6 bg-background rounded-lg
                p-10 shadow-sm justify-center">
                    <div className="flex flex-col items-center gap-y-4 text-center">
                        <h6 className="text-lg font-semibold">
                            You have left the call
                        </h6>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Thank you for joining the meeting. Summary will be appearing soon!
                        </p>

                    </div>
                    <Button asChild >
                        <Link href="/meetings" > 
                        Back to meetings
                        </Link>

                    </Button>

                </div>

            </div>
        </div>
    )
}

