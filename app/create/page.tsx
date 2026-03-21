"use client"
import { aliasSet, isHostSet, roomIdSet } from "@/lib/session";
import { useRouter } from "next/navigation";

export default function CreatePage(){
    const router = useRouter();
    async function  handelRoomGenarate (){
        const response = await fetch("/api/room/create",{
            method: "POST"
        })
        const data = await response.json();
        aliasSet(data.aliasName);
        roomIdSet(data.roomId);

        const isHost = "true";
        isHostSet(isHost);

        router.push(`/lobby/${data.roomId}`)
    }
   
    return(
        
        <div>

            <button onClick={handelRoomGenarate}>create room</button>
           
        </div>
        
    )
}