/**
 * @author Guster
 * @email seongwoei.chua@veltra.com
 * @create date 2018-10-17 12:55:39
 * @modify date 2018-10-17 12:55:39
*/

import { ChatRoom } from '../global/models/chat-room';

export class Utils {
	public static getDummyChatRooms() {
		return [
			new ChatRoom('Lorem'),
			new ChatRoom('Ipsum'),
			new ChatRoom('Coffee'),
			new ChatRoom('Starbucks'),
			new ChatRoom('Funny Group'),
			new ChatRoom('Amazing Family'),
			new ChatRoom('Entrepreneur Conference'),
			new ChatRoom('Office Staffs'),
		]
	}

	public static getNav() {
		return document.querySelector('ion-nav')
	}

	public static async showLoading(loadingCtrl: HTMLIonLoadingControllerElement, message: string) {
		const loading = await loadingCtrl.create({
			message: message
		})
		await loading.present()
		return loading
	}

	public static async showToast(toastCtrl: HTMLIonToastControllerElement, message: string) {
		const toast = await toastCtrl.create({
			message: message,
			duration: 2000
		})
		await toast.present()
		return toast
	}

	public static guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}
	
}
