const express = require("express")
const router = express.Router()

const {getUserById , getUser} = require("../controllers/user");
const {isSignedIn} = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId",isSignedIn,getUser);

module.exports = router;