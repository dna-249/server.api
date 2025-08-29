const mongoose = require('mongoose');

const Schema = mongoose.Schema({
   
    name:{ type:String},
    email:{ type:String},
    phone:{ type:String},
    address:{ type:String},
    user:{ type:String},
    pass:{ type:String},  
    pin:{ type:String},  

})



const Products = mongoose.model("rumaisdata", Schema)
module.exports = {Products};