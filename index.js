require("dotenv").config()
const express  = require("express");
const Port = process.env.PORT || 3000
const app = express()
const cors = require("cors");
const mongoose = require("mongoose");
const { mtnRouter,userRouter } = require("./router/router");
const { gifting } = require("./controllers/mtn");

const corsConfig = {
    origin : ["https://rumaisdata.vercel.app"],
    credential : true,
    methods : ["GET","POST","PUT","DELETE"]
}

app.options("",cors(corsConfig))
app.use(cors(corsConfig))
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
mongoose.connect(process.env.KEY).then(()=> console.log("connected to database")).catch(err => console.log(err.message))

app.use("/mtn",mtnRouter)
app.use("/user",userRouter)

app.get("/",gifting)



app.listen(Port, ()=>{
    console.log("server is Running")
    
})