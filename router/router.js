const express = require("express")
const mtn = express.Router('')
const {share,gifting} = require("../controllers/mtn")

mtn.get("/gifting",gifting)
mtn.get("/share",share)

module.exports ={mtn}