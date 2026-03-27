"use client";
import { aliasSet, isHostSet, roomIdSet } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function CreatePage() {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);

  async function handelRoomGenarate() {
    setLoader(true);
    const response = await fetch("/api/room/create", {
      method: "POST",
    });
    const data = await response.json();
    aliasSet(data.aliasName);
    roomIdSet(data.roomId);

    const isHost = "true";
    isHostSet(isHost);

    router.push(`/lobby/${data.roomId}`);
    setLoader(false);
  }

  return (
    <main className="flex flex-col items-center  w-full h-screen bg-white">
      {loader && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#7f77dd] border-t-transparent"></div>
        </div>
      )}
      {/* top create a new room blurry  */}
      <div className="flex  m-6 flex-col items-center bg-white px-6 py-4 rounded-3xl backdrop-blur-2xl w-96 ">
        <span className="font-space text-2xl">
          {" "}
          <span className="animate-bounce rotate-2">create</span> a new room
        </span>
        <span className="">set up your session</span>
      </div>
      {/* room vibe */}
      <Card className="bg-[#efeefb] w-lg space-y-2  p-4">
        <Card>
          <CardHeader>
            <CardTitle>Room Vibe</CardTitle>
            <CardDescription>set your room vibe !!</CardDescription>
          </CardHeader>
          <CardContent className="space-x-2 space-y-2">
            <Button variant={"outline"}>anything goes</Button>
            <Button variant={"outline"}>truth or dare</Button>
            <Button variant={"outline"}>hot takes</Button>
            <Button variant={"outline"}>roast session</Button>
            <Button variant={"outline"}>confession</Button>
          </CardContent>
        </Card>
        {/* session strength */}
        <Card>
          <CardHeader>
            <CardTitle>Session Strength</CardTitle>
            <CardDescription>set your room timer</CardDescription>
          </CardHeader>
          <CardContent className="justify-between flex">
            <Button className={`px-4 rounded-3xl`} variant={"outline"}>
              10 min
            </Button>
            <Button variant={"outline"} className={`px-4 rounded-3xl`}>
              20 min
            </Button>
            <Button className={`px-4 rounded-3xl`} variant={"outline"}>
              30 min
            </Button>
            <Button className={`px-4 rounded-3xl`} variant={"outline"}>
              45 min
            </Button>
            <Button className={`px-4 rounded-3xl`} variant={"outline"}>
              60 min
            </Button>
          </CardContent>
        </Card>
        {/* reveal at the end */}
        <Card>
          <CardHeader>
            <CardTitle>reveal at the end ?</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-around">
            <Button size={"lg"} className={"px-11"} variant={"outline"}>
              Yes, guess who
            </Button>
            <Button size={"lg"} className={"px-15"} variant={"outline"}>
              no reveal
            </Button>
          </CardContent>
        </Card>
        <Button
          onClick={handelRoomGenarate}
          size={"lg"}
          className={
            "py-6 hover:animate-out bg-[#7f77dd] hover:bg-white hover:text-black font-bold"
          }
          variant={"default"}
        >
          {loader ? "loading..." : "Create Room"}
        </Button>
      </Card>
    </main>
  );
}
