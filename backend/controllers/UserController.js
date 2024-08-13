const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecret  = process.env.JWT_SECRET;


// generate user token
const genareteToken = (id) => {
 return jwt.sign({id}, jwtSecret, {
    expiresIn: "7d"
 })
}

// register user an sing in
const register = async(req, res) =>  {
    res.send("Registro");
}

module.exports = {
    register
}