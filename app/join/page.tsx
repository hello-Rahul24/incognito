"use client";

import { aliasSet, isHostSet, roomIdSet } from "@/lib/session";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { Input } from "@/components/ui/Input";

export default function JoinRoom() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  async function handelSubmit() {
    const response = await fetch("/api/room/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId: input,
      }),
    });
    const data = await response.json();
    if (data.success) {
      aliasSet(data.alias);
      roomIdSet(data.roomId);
      const isHost = "false";
      isHostSet(isHost);
      router.push(`/lobby/${data.roomId}`);
    } else {
      setError(true);
    }
  }
  return (
    <main className="bg-white justify-center w-full h-screen flex flex-col items-center p-4">
      <Card className="w-lg bg-[#efeefb]">
        <CardContent className="flex flex-col gap-3 items-center ">
          <div className="font-space text-3xl">Join Room</div>
          <div className="mb-6">enter the code your friend shared</div>
          <Input onChange={(e) => {
            setInput(e.target.value);
          }} className="p-5 text-xl mt-3 bg-white" placeholder= "Enter your room code"/>
          <div className="mb-5 text-muted">ask the host for the room code</div>
           <Card className="px-6 mb-6 bg-gray-200" >
            <CardContent className="text-center ">
              {error?"This room does not exist":"you'll get a random alias like ThunderMoose or CrimsonVolt nobody will know who you really are"}
            </CardContent>
          </Card>
          <Button onClick={handelSubmit} className={
            "py-6 hover:animate-out bg-[#7f77dd] hover:bg-white hover:text-black font-bold w-full"
          }
          variant={"default"}>Join Room </Button>
        </CardContent>
      </Card>
    </main>
  );
}
