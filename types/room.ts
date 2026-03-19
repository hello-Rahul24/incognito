export interface Message {
    content : string,
    sentAt: string,
    sentby: string
}

export interface Member{
    alias: string
isHost: boolean
}

export interface Room {
    id : string,
    members: Member[],
    owner : Member,
    messages: Message[],
    status: "lobby" | "active" | "ended"

}