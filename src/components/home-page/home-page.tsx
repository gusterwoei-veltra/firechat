import { Component, State, Prop } from '@stencil/core';
import { ChatRoom } from '../../global/models/chat-room';
import { Utils } from '../../helpers/utils';
import firebase from 'firebase'

@Component({
	tag: 'home-page',
	styleUrl: 'home-page.scss'
})
export class HomePage {
	@State() mRooms: ChatRoom[] = []

	componentDidLoad() {
		this.getChatRooms()
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
			room: room
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
