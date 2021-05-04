const router=require('express').Router();
const cloudinary=require('cloudinary');
//const fileUpload = require('express-fileupload');
//const formidable  = require('formidable');
const Product=require('../models/product')
const fs=require('fs');
const path=require('path')
const _ = require('lodash');


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

router.post('/upload/:id', (req, res) =>{
    try {

        //console.log(req.files);

        //res.send("HELlo");

        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No files were uploaded.'})

        const file = req.files.file;
        if(file.size > 1024*1024) {
           //removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Size too large"})
        }
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            //removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "File format is incorrect."})
        }
        
        
        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, result)=>{
            if(err) throw err;

            //removeTmp(file.tempFilePath)
            
            const product = await Product.findOne({ _id: req.params.id});
            console.log(product);
            product.imageurl = result.secure_url;
            product.imageid = result.public_id;
            product.save();
            console.log(product.imageurl);
            res.json({public_id: result.public_id, url: result.secure_url})
        }) 
        //res.send("HELlo");
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

module.exports=router;