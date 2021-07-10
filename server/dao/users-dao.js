const connection = require("./connection-wrapper.js");
let ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

async function register(userDetails){
    const sql = `INSERT INTO users (user_name, password, first_name, last_name, is_admin) VALUES (?,?,?,?,?);`
    if(userDetails.isAdmin ==undefined){
        userDetails.isAdmin = 0;
    }
    
    let parameters = [
        userDetails.userName, 
        userDetails.password, 
        userDetails.firstName, 
        userDetails.lastName, 
        userDetails.isAdmin
    ];

    try{
        const userRegistrationResult = await connection.executeWithParameters(sql, parameters);
        if(userRegistrationResult.insertId ==0){
            throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST)
        }
    }catch(err){
        registerErrors(err, userDetails)
    }
}

function registerErrors(err, userDetails){
    if(err.errno===1062){
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST, JSON.stringify(userDetails), err)
    }
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userDetails), err)
}


async function login(user) {

    let sql = `SELECT id, is_admin AS isAdmin
            FROM users WHERE user_name =? AND password =?`;
    let parameters = [user.userName, user.password];
    let userLoginResult;

    try {
        userLoginResult = await connection.executeWithParameters(sql, parameters);
        if(userLoginResult.length===0){
            throw new ServerError(ErrorType.UNAUTHORIZED)
        }
    }
    catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), err);
    }
    
    return userLoginResult[0];
}

async function update(updateUserDetails){
    const sql = `UPDATE users SET password = ?, first_name=?, last_name=? WHERE id = ?;`;
    let parameters = [
        updateUserDetails.password, 
        updateUserDetails.firstName, 
        updateUserDetails.lastName, 
        updateUserDetails.id
    ];

    try{
        let user = await connection.executeWithParameters(sql, parameters);
        return user; 

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(updateUserDetails), err)
    }   
}

async function getOneUser(userId) {
    let sql = `SELECT id,user_name AS userName, password, first_name AS firstName,
                last_name AS lastName, is_admin AS isAdmin FROM users WHERE id=?`;
    let parameters = [userId];

    try{
        let userDetails = await connection.executeWithParameters(sql, parameters);
        return userDetails[0];

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), err)
    }
}

async function deleteUser(id) {
    let sql = "DELETE FROM users WHERE id=?";
    let parameters = [id];

    try{
        await connection.executeWithParameters(sql, parameters);
    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(id), err)
    }
}


module.exports = {
    register,
    login,
    update,
    getOneUser,
    deleteUser
}