const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        trim:true,
        minLength:[3,"Name must be at least 3 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        trim:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password must be at least 8 characters"],
        select:false
    },
    profileImage:{
        type:String,
        default:"/images/default.png"
    }
},{
    timestamps:true
});
module.exports = mongoose.model("User",userSchema);