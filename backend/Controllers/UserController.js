import UserModel from "../Models/UserModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const loginUser = async (req,res)=>{
    const {username, password} = req.body;
    console.log(username,password);

   let User =  await UserModel.findOne({username});
   console.log("hi");
   if(!User) return res.status(400).json({message: "Invalid Credentials"});
   let isMatch = bcrypt.compareSync(password, User.password);
   if(!isMatch) return res.status(400).json({message: "Invalid Credentials"});
   const token = jwt.sign({_id: User._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
   res.json({token, userData: User});
   
};

export const signUpUser = async (req,res)=>{
    console.log("Hiiiiii");
    const {
        FullName,
        profilePic,
        username,
        password,
    }= req.body;
    // let User = await UserModel.findOne({username});
    // if(User) return res.status(400).json({message: "User already exists"});
    console.log("Hi");
    
    let hashedPassword = bcrypt.hashSync(password, 10);
    console.log("Hiiii");
    let User = new UserModel({FullName, profilePic, username, password: hashedPassword});
    console.log("Hiiiiiiiiii");
    await User.save();

};

export const updateUser = async (req,res)=>{
    const {
        FullName,
        profilePic,
        password,
    } = req.body;

    let updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
        FullName,
        profilePic,
        password: bcrypt.hashSync(password, 10),
    }, {new: true});
    if(!updatedUser) return res.status(404).json({message: "User not found"});
    res.json(updatedUser);
};

export const deleteUser = async (req,res)=>{
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({message: "User deleted successfully"});
};