import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
const { Schema } = mongoose;

// Define User Schema
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  userName:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


// Creating pre hook of mongoose for bcrypting the the password
userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next()
  this.password=await bcrypt.hash(this.password,10)
  next()
})
// Creating the methods that are provided by mongose by using .method

userSchema.methods.isPasswordCorrect=async function(password){
  return  await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          userName: this.userName,
          fullName: this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}

// Create User model from schema
const User = mongoose.model('User', userSchema);

export default User;


