const express = require('express');
const router = new express.Router();
const multer = require('multer');
const moment = require('moment');
const User = require("../models/userSchema");

const cloudinary = require("../helper/cloudinaryConfig");

// img storage path
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
});

// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allow"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
});
 

router.post("/register", upload.single("photo") ,async (req, res) => {

    try{
        // console.log(req.file);
        const upload = await cloudinary.uploader.upload(req.file.path);
        // console.log("upload successful",upload);

        const {name} = req.body;

        const date = moment( new Date()).format("YYYY-MM-DD");

        const user = await User.create({
            name,
            imgPath:upload.secure_url,
            date
        });

        return res.status(200).json({
            msg:"send",
            user,
            status:true
        });
    }
    catch(err){
        return res.status(200).json({
            msg:err.message,
            error:"error",
            status:false
        });
    }
    
});

// user data
router.get("/users", async (req,res) => {
    try{
        const users = await User.find();

        return res.status(200).json({
            msg:"users",
            status:true,
            users
        });
    }
    catch(err){
        return res.status(200).json({
            msg:err.message,
            error:"error",
            status:false
        });
    }
});

// delete user data
router.post("/delete", async (req,res) => {
    try{
        const {id} = req.body;
        // console.log("id",id);

        const user = await User.findByIdAndDelete(id);

        return res.status(200).json({
            msg:"user",
            status:true,
            user
        });
    }
    catch(err){
        return res.status(200).json({
            msg:err.message,
            error:"error",
            status:false
        });
    }
})

module.exports = router;