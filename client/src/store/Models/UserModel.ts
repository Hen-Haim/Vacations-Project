export class UserModel {
    public id?: number;
    public userName?: string;
    public firstName?: string;
    public lastName?: string;
    public password?: string;
    public isAdmin?: boolean;
}

export class RestOfDetailsModel {
    public token?: string;
    public isAdmin?: number;
    public userName?: string;
}

export enum UsersActionType {
    LOGIN_USER = "LOGIN_USER",
    REMOVE_USER = "REMOVE_USER",
    UPDATE_USER = "UPDATE_USER"
}

interface LOGIN_USER {
    type: UsersActionType.LOGIN_USER,
    payload: RestOfDetailsModel
}

interface UPDATE_USER {
    type: UsersActionType.UPDATE_USER,
    payload: UserModel
}

interface REMOVE_USER {
    type: UsersActionType.REMOVE_USER,
}

export type UserAction = LOGIN_USER | UPDATE_USER | REMOVE_USER