"use client";

import { aliasSet, isHostSet, roomIdSet } from "@/lib/session";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinRoom() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  async function handelSubmit() {
    const response = await fetch("/api/room/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId: input
      }),
    });
    const data = await response.json();
    if (data.success) {
      aliasSet(data.alias);
      roomIdSet(data.roomId);
      const isHost = "false"
      isHostSet(isHost);
      router.push(`/lobby/${data.roomId}`);
    } else {
      setError(true);
    }
  }
  return (
    <div>
      this is join room
      <div>
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
          placeholder="enter your roomID"
        />
        <button onClick={handelSubmit}>Submit</button>
      </div>
      {error && <div>this room does not exist</div>}
    </div>
  );
}
