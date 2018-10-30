import { AppUser } from "../models/app-user";
import { TempUser } from "../models/temp-user";

/**
 * @author Guster
 * @email seongwoei.chua@veltra.com
 * @create date 2018-07-09 02:40:40
 * @modify date 2018-07-09 02:40:40
 * @desc A service class that handles all web storage functions
*/

export class StorageService {
    private static _instance: StorageService
    private mEnde: boolean = false

    private constructor() { }

    public static get() {
        if (StorageService._instance == null) {
            StorageService._instance = new StorageService()
        }
        return StorageService._instance
    }

    public putItem(key: string, value: string) {
        if (!window.localStorage) return

        window.localStorage.setItem(key, value)
    }

    public getItem(key: string): string {
        if (!window.localStorage) return ''

        let value = window.localStorage.getItem(key)
        return value
    }

    public removeItem(key: string) {
        return window.localStorage.removeItem(key)
    }

    // ============================= APP MISC SETTINGS =============================

    public saveUser(user) {
        this.putItem('user', JSON.stringify(user))
    }

    public getUser(): AppUser {
        let json = this.getItem('user')
        return json ? JSON.parse(json) : null
    }

    public saveTempUser(user: TempUser) {
        let usr = this.getTempUser() || user
        usr.name = user.name
        this.putItem('tempUser', JSON.stringify(usr))
    }

    public getTempUser(): TempUser {
        let json = this.getItem('tempUser')
        if (json) {
            return Object.assign(new TempUser(), JSON.parse(json))
        }
        return null
    }

}