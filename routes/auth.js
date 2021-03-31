var express = require('express')
var router = express.Router()

const {signup,signin,signout, isSignedIn} = require("../controllers/auth")


router.post("/signup" , signup);


router.post("/signin" ,signin);

router.get("/signout" , signout);

router.get("/test" , isSignedIn , (req,res) => {
    res.json({
        message: "works"
    })
});

module.exports = router;