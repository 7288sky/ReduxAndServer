

import User from '../models/user.model.js'
import mongoose from 'mongoose';

const generateToken = async (userId) => {
    const user = await User.findById(userId);
    const token = await user.generateAccessToken()
    return token;
}


export const registerUser = async (req, res) => {
    try {


        // return res.status(200).json({
        //     message:"hello saurabh"
        // })


        const { fullName, email, password, userName } = req.body;

        if (!fullName) return res.status(400).json({
            error: "provide fullName"
        })
        if (!email) return res.status(400).json({
            error: "provide email"
        })
        if (!password) return res.status(400).json({
            error: "provide password"
        })
        if (!userName) return res.status(400).json({
            error: "provide userName"
        })

        // const existedUser=await User.findOne({
        //     $or:[{userName},{ email }]
        //   })

        const existedUser = await User.findOne({ userName });

        if (existedUser) {
            return res.status(400).json("Username is already taken");
        }

        const existedEmail = await User.findOne({ email });

        if (existedEmail) {
            return res.status(400).json("Email is already taken");
        }

        if (existedUser) return res.status(400).json("User or email is already exist")

        const user = await User.create({
            fullName,
            userName,
            email,
            password
        })

        const createdUser = await User.findById(user._id).select("-password -_id");

        if (!createdUser) return res.status(400).json("Some thing wentg wrong while creating the user")


        return res.status(201).json({
            createdUser,
            message: "User created successfully"
        })



    } catch (err) {
        console.log("Error in the registerController router", err);
    }
}

export const loginUser = async (req, res) => {
    try {
        // return res.status(200).json("hii this is login route")
        const { userName, email, password } = req.body;
        if (!userName) return res.status(401).json("userName is required");
        if (!email) return res.status(401).json("email is required");
        if (!password) return res.status(401).json("password is required");

        const user = await User.findOne({
            $and: [{ userName }, { email }]
        })

        if (!user) return res.status(400).json("The user aur email does not exist");
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) return res.status(400).json("The Passsword is wrong")

        const token = await generateToken(user._id);// Note await is necesary otherwise token will not be generated
        const loggedInUser = await User.findById(user._id).select("-password")
        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .cookie("token", token, options)
            .json({
                loggedInUser,
                token
            })

    } catch (err) {
        console.log("Error in the loginController router")
    }
}

