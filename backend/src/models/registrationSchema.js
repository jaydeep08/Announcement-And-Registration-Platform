require('dotenv').config();
const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");


const registrationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exist"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    mobile_no:{
        type:Number,
        required:true
    },
    reg_no:{
        type:String,
        required:true
    },
    roll_no:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    year_of_study:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    verified:{
        type:Boolean,
        default:false
    },
    user_type:{
        type:String,
        default:"student"

    }

})
registrationSchema.methods.generateAuthToken = async function(){
    try{
        
        const token = jwt.sign({_id:this._id},process.env.SECRET);
      
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(error){
        //console.log("token error"+error);
        res.send("error : "+error);
       
    }
}
registrationSchema.pre("save",async function(next){
    try{
    if(this.isModified("password")){
    this.password =await bcrypt.hash(this.password,10);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword,10);;
}
    next();
}catch(e){
    console.log(e);

}
})

const registrationData=new mongoose.model("registrationData",registrationSchema);

module.exports=registrationData;
