const express = require("express");
const followersLogic = require("../logics/followers-logic");
const cacheModule = require("../logics/cache-module");

const router = express.Router();

//adding a user follower to a location
router.post("/:id", async (req, res, next)=>{
    const fromCache = cacheModule.extractUserDataFromCache(req);   //where we take user id 
    try{
        const locationId = +req.params.id;    // location id
        const locationIdAfterSuccess = await followersLogic.addFollower(fromCache, locationId);
        res.json(locationIdAfterSuccess);
        
    }catch(err){
        return next(err);
    }
})

//Delete a user follower to a location
router.delete('/:id', async (req, res, next) => {
    const fromCache = cacheModule.extractUserDataFromCache(req);   //where we take user id 
    try {
        const locationId = +req.params.id;   //location Id
        await followersLogic.removeFollower(fromCache, locationId);
        res.send('Removing one followed location Was A Success!');

    } catch (err) {
        return next(err);
    }
});


module.exports = router