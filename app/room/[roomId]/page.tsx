"use client";

import { aliasGet, isHostGet, roomIdGet } from "@/lib/session";
import { Message } from "@/types/room";
import { useEffect, useState } from "react";

export default function Room() {
  const [message, setMessage] = useState<Message[]>([]);
  const [alias, setAlias] = useState<string | null>("");
  const [roomId, setRoomId] = useState<string | null>("");
  //const [isHost, setIsHost] = useState<string | null>("false");

  useEffect(() => {
    const alias = aliasGet();
    const roomId = roomIdGet();
    //const isHost = isHostGet();
    setAlias(alias);
    setRoomId(roomId);
    //setIsHost(isHost);
  }, []);
  //connect to websocket server
  useEffect(()=> {
    if (!roomId) {
      return;
    }
    const socket = new WebSocket(`ws://localhost:8080?roomId=${roomId}`);
    socket.onopen = ()=>{
        socket.send(JSON.stringify({type: "JOIN", "alias": `${alias}`}));
    }

    socket.onmessage = (event)=> {
        const data = JSON.parse(event.data);
        if(data.type === "MESSAGE"){
            setMessage((prev)=>[...prev, data.payload]);
        }
    }
    //cleanup logic
    return ()=> {
        socket.close();
    }
  },[roomId, alias]);

  return (
    <>
    <div>
        <div className="bg-gray-700 text-4xl">inbox</div>
        <div className="bg-amber-100 h-80">

        </div>
        <div className="bg-gray-700">
            <input type="type your messages" className="bg-amber-400"/>
            <button>Send</button>
        </div>
    </div>
    </>
  );
}
