import { TempUser } from "./temp-user";
import { StorageService } from '../services/storage-service';

export class Message {
	data: string
	timestamp: number
	user: TempUser

	public isMine(): boolean {
		let thisUser = StorageService.get().getTempUser()
		return (thisUser && this.user) ? thisUser.id == this.user.id : false
	}
}