const express = require("express")
const router = express.Router()

// controller
const { register, login, getCurrentUser, update, getUserById, getAllComments, followingUser, searchUser, cleanupLikes } = require("../controllers/UserController");

// middlewares
const validate  = require("../middlewares/handleValidation")
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");
const { getUserPhotos } = require("../controllers/PhotoController");

//routes
router.post("/register", userCreateValidation() ,validate, register)
router.post("/login", loginValidation() ,validate, login)
router.get("/settings", authGuard, getCurrentUser)
router.get("/profile/:id", authGuard, getUserPhotos)
router.get("/search", authGuard, searchUser);
router.put("/", authGuard, imageUpload.single("profileImage"), userUpdateValidation(), validate, update),
router.get("/:id", getUserById)
router.put("/followers/:id", authGuard, followingUser)
router.post("/cleanupLikes", authGuard, cleanupLikes);

module.exports  = router

