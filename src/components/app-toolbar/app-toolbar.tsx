import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'app-toolbar',
	styleUrl: 'app-toolbar.css'
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
				</ion-toolbar>
			</ion-header>
		);
	}
}
