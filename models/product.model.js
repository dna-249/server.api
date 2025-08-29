const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
   
    name:{ type:String},
    email:{ type:String},
    phone:{ type:String},
    address:{ type:String},
    user:{ type:String},
    pass:{ type:String},  

},
{timestamps:true})



const Products = mongoose.model("rumaisdata", ProductSchema)
module.exports = Products;