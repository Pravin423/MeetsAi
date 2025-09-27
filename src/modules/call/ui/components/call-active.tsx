import Link from "next/link";
import Image from "next/image";
import { CallControls, SpeakerLayout, } from "@stream-io/video-react-sdk"


interface Props{
    onLeave:()=>void,
    meetingName:string,
};


export const CallActive=({onLeave,meetingName}:Props)=>{
    return(
        <div className="flex flex-col h-full justify-baseline p-4 text-white">
            <div className="bg-[#101213] rounded-lg p-4 flex items-center gap-4">
                <Link href="/" className="flex items-center justify-center p-1 bg-white/10 rounded-full
                w-fit gap-2">
                    <Image src="/test3logo.svg" width={22} height={22} alt="logo"/>
                </Link>
                <h4 className="text-base font-semibold">
                    {meetingName}    
                </h4>

            </div>
            <SpeakerLayout/>
            <div className="bg-[#101213] rouneded-full p-4 flex items-center justify-center">
                <CallControls onLeave={onLeave}/>
                
            </div>

        </div>
    )
}
