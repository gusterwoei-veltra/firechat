import { Component, State, Prop } from '@stencil/core';
import { ChatRoom } from '../../global/models/chat-room';
import firebase from 'firebase'
import { StorageService } from '../../global/storage-service';
import { Utils } from '../../helpers/utils';
import { TempUser } from '../../global/models/temp-user';

@Component({
	tag: 'home-page',
	styleUrl: 'home-page.scss'
})
export class HomePage {
	@Prop({ connect: 'ion-alert-controller' }) alertController: HTMLIonAlertControllerElement
	@Prop({ connect: 'ion-toast-controller' }) toastController: HTMLIonToastControllerElement
	@State() mRooms: ChatRoom[] = []

	componentDidLoad() {
		this.getChatRooms()
		// this.mRooms = Utils.getDummyChatRooms()
		this.promptUsernameWhenNeeded()
	}

	private async promptUsernameWhenNeeded() {
		let user = StorageService.get().getTempUser()
		if (user) return

		let alert = await this.alertController.create({
			header: 'Enter your name',
			backdropDismiss: false,
			inputs: [
				{
					name: 'name',
					placeholder: 'Your Name'
				}
			],
			buttons: [
				{
					text: 'Confirm',
					handler: data => {
						if (data.name.trim() == '') return false

						let user = StorageService.get().getTempUser() || new TempUser()
						user.name = data.name

						StorageService.get().saveTempUser(user)
						Utils.showToast(this.toastController, `Welcome to Firechat! ${data.name}`)
					}
				}
			]
		})
		alert.present()
	}

	private async getChatRooms() {
		let rooms = await firebase.firestore().collection('rooms').get()
		rooms.forEach(room => {
			let data = room.data()
			this.mRooms = [...this.mRooms, new ChatRoom(data['name'], data['id'])]
		})
	}

	private openChatRoom(room: ChatRoom) {
		let nav = document.querySelector('ion-nav')
		nav.push('chat-room-page', {
			room: room,
		})
	}

	render() {
		return [
			<app-toolbar label='Home' />,

			<ion-content>
				<div class='root'>
					{this.mRooms.map(room =>
						<div padding class='d-flex align-items-center list-item' onClick={e => this.openChatRoom(room)}>
							<img class='room-icon' src='/assets/icon/icon.png' />
							<div class='ml-2 mr-2 flex-grow-1'>
								<span>{room.name}</span>
								<span>{room.lastMessage}</span>
							</div>
							<span>{room.date}</span>
						</div>
					)}
				</div>
			</ion-content>
		];
	}
}
