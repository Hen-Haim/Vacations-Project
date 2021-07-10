const usersDao = require("../dao/users-dao");
const config = require("../config.json");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const cacheModule = require("../logics/cache-module");

const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const spiceRight = "jernc#%^Hiodfuver,mn";
const spiceLeft = "@!nlcmf-lspns;$- ";


async function register (userDetails){
    registerValidation(userDetails);
    registerAndUpdateValidation(userDetails);

    userDetails.password = crypto.createHash("md5").update(spiceLeft + userDetails.password + spiceRight).digest("hex");
    await usersDao.register(userDetails);
}

async function login (userDetails){
    loginValidation(userDetails);

    userDetails.password = crypto.createHash("md5").update(spiceLeft + userDetails.password + spiceRight).digest("hex");
    let userData = await usersDao.login(userDetails);
    const token = generateToken(userData, userDetails);

    let successfulLoginResponse = { token: token, isAdmin: userData.isAdmin };
    return successfulLoginResponse;
}

function generateToken(userData, userDetails){
    let spicedUserName = spiceLeft + userDetails.userName + spiceRight;
    const jwtToken = jwt.sign({sub:spicedUserName}, config.secret);
    cacheModule.set(jwtToken, userData);
    return jwtToken
}

async function update (userDetails,fromCache){
    isCacheModuleReset(fromCache[0]);
    userDetails.id = fromCache[0].id
    registerAndUpdateValidation(userDetails);

    userDetails.password = crypto.createHash("md5").update(spiceLeft + userDetails.password + spiceRight).digest("hex");    
    let userUpdated = await usersDao.update(userDetails);
    return userUpdated;
}

async function getOneUser(fromCache) {
    isCacheModuleReset(fromCache[0]);
    let userDetails = await usersDao.getOneUser(fromCache[0].id);
    return userDetails;
}

async function deleteUser(fromCache) {
    isCacheModuleReset(fromCache[0]);
    cacheModule.clearUserCache(fromCache[1]);
    await usersDao.deleteUser(fromCache[0].id);
}



//****************validations*******************//

function isCacheModuleReset(fromCacheDetails){
    if(fromCacheDetails===undefined){
        throw new ServerError(ErrorType.CACHE_MODULE_RESET);
    }
}

function registerValidation(userDetails){
    if(!isEmailFormat(userDetails.userName)){
        throw new ServerError(ErrorType.USER_NAME_IS_NOT_EMAIL);
    }

    if(userDetails.userName == undefined){
        throw new ServerError(ErrorType.USER_NAME_UNDEFINED);
    }
};

function loginValidation(userDetails){
    if(userDetails.userName == undefined){
        throw new ServerError(ErrorType.USER_NAME_UNDEFINED);
    }

    if(userDetails.password == undefined){
        throw new ServerError(ErrorType.PASSWORD_UNDEFINED);
    }
};

function registerAndUpdateValidation(userDetails){
    if(userDetails.password == undefined){
        throw new ServerError(ErrorType.PASSWORD_UNDEFINED);
    }

    if(userDetails.password.length > 12){
        throw new ServerError(ErrorType.PASSWORD_TOO_LONG);
    }

    if(userDetails.password.length < 6){
        throw new ServerError(ErrorType.PASSWORD_TOO_SHORT);
    }

    if(userDetails.firstName == undefined){
        throw new ServerError(ErrorType.FIRST_NAME_UNDEFINED);
    }

    if(userDetails.lastName == undefined){
        throw new ServerError(ErrorType.LAST_NAME_UNDEFINED);
    }
};


function isEmailFormat (username){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(username).toLowerCase());
}


module.exports = {
    register,
    login,
    update,
    getOneUser,
    deleteUser
}