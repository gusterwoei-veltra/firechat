import { Utils } from "../../helpers/utils";

/**
import { Utils } from '../../helpers/utils';
 * @author Guster
 * @email seongwoei.chua@veltra.com
 * @create date 2018-07-12 04:47:43
 * @modify date 2018-07-12 04:47:43
 * App Event specific for this application
*/

export enum EventName {
    EVENT_TEMP_NAME_CHANGE = 'EVENT_TEMP_NAME_CHANGE'
}

export class AppEvent {
    _id: string
    name: EventName
    args: any = {}

    constructor(name: EventName, args?: any) {
        this._id = Utils.guid()
        this.name = name
        this.args = args ? args : this.args
    }
}
