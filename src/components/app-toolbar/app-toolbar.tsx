import { Component, Prop, State, Element } from '@stencil/core';
import { StorageService } from '../../global/storage-service';
import { AppService } from '../../global/app-service';
import { EventBus, Subscribe } from '../../global/events/event-bus';
import { AppEvent, EventName } from '../../global/events/app-event';

@Component({
	tag: 'app-toolbar',
	styleUrl: 'app-toolbar.scss'
})
export class AppToolbar {
	@Prop() label: string = ''
	@Prop() showBackButton: boolean = false
	@Prop({ connect: 'ion-alert-controller' }) alertController: HTMLIonAlertControllerElement
	@Prop({ connect: 'ion-toast-controller' }) toastController: HTMLIonToastControllerElement

	@Element() root: HTMLStencilElement
	@State() tempName: string

	@Subscribe()
	public onEvent(event: AppEvent) {
		switch(event.name) {
			case EventName.EVENT_TEMP_NAME_CHANGE:
				this.showTempName()
				break
		}
	}

	componentWillLoad() {
		EventBus.get().register(this)
		this.showTempName()
	}

	componentDidUnload() {
		EventBus.get().unregister(this)
	}

	private showTempName() {
		this.tempName = StorageService.get().getTempUser() ? StorageService.get().getTempUser().name : ''
	}

	private changeUsername() {
		AppService.get().promptUsernameWhenNeeded(this.alertController, this.toastController, true)
	}

	render() {
		return (
			<ion-header>
				<ion-toolbar color="primary">
					{this.showBackButton ?
						<ion-buttons slot="start">
							<ion-back-button defaultHref="/" />
						</ion-buttons>
						: null
					}

					<ion-title>{this.label}</ion-title>

					<ion-buttons class='profile' slot="end" onClick={e => this.changeUsername()}>
						<ion-icon size='large' class='mr-3' name="contact"></ion-icon>
						<span class='mr-3'>{this.tempName}</span>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
		);
	}
}
