import { Component, Prop } from '@stencil/core';
import { StorageService } from '../../global/storage-service';

@Component({
	tag: 'app-toolbar',
	styleUrl: 'app-toolbar.scss'
})
export class AppToolbar {
	@Prop() label: string = ''
	@Prop() showBackButton: boolean = false

	// private async onAppIconClick() {
	// 	let navigator = document.querySelector('ion-nav')
	// 	await navigator.popToRoot()
	// }

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

					<ion-buttons slot="end">
						<ion-icon size='large' class='mr-3' name="contact"></ion-icon>
						<span class='mr-3'>{StorageService.get().getTempUser().name}</span>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
		);
	}
}
