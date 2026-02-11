//request {
//              expires: 
//              maxpeople:
//         }

import { generateAnonName, generatingRoomId } from "@/utils/roomId";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ROLE } from "@/lib/role";
import { Room } from "@/lib/db";

export async function  POST(req: NextRequest){
    try{
    const body =await req.json();
    //setting the default value of the expiresIn and maxuser
    const { expiresIn = "24h", maxUsers = 10} = body;

    //generating roomId and name for the user
    const roomId = generatingRoomId();
    const anonId = generateAnonName();

    //create jwt payload
    const tokenPayload = {
        roomId,
        anonId,
        role: ROLE.ADMIN
    };
    //this checks is important for type script
    if(!process.env.JWT_SECRET){
        throw new Error("jwt secret is missing")
    }

    const token = jwt.sign(tokenPayload,process.env.JWT_SECRET);

    //add to db
    const createdRoom =await Room.create({
        roomId,
        owner: anonId,
        role: ROLE.ADMIN,
        maxusers : maxUsers,
        expiresIn 
    })
return NextResponse.json({
    success: true,
    data: {
        roomInfo : createdRoom,
        token,
        wsurl : `${process.env.WS_BASE_URL}?roomId=${roomId}&token=${token}`
    }
})}catch(error){
    console.log(error)
    return NextResponse.json({
        success: false,
        message: "Failed to create room"
    }, {status : 500})
}
}