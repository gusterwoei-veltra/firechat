import { Utils } from "../../helpers/utils";

export class TempUser {
    id: string
    name: string

    constructor() {
        this.id = Utils.guid()
    }
}