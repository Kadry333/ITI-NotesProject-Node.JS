const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter your title"],
        trim:true,
        minLength:[3,"Title must be at least 3 characters"]
    },
    content:{
        type:String,
        required:[true,"Please enter your content"],
        trim:true,
        minLength:[10,"Content must be at least 10 characters"]
    },
    category:{
        type:String,
        trim:true,
        default:"General"
    },
    tags:{
        type:[String],
        default:[]
    },
    status:{
        type:String,
        enum:["Active","Archived"],
        default:"Active"
    },
    isPinned:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        //required:[true,"Please enter your user id"]
    },
},{timestamps:true});

module.exports = mongoose.model("Note",noteSchema);