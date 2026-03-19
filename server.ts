import { WebSocketServer, WebSocket } from "ws";


const wss = new WebSocketServer({port: 8080});

const rooms = new Map<string, WebSocket[]>

wss.on("connection", (socket, req) => {
    if(!req.url){
        socket.close();
        return;
    }
    const parsedUrl = new URL(req.url, "http://localhost:8080");
    const roomId = parsedUrl.searchParams.get("roomId")
    if(!roomId){
        socket.close();
        return;
    }
    if(rooms.get(roomId)){
        //it will give an array
        rooms.get(roomId)?.push(socket);
    }else{
        rooms.set(roomId, [socket]);
    }
    //if user disconnects
    socket.on("close", ()=> {
        const socketArray = rooms.get(roomId);
        const newSocketArray = socketArray?.filter((v)=> v !== socket);
        if(newSocketArray){
            rooms.set(roomId, newSocketArray)
        }
        if(newSocketArray?.length == 0){
            rooms.delete(roomId);
        }
    })

    //when client send message
    socket.on("message", (data)=> {
        const socketArray = rooms.get(roomId);
        socketArray?.forEach((v)=>v.send(data));
    })

})