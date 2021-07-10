const express = require("express");
const usersLogic = require("../logics/users-logic");
const cacheModule = require("../logics/cache-module");

const router = express.Router();

//Registration
router.post("/", async (req, res, next)=>{
    try{
        const userDetails = req.body;
        await usersLogic.register(userDetails);
        res.json("Registration was a success!");
        
    }catch(err){
        return next(err);
    }
})

//Login
router.post('/login', async (req, res,next) => {
    try {
        const userDetails = req.body;  
        const userStatus = await usersLogic.login(userDetails);
        userStatus.userName = req.body.userName
        //i have : token, isAdmin and username in this array
        //username is necessary so that i can present the user name on the home screen
        res.json(userStatus);     
        
    }catch(err){
        return next(err);
    }
});

//Get one user
router.get('/', async (req, res, next) => {
    const fromCache = cacheModule.extractUserDataFromCache(req); 
    try {
        const userDetails = await usersLogic.getOneUser(fromCache);
        res.json(userDetails);
        
    } catch (err) {
        return next(err);
    }
});

//Update
router.put("/", async (req, res, next)=>{
    try{
        const fromCache = cacheModule.extractUserDataFromCache(req);  
        const userDetails = req.body;
        await usersLogic.update(userDetails,fromCache);
        res.json("Your Update Has Been Saved!");

    }catch(err){
        return next(err);
    }
});

//Delete
router.delete('/', async (req, res, next) => {
    try {
        const fromCache = cacheModule.extractUserDataFromCache(req); 
        await usersLogic.deleteUser(fromCache);
        res.send('Deleting User Was A Success!');

    } catch (err) {
        return next(err);
    }
});

module.exports = router