"use client"

import { aliasGet, roomIdGet } from "@/lib/session";
import { useEffect, useState } from "react";

export default function LobbyPage() {
  const [alias, setAlias] = useState<string | null>("");
  const [roomId, setRoomId] = useState<string | null>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const alias = aliasGet();
      const roomId = roomIdGet();
     
        setAlias(alias);
        setRoomId(roomId);
      
    }
  }, []);
  return (
    <div>
      this is lobby page
      <h1>this is your alias name {alias}</h1>
      <h4>this is your roomId: {roomId}</h4>
    </div>
  );
}
