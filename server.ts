import { WebSocketServer, WebSocket } from "ws";
import { Message, Room } from "./types/room";
import { Redis } from "@upstash/redis";

const wss = new WebSocketServer({ port: 8080 });
const rooms = new Map<string, { socket: WebSocket; alias: string }[]>();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

wss.on("connection", (socket, req) => {
  if (!req.url) {
    socket.close();
    return;
  }
  const parsedUrl = new URL(req.url, "http://localhost:8080");
  const roomId = parsedUrl.searchParams.get("roomId");
  if (!roomId) {
    socket.close();
    return;
  }

  //if user disconnects
  socket.on("close", () => {
    const socketArray = rooms.get(roomId);
    const newSocketArray = socketArray?.filter((v) => v.socket !== socket);
    if (newSocketArray) {
      rooms.set(roomId, newSocketArray);
    }
    if (newSocketArray?.length == 0) {
      rooms.delete(roomId);
    }
  });

  //when client send message
  socket.on("message",async (data) =>  {
    const parsedData = JSON.parse(data.toString());

    //if message type join
    if (parsedData.type == "JOIN") {
      if (rooms.get(roomId)) {
        //it will give an array
        rooms.get(roomId)?.push({ socket: socket, alias: parsedData.alias });
      } else {
        rooms.set(roomId, [{ socket: socket, alias: parsedData.alias }]);
      }
      //send existing members to the new user only
      socket.send(JSON.stringify({
        type: "EXIST_MEMBERS",
        members: rooms.get(roomId)?.map((v)=> v.alias)
      }))


      const socketArray = rooms.get(roomId);
      //broadcasting everyone
      socketArray?.forEach((v) => {
        if(v.socket != socket){
          v.socket.send(
          JSON.stringify({
            type: "WELCOME",
            alias: `${parsedData.alias}`,
          })
        );
        }
        
      });
    }

    //type ==== START_ROOM
    if(parsedData.type === "START_ROOM"){
      const socketArray = rooms.get(roomId);
      socketArray?.forEach((v)=> {
        v.socket.send(JSON.stringify({type: "START_ROOM"}))
      })
    }
    //type === MESSAGE
    if(parsedData.type === "MESSAGE"){
      //get the room
     const room:Room|null =await redis.get(`room:${roomId}`);
     const message : Message = {
      content: parsedData.payload.content,
      sentAt: parsedData.payload.sentAt,
      sentby: parsedData.payload.sentby
     }
     if(room){
     room.messages.push(message)
     await redis.set(`room:${roomId}`,room);
     }
    

      const socketArray = rooms.get(roomId);
      socketArray?.forEach((v)=> {
        v.socket.send(JSON.stringify({
          type: "MESSAGE",
          payload: parsedData.payload
        }))
      })
    }
  });
});
console.log("WebSocket server running on port 8080");
