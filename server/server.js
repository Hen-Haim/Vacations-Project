const express = require("express");
const cors = require("cors");
const usersController = require("./controllers/users-controller");
const locationsController = require("./controllers/locations-controller"); //locations
const followersController = require("./controllers/followers-controller"); //followers
const errorHandler = require("./errors/error-handler");
const loginFilter = require('./middleware/login-filter');
let ServerError = require("./errors/server-error");
let ErrorType = require("./errors/error-type");

const app = express();

app.use(cors({origin:"http://localhost:3000"}));
app.use(express.json());
app.use(loginFilter());
app.use("/users", usersController);
app.use("/locations", locationsController); //locations
app.use("/followers", followersController); //followers
app.use(() => {throw new ServerError(ErrorType.GENERAL_ERROR);});
app.use(errorHandler);

app.listen(3001, ()=> console.log("listening to port 3001"));



