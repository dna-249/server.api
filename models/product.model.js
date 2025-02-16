const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
{
    
    image:{
        type:String,
        require:[true, "cannot be blank"]},
    name:{
            type:String,
            require:[true, "cannot be blank"]},
    description:{
            type:String,
            require:[true, "cannot be blank"]},
    price:{
                type:String,
                require:[true, "cannot be blank"]}, 
    category:{
                    type:String,
                    require:[true, "cannot be blank"]},
    contact:{
                        type:String,
                        require:[true, "cannot be blank"]},
    whatsapp:{
                            type:String,
                            require:[true, "cannot be blank"]},        
},
{timestamps:true}
)

const Products = mongoose.model("Product", ProductSchema)
module.exports = Products;