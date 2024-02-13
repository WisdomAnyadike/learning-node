const express = require('express')
const router = express.Router()
const {Signup , LogIn , editacc, deleteUser} = require("../Controllers/Usercontroller")
const VerifyToken = require('../Middlewares/VerifyToken')

router.post("/signup" , Signup)
router.post("/login" , LogIn)

// private route
router.post("/editAcc" , VerifyToken , editacc)
router.post("/delete" , VerifyToken , deleteUser)

module.exports = router