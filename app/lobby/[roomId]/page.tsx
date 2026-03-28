"use client";

import { aliasGet, isHostGet, roomIdGet } from "@/lib/session";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LobbyPage() {
  const [alias, setAlias] = useState<string | null>("");
  const [roomId, setRoomId] = useState<string | null>("");
  const [isHost, setIsHost] = useState<string | null>("false");
  const [members, setMembers] = useState<string[]>([]);
  const router = useRouter();

  const socketRef = useRef<WebSocket | null>(null);

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
      socket.send(JSON.stringify({ type: "JOIN", alias: `${alias}` }));
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "WELCOME") {
        setMembers((prev) => [...prev, data.alias]);
      }
      if (data.type === "EXIST_MEMBERS") {
        setMembers(data.members);
      }
      if (data.type === "START_ROOM") {
        router.push(`/room/${roomId}`);
      }
    };
    //cleanup function when components unmounts
    return () => {
      socket.close();
    };
  }, [roomId, alias]);

  function handelStart() {
    socketRef.current?.send(JSON.stringify({ type: "START_ROOM" }));
  }

  return (
    <main className="bg-white w-full h-screen flex items-center flex-col gap-3">
      {/*<div>
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
    </div> */}
      {/* navbar */}
      <div className="h-24 w-lg bg-amber-800 mt-10 mb-5 mx-10 flex items-center justify-between px-6 rounded-xl">
        <div className="bg-cyan-400 flex items-center gap-3 px-4 py-2 rounded-lg">
          <span className="font-semibold">Incognito</span>
          <span className="text-sm opacity-70">Lobby</span>
        </div>
        <div className="bg-red-500 px-4 py-2 rounded-lg text-white font-medium">
          Live
        </div>
      </div>
      {/* showing room info */}
      <div className="bg-fuchsia-500 border-2 w-lg h-48 rounded-2xl p-4 flex flex-col items-center justify-between  gap-2">
        <span>ROOM CODE - TAP TO COPY</span>
        <div className="bg-amber-200 py-2 px-14 text-2xl">{roomId}</div>
        <span>share with your friends</span>
      </div>
      {/* showing joined player */}
      <Card className="w-lg">
        <CardHeader className="backdrop-blur-xl">
          <CardTitle >IN THE ROOM {members.length}/8</CardTitle>
        </CardHeader>
        <CardContent className="max-h-48 mt-2 overflow-y-auto space-y-3 pr-2">
          {members?.map((v, id) => {
            return (
              <Card className="bg-amber-600" key={id}>
                <CardContent className="flex items-center justify-between  px-4 py-3">
                  <h2 className="font-medium">Player {id + 1}</h2>
                  <span className="text-sm text-muted-foreground">Joined</span>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>
      
     {isHost== "true"? <Button
        onClick={handelStart}
        className={"w-lg bg-[#7f77dd] py-6 cursor-pointer "}
        size={"lg"}
      >
        Start the Chaos
      </Button> : <Button variant={"outline"} className={"bg-white w-lg text-black  py-6"}>waiting for host to start the chaos</Button>} 
    </main>
  );
}
