require("dotenv").config()
const express  = require("express");
const Port = process.env.PORT || 3000
const app = express()
const cors = require("cors");
const mongoose = require("mongoose");
const { mtnRouter,userRouter } = require("./router/router");
const { gifting, total,total2 } = require("./controllers/mtn");
const {Products} = require("./models/user")

const corsConfig = {
    origin : ["https://rumaisdata.vercel.app","https://annurdata.vercel.app"],
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

app.get("/total",async(req,res)=>{
    try {
        const users = await Products.find({})
         const totalSum = users.reduce((sum, user) => {
        return sum + Number(user.total || 0); 
        }, 0);
        res.send(`The total Amount:${totalSum}`)

    } catch (error) {
        res.send(error.message)
    }
       
            })

app.post("/", async(req,res)=>{
    const event = req.body;
    
    const data = event?.data;
    const userId = event?.userId;
    const customer = data?.customer;
    const minus = event?.minus;
    const status = data?.status;

     res.sendStatus(200); // Acknowledge receipt
   

    if (status === "success") {
        console.log(customer)
       total(customer?.email,data.amount);
       }


    if(userId){
       total2(userId,minus);    
    }
   
})

app.post("/add/:email/:add", async(req,res)=>{
    const {email,add} = req.params;
    try {
         total(email,add);
         res.send("successfully")
    } catch (error) {
       res.send("failed") 
    }
     
})

app.post("/minus/:email/:minus", async(req,res)=>{
    const {email,minus} = req.params;
     try {
         total2(email,minus);
         res.send("successfully")
    } catch (error) {
       res.send("failed") 
    }
})
app.listen(Port, ()=>{
    console.log("server is Running")
    
})