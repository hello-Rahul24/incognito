import { generateName } from "@/lib/aliasGenerator";
import redis from "@/lib/redis";
import { Member, Room } from "@/types/room";
import {z} from "zod"

const roomIdSchema = z.object({
    roomId : z.string()
})

export async function  POST(req: Request){
    //user will add room id

    const data = await req.json();
    const parsedData = roomIdSchema.safeParse(data);
    if(!parsedData.success){
        return Response.json({
            success: false,
            message: "we asked for roomID dont add anything"
        })
    }
    const roomId = parsedData.data?.roomId;
    const room: Room|null = await redis.get(`room:${roomId}`);
    //if exist then add
    if(!room){
        return Response.json({
            success: false,
            message: "this room doesnt exist"
        })
    }
    const alias = generateName();
    const member: Member = {
        isHost: false,
        alias: alias
    }
    //update the room
    room.members.push(member);
    //push again the room to redis
    await redis.set(`room:${roomId}`, room);
    return Response.json({
        success: true,
        message: `you are joined to ${roomId}`,
        alias
    })

}