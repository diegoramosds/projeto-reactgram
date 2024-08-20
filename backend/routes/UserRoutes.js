const express = require("express")
const router = express.Router()

// controller
const { register, login, getCurrentUser, upadate } = require("../controllers/UserController");

// middlewares
const validate  = require("../middlewares/handleValidation")
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");


//routes
router.post("/register", userCreateValidation() ,validate, register)
router.post("/login", loginValidation() ,validate, login)
router.get("/profile", authGuard, getCurrentUser)
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), upadate)

module.exports  = router

