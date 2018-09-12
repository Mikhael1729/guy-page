import { init } from "helpers/Init";
import { IItemRoute } from "interfaces/IItemRoute";

export interface IHeaderButton extends IItemRoute{
    label : string;
}
export interface HeaderButton extends IHeaderButton { }

export class HeaderButton implements HeaderButton {
    constructor(headerButton: HeaderButton) {
        init<HeaderButton>(this, headerButton);
    }
}