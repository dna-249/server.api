
const express  = require("express");
const Port = process.env.PORT || 3000
const app = express()
const cors = require("cors");
const mongoose = require("mongoose")

const corsConfig = {
    origin : ["https://fastapi-iota-lac.vercel.app"],
    credential : true,
    methods : ["GET","POST","PUT","DELETE"]
}

app.options("",cors(corsConfig))
app.use(cors(corsConfig))
app.use(express.json())
mongoose.connect("mongodb+srv://danamonuraa:bkJ1MVARzko9ldt9@dnaapi.hjo9y.mongodb.net/product?retryWrites=true&w=majority&appName=dnaApi").then(()=> console.log("connected to database")).catch(err => console.log(err))


const Products = require("./models/product.model");





app.get("/",(req,res)=>{
    res.send("hello from backend")
})

app.get('/api/users', async (req,res) =>{
    try{
        const product = await Products.find({})
        res.json(product)
    }catch(error){
        res.status(500).json({message:error.message})
    } 
    
})


app.post('/api/users',(req,res) => {
    Products.create({name:req.body.name, 
                     email:req.body.email,
                    })
                    
})



app.get("api/user/:id", async(req,res)=>{
    try{
    const {id} = req.params;
    const product = await Products.findById(id)
    res.status(200).json(product)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


app.put("api/users/:id", async(req,res)=>{
    try {
        const {id}=req.params
        const product = await Products.findByIdAndUpdate(id, req.body)
        res.status(200).json(product)
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
})
app.listen(Port, ()=>{
    console.log("server is Running")
    
})