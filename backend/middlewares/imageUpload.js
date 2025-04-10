const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "reactgram", // ou "users"/"photos" se quiser separar depois
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const imageUpload = multer({ storage });

module.exports = { imageUpload };
