require("dotenv").config()
const express  = require("express");
const Port = process.env.PORT || 3000
const app = express()
const cors = require("cors");
const mongoose = require("mongoose");
const { mtnRouter,userRouter } = require("./router/router");
const { gifting, total } = require("./controllers/mtn");
const {transaction } = require("./controllers/mtn")

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

app.post("/", async(req,res)=>{
    const event = req.body;
    
    const data = event?.data;
    const userId = event?.userId;
    const customer = event?.customer;
    const minus = event?.minus;
    const status = data?.status;

    if (status === "success") {
      
       total(customer.name,data.amount,minus);
       res.sendStatus(200); // Acknowledge receipt
    }


    if(userId){
      
       total(userId, data.amount,minus);
       res.sendStatus(200); // Acknowledge receipt
     
    }
    res.sendStatus(200); // Acknowledge receipt

})




app.listen(Port, ()=>{
    console.log("server is Running")
    
})