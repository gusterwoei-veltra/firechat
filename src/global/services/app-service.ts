import { StorageService } from "./storage-service";
import { TempUser } from "../models/temp-user";
import { Utils } from "../../helpers/utils";
import { EventBus } from "../events/event-bus";
import { AppEvent, EventName } from "../events/app-event";

/**
 * @author Guster
 * @email seongwoei.chua@veltra.com
 * @create date 2018-10-26 16:32:29
 * @modify date 2018-10-26 16:32:29
*/
export class AppService {
    private static _instance: AppService

    public static get(): AppService {
        if (this._instance == null) {
            this._instance = new AppService()
        }
        return this._instance
    }

    private constructor() { }

    public async promptUsernameWhenNeeded(alertController: HTMLIonAlertControllerElement, toastController: HTMLIonToastControllerElement, name?: string, cancelable?: boolean) {
        let buttons = []

        if (cancelable) {
            buttons.push({
                text: 'Cancel'
            })
        }

        // confirm button
        buttons.push({
            text: 'Confirm',
            handler: data => {
                if (data.name.trim() == '') return false

                let user = StorageService.get().getTempUser() || new TempUser()
                user.name = data.name

                // update username
                StorageService.get().saveTempUser(user)
                Utils.showToast(toastController, `Welcome to Firechat! ${data.name}`)

                // emit event
                EventBus.get().postSticky(new AppEvent(EventName.EVENT_TEMP_NAME_CHANGE))
            }
        })

        let alert = await alertController.create({
            header: 'Enter your name',
            backdropDismiss: false,
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Your Name',
                    value: name
                }
            ],
            buttons: buttons
        })
        alert.present()
    }

}