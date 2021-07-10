import { UserModel, RestOfDetailsModel } from "../Models/UserModel";
import { LocationModel } from "./LocationAndFollowerModel"
import { popUpModel } from "./popUpModel"

export interface StateType {
    user?: UserModel,
    restOfDetails?: RestOfDetailsModel,
    locations?: LocationModel[],
    modalMessage?: popUpModel
}