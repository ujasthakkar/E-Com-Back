const express = require('express');
const users = require('../models/user');
const products = require('../models/product');

const router = express.Router();


router.get('/addtofav/:id/:productId',  async(req, res) => {

    const userInfo = await users.findOne({ _id: req.params.id});
    const productInfo = await products.findOne({ _id: req.params.productId});
    
        let duplicate = false;
        userInfo.fav.forEach((item) =>{
            if (item.id == req.params.productId) {
                duplicate = true;
            }
        })
        
       
        if (duplicate) {
            
            return res.json({
                message: "Product already there"
            });
        }
        
        else {
            console.log("else part")
            users.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: {
                        fav: {
                            id: req.params.productId,
                            product:productInfo,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.fav)
                }
            )
            
        }
    
});

router.get('/removefromfav/:id/:productId',  async(req, res) => {
    
    users.findOneAndUpdate(
        { _id: req.params.id },
        {
            "$pull":
                { "fav": { "id": req.params.productId } }
        },
        { new: true },
        (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(userInfo.fav)
        }
     
    )
})

module.exports = router