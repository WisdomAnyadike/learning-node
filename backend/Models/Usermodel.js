const mongoose = require('mongoose')
// const {isValidEmail} = require('validator')

const UserSchema = new mongoose.Schema({
   FullName : {type : String , required: [true , "fullname is required"]}, 
   Email : {type : String , required: [true , "email is required"] , unique : [true, "email already in use"] } , 
   Password: {type:String , required: [true , "password is required" ] , minLength : [6 , " password musnt be less than 6"]}

} , {timestamps: true})

let userModel = mongoose.model("UserModel" , UserSchema)

module.exports = userModel