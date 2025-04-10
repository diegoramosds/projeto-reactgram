const fs = require("fs");
const {validationResult} = require("express-validator")

const validate =  (req, res, next) => {

    const errors = validationResult(req)

    if(errors.isEmpty()) {
        return next()
    }

    const extractedErrors = []

    errors.array().map((err) => extractedErrors.push(err.msg));

    // Verifica se existe um arquivo de imagem e o remove se houver erros
    if (req.file) {
        fs.unlink(`./uploads/photos/${req.file.filename}`, (err) => {
            if (err) {
                console.error("Erro ao remover o arquivo:", err);
            }
        });
    }

    return  res.status(422).json({
        errors: extractedErrors
    
    })

}

module.exports = validate