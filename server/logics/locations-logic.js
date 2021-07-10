const locationDao = require("../dao/locations-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function addLocation(locationDetails,fromCache) {
    isCacheModuleReset(fromCache[0]);
    addAndUpdateLocationValidation(locationDetails,fromCache[0].isAdmin);
    const locationId = await locationDao.addLocation(locationDetails);
    return locationId;
}

async function updateLocation(updateLocationDetails,fromCache) {
    isCacheModuleReset(fromCache[0]);
    addAndUpdateLocationValidation(updateLocationDetails,fromCache[0].isAdmin);
    await locationDao.updateLocation(updateLocationDetails);
}

async function getAllLocations() {
    let locations = await locationDao.getAllLocations();
    return locations;
}

async function userLocations(fromCache) {
    isCacheModuleReset(fromCache[0]);
    let allUserLocations = await locationDao.userLocations(fromCache[0].id);
    return allUserLocations;
}

async function deleteLocation(locationId,fromCache) {
    isCacheModuleReset(fromCache[0]);
    deleteLocationValidation(fromCache[0].isAdmin);
    await locationDao.deleteLocation(locationId);
}

function isCacheModuleReset(fromCacheDetails){
    if(fromCacheDetails===undefined){
        throw new ServerError(ErrorType.CACHE_MODULE_RESET);
    }
}

function addAndUpdateLocationValidation(locationDetails,isAdmin) {
    if(isAdmin==0){
        throw new ServerError(ErrorType.UNAUTHORIZED_STATUS);
    }

    if (locationDetails.destination == undefined) {
        throw new ServerError(ErrorType.DESTINATION_UNDEFINED);
    }

    if (locationDetails.resortName == undefined) {
        throw new ServerError(ErrorType.RESORT_NAME_UNDEFINED);
    }

    if (locationDetails.description == undefined) {
        throw new ServerError(ErrorType.DESCRIPTION_UNDEFINED);
    }

    if (locationDetails.image == undefined) {
        throw new ServerError(ErrorType.IMAGE_UNDEFINED);
    }

    if (locationDetails.startDate == undefined) {
        throw new ServerError(ErrorType.START_DATE_UNDEFINED);
    }

    if (locationDetails.endDate == undefined) {
        throw new ServerError(ErrorType.END_DATE_UNDEFINED);
    }

    if (locationDetails.price == undefined) {
        throw new ServerError(ErrorType.PRICE_UNDEFINED);
    }
}

function deleteLocationValidation(isAdmin) {
    if(isAdmin == 0){
        throw new ServerError(ErrorType.UNAUTHORIZED_STATUS);
    }
}

module.exports = {
    addLocation,
    updateLocation,
    getAllLocations,
    userLocations,
    deleteLocation
}

