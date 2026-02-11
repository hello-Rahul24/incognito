export function generatingRoomId() {
    const roomId = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
      return roomId;
  }

  export function generateAnonName(){
    const name = ["justin bieber", ]
    const randomName = name[Math.floor(Math.random()*name.length)];
    const number =  Math.floor(Math.random() * 100);
    return `${randomName}_${number}`
  }