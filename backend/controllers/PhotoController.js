const Photo = require("../models/Photo");
const User = require("../models/User");

const { mongoose } = require("mongoose");

const fs = require("fs");

const cloudinary = require("../config/cloudinary");

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const user = req.user;

  // Verifica se veio uma imagem
  if (!req.file) {
    return res.status(422).json({ errors: ["A imagem é obrigatória!"] });
  }

  // A URL da imagem já vem de req.file.path, graças ao CloudinaryStorage
  const imageUrl = req.file.path;

  try {
    const photo = await Photo.create({
      image: imageUrl,
      title,
      userId: user._id,
    });

    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ errors: ["Erro ao criar a foto."] });
  }
};
// Remove a photo from DB
const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));
    // Check if photo  exist
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada"] });
      return;
    }
    // Check if like exist
    if (photo.userId)
      if (!photo.userId.equals(reqUser._id)) {
        res.status(422).json({
          errors: ["Ocorreu um erro, por favor tente novamente mais tarde"],
        });
        return;
      }
    const completeFile = `/uploads/photos/${photo.image}`;

    fs.unlink(`./${completeFile}`, (err) => {
      if (err) {
        res.status(422).json({
          errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
        });
        return;
      }
    });

    await Photo.findByIdAndDelete(photo._id);

    // Remove the photo from all users' likedPhotos
    await User.updateMany(
      { "likedPhotos.photoId": photo._id }, // Find users who liked the photo
      { $pull: { likedPhotos: { photoId: photo._id } } }
    );
    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
    return;
  }
};

// Get all photos
const getAllPhotos = async (req, res) => {
  const photo = await Photo.find({})
    .sort([["createdAt", -1]])
    .populate("userId", ["name", "profileImage"])
    .exec();

  return res.status(200).json(photo);
};
// Get all user photos
const getUserPhotos = async (req, res) => {
  const { id } = req.params;

  try {
    const photo = await Photo.find({ userId: id })
      .populate("userId", "name profileImage")
      .sort([["createdAt", -1]])
      .exec();

    // Check if photo  exist
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada"] });
      return;
    }
    res.status(200).json(photo);
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
    return;
  }
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const photo = await Photo.findById(
      new mongoose.Types.ObjectId(id)
    ).populate("userId", "name profileImage");

    // Check if photo  exist
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada"] });
      return;
    }

    res.status(200).json(photo);
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
    return;
  }
};

//Update a photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  try {
    const reqUser = req.user;

    const photo = await Photo.findById(id);

    // Check if photo  exist
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada"] });
      return;
    }

    if (!photo.userId.equals(reqUser._id)) {
      res.status(404).json({
        errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
      });
      return;
    }

    if (title) {
      photo.title = title;
    }

    await photo.save();

    res.status(200).json({ photo, message: "Foto atualizada com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
    return;
  }
};

//Like funcionality
const likePhoto = async (req, res) => {
  const { id } = req.params;

  try {
    const reqUser = req.user;

    const photo = await Photo.findById(id);
    const user = await User.findById(reqUser._id);

    // Check if photo  exist
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada"] });
      return;
    }

    // Check if the user already like the photo
    if (photo.likes.includes(reqUser._id)) {
      photo.likes = photo.likes.filter((userId) => !userId.equals(reqUser._id));
      user.likedPhotos = user.likedPhotos.filter(
        (likedPhoto) => !likedPhoto.photoId.equals(photo._id)
      );
      await photo.save();
      await user.save();
      res
        .status(200)
        .json({ photoId: id, likes: photo.likes, message: "Curtida removida" });
      return;
    } else {
      photo.likes.push(reqUser._id);
      user.likedPhotos.push({ photoId: photo._id, photoImage: photo.image });
      await photo.save();
      await user.save();
      res.status(200).json({
        photoId: id,
        likes: photo.likes,
        message: "Você curtiu a foto",
      });
      return;
    }
  } catch (error) {
    res.status(422).json({
      errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
    });
    return;
  }
};

// Comment a photo
const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    const photo = await Photo.findById(id).populate(
      "userId",
      "name profileImage"
    );
    // Check if photo  exist
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada"] });
      return;
    }

    // Put comment in the array comments
    const userComment = {
      _id: new mongoose.Types.ObjectId(),
      photoId: photo.id,
      photoImage: photo.image,
      comment,
      userName: user.name,
      userImage: user.profileImage,
      userId: user._id,
    };

    photo.comments.push(userComment);

    await photo.save();

    res.status(200).json({
      comment: userComment,
      message: "O comentário foi adicionado com succeso!",
    });
  } catch (error) {
    res.status(422).json({
      errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
    });
    return;
  }
};

// Search photos by title
const searchPhotos = async (req, res) => {
  const { q } = req.query;

  const photos = await Photo.find({ title: new RegExp(q, "i") })
    .populate("userId", "name profileImage")
    .exec();

  res.status(200).json(photos);
};

// Get all Comments
const getAllComments = async (req, res) => {
  const { id } = req.params;
  try {
    const reqUser = req.user;

    const photos = await Photo.find()
      .sort([["createdAt", -1]])
      .populate("userId", "name profileImage")
      .exec();

    const userComments = photos.flatMap((photo) =>
      photo.comments.filter((comment) => comment.userId.equals(reqUser._id))
    );

    // Check if photo  exist
    if (userComments.length === 0) {
      return res
        .status(200)
        .json({ errors: ["Você ainda não comentou nenhuma publicação"] });
    }
    // Check user
    if (!reqUser._id.equals(id)) {
      return res.status(422).json({
        errors: [
          "Você não tem autorização para vizualizar comentários de outros usúarios nessa aba.",
        ],
      });
    }
    res.status(200).json(userComments);
  } catch (error) {
    res.status(422).json({
      errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
    });
    return;
  }
};

// Delete comment
const deleteComment = async (req, res) => {
  const { photoId, commentId } = req.params;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(photoId);

    if (!photo) {
      return res.status(404).json({ errors: ["Foto não encontrada"] });
    }

    const comment = photo.comments.find(
      (comment) => comment._id?.toString() === commentId
    );

    if (!comment) {
      return res.status(404).json({ errors: ["Comentário não encontrado"] });
    }

    if (!comment.userId.equals(reqUser._id)) {
      return res.status(403).json({
        errors: ["Você não tem permissão para excluir este comentário."],
      });
    }

    photo.comments = photo.comments.filter(
      (comment) => comment._id?.toString() !== commentId
    );

    await photo.save();

    res.status(200).json({ message: "Comentário excluído com sucesso." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ errors: ["Ocorreu um erro ao tentar excluir o comentário."] });
  }
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
  getAllComments,
  deleteComment,
};
