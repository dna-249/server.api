
const express  = require("express");
const Port = process.env.PORT || 3000
const app = express()
const cors = require("cors");
const mongoose = require("mongoose")

const corsConfig = {
    origin : ["*"],
    credential : true,
    methods : ["GET","POST","PUT","DELETE"]
}

app.options("",cors(corsConfig))
app.use(cors(corsConfig))
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))
mongoose.connect("mongodb+srv://danamonuraa:bkJ1MVARzko9ldt9@dnaapi.hjo9y.mongodb.net/product?retryWrites=true&w=majority&appName=dnaApi").then(()=> console.log("connected to database")).catch(err => console.log(err))

const Data = require("./models/product.model");


app.get("/",(req,res)=>{
    res.send("hello from backend")
})

app.get('/api/users', async (req,res) =>{
    try{
        const product = await Data.find({})
        res.json(product)
    }catch(error){
        res.status(500).json({message:error.message})
    } 
    
})


app.post('/api/users',(req,res) => {
    Data.create({image:req.body.image, 
                     name:req.body.name,
                     description:req.body.description,
                     price:req.body.price,
                     category:req.body.category,
                     contact:req.body.contact,
                     whatsapp:req.body.whatsapp,
                    })
                    
})



app.get("api/user/:id", async(req,res)=>{
    try{
    const {id} = req.params;
    const product = await Data.findById(id)
    res.status(200).json(product)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


app.put("api/users/:id", async(req,res)=>{
    try {
        const {id}=req.params
        const product = await Data.findByIdAndUpdate(id, req.body)
        
        if(!product){
            res.status(404).json("product not found")
        }

        res.status(200).json(product)
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
})

app.delete("api/users/:id", async(req,res)=>{
    try {
        const {id}=req.params
        const product = await Data.findByIdAndDelete(id, req.body)

        if(!product){
            res.status(404).json("product not found")
        }
        res.status(200).json(product)
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
})


app.listen(Port, ()=>{
    console.log("server is Running")
    
})