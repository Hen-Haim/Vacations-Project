const connection = require("./connection-wrapper.js");
let ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

async function addFollower(idFromCache, locationId){
    const sql = `INSERT INTO followers (user_id, location_id) VALUES (?,?);`
    let parameters = [
        idFromCache, 
        locationId
    ];

    try{
        const addFollowerResult = await connection.executeWithParameters(sql, parameters);
        return addFollowerResult.insertId;

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }
}

async function removeFollower(idFromCache, locationId) {
    let sql = "DELETE FROM followers WHERE user_id=? AND location_id=?";
    let parameters = [
        idFromCache, 
        locationId,
    ];

    try{
        await connection.executeWithParameters(sql, parameters);

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }
}

module.exports = {
    addFollower,
    removeFollower
}