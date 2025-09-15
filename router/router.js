const express = require("express")
const mtnRouter = express.Router('')
const userRouter = express.Router('')
const {share,gifting,getOneUser,createUser,getUsers,transaction, api, payment, deleteOneUser} = require("../controllers/mtn")
const { userLogin, userVerify } = require("../middlewave/login")

mtnRouter.get("/api",api)
mtnRouter.post("/buy",gifting)
mtnRouter.get("/share",share)
mtnRouter.post("/payment",payment)
userRouter.post("/",createUser)
userRouter.put("/:id",transaction)
userRouter.post("/login",userLogin)
userRouter.post("/verify",userVerify)
userRouter.get("/one/:id",getOneUser)
userRouter.delete("/one/:id",deleteOneUser)
userRouter.get("/all",getUsers)

module.exports ={mtnRouter,userRouter}