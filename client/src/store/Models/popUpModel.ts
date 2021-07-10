export class popUpModel {
    public title?: string;
    public message?: string;
    public buttonRightText?: string;
    public buttonLeftText?: string;
    public buttonRightFunc?: () => void;
    public httpCode?: number;
}

export enum popUpActionType {
    MODAL_MSG = "MODAL_MSG"
}

export interface popUpAction {
    type: popUpActionType.MODAL_MSG;
    payload?: popUpModel;
}
