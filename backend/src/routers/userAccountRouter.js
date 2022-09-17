const express = require ("express");
const { model } = require("mongoose");
const router = new express.Router;
const clubRegistrationData = require ("../models/clubRegistrationSchema");
const bcrypt =require ("bcryptjs");
const cookieParser = require('cookie-parser')
const { cookie } = require("express/lib/response");
const adminauth =require("../middleware/adminauth");
const eventData = require("../models/eventData");
router.use(express.json());

router.get("/account",adminauth,async(req,res)=>{
try{ console.log(req.rootUser.email)
    const accountExpData = await eventData.find({email:req.rootUser.email});
    const userAccountData={
        
        email:req.rootUser.email,
        userPost:accountExpData
    }
    
    res.send(userAccountData);
}catch(error){
  console.log(error);
  res.send(req.rootUser);
}

})

router.post("/account",adminauth,async(req,res)=>{
    try{
        console.log(req.body);
    const expData ={
       ... req.body,
        email:req.rootUser.email,
       
    }
   
    const newExp=new eventData(expData);
    const saved=await newExp.save();
     
    res.status(201).send("event data added");
}catch(e){
    console.log(e);
    res.status(400).send(`errorr ${e}`);
    
}
    })
module.exports=router;