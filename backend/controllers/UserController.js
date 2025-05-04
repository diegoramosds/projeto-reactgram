const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Photo = require("../models/Photo");

const jwtSecret = process.env.JWT_SECRET;

// generate user token
const genarateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// register user an sing in
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (user) {
      return res
        .status(422)
        .json({ errors: ["Por favor, utilize outro E-mail"] });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: passwordHash,
    });

    if (!newUser) {
      return res
        .status(422)
        .json({ errors: ["Houve um erro, por favor tente mais tarde"] });
    }

    res.status(201).json({
      _id: newUser._id,
      token: genarateToken(newUser._id),
    });
  } catch (err) {
    console.error("Erro no register:", err);
    res.status(500).json({ errors: ["Erro interno no servidor"] });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ errors: ["Usuário não encontrado"] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(422).json({ errors: ["Senha inválida"] });
    }

    res.status(201).json({
      _id: user._id,
      profileImage: user.profileImage,
      token: genarateToken(user._id),
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ errors: ["Erro interno no servidor"] });
  }
};

//Get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};

// Search user by name
const searchUser = async (req, res) => {
  const { q } = req.query;

  const users = await User.find({ name: new RegExp(q, "i") })
    .select("-password")
    .exec();

  res.status(200).json(users);
};
//update an user
const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let = profileImage = null;
  if (req.file) {
    profileImage = req.file.path;
  }
  const reqUser = req.user;
  const user = await User.findById(
    new mongoose.Types.ObjectId(reqUser._id)
  ).select("-password");
  if (name) {
    user.name = name;
  }
  if (password) {
    //Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
  }
  if (profileImage) {
    user.profileImage = profileImage;

    await User.updateMany(
      { "followers.userId": user._id },
      { $set: { "followers.$[elem].userImage": profileImage } },
      { arrayFilters: [{ "elem.userId": user._id }] }
    );

    await User.updateMany(
      { "following.userId": user._id },
      { $set: { "following.$[elem].userImage": profileImage } },
      { arrayFilters: [{ "elem.userId": user._id }] }
    );
  }
  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json(user);
};

// Get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(new mongoose.Types.ObjectId(id)).select(
      "-password"
    );

    // Check if user exists
    if (!user) {
      res.status(404).json({ errors: ["Usuário não encontrado."] });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ errors: ["Usuário não encontrado."] });
    return;
  }
};

// Start following
const followingUser = async (req, res) => {
  const { id } = req.params;

  try {
    const reqUser = req.user;

    const user = await User.findById(id);

    // Check if user  exist
    if (!user) {
      res.status(422).json({ errors: ["usuário não encontrada"] });
      return;
    }

    if (reqUser._id == id) {
      res
        .status(422)
        .json({ errors: ["Não é possivel seguir sua propria conta"] });
      return;
    }
    // Check if the user already follow user
    if (
      user.followers.some((follower) => follower.userId.equals(reqUser._id))
    ) {
      user.followers = user.followers.filter(
        (follower) => !follower.userId.equals(reqUser._id)
      );
      reqUser.following = reqUser.following.filter(
        (follow) => !follow.userId.equals(id)
      );
      await user.save();
      await reqUser.save();
      res.status(200).json({
        userId: id,
        userName: user.name,
        userImage: user.profileImage,
        followers: user.followers,
        message: "Deixou de seguir",
      });
      return;
    } else {
      user.followers.push({
        userId: reqUser._id,
        userName: reqUser.name,
        userImage: reqUser.profileImage,
      });
      reqUser.following.push({
        userId: user._id,
        userName: user.name,
        userImage: user.profileImage,
      });
      await user.save();
      await reqUser.save();
      res.status(200).json({
        userId: id,
        userName: user.name,
        userImage: user.profileImage,
        followers: user.followers,
        message: "Você começou a seguir",
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

// Check likes
const cleanupLikes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ errors: ["Usuário não encontrado."] });
    }

    const validLikes = [];
    for (const likedPhoto of user.likedPhotos) {
      const photoId = likedPhoto.photoId;

      if (!photoId) continue;

      const photoExists = await Photo.exists({
        _id: new mongoose.Types.ObjectId(photoId),
      });
      if (photoExists) {
        validLikes.push(likedPhoto);
      }
    }
    await User.updateOne(
      { _id: user._id }, // Filtro
      { $set: { likedPhotos: validLikes } }
    );

    res.status(200).json({ likedPhotos: validLikes });
  } catch (error) {
    console.error("Erro ao limpar likes inválidos:", error);
    res
      .status(500)
      .json({ errors: ["Erro ao limpar likes inválidos.", error] });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  searchUser,
  update,
  getUserById,
  followingUser,
  cleanupLikes,
};
