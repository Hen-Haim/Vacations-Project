export class LocationModel {
    public id: number;
    public resortName: string;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public image: string;
    public price: number;
    public userId?: number;
    public numOfFollowers?: number;
}

export class FollowerModel {
    public id: number;
    public userId: number;
    public locationId: number;
}

export enum LocationActionType {
    UPDATE_STORE_LOCATIONS = "UPDATE_STORE_LOCATIONS"
}

export interface StateType {
    locations: LocationModel[],
}

interface UPDATE_STORE_LOCATIONS {
    type: LocationActionType.UPDATE_STORE_LOCATIONS,
    payload: LocationModel[]
}


export type LocationAction = UPDATE_STORE_LOCATIONS