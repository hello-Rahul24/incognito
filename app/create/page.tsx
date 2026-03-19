"use client"

import Link from "next/link";
import {generateName} from "@/lib/aliasGenerator";
import {roomCodeGen} from "@/lib/roomCode";
import { useEffect, useState } from "react";
import WebSocket from "ws";
export default function CreatePage(){
    const [randomName, setRandomName] = useState("");
    const [roomId, setRoomId] = useState("");
    const handelCreation = ()=> {
        const randomName = generateName();
        setRandomName (randomName);
        const roomId = roomCodeGen();
        setRoomId(roomId);
    }
    useEffect(()=>{
        if(roomId){
            const ws = new WebSocket(`ws://localhost:8080?roomId=${roomId}`)
        }
    },[roomId])
    return(
        <>
        <div>
            choose your vibe 
        </div>
        <div>
            choose room time
        </div>
        <div>
            choose reveal or not
        </div>
        <div>
            <button onClick={handelCreation}>create room</button>
            {randomName}
            {roomId}
        </div>
        </>
        
    )
}