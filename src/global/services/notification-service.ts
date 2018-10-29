
/**
 * @author Guster
 * @email seongwoei.chua@veltra.com
 * @create date 2018-10-29 09:02:10
 * @modify date 2018-10-29 09:02:10
 * @desc Notification service class
*/

export class NotificationService {
	private static _instance: NotificationService

	public static get(): NotificationService {
		if (this._instance == null) {
			this._instance = new NotificationService()
		}
		return this._instance
	}

	private constructor() { }

	public async requestPermission() {
		let result = await Notification.requestPermission()
		return (result == 'granted')
	}

	public showNotification(message: string) {
		if (Notification['permission'] != 'granted') return
		new Notification(message)
	}
}