"use client";

import { aliasGet, isHostGet, roomIdGet } from "@/lib/session";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function LobbyPage() {
  const [alias, setAlias] = useState<string | null>("");
  const [roomId, setRoomId] = useState<string | null>("");
  const [isHost, setIsHost] = useState<string | null>("false");
  const [members, setMembers] = useState<string[]>([]);
  const router = useRouter();

  const socketRef = useRef<WebSocket|null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const alias = aliasGet();
      const roomId = roomIdGet();
      const isHost = isHostGet();
      setAlias(alias);
      setRoomId(roomId);
      setIsHost(isHost);
    }
  }, []);

  useEffect(() => {
    if (!roomId) {
      return;
    }
    const socket = new WebSocket(`ws://localhost:8080?roomId=${roomId}`);
    socketRef.current = socket;
    //send alias to ws to boradcast
    socket.onopen = () => {
      console.log("connected to websocket");
      socket.send(JSON.stringify({"type": "JOIN", "alias": `${alias}`}));

    };
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if(data.type === "WELCOME"){
          setMembers((prev) => [...prev , data.alias]);
        }
        if(data.type === "EXIST_MEMBERS"){
          setMembers(data.members);
        }
        if(data.type === "START_ROOM"){
          router.push(`/room/${roomId}`)
        }
    }
    //cleanup function when components unmounts
    return () => {
      socket.close();
    };
  }, [roomId, alias]);

  function handelStart(){
    socketRef.current?.send(JSON.stringify({type: "START_ROOM"}));
  }


  return (
    <div>
      this is lobby page
      <h1>this is your alias name {alias}</h1>
      <h4>this is your roomId: {roomId}</h4>
      {isHost === "true" ? "you are the host" : "wait for the host to start"}
      {members?.map((v,id)=> {
        return(
          <div key={id}>
            {v}
          </div>
        )
      })}
      {isHost === "true" && (
        <div>
          <button onClick={handelStart}>start the chaos</button>
        </div>
      )}
    </div>
  );
}
