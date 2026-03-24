"use client";

import { aliasGet, roomIdGet } from "@/lib/session";
import { Message } from "@/types/room";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Room() {
  const [message, setMessage] = useState<Message[]>([]);
  const [alias, setAlias] = useState<string | null>("");
  const [roomId, setRoomId] = useState<string | null>("");
  const [inputMessage, setInputMessage] = useState<string>("");
  const [wsError, setWsError] = useState(false)
  //const [isHost, setIsHost] = useState<string | null>("false");
  const socketRef = useRef<WebSocket | null>(null);

  const router = useRouter();
  const params = useParams();
  const roomIdParam = params.roomId;

  useEffect(() => {
    const alias = aliasGet();
    const roomId = roomIdGet();
    //const isHost = isHostGet();

    //route protection
    if (!alias || !roomId) {
      router.push("/");
    }
    if (roomId != roomIdParam) {
      router.push("/");
    }
    setAlias(alias);
    setRoomId(roomId);
    //setIsHost(isHost);
  }, []);
  //connect to websocket server
  useEffect(() => {
    if (!roomId) {
      return;
    }
    const socket = new WebSocket(`ws://localhost:8080?roomId=${roomId}`);
    socketRef.current = socket;
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "JOIN", alias: `${alias}` }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "MESSAGE") {
        setMessage((prev) => [...prev, data.payload]);
      }
    };
    //on ws connection failure
    socket.onerror = ()=> {
      setWsError(true);
    }
    //cleanup logic
    return () => {
      socket.close();
    };
  }, [roomId, alias]);
  //restore the messages
  useEffect(() => {
    async function fetchMsg() {
      if (roomId) {
        const res = await fetch(`/api/room/${roomId}`);
        const data = await res.json();
        console.log(data);
        setMessage(data.messages || []);
      }
    }
    fetchMsg();
  }, [roomId]);

  function handelInputBox() {
    socketRef.current?.send(
      JSON.stringify({
        type: "MESSAGE",
        payload: {
          content: inputMessage,
          sentAt: new Date().toISOString(),
          sentby: alias,
        },
      })
    );
    setInputMessage("");
  }

  return (
    <>
      {!wsError ? <div>
         <div className="bg-gray-700 text-4xl">inbox</div>
        <div className="bg-amber-100 h-80">
          {message.map((v, id) => {
            return (
              <div key={id}>
                {v.content}
                {v.sentby}
                {v.sentAt}
              </div>
            );
          })}
        </div>
        <div className="bg-gray-700">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            type="text"
            placeholder="type your message"
            className="bg-amber-400"
          />
          <button onClick={handelInputBox}>Send</button>
        </div>
      </div> : <div>
        <h1>websocket connection lost</h1>
        </div>}
    </>
  );
}
