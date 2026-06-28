const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const register = async(req,res)=>{
    try{
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"Email already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,12);

        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                profileImage:user.profileImage
            },
            token
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

const login = async(req,res)=>{
    try{
        const email = req.body.email;
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            });
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            });
        }
        const token = generateToken(user._id);
        
        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                profileImage:user.profileImage
            },
            token
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}


const getMe = async(req,res)=>{
    try{
        const currentUser = req.user;
        res.status(200).json({
            success:true,
            message:"User fetched successfully",
            user:currentUser
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}
module.exports = {register,login,getMe};