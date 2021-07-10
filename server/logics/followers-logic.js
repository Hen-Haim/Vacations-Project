const followersDao = require("../dao/followers-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function addFollower(detailsFromCache, locationId) {
    isCacheModuleReset(detailsFromCache[0]);
    addOrRemoveFollower(detailsFromCache[0].isAdmin);
    await followersDao.addFollower(detailsFromCache[0].id, locationId);
}

async function removeFollower(detailsFromCache, locationId) {
    isCacheModuleReset(detailsFromCache[0]);
    addOrRemoveFollower(detailsFromCache[0].isAdmin);
    await followersDao.removeFollower(detailsFromCache[0].id, locationId);
}

function isCacheModuleReset(detailsFromCache){
    if(detailsFromCache===undefined){
        throw new ServerError(ErrorType.CACHE_MODULE_RESET);
    }
}

function addOrRemoveFollower(isAdmin) {
    if(isAdmin == 1){
        throw new ServerError(ErrorType.UNAUTHORIZED_STATUS);
    }
}

module.exports = {
    addFollower,
    removeFollower
}

