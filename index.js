
const express  = require("express");
const Port = process.env.PORT || 3001
const app = express()
const cors = require("cors");


app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("hello from backend")
})


app.listen(Port, ()=>{
    console.log("server is Running")
    
})