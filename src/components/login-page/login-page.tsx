import { Component, Prop, State } from '@stencil/core';
import { Utils } from '../../helpers/utils';
import firebase from 'firebase/app'
import 'firebase/auth'
import { StorageService } from '../../global/services/storage-service';


@Component({
    tag: 'login-page',
    styleUrl: 'login-page.scss'
})
export class LoginPage {
    @Prop({connect: 'ion-loading-controller'}) loadingCtrl: HTMLIonLoadingControllerElement
    @Prop({connect: 'ion-toast-controller'}) toastCtrl: HTMLIonToastControllerElement

    @State() email: string
    @State() password: string
    private nav = document.querySelector('ion-nav')

    private async login() {
        let loading = await Utils.showLoading(this.loadingCtrl, 'Signing in')
        let auth = firebase.auth()

        auth.signInWithEmailAndPassword(this.email, this.password).then(credential => {
            loading.dismiss()
            StorageService.get().saveUser(credential.user)
            this.nav.setRoot('home-page')
        }).catch(error => {
            loading.dismiss()
            Utils.showToast(this.toastCtrl, error.message)
            console.error(error)
        })
    }

    render() {
        return [
            <div class='root'>
                <h3 class='text-center'>Sign in</h3>
                <img class='icon' src='/assets/icon/icon.png' />
                <form target='#' padding onSubmit={e => {
                    e.stopPropagation()
                    this.login()
                }}>
                    <input class='mb-1 form-control' type='text' placeholder='Email' onChange={e => this.email = (e as any).target.value } />
                    <input class='form-control' type='password' placeholder='Password' onChange={e => this.password = (e as any).target.value } />
                    <ion-button expand='full' class='mt-3 btn-login' onClick={e => this.login()}>Login</ion-button>
                </form>
            </div>
        ]
    }
}
