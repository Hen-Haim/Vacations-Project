import { UserModel, UsersActionType, UserAction, RestOfDetailsModel } from "../Models/UserModel";
import { LocationModel, LocationActionType, LocationAction } from "../Models/LocationAndFollowerModel";
import { popUpModel, popUpAction, popUpActionType } from "../Models/popUpModel";


export const updateLocationsStore = (locations: LocationModel[]): LocationAction => {
    return {
        type: LocationActionType.UPDATE_STORE_LOCATIONS,
        payload: locations
    }
}

export const login = (userDetails: RestOfDetailsModel) => {
    return {
        type: UsersActionType.LOGIN_USER,
        payload: userDetails
    }
}

export const removeUser = (): UserAction => {
    return {
        type: UsersActionType.REMOVE_USER,
    }
}

export const updateUser = (user: UserModel): UserAction => {
    return {
        type: UsersActionType.UPDATE_USER,
        payload: user
    }
}

export const triggeringModal = (modal: popUpModel): popUpAction => {
    return {
        type: popUpActionType.MODAL_MSG,
        payload: modal
    }
}
