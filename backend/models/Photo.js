const mongoose  = require("mongoose");
const {Schema} = mongoose

const photoSchema = new Schema({
   image: String,
   title: String,
   likes: Array,
   comments: Array,
   userId: mongoose.objectId,
   userName: String,
}, {
    timestamps: true
})

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;