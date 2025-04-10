const  mongoose  = require("mongoose");
const dbuser = process.env.DB_USER;
const dbPassoword = process.env.DB_PASS;

// connection
const conn = async () => {
    try {
        const dbConn = await mongoose.connect(`mongodb+srv://${dbuser}:${dbPassoword}@cluster0.cike2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    console.log("Conectou ao banco!")

    return dbConn
    } catch (error) {
        console.log(error)
    }
};

conn()

module.children = conn;