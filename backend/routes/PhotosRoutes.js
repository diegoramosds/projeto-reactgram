const express = require("express")
const router = express.Router()

// controller
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto, deleteComment, searchPhotos, getAllComments } = require("../controllers/PhotoController");

// middlewares
const { photoInsertValidation, photoUpdateValidation, photoCommentValidation } = require("../middlewares/photoValidation")
const authGuard = require("../middlewares/authGuard");
const validate  = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload");

//routes

router.post(
    "/",
    authGuard,
    imageUpload.single("image"),
    photoInsertValidation(),
    validate,
    insertPhoto
);

router.delete("/:id", authGuard, deletePhoto);

router.get("/", authGuard, getAllPhotos);

router.get("/user/:id", authGuard, getUserPhotos);

router.get("/search", authGuard, searchPhotos);

router.get("/:id", authGuard, getPhotoById);

router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto),

router.put("/like/:id", authGuard, likePhoto);

router.put("/comment/:id", authGuard, photoCommentValidation(), validate, commentPhoto),

router.get("/find/comments/:id", authGuard, getAllComments);

router.delete("/remove/comment/:photoId/:commentId", authGuard, deleteComment);

module.exports  = router