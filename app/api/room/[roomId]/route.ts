import redis from "@/lib/redis";
import { Room } from "@/types/room";


export async function GET(req:Request, {params}: {params: Promise<{roomId: string}>}) {
    const {roomId} = await params;
    const room : Room|null = await redis.get(`room:${roomId}`);
    if(!room){
        return Response.json({
            success: "false",
            message: "No room find"
        })
    }
    const messages = room.messages;
    return Response.json({
    success: true,
    messages
})
}