"use client";

import { aliasGet, roomIdGet } from "@/lib/session";
import { Message } from "@/types/room";
import { useEffect, useRef, useState } from "react";

export default function Room() {
  const [message, setMessage] = useState<Message[]>([]);
  const [alias, setAlias] = useState<string | null>("");
  const [roomId, setRoomId] = useState<string | null>("");
  const [inputMessage, setInputMessage] = useState<string>("");
  const socketRef = useRef<WebSocket|null>(null);
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
    socketRef.current = socket;
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

  function handelInputBox(){
    socketRef.current?.send(JSON.stringify({
        type: "MESSAGE",
        payload: {
            content: inputMessage,
            sentAt: "",
            sentby: alias
        }
    }))
  }

  return (
    <>
    <div>
        <div className="bg-gray-700 text-4xl">inbox</div>
        <div className="bg-amber-100 h-80">
            {message.map((v)=>{
                return <div key={v.sentby}>
                    {v.content}
                </div>
            })}
        </div>
        <div className="bg-gray-700">
            <input onChange={(e)=>setInputMessage(e.target.value)}  type="type your messages" className="bg-amber-400"/>
            <button onClick={handelInputBox}>Send</button>
        </div>
    </div>
    </>
  );
}
