const Photo = require("../models/Photo");
const User = require("../models/User");

const { mongoose } = require("mongoose");

const fs = require("fs");
const path = require("path");

//Insert a photo with an user related to  isString
const insertPhoto = async(req, res) => {
    const {title} = req.body;
    const image = req.file.filename;

    const reqUser = req.user

    const user = await User.findById(reqUser._id);

    // Create photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    })

    // If photo was created successfully, return data
    if(!newPhoto) {
        res.status(201).json({errors: ["Houve um problema, tente novamente mais tarde"]})
    }
    res.status(201).json(newPhoto)

}

// Remove a photo from DB
const deletePhoto = async(req, res) => {

    const {id} = req.params;

    const reqUser = req.user;

    try {
        const photo = await Photo.findById(new mongoose.Types.ObjectId(id));
    
        if(!photo) {
            res.status(404).json({errors: ["Foto não encontrada"]})
            return;
        }
    
        if(!photo.userId.equals(reqUser._id)) {
            res.status(422).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde"]});
            return;
        }

        const completeFile = `/uploads/photos/${photo.image}`;

        await fs.unlink(`./${completeFile}`, (err) => {  
            if(err) { 
                res.status(422).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde."]})                
                return            
            }      
            }) 

        await Photo.findByIdAndDelete(photo._id)
    
        res.status(200).json({id: photo._id, message: "Foto excluída com sucesso."});

    } catch (error) {
        res.status(404).json({errors: ["Foto não encontrada"]})
        return;
    }}

    // Get all photos
    const getAllPhotos = async(req, res)  => {
    const photos = await Photo.find({}).sort([["createdAt",-1]]).exec();

    return res.status(200).json(photos)
}
    // Get all photos
    
module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos
}