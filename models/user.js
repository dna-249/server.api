const mongoose = require('mongoose');

const Schema = mongoose.Schema({
   
    name:{ type:String},
    email:{ type:String},
    phone:{ type:String},
    address:{ type:String},
    user:{ type:String},
    pass:{ type:String},  
    pin:{ type:String},
    total:{ type:String},
    transaction:[{
        size:{ type:String},
        network:{ type:String},
        amount:{ type:String},
        date:{ type:String},
        status:{ type:String},
    }],
    order:[{
        size:{ type:String},
        network:{ type:String},
        amount:{ type:String},
        date:{ type:String},
        phone:{ type:String},
    }] 

})



const Products = mongoose.model("rumaisdata", Schema)
module.exports = {Products};