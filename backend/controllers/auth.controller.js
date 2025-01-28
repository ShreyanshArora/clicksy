import User from "../models/user.model.js"
import { redis } from "../lib/redis.js"
import jwt from "jsonwebtoken"
const generateTokens= (userid) =>{
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}),
    const refreshToken = jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"7d"}
    )
}

const storeRefreshToken = async(userId,refreshToken)=>{
    await redis.set(`refresh_token:${userId}`,refreshToken, "EX",7*24*60*60);
}
export const signup=async(req,res)=>{
    const {email,password,name}=req.body;
    

    try {

        const userExists= await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        
        const user = await User.create({name,email,password});
        
        //authenticate
        const {accessToken , refreshToken} = generateTokens(user._id);
        await storeRefreshToken(user._id,refreshToken);


        res.status(201).json({user,message:"User created successfully"});
    
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
        
    }
    
}

export const login=async(req,res)=>{
    res.send("Login route called");
}

export const logout=async(req,res)=>{
    res.send("Logout route called");
}