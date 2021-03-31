const User = require("../models/user");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");


exports.signup = (req,res) => {
    
    const user = new User(req.body);

    user.save((err,user) => {
        res.json(user)
    })
}

exports.signin = (req,res) => {

   
   const {email,password} = req.body;

   User.findOne({email}, (err,user) => {

        if(!user) {
            return res.json({
                error: "user does not exist"
            })
        }

       if(!user.authenticate(password)){
            return res.json({
                error: "Email and password do not match"
            });
        }   

       

        const token = jwt.sign({ _id: user._id }, process.env.SECRET);


        res.cookie("token", token, { expire: new Date() + 9999 });

    
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } });
    })      
}

exports.signout = (req,res) => {
    res.clearCookie("token");
    res.json({
      message: "User signout successfully"
    });
}


exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: "auth"
});
  



