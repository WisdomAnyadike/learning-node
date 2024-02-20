const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productName:{type:String , required:true , trim: true},
    productDescription:{type:String , required:true },
    productPrice:{type:Number , required: true} ,
    productImage:{type:String , required: true} ,
    productCategory:{type:String , required:true , enum : ['Electronics' , 'Groceries' , 'Fashion' , 'Fragrances']}
} , {timestamps: true})

const productModel = mongoose.model( "product" , ProductSchema )

module.exports = productModel