import { UsersActionType, UserAction } from "../Models/UserModel";
import { LocationAction, LocationActionType } from "../Models/LocationAndFollowerModel"
import { popUpActionType, popUpAction } from "../Models/popUpModel";
import { StateType } from "../Models/stateModel";

let newState: StateType = {
    user: {},
    restOfDetails: {},
    locations: [],
    modalMessage: {}
};

const reducer = (state: StateType = newState, action: UserAction | LocationAction | popUpAction) => {

    switch (action.type) {
        case UsersActionType.LOGIN_USER:
            return {
                ...state,
                restOfDetails: { ...action.payload },
            };
        case UsersActionType.UPDATE_USER:
            return {
                ...state,   
                user: {...action.payload},
            };
        case UsersActionType.REMOVE_USER:
            return {
                ...state,
                locations: [],
                user: {},
                restOfDetails: {},
            };
        case LocationActionType.UPDATE_STORE_LOCATIONS:
            return {
                ...state,
                locations: [...action.payload],
            };
        case popUpActionType.MODAL_MSG:
            return {
                ...state,
                modalMessage: { ...action.payload },
            };
        default: return state;
    }
}
export default reducer