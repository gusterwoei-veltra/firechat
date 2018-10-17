import { Component, State, Element, Prop } from '@stencil/core';
import { ChatRoom } from '../../global/models/chat-room';
import firebase from 'firebase'

@Component({
	tag: 'chat-room-page',
	styleUrl: 'chat-room-page.scss'
})
export class ChatRoomPage {
	@Prop() room: ChatRoom

	@State() mMessages: string[] = [];

	mText: string;

	@Element() root: HTMLStencilElement

	componentWillLoad() {
		// this.mMessages = [
		//     'When you set the same environment variable in multiple files, here’s the priority used by Compose to choose which value to use',
		//     'In the example below, we set the same environment variable on an Environment file, and the Compose file',
		//     'Configure Compose using environment variables',
		//     'Place this file in the same directory as your directory of content',
		//     'lorem ipsum',
		//     'COPY nginx.conf /etc/nginx/nginx.conf',
		//     'lorem ipsum',
		//     'If you add a custom CMD in the Dockerfile, be sure to include -g daemon off; in the CMD in order for nginx to stay in the foreground',
		//     'Using environment variables in nginx configuration',
		//     'lorem ipsum',
		//     'Running nginx in read-only mode',
		// ]

		this.getMessages()
	}

	private async getMessages() {
		this.mMessages = []

		// get messages for the room
		let messages = await firebase.firestore().collection('rooms').doc(`${this.room.id}`).collection('messages').get()
		messages.forEach(message => {
			let data = message.get('data')
			if (data && data.trim() != '') {
				this.mMessages = [...this.mMessages, data]
			}
		})

		// setup message listeners
		firebase.firestore().collection(`rooms/${this.room.id}/messages`).onSnapshot(snapshot => {
			// this.mMessages = [...this.mMessages, this.mText]
			let changes = snapshot.docChanges()
			console.log('snapshot', changes)
		})
	}

	private onMessageInput(e) {
		if (!this.mText || this.mText.trim() == '') return

		// add new message
		firebase.firestore().collection(`rooms/${this.room.id}/messages`).add({
			data: this.mText.trim()
		}).then(ref => {
			// clear text box
			this.mText = ''

			// scroll message list to bottom after a short delay
			setTimeout(() => {
				let elem = document.querySelector('ion-content') as HTMLIonContentElement
				elem.scrollToBottom(0)
			}, 100);
		}).catch(error => { })
	}

	render() {
		return [
			<app-toolbar label={this.room ? this.room.name : ''} showBackButton={true} />,

			<ion-content padding>
				<div id='chat-container'>
					{this.mMessages.map((message, index) =>
						<div class={`${index % 2 == 0 ? 'text-right' : 'text-left'} p-1 mt-2 mb-2 list-item`}>
							<span class={`p-2 rounded ${index % 2 == 0 ? 'sender-bg' : 'recipient-bg'}`}>{message}</span>
						</div>
					)}
				</div>
			</ion-content>,

			<div class='p-2 d-flex flex-row message-box'>
				<input class='form-control flex-grow-1' type='text' placeholder='Your message' onInput={e => {
					this.mText = (e as any).target.value
				}} onKeyDown={e => {
					if (e.keyCode == 13) {
						this.onMessageInput(e)
					}
				}} />

				<button class='btn btn-primary ml-2' onClick={e => this.onMessageInput(e)}>Send ></button>
			</div>
		]
	}
}
