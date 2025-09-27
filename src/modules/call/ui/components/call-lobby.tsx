import {  LogInIcon } from "lucide-react";
import Link from "next/link";
import {
    DefaultVideoPlaceholder,
    StreamVideoParticipant,
    ToggleAudioPreviewButton,
    ToggleVideoPreviewButton,
    useCallStateHooks,
    VideoPreview,
} from "@stream-io/video-react-sdk";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { generateAvatarUri } from "@/lib/avatar";

import "@stream-io/video-react-sdk/dist/css/styles.css";


interface Props {
    onJoin: () => void;
};

const DisabledVideoPreview = () => {
    const { data } = authClient.useSession();

    return (
        <DefaultVideoPlaceholder participant={{
            name: data?.user.name ?? "",
            image: data?.user.image ?? generateAvatarUri({
                seed: data?.user.name ?? "", variant: "initials",
            }),
        } as StreamVideoParticipant
        } />
    )

}

const AllowBroswerPermissions = () => {
    return (
        <p className="text-sm">
            Please allow browser permissions for camera and microphone to join the meeting.

        </p>
    )
}

export const CallLobby = ({ onJoin }: Props) => {
    const { useCameraState, useMicrophoneState } = useCallStateHooks();

    const { hasBrowserPermission: hasCameraPermission } = useCameraState();
    const { hasBrowserPermission: hasMicrophonePermission } = useMicrophoneState();

    const hasBrowserMediaPermission = hasCameraPermission && hasMicrophonePermission;

    return (
        <div className="flex flex-col justify-center h-full bg-radial from-sidebar-accent to-sidebar ">
            <div className="py-4 px-8 flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center gap-y-6 bg-background rounded-lg
                p-10 shadow-sm justify-center">
                    <div className="flex flex-col items-center gap-y-4 text-center">
                        <h6 className="text-lg font-semibold">
                            Ready to join the meeting?
                        </h6>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Please ensure your camera and microphone are working properly.
                        </p>

                    </div>
                    <VideoPreview className="w-64 h-64 rounded-lg bg-black"
                        DisabledVideoPreview={hasBrowserMediaPermission
                            ? DisabledVideoPreview : AllowBroswerPermissions} />

                    <div className="flex items-center gap-x-4">
                        <ToggleAudioPreviewButton />
                        <ToggleVideoPreviewButton />

                    </div>
                    <div className="flex  gap-x-2  justify-between w-full">
                        <Button asChild variant="ghost">
                            <Link href="/meetings" >
                                Cancel
                            </Link>

                        </Button>
                        <Button 
                        onClick={onJoin}>
                            <LogInIcon className="size-4 mr-2" />
                            Join Call
                        </Button>

                    </div>

                </div>

            </div>
        </div>
    )
}

