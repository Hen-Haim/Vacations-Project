const express = require("express");
const locationLogic = require("../logics/locations-logic");
const cacheModule = require("../logics/cache-module");

const router = express.Router();

//add location
router.post("/", async (req,res, next)=>{
    const fromCache = cacheModule.extractUserDataFromCache(req);  
    try{
        const locationDetails = req.body;
        await locationLogic.addLocation(locationDetails,fromCache);
        res.json("Adding A New Vacation, Was A Success!");
        
    }catch(err){
        return next(err);
    }
});

//Update
router.put("/:id", async (req,res, next)=>{
    const fromCache = cacheModule.extractUserDataFromCache(req);  
    try{
        const locationId = req.params.id;
        const locationDetails = req.body;
        locationDetails.id = locationId;
        await locationLogic.updateLocation(locationDetails,fromCache);        
        res.json('Updating This Location, Was A Success!');

    }catch(err){
        return next(err);
    }
});

//Get all locations
router.get('/', async (req, res,next) => {
    try {
        const locations = await locationLogic.getAllLocations();
        res.json(locations);

    } catch (err) {
        return next(err);
    }
});

//Get all locations for user
router.get('/profile', async (req, res,next) => {
    const fromCache = cacheModule.extractUserDataFromCache(req); 
    try {
        const userId = await locationLogic.userLocations(fromCache);
        res.json(userId);

    } catch (err) {
        return next(err);
    }
});

//Delete
router.delete('/:id', async (req, res, next) => {
    const fromCache = cacheModule.extractUserDataFromCache(req); 
    try {
        const locationId = req.params.id;
        await locationLogic.deleteLocation(locationId,fromCache);
        res.send('Deleting This Location, Was A Success!');

    } catch (err) {
        return next(err);
    }
});

module.exports = router