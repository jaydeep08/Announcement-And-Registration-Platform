const express = require ("express");
const { model } = require("mongoose");
const router = new express.Router;
const registrationData = require ("../models/registrationSchema");
const clubRegistrationData = require ("../models/clubRegistrationSchema");
const bcrypt =require ("bcryptjs");
const cookieParser = require('cookie-parser')
const { cookie } = require("express/lib/response");
router.use(cookieParser());
router.post("/login", async(req,res)=>{
    try{console.log(req.body);
        const email= req.body.email;
        const password =req.body.password;
        const userData = await registrationData.findOne({email:email});
        if(userData.verified){
        const isMatch = bcrypt.compare(password,userData.password);
        const token=await userData.generateAuthToken();
       
        res.cookie("jwt",token,{
            expires:new Date(Date.now()+14400000),
            httpOnly:true,
            //secure:true
        });

        
      
        if(isMatch){
    
            res.status(201).send("Login Successful");
        }else{
             res.send("Invalid Password");
        }
        }
        else{
            res.status(400).send("User With This Email Does Not Exist");
        }


    }
    catch(error){
        res.status(400).send(" Email Does Not Exist");
    }
})

router.get("/logout",(req,res)=>{
    res.clearCookie('jwt',{path:'/'});
   
    res.status(200).send("user logout");
})

router.post("club_admin/login", async(req,res)=>{
    try{console.log(req.body);
        const email= req.body.email;
        const password =req.body.password;
        const userData = await clubRegistrationData.findOne({email:email});
        if(userData.verified){
        const isMatch = bcrypt.compare(password,userData.password);
        const token=await userData.generateAuthToken();
       
        

   

        
      
        if(isMatch && userData.club_admin){
            res.cookie("jwt",token,{
                expires:new Date(Date.now()+14400000),
                httpOnly:true,
                //secure:true
             
            });
              console .log("admil login successful")
            res.status(201).send("Login Successful");
        }else{
             res.send("Invalid Password");
        }
        }
        else{
            res.status(400).send("User With This Email Does Not Exist");
        }


    }
    catch(error){
        res.status(400).send(" Email Does Not Exist");
    }
})

module.exports=router;