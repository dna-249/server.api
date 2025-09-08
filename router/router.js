const express = require("express")
const mtnRouter = express.Router('')
const userRouter = express.Router('')
const {share,gifting,getOneUser,createUser,getUsers, api} = require("../controllers/mtn")
const { userLogin, userVerify } = require("../middlewave/login")

mtnRouter.get("/api",api)
mtnRouter.post("/buy",gifting)
mtnRouter.get("/share",share)
userRouter.post("/",createUser)
userRouter.post("/login",userLogin)
userRouter.post("/verify",userVerify)
userRouter.get("/one/:id",getOneUser)
userRouter.get("/all",getUsers)

module.exports ={mtnRouter,userRouter}