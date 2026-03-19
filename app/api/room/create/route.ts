import { generateName } from "@/lib/aliasGenerator";
import redis from "@/lib/redis";
import { roomCodeGen } from "@/lib/roomCode";
import { Member, Room } from "@/types/room";

export async function POST(req:Request) {
    const roomId = roomCodeGen();
    const aliasName = generateName();

    const member: Member = {
        alias: aliasName,
        isHost: true
    }

    const room: Room = {
        id: roomId,
        owner: member,
        members: [member],
        messages: [],
        status: "lobby"
    }
    await redis.set(`room:${roomId}`,room);

    return Response.json({
        roomId,
        aliasName
    })
}