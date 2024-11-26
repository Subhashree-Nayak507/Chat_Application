import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { renameSync,  unlinkSync} from 'fs';

const maxAge =  4 * 24 * 60 * 60; 

const createToken = (email, userId) => {
  try {
    const token = jwt.sign({ email, userId }, process.env.JWT, {
      expiresIn: maxAge, 
    });
    console.log("Generated Token:", token);   
    return token;
  } catch (error) {
    console.error("Token creation failed:", error.message);
    throw error; 
  }
};


export const signup = async(req,res,next)=>{
    try{
        const { email,password } = req.body;
        if(!email || !password){
            return res.status(401).json({ success:false,message:"Both Email and Passsword are required"})
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const user = await User.create({ email,password});
        res.cookie("jwt", createToken(email, user._id), {
          maxAge: maxAge * 1000, // Convert to milliseconds
          httpOnly: true, // Important for security
          secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          path: '/',    
        });
    

        return res.status(201).json({
            success:true,
            message:"User is Created",
            user
        })
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })

    }
}

export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(401).json({
          success: false,
          message: "Both Email and Password are required",
        });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User does not exist",
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      }
  
      res.cookie("jwt", createToken(user.email, user._id), {
        maxAge: maxAge * 1000, // Convert to milliseconds
        httpOnly: true, // Important for security
        secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',  
      });
  
      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  export const getUserInfo = async (req, res, next) => {
    try {
      const userData = await User.findById(req.userId);
      console.log('All cookies:', req.cookies);
      console.log(req.userId);
      if (!userData) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        userData
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  

  export const UpdateProfile = async (req, res) => {
    try {
      const { userId } = req;
      const { firstName,  lastName, color } = req.body;
      //console.log(req.body);
      if (!firstName || !lastName) {
        return res.status(400).json({
          success: false,
          message: "First name and last name required"
        });
      }
     // console.log("First Name:", firstName);
      // console.log("Last Name:", lastName);
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          $set: { 
            firstName: firstName,
            lastName: lastName,
            color: color,
            profileSetup: true
          }
        },
        { 
          new: true, 
          runValidators: true 
        }
      );
    console.log(userData)
      if (!userData) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
      return res.status(200).json({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData. lastName,
        color: userData.color,
        profileSetup: userData.profileSetup
      });
  
    } catch (error) {
      console.error("Profile update error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }

export const addProfileImage =async(req,res,next)=>{
  try{
    if(!req.file){
      return response.status(400).send("please upload the file");
    }
    const date= Date.now();
    let fileName= "uploads/profiles/"+date + req.file.Originalname;
    renameSync(req.file.path,fileName);
    const updateUser= await User.findByIdAndUpdate(req.userId,
      {image:fileName},
      {new:true,runValidators:true});
    console.log(updateUser);
    return res.status(200).json({image:updateUser.image})

  }catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
export const removeProfileImage =async(req,res,next)=>{
  try{
    const { userId } = req;
    const user= await User.findByIdAndUpdate(userId);
    if(!user){
      res.status(404).send("user not found")
    }
    if(user.image){
      unlinkSync(user.image);
    }
    user.image= null;
    await user.save();
    return res.status(200).json({
      message: "Profile deleted successfully",  image: null,
    });  
  }catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }}