import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const signup = async(req,res) =>{
    const { fullName, email,password } = req.body;
    try{
        if(!fullName || !password || !email){
            return res.status(400).json({"message":"Fill up  all the fields"});
         };
        if(password.length <6){
             return res.status(400).json({"message":"Password should be at least 6 charcters"});
          };

     const user = await User.findOne({email});
     if (user) return  res.status(400).json({message:"Email already exists"});

     const salt = await bcrypt.genSalt(10);
     const hashedPassword= await bcrypt.hash(password,salt);

     const newUser= new User({
        fullName,
        email,
        password:hashedPassword
     });

     if(newUser){
        generateToken(newUser._id,res)
        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            password:newUser.password,
            profilePic:newUser.profilePic
        });
     }else{
        res.status(400).json({message:"Invalid user Data"});
     }
    }catch(e){
        console.log("Error",e);
        res.status(500).json({"message":"Internal server Error"});

    }

}
export const login = async(req,res) =>{
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
         if(!user){
            return res.status(400).json({"message":"Invalid crediantials"});
         };

        const ispassword= await bcrypt.compare(password,user.password);

        if(!ispassword){
            return res.status(400).json({"message":"Invalid crediantials"});
         };
        
         generateToken(user._id,res)
         res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            password:user.password,
            profilePic:user.profilePic
        });
    }catch(e){
        console.log("Error",e);
        res.status(500).json({"message":"Internal server Error"});
    }
    
}
export const logout = (req,res) =>{
     try{
        res.cookie("jwt","",{ maxAge:0});
        res.status(200).json({"message":"Logged out successfully"});
     }catch(e){
        console.log("Error",e);
        res.status(500).json({"message":"Internal server Error"});
    }
}