import { Component, State, Prop } from '@stencil/core';
import firebase from 'firebase';
import { Utils } from '../../helpers/utils';
import { StorageService } from '../../global/storage-service';

@Component({
    tag: 'signup-page',
    styleUrl: 'signup-page.scss'
})
export class SignupPage {
	@Prop({ connect: 'ion-loading-controller' }) loadingCtrl: HTMLIonLoadingControllerElement;
	@Prop({connect: 'ion-toast-controller'}) toastCtrl: HTMLIonToastControllerElement

    @State() email: string
    @State() password: string

    private async submit() {
        let loading = await Utils.showLoading(this.loadingCtrl, 'Signing you up')
        
        let auth = firebase.auth()
        auth.createUserWithEmailAndPassword(this.email, this.password).then(credential => {
            // hide loading
            loading.dismiss()
            
            // save user locally and go to main page
            StorageService.get().saveUser(credential.user.toJSON())
            Utils.getNav().setRoot('home-page')
        }).catch(error => {
            // hide loading
            loading.dismiss()
			Utils.showToast(this.toastCtrl, error.message)

            console.error(error)
            alert(error)
        })
        
    }

    render() {
        return [
            <div class='root'>
                <h3 class='text-center'>Sign up</h3>
                <img class='icon' src='/assets/icon/icon.png' />
                <form target='#' padding onSubmit={e => {
                    e.stopPropagation()
                    this.submit()
                }}>
                    <input class='mb-1 form-control' type='text' placeholder='Email' onChange={e => this.email = (e as any).target.value} />
                    <input class='form-control' type='password' placeholder='Password' onChange={e => this.password = (e as any).target.value} />
                    <ion-button expand='full' class='mt-3 btn-login' onClick={e => this.submit()}>Sign up</ion-button>
                </form>
            </div>
        ]
    }
}