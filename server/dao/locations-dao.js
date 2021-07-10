const connection = require("./connection-wrapper.js");
let ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

async function addLocation(locationDetails){
    const sql = `INSERT INTO locations (resort_name, destination, description, start_date, end_date, image, price) VALUES (?,?,?,?,?,?,?);`
    let parameters = [
        locationDetails.resortName,        
        locationDetails.destination,
        locationDetails.description,
        locationDetails.startDate,
        locationDetails.endDate,        
        locationDetails.image,
        locationDetails.price,
    ];

    try{
        await connection.executeWithParameters(sql, parameters);
    }catch(err){
        addLocationErrors(err, locationDetails);
    }
}

function addLocationErrors(err, locationDetails){
    if(err.errno===1062){
        throw new ServerError(ErrorType.RESORT_NAME_ALREADY_EXIST, JSON.stringify(locationDetails), err)
    }
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(locationDetails), err)
}

async function updateLocation(updateLocationDetails){
    const sql = `UPDATE locations SET destination=?, description=?, start_date=?, end_date=?, image=?, price=? WHERE id=?`;
    let parameters = [
        updateLocationDetails.destination,
        updateLocationDetails.description,
        updateLocationDetails.startDate,
        updateLocationDetails.endDate,        
        updateLocationDetails.image,
        updateLocationDetails.price,
        updateLocationDetails.id
    ];

    try{
        let updatedLocation = await connection.executeWithParameters(sql, parameters);
        return updatedLocation; 

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }   
}

async function getAllLocations() {
    let sql = `SELECT l.id, l.resort_name AS resortName, l.destination, l.description, 
                DATE_FORMAT(l.start_date, '%d/%m/%Y') AS startDate,
                DATE_FORMAT(l.end_date,'%d/%m/%Y') AS endDate,
                l.image, l.price, 
                (SELECT COUNT(*) FROM followers WHERE location_id = l.id) AS numOfFollowers
                FROM locations l
                ORDER BY numOfFollowers DESC` ;
    try{
        let locations = await connection.execute(sql);
        return locations;

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }
}

async function userLocations(userId) {
    const sql = `SELECT l.id, l.resort_name AS resortName, 
        l.destination, l.description, 
        DATE_FORMAT(l.start_date, '%d/%m/%Y') AS startDate,
        DATE_FORMAT(l.end_date,'%d/%m/%Y') AS endDate,
        l.image, l.price, 
        CASE WHEN followers.user_id = ? THEN true ELSE false END AS userId, 
        (SELECT COUNT(*) FROM followers WHERE location_id = l.id) AS numOfFollowers
        FROM locations l 
        LEFT JOIN followers ON l.id=followers.location_id && followers.user_id=? 
        ORDER BY userId DESC, numOfFollowers DESC,l.id`
    let parameters = [userId,userId];
    
    try{
        let allUserLocations = await connection.executeWithParameters(sql, parameters);
        return allUserLocations;

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }
}

async function deleteLocation(locationId) {
    let sql = `DELETE FROM locations WHERE id=?;`;
    let parameters = [locationId];
    try{
        await connection.executeWithParameters(sql, parameters);

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }
}

async function isResortNameExist (resortName){
    let sql = 'SELECT resort_name FROM locations WHERE resort_name = ?;';
    let parameters = [resortName];

    try{
        const locationExistResult = await connection.executeWithParameters(sql,parameters);
        if (locationExistResult == null || locationExistResult.length === 0) {
            throw new ServerError(ErrorType.UNAUTHORIZED);
        }
        return true;

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
};

module.exports = {
    addLocation,
    updateLocation,
    getAllLocations,
    userLocations,
    deleteLocation,
    isResortNameExist
}