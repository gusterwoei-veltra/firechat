export class ChatRoom {
    id: string
    name: string
    imageUrl?: string
    date: number = 0
    lastMessage?: string

    constructor(name: string, id?: string) {
		this.name = name
		this.id = id
    }
}