import { Component, State, Prop } from '@stencil/core';
import { ChatRoom } from '../../global/models/chat-room';
import firebase from 'firebase/app'
import 'firebase/firestore'
import { AppService } from '../../global/services/app-service';
import { StorageService } from '../../global/services/storage-service';
import { isNoSubstitutionTemplateLiteral } from 'typescript';

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
        
        let user = StorageService.get().getTempUser()
        if (user) return
        AppService.get().promptUsernameWhenNeeded(this.alertController, this.toastController)
    }

    private async getChatRooms() {
        let rooms = await firebase.firestore().collection('rooms').get()
        let arr = []
        rooms.forEach(room => {
            let data = room.data()
            // arr = [arr, new ChatRoom(data['name'], data['id'])]
            arr.push(new ChatRoom(data['name'], data['id']))
        })
        this.mRooms = arr
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
                            <img class='room-icon' src='/assets/icon/speech.png' />
                            <div class='ml-2 mr-2 flex-grow-1'>
                                <span>{room.name}</span>
                                <span>{room.lastMessage}</span>
                            </div>
                            {/* <span>{room.date}</span> */}
                        </div>
                    )}
                </div>
            </ion-content>
        ];
    }
}
