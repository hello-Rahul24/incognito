"use client"

import { aliasGet, isHostGet, roomIdGet } from "@/lib/session";
import { useEffect, useState } from "react";

export default function LobbyPage() {
  const [alias, setAlias] = useState<string | null>("");
  const [roomId, setRoomId] = useState<string | null>("");
  const [isHost, setIsHost] = useState<string | null>("false");

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
  return (
    <div>
      this is lobby page
      <h1>this is your alias name {alias}</h1>
      <h4>this is your roomId: {roomId}</h4>
      {isHost === "true" ? "you are the host" : "wait for the host to start"}
    </div>
  );
}
