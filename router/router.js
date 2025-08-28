const express = require("express")
const mtnRouter = express.Router('')
const userRouter = express.Router('')
const {share,gifting,getOneUser,createUser,getUsers} = require("../controllers/mtn")

mtnRouter.get("/gifting",gifting)
mtnRouter.get("/share",share)
userRouter.post("/",createUser)
userRouter.get("/one",getOneUser)
userRouter.get("/all",getUsers)

module.exports ={mtnRouter,userRouter}