require('dotenv').config();
const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");


const eventSchema = new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String
    },
    status:{
        type:String,
        enum: ['Pending','Accepted','Rejected'],
        default:"Pending"

    },
    desc:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
      
    },
    url:{
        type:String,
        required:true,
    }
})




const eventData=new mongoose.model("eventData",eventSchema);

module.exports=eventData;