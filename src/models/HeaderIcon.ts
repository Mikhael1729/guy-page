import { IHeaderButton } from "./HeaderButton";
import { init } from "helpers/Init";

export interface IHeaderIcon extends IHeaderButton{
    icon : any;
}
export interface HeaderIcon extends IHeaderIcon { }

export class HeaderIcon implements HeaderIcon{
    constructor(headerIcon: HeaderIcon) {
        init<HeaderIcon>(this, headerIcon);
    }
}