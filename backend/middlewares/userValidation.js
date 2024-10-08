const {body} = require("express-validator")

const userCreateValidation = () => {
    return [
        body("name")
        .isString()
        .withMessage("O nome é obrigatório!").isLength({min: 3})
        .withMessage("O nome precisa ter no minimo 3 caracteres"),


        body("email")
        .isString()
        .withMessage("O E-mail é obrigatório!")
        .isEmail()
        .withMessage("Insira um E-mail válido"),


        body("password")
        .isString().withMessage("Verifique seu E-mail")
        .withMessage("A senha é obrigatória!").isLength({min: 5})
        .withMessage("A senha precisa ter no minimo 5 caracteres"),

        body("confirmPassword")
        .isString()
        .withMessage("A confirmação de senha é obrigatório")
        .custom((value, {req}) => {
            if(value != req.body.password) {
                throw new Error("As senhas precisam ser iguais")
            }
            return true
        })

    ];
}

const loginValidation = () => {
    return [
        body("email")
        .isString().withMessage("Campo e-mail é obrigatório")
        .isEmail().withMessage("Digite um e-mail válido!"),

        body("password")
        .isString().withMessage("A senha é obrigatória")   
    ]
}

const userUpdateValidation = () => {
    return [
        body("name")
        .optional()
        .isLength({min: 3})
        .withMessage("O nome precisa ter no minimo 3 caracteres"),

        body("password")
        .optional()
        .isLength({min: 5})
        .withMessage("A  senha precisa ter no minimo 5 caracteres"),  
    ]
}

 module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation
};