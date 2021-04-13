const express = require('express');
const users = require('../models/user');
const products = require('../models/product');


const router = express.Router();


router.get('/:id', async (req,res) => {

    try{
        const user = await users.findOne({ _id: req.params.id});
        res.json(user);
    }catch(err){
        res.json({ msg: 'usero not found' });
    }

});


router.put('/:id', /*, issignedin, isretailer,*/ async (req,res) =>{

    const user = await users.findById(req.params.id);



    if(user){

        const upduser = req.body;
        
        
                user.name = upduser.name ? upduser.name : user.name ;
                user.lastname = upduser.lastname ? upduser.lastname : user.lastname ;
                user.email = upduser.email ? upduser.email : user.email ;
                user.password = upduser.password ? upduser.password : user.password ;
                user.userinfo = upduser.userinfo ? upduser.userinfo : user.userinfo ;
                user.purchases = upduser.purchases ? upduser.purchases : user.purchases ;
                user.save();

                res.json({ msg: 'user was updated', user});
          

    }
    else{
       
        res.json({ msg: `user not found with id of ${req.params.id}`});
    
    }
});


router.delete('/:id', /*, issignedin, isretailer,*/ async (req,res) =>{
    
    const deluser = await users.findById(req.params.id);

    if(deluser){
        await deluser.remove();
        res.send({ message: 'user deleted'});
    }
    else{
        res.send('user not found, error in deletion');
    }
});


router.get('/addtocart/:id/:productId',  async(req, res) => {

    const userInfo = await users.findOne({ _id: req.params.id});
    const productInfo = await products.findOne({ _id: req.params.productId});
    
        let duplicate = false;
        userInfo.cart.forEach((item) =>{
            if (item.id == req.params.productId) {
                duplicate = true;
            }
        })
        
       
        if (duplicate) {
            users.findOneAndUpdate(
                { _id: req.params.id, "cart.id": req.params.productId },
                { $inc: { "cart.$.quantity": 1 } },
                 { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        }
        
        else {
            console.log("else part")
            users.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: {
                        cart: {
                            id: req.params.productId,
                            product:productInfo,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
            
        }
    
});

router.get('/removefromCart/:id/:productId',  async(req, res) => {
    
    users.findOneAndUpdate(
        { _id: req.params.id },
        {
            "$pull":
                { "cart": { "id": req.params.productId } }
        },
        { new: true },
        (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(userInfo.cart)
        }
     
    )
})

//606dd40ab38a536484f062db
//6066f41789350f21e06b0440




module.exports = router;