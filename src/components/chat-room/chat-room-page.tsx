import { Component, State, Element, Prop } from '@stencil/core';
import { ChatRoom } from '../../global/models/chat-room';
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Message } from '../../global/models/message';
import { StorageService } from '../../global/services/storage-service';
import { NotificationService } from '../../global/services/notification-service';
import { Utils } from '../../helpers/utils';

@Component({
    tag: 'chat-room-page',
    styleUrl: 'chat-room-page.scss'
})
export class ChatRoomPage {
    @Prop() room: ChatRoom
    @State() mMessages: Message[] = [];
    @State() mText: string;

    @Element() root: HTMLStencilElement

    private mShowNotification: boolean = true
    private mIsFirstTime: boolean = true

    componentWillLoad() {
        this.getMessages()
    }

    private async getMessages() {
        this.mMessages = []

        // request notification permission
        NotificationService.get().requestPermission()

        this.initMessageListener()
    }

    private initMessageListener() {
        // setup message listeners
        firebase.firestore()
            .collection(`rooms/${this.room.id}/messages`)
            .orderBy('timestamp')
            .onSnapshot(snapshot => {
                let changes = snapshot.docChanges()

                for (let i in changes) {
                    let message = changes[i].doc.data() as Message
                    // console.log('data', changes[i].doc.data())

                    if (this.mMessages === undefined) continue
                    this.mMessages.push(Object.assign(new Message(), message))

                    // show incoming message notification to user when user's tab is not active
                    if (!Utils.isTabActive() && this.mShowNotification && !this.mIsFirstTime) {
                        this.mShowNotification = false
                        NotificationService.get().showNotification(message.data)

                        setTimeout(() => {
                            this.mShowNotification = true
                        }, 3000);
                    }
                }

                this.mIsFirstTime = false

                this.root.forceUpdate()

                // scroll message list to bottom after a short delay
                setTimeout(async () => {
                    let container = document.getElementsByClassName('chat-container')[0]
                    container.scrollTop = container.scrollHeight
                }, 200);
            })
    }

    private onMessageInput(e) {
        if (!this.mText || this.mText.trim() == '') return

        let msg = this.mText.trim()

        // clear text box
        this.mText = ''

        // add new message
        let message = new Message()
        message.data = msg
        message.timestamp = new Date().getTime()
        message.user = StorageService.get().getTempUser()

        // save messages to the firestore
        firebase.firestore()
            .collection(`rooms/${this.room.id}/messages`)
            .add(JSON.parse(JSON.stringify(message)))
    }

    render() {
        return [
            <app-toolbar label={this.room ? this.room.name : ''} showBackButton={true} />,

            <div padding class='chat-container'>
                {this.mMessages.map((message, index) =>
                    <div class={`${message.isMine() ? 'text-right' : 'text-left'} p-1 mt-2 mb-2 list-item`}>
                        <div class={`p-2 rounded shadow-lg d-inline-block ${message.isMine() ? 'sender-bg' : 'recipient-bg'}`}>
                            {!message.isMine() ?
                                <div class='recipient-name'>{message.user.name}</div> : null
                            }
                            <span>{message.data}</span>
                        </div>
                    </div>
                )}
            </div>,

            <div class='p-2 d-flex flex-row message-box'>
                <input class='form-control flex-grow-1' type='text' value={this.mText} placeholder='Your message' onInput={e => {
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
