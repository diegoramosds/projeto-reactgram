const express = require("express");
const { getAllComments } = require("../controllers/PhotoController");
const router = express.Router(); // <-- Aqui o certo

router.use("/api/users", require("./UserRoutes"));
router.use("/api/photos", require("./PhotosRoutes"));

// test route
router.get("/", (req, res) => {
  res.send("API working!");
});

module.exports = router;
