const followersDao = require("../dao/followers-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const cacheModule = require("../logics/cache-module");

async function addFollower(fromCache, locationId) {
    isCacheModuleReset(fromCache[0]);
    addOrRemoveFollower(fromCache[0].isAdmin);
    const locationIdAfterAdding = await followersDao.addFollower(fromCache[0].id, locationId);
    return locationIdAfterAdding;
}

async function removeFollower(fromCache, locationId) {
    isCacheModuleReset(fromCache[0]);
    addOrRemoveFollower(fromCache[0].isAdmin);
    await followersDao.removeFollower(fromCache[0].id, locationId);
}

function isCacheModuleReset(fromCacheDetails){
    if(fromCacheDetails===undefined){
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

