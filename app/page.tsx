"use client"

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  async function createRoom() {
    const res = await fetch("/api/room/create", { method: "POST", 
       body: JSON.stringify({
        expiresIn: "24h",    // Your expires field
        maxUsers: 10         // Your maxpeople field
      })
     });
    const responseData = await res.json();
     setData(responseData);
    console.log(responseData);
  }

  return (
    <div>
      <b>create room id</b>
      <button onClick={createRoom} className="bg-blue-400">
        create
      </button>
      {data &&(
        <>
        <div>
          hi there
          {data.data.roomInfo.roomId}
        </div>
        <div>
          {data.data.roomInfo.owner}
        </div>
        <div>
          <button>enter chat</button>
        </div>
        </>
      ) }
    </div>
  );
}
