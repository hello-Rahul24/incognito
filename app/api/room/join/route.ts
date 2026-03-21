import { generateName } from "@/lib/aliasGenerator";
import redis from "@/lib/redis";
import { Member, Room } from "@/types/room";
import {z} from "zod"

const roomIdSchema = z.object({
    roomId : z.string()
})

// JOIN ROUTE WILL ACCEPT THE ROOMCODE

export async function  POST(req: Request){
    //user will add room id
    const data = await req.json();
    //checking from zod schema
    const parsedData = roomIdSchema.safeParse(data);
    //if wrong input then return error
    if(!parsedData.success){
        return Response.json({
            success: false,
            message: "we asked for roomID dont add anything"
        })
    }
    // otherwise get roomId
    const roomId = parsedData.data?.roomId;
    //check in redis database is it availabel or not
    const room: Room|null = await redis.get(`room:${roomId}`);
    //if not exist then return error
    if(!room){
        return Response.json({
            success: false,
            message: "this room doesnt exist"
        })
    }
    //if exist then generate name 
    const alias = generateName();
    //generate the member
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