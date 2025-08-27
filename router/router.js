const express = require("express")
const mtn = express.Router('')
const {share,gifting} = require("../controllers/mtn")

mtn.get("/mtn/gifting",gifting)
mtn.get("/mtn/share",share)

module.exports ={mtn}